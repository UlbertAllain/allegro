"use client";

import { useEffect, useRef } from "react";
import { getJourneyProgress } from "../lib/get-journey-progress";

interface RentalStep {
  number: string;
  title: string;
  description: string;
}

interface RentalJourneyProps {
  steps: readonly RentalStep[];
}

const stepPositions = ["first", "second", "third"] as const;
const JOURNEY_PATH = "M 0 34.5 H 260 L 367 119.5 H 615 L 733 204.5 H 1100";

/** Traces the three rental steps as the visitor scrolls. The base path is always visible. */
export function RentalJourney({ steps }: RentalJourneyProps) {
  const journeyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const journey = journeyRef.current;
    if (!journey || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frameId = 0;


    const update = () => {
      frameId = 0;
      const bounds = journey.getBoundingClientRect();
      const progress = getJourneyProgress(bounds.top, bounds.height, window.innerHeight);
      journey.style.setProperty("--journey-progress", progress.toFixed(4));
      journey.style.setProperty("--journey-clip-right", `${((1 - progress) * 100).toFixed(2)}%`);
      journey.dataset.scrollMotion = "true";
    };

    const requestUpdate = () => {
      if (!frameId) frameId = requestAnimationFrame(update);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameId) cancelAnimationFrame(frameId);
      journey.style.removeProperty("--journey-progress");
      journey.style.removeProperty("--journey-clip-right");
      delete journey.dataset.scrollMotion;
    };
  }, []);

  return (
    <div className="process-journey" aria-label="Tiga langkah penyewaan" ref={journeyRef}>
      <div className="journey-line" aria-hidden="true">
        <svg viewBox="0 0 1100 300" preserveAspectRatio="none">
          <path className="journey-path--base" d={JOURNEY_PATH} />
        </svg>
        <svg className="journey-line__active" viewBox="0 0 1100 300" preserveAspectRatio="none">
          <path className="journey-path--active" d={JOURNEY_PATH} />
        </svg>
      </div>
      {steps.map((step, index) => (
        <div
          key={step.number}
          className={`journey-step journey-step--${stepPositions[index]}`}
          data-reveal="up"
          data-delay={index + 1}
        >
          <span className="journey-counter">{step.number}</span>
          <h3>{step.title}</h3>
          <p>{step.description}</p>
        </div>
      ))}
    </div>
  );
}
