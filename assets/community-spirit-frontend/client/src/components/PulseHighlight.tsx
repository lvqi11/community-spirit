/**
 * PulseHighlight — Wraps content with a brief green pulse glow when `active` changes to true
 * Used to draw attention during demo step transitions
 */

import { useEffect, useState, type ReactNode } from "react";

interface PulseHighlightProps {
  active: boolean;
  children: ReactNode;
  className?: string;
  color?: "moss" | "amber";
}

export function PulseHighlight({ active, children, className = "", color = "moss" }: PulseHighlightProps) {
  const [pulsing, setPulsing] = useState(false);

  useEffect(() => {
    if (active) {
      setPulsing(true);
      const timer = setTimeout(() => setPulsing(false), 800);
      return () => clearTimeout(timer);
    }
  }, [active]);

  const glowColor = color === "moss"
    ? "shadow-[0_0_12px_oklch(0.55_0.15_155_/_0.4)]"
    : "shadow-[0_0_12px_oklch(0.75_0.12_85_/_0.4)]";

  return (
    <div className={`transition-shadow duration-300 rounded-xl ${pulsing ? glowColor : ""} ${className}`}>
      {children}
    </div>
  );
}
