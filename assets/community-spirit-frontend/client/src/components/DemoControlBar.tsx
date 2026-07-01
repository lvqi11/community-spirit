/**
 * DemoControlBar — Bottom-fixed stepper for the 7-step demo narrative
 * Design: Laboratory instrument panel feel, compact, always visible
 */

import { useDemo, DEMO_STEPS } from "@/contexts/DemoContext";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

export function DemoControlBar() {
  const { currentStep, setStep, nextStep, prevStep, isPlaying, togglePlay } = useDemo();

  return (
    <div className="hidden md:flex h-16 flex-shrink-0 border-t border-border/60 bg-white/70 backdrop-blur-md px-4 items-center gap-3">
      {/* Play/Pause */}
      <button
        onClick={togglePlay}
        className="w-8 h-8 rounded-full bg-[var(--color-moss)] text-white flex items-center justify-center hover:bg-[var(--color-moss-dark)] transition-colors duration-150 active:scale-95"
      >
        {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
      </button>

      {/* Prev */}
      <button
        onClick={prevStep}
        disabled={currentStep === 1}
        className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-30 transition-all duration-150"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Step indicators */}
      <div className="flex-1 flex items-center gap-1">
        {DEMO_STEPS.map((step) => {
          const isActive = currentStep === step.id;
          const isPast = currentStep > step.id;
          return (
            <button
              key={step.id}
              onClick={() => setStep(step.id)}
              className={`
                flex-1 h-9 rounded-lg flex items-center justify-center gap-1.5 px-2 transition-all duration-200
                ${isActive
                  ? "bg-[var(--color-moss)]/10 border border-[var(--color-moss)]/30 shadow-sm"
                  : isPast
                    ? "bg-[var(--color-moss)]/5 border border-transparent"
                    : "border border-transparent hover:bg-accent"
                }
              `}
            >
              <span className={`
                w-5 h-5 rounded-full text-[10px] font-semibold flex items-center justify-center flex-shrink-0
                ${isActive
                  ? "bg-[var(--color-moss)] text-white"
                  : isPast
                    ? "bg-[var(--color-moss-light)] text-white"
                    : "bg-muted text-muted-foreground"
                }
              `}>
                {step.id}
              </span>
              <span className={`
                text-[11px] font-medium truncate hidden lg:block
                ${isActive ? "text-[var(--color-moss-dark)]" : "text-muted-foreground"}
              `}>
                {step.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Next */}
      <button
        onClick={nextStep}
        disabled={currentStep === 7}
        className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-30 transition-all duration-150"
      >
        <ChevronRight size={16} />
      </button>

      {/* Current step description */}
      <div className="hidden md:flex items-center gap-2 pl-3 border-l border-border/50">
        <span className="text-[11px] text-muted-foreground font-mono">
          Step {currentStep}/7
        </span>
        <span className="text-xs text-foreground font-medium max-w-[180px] truncate">
          {DEMO_STEPS[currentStep - 1].description}
        </span>
      </div>
    </div>
  );
}
