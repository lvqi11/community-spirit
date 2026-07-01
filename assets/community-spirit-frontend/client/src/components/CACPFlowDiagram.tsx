/**
 * CACPFlowDiagram — Animated pipeline visualization
 * Shows: Pulse → Contract → Handoff conversion chain
 * Animates based on demo step progression
 */

import { useDemo } from "@/contexts/DemoContext";
import { Activity, FileCheck, Bot, CheckCircle2 } from "lucide-react";

const STAGES = [
  { id: 1, label: "Community Pulse", sublabel: "Organic activity detected", icon: Activity, stepRequired: 1 },
  { id: 2, label: "CACP Contract", sublabel: "Task contract generated", icon: FileCheck, stepRequired: 6 },
  { id: 3, label: "Robot Handoff", sublabel: "Physical-AI dispatch", icon: Bot, stepRequired: 7 },
];

export function CACPFlowDiagram() {
  const { currentStep } = useDemo();

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-border/40">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          CACP Protocol Flow
        </span>
        <span className="text-[9px] font-mono text-muted-foreground">
          Pulse → Contract → Handoff
        </span>
      </div>

      {/* Flow diagram */}
      <div className="relative flex items-center justify-between">
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
          {/* Line 1: Pulse → Contract */}
          <line
            x1="18%"
            y1="50%"
            x2="48%"
            y2="50%"
            stroke={currentStep >= 6 ? "oklch(0.55 0.15 155)" : "oklch(0.9 0 0)"}
            strokeWidth="2"
            strokeDasharray={currentStep >= 6 ? "none" : "4 3"}
            className="transition-all duration-700"
          />
          {/* Line 2: Contract → Handoff */}
          <line
            x1="52%"
            y1="50%"
            x2="82%"
            y2="50%"
            stroke={currentStep >= 7 ? "oklch(0.75 0.12 85)" : "oklch(0.9 0 0)"}
            strokeWidth="2"
            strokeDasharray={currentStep >= 7 ? "none" : "4 3"}
            className="transition-all duration-700"
          />
          {/* Animated particle on active line */}
          {currentStep >= 6 && currentStep < 7 && (
            <circle r="3" fill="oklch(0.55 0.15 155)">
              <animateMotion dur="1.5s" repeatCount="indefinite" path="M 80 25 L 220 25" />
            </circle>
          )}
          {currentStep >= 7 && (
            <circle r="3" fill="oklch(0.75 0.12 85)">
              <animateMotion dur="1.5s" repeatCount="indefinite" path="M 240 25 L 380 25" />
            </circle>
          )}
        </svg>

        {/* Stage nodes */}
        {STAGES.map((stage) => {
          const Icon = stage.icon;
          const isActive = currentStep >= stage.stepRequired;
          const isCurrent = (stage.id === 1 && currentStep >= 1 && currentStep < 6) ||
                           (stage.id === 2 && currentStep >= 6 && currentStep < 7) ||
                           (stage.id === 3 && currentStep >= 7);

          return (
            <div key={stage.id} className="relative z-10 flex flex-col items-center w-1/3">
              <div className={`
                w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500
                ${isActive
                  ? isCurrent
                    ? "bg-[var(--color-moss)] text-white shadow-lg shadow-[var(--color-moss)]/30 scale-110"
                    : "bg-[var(--color-moss)]/15 text-[var(--color-moss)]"
                  : "bg-muted text-muted-foreground"
                }
              `}>
                {isActive && !isCurrent ? (
                  <CheckCircle2 size={18} />
                ) : (
                  <Icon size={18} />
                )}
              </div>
              <p className={`mt-2 text-[11px] font-semibold text-center transition-colors duration-300 ${
                isActive ? "text-foreground" : "text-muted-foreground"
              }`}>
                {stage.label}
              </p>
              <p className="text-[9px] text-muted-foreground text-center mt-0.5">
                {stage.sublabel}
              </p>
            </div>
          );
        })}
      </div>

      {/* Status bar */}
      <div className="mt-4 pt-3 border-t border-border/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              currentStep >= 7 ? "bg-[var(--color-amber)] animate-pulse" :
              currentStep >= 6 ? "bg-[var(--color-moss)] animate-pulse" :
              "bg-muted"
            }`} />
            <span className="text-[10px] font-medium">
              {currentStep >= 7
                ? "Robot-ready — awaiting dispatch approval"
                : currentStep >= 6
                  ? "Contract active — evaluating handoff eligibility"
                  : currentStep >= 2
                    ? "Pulse active — gathering participation data"
                    : "Waiting for community pulse match"
              }
            </span>
          </div>
          <span className="text-[10px] font-mono text-muted-foreground">
            {currentStep >= 7 ? "3/3" : currentStep >= 6 ? "2/3" : "1/3"} stages
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: currentStep >= 7 ? "100%" : currentStep >= 6 ? "66%" : "33%",
              background: currentStep >= 7
                ? "linear-gradient(90deg, oklch(0.55 0.15 155), oklch(0.75 0.12 85))"
                : "oklch(0.55 0.15 155)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
