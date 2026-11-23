"use client";

import React, { useEffect, useRef, useState } from "react";
import { MoonPhase } from "./SkyParts";

/* A realistic, slowly spinning 3D Moon rendered with a single WebGL shader.
 *
 * - Colour + relief come from NASA's public-domain CGI Moon Kit
 *   (LRO colour mosaic + LOLA elevation), stored in /public/images.
 * - The sphere is ray-traced per pixel, so there is no geometry or library.
 * - The Sun's direction follows today's elongation, so the lit fraction and
 *   the side that is lit (right while waxing, left while waning) are real.
 * - Respects prefers-reduced-motion and pauses while off screen.
 * - Falls back to the flat SVG phase drawing if WebGL is unavailable. */

const COLOR_SRC = "/images/moon-texture.jpg";
const HEIGHT_SRC = "/images/moon-height.jpg";
const SPIN_SPEED = 0.06; // radians per second (~1.75 min per turn)
const TILT = 0.12; // a slight axial tilt so the poles read as 3D

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uColor;
uniform sampler2D uHeight;
uniform float uSpin;
uniform float uTilt;
uniform vec3 uSun;
uniform float uPx;      // pixel size in uv units (for edge antialiasing)
uniform float uReady;   // 0 while textures load

const float PI = 3.14159265359;
const vec2 TEX = vec2(1.5 / 1024.0, 1.5 / 512.0);

mat3 rotY(float a) {
  float c = cos(a), s = sin(a);
  return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c);
}
mat3 rotX(float a) {
  float c = cos(a), s = sin(a);
  return mat3(1.0, 0.0, 0.0, 0.0, c, s, 0.0, -s, c);
}

float height(vec2 uv) { return texture2D(uHeight, uv).r; }

void main() {
  float r2 = dot(vUv, vUv);
  if (r2 > 1.0) { gl_FragColor = vec4(0.0); return; }

  // view-space surface normal of a unit sphere facing the camera (+z)
  vec3 n = vec3(vUv, sqrt(1.0 - r2));

  // into the Moon's body frame (spin + tilt)
  mat3 R = rotY(uSpin) * rotX(uTilt);
  vec3 nb = R * n;
  vec3 sunB = R * uSun;
  vec3 viewB = R * vec3(0.0, 0.0, 1.0);

  float lon = atan(nb.x, nb.z);
  float lat = asin(clamp(nb.y, -1.0, 1.0));
  vec2 uv = vec2(0.5 + lon / (2.0 * PI), 0.5 - lat / PI);

  // relief from the elevation map: perturb the normal along east / north
  float cl = max(cos(lat), 0.4);
  float hE = height(uv + vec2(TEX.x, 0.0));
  float hW = height(uv - vec2(TEX.x, 0.0));
  float hN = height(uv - vec2(0.0, TEX.y));
  float hS = height(uv + vec2(0.0, TEX.y));
  // fade relief toward the limb and poles, where the map is minified
  // or stretched and would otherwise sparkle
  float k = 0.03 * smoothstep(0.05, 0.45, n.z) * smoothstep(0.1, 0.5, cos(lat));
  float dE = k * (hE - hW) / (2.0 * TEX.x * 2.0 * PI * cl);
  float dN = k * (hN - hS) / (2.0 * TEX.y * PI);
  vec3 east = normalize(vec3(cos(lon), 0.0, -sin(lon)));
  vec3 north = cross(nb, east);
  vec3 nbp = normalize(nb - dE * east - dN * north);

  // albedo (sRGB -> linear) with a touch of contrast
  vec3 albedo = pow(texture2D(uColor, uv).rgb, vec3(2.2));
  // the mosaic has pitch-black permanently shadowed craters at the poles;
  // lift them to a plausible regolith brightness
  float polar = smoothstep(1.1, 1.4, abs(lat));
  albedo = max(albedo, vec3(mix(0.03, 0.14, polar)));
  albedo = mix(vec3(0.12), albedo, uReady);

  // Lunar photometry: Lommel-Seeliger (flat, bright full moon) blended
  // with Lambert (shading from relief), with a soft terminator.
  float mu0s = dot(nb, sunB);
  // relief shading, eased out right at the terminator to avoid noise
  float mu0 = mix(mu0s, dot(nbp, sunB), smoothstep(0.0, 0.4, mu0s));
  mu0 = max(mu0, mu0s * 0.45);
  float mu = max(dot(nbp, viewB), 0.0);
  float lit = smoothstep(-0.03, 0.06, mu0s);
  float ls = max(mu0, 0.0) / (max(mu0, 0.0) + mu + 1e-4);
  float lambert = max(mu0, 0.0);
  float sun = mix(lambert, 2.0 * ls, 0.55) * lit;

  // faint bluish earthshine on the night side
  vec3 earthshine = vec3(0.020, 0.024, 0.034) * (0.4 + 0.6 * n.z);

  vec3 col = albedo * (sun * vec3(1.06, 1.0, 0.92) * 1.55 + earthshine);

  // filmic-ish tone map, then back to sRGB
  col = col / (1.0 + col * 0.35);
  col = pow(col, vec3(1.0 / 2.2));

  // antialiased limb
  float r = sqrt(r2);
  float a = 1.0 - smoothstep(1.0 - 1.5 * uPx, 1.0, r);
  gl_FragColor = vec4(col * a, a);
}`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(s);
    gl.deleteShader(s);
    throw new Error(log ?? "shader compile failed");
  }
  return s;
}

function makeTexture(gl: WebGLRenderingContext, unit: number) {
  const t = gl.createTexture()!;
  gl.activeTexture(gl.TEXTURE0 + unit);
  gl.bindTexture(gl.TEXTURE_2D, t);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    1,
    1,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    new Uint8Array([128, 128, 128, 255])
  );
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  return t;
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export function Moon3D({
  elongation,
  className = "",
}: {
  elongation: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sunRef = useRef<[number, number, number]>([0, 0, 1]);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  // Sun direction in view space: new moon = behind, full = behind the viewer.
  useEffect(() => {
    const e = (elongation * Math.PI) / 180;
    const v: [number, number, number] = [Math.sin(e), 0.08, -Math.cos(e)];
    const l = Math.hypot(...v);
    sunRef.current = [v[0] / l, v[1] / l, v[2] / l];
  }, [elongation]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      premultipliedAlpha: true,
      alpha: true,
      antialias: false,
    });
    if (!gl) {
      setFailed(true);
      return;
    }

    let prog: WebGLProgram;
    try {
      prog = gl.createProgram()!;
      gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error();
    } catch {
      setFailed(true);
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(prog, name);
    const uSpin = u("uSpin");
    const uTilt = u("uTilt");
    const uSun = u("uSun");
    const uPx = u("uPx");
    const uReady = u("uReady");
    gl.uniform1i(u("uColor"), 0);
    gl.uniform1i(u("uHeight"), 1);

    const texColor = makeTexture(gl, 0);
    const texHeight = makeTexture(gl, 1);
    let texturesReady = 0;
    let disposed = false;

    Promise.all([loadImage(COLOR_SRC), loadImage(HEIGHT_SRC)])
      .then(([c, h]) => {
        if (disposed) return;
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texColor);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, c);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, texHeight);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, h);
        texturesReady = 1;
        setReady(true);
        draw(performance.now());
      })
      .catch(() => {
        if (!disposed) setFailed(true);
      });

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let raf = 0;
    let visible = true;
    const start = performance.now();
    // start with a nice longitude so recognisable maria face the viewer
    const baseSpin = 0.35;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(canvas!.clientWidth * dpr);
      const h = Math.round(canvas!.clientHeight * dpr);
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w;
        canvas!.height = h;
      }
      gl!.viewport(0, 0, w, h);
      gl!.uniform1f(uPx, 2 / Math.max(w, 1));
    }

    function draw(now: number) {
      resize();
      const t = reduceMotion ? 0 : (now - start) / 1000;
      gl!.uniform1f(uSpin, baseSpin + t * SPIN_SPEED);
      gl!.uniform1f(uTilt, TILT);
      gl!.uniform3fv(uSun, sunRef.current);
      gl!.uniform1f(uReady, texturesReady);
      gl!.clearColor(0, 0, 0, 0);
      gl!.clear(gl!.COLOR_BUFFER_BIT);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
    }

    function loop(now: number) {
      draw(now);
      if (visible && !reduceMotion) raf = requestAnimationFrame(loop);
    }

    const io = new IntersectionObserver(([entry]) => {
      const was = visible;
      visible = entry.isIntersecting;
      if (visible && !was && !reduceMotion) raf = requestAnimationFrame(loop);
      if (!visible) cancelAnimationFrame(raf);
    });
    io.observe(canvas);

    const ro = new ResizeObserver(() => draw(performance.now()));
    ro.observe(canvas);

    raf = requestAnimationFrame(loop);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      gl.deleteTexture(texColor);
      gl.deleteTexture(texHeight);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
    };
  }, []);

  if (failed)
    return <MoonPhase elongation={elongation} className={className} />;

  return (
    <div className={`relative aspect-square ${className}`}>
      {/* soft glow that scales with how much of the Moon is lit */}
      <div
        className="pointer-events-none absolute -inset-[12%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(241,220,178,0.28) 38%, rgba(241,220,178,0) 70%)",
          opacity:
            0.25 + 0.75 * ((1 - Math.cos((elongation * Math.PI) / 180)) / 2),
        }}
      />
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="The Moon, showing today's phase"
        className={`relative h-full w-full transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
