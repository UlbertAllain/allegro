"use client";

import { useEffect } from "react";

/** Progressive enhancement: static content remains visible without JavaScript. */
export function ScrollMotion() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches || !("IntersectionObserver" in window)) return;

    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.revealed = "true";
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" },
    );

    targets.forEach((element) => {
      // Avoid hiding content that's already visible on initial render.
      const { top, bottom } = element.getBoundingClientRect();
      if (top < window.innerHeight * 0.95 && bottom > 0) {
        element.dataset.revealed = "true";
      } else {
        observer.observe(element);
      }
    });
    document.documentElement.classList.add("motion-enabled");

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("motion-enabled");
    };
  }, []);

  return null;
}
