"use client";

import React from "react";
import Link from "next/link";

/*
 * A Link that understands "/path#section" targets. If the section already
 * exists on the current page (e.g. FreeInsight on /free-tools, Faq on
 * /contact), it scrolls there instead of navigating to another route.
 */
export default function SmartLink({
  href,
  onClick,
  ...rest
}: React.ComponentProps<typeof Link> & { href: string }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (
      e.defaultPrevented ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.button !== 0
    )
      return;

    const hashIndex = href.indexOf("#");
    if (hashIndex === -1) return;
    const id = href.slice(hashIndex + 1);
    const target = id && document.getElementById(id);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}#${id}`
    );
  };

  return <Link href={href} onClick={handleClick} {...rest} />;
}
