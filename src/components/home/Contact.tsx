"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { LIFE_AREAS } from "@/data/prernaData";
import Reveal from "./Reveal";

const input =
  "w-full rounded-xl border border-line bg-card px-4 py-3.5 text-[15px] text-ink placeholder:text-ink-3 outline-none transition focus:border-gold focus:ring-4 focus:ring-gold-soft/60";

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="px-3 sm:px-5">
      <div className="mx-auto grid max-w-[1400px] overflow-hidden rounded-[32px] bg-sand sm:rounded-[44px] lg:grid-cols-2">
        <div className="relative min-h-[280px] lg:min-h-full">
          <Image
            src="/images/mountains.jpg"
            alt="A person sitting on a rock looking out over a mountain range at sunset"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-ink/10" />
          <div className="absolute inset-x-0 bottom-0 p-8 text-paper lg:p-12">
            <p className="max-w-sm font-display text-3xl italic leading-snug">
              &ldquo;The journey of a thousand miles begins with one step.&rdquo;
            </p>
            <p className="mt-2 text-sm text-paper/70">— Lao Tzu</p>
          </div>
        </div>

        <Reveal className="p-7 sm:p-12 lg:p-16">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-deep">Contact us</p>
          <h2 className="mt-4 font-display text-5xl font-light leading-[1.05] sm:text-6xl">
            We&apos;d love to <em className="text-spirit">hear</em> from you.
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-ink-2">
            Have a question about a consultation, your report, or where to begin? Send us a message and our team
            will get back to you personally.
          </p>

          {sent ? (
            <div className="rise mt-10 flex items-start gap-4 rounded-2xl bg-card p-6">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-spirit-soft text-spirit">
                <Check className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-2xl">Message sent</p>
                <p className="mt-1 text-ink-2">Thank you for reaching out. We&apos;ll reply by email soon.</p>
              </div>
            </div>
          ) : (
            <form
              className="mt-10 grid gap-3 sm:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: connect to PRERNA backend / CMS "User submissions"
                setSent(true);
              }}
            >
              <input required className={input} placeholder="Full name" autoComplete="name" aria-label="Full name" />
              <input required type="email" className={input} placeholder="Email" autoComplete="email" aria-label="Email" />
              <select className={`${input} sm:col-span-2`} defaultValue="" aria-label="Topic">
                <option value="" disabled>
                  What would you like to talk about?
                </option>
                {LIFE_AREAS.map((a) => (
                  <option key={a.id}>{a.title}</option>
                ))}
                <option>Personalised report</option>
                <option>Something else</option>
              </select>
              <textarea required rows={4} className={`${input} resize-none sm:col-span-2`} placeholder="Your message" aria-label="Message" />
              <button
                type="submit"
                className="group mt-2 flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 font-semibold text-paper transition ring-1 ring-inset ring-gold/45 hover:bg-astro sm:col-span-2 sm:justify-self-start"
              >
                Send message
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
