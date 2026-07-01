import { createContext, useContext, useState, useCallback, useEffect, useRef, type ReactNode } from "react";

export type DemoStep = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export const DEMO_STEPS = [
  { id: 1 as DemoStep, label: "Match", description: "Match resident to pulse", icon: "🎯" },
  { id: 2 as DemoStep, label: "Join", description: "Join community pulse", icon: "🤝" },
  { id: 3 as DemoStep, label: "Check-in", description: "Arrival check-in", icon: "📍" },
  { id: 4 as DemoStep, label: "Earn XP", description: "Earn Spirit Points", icon: "✨" },
  { id: 5 as DemoStep, label: "Claim", description: "Claim benefit", icon: "🎁" },
  { id: 6 as DemoStep, label: "Contract", description: "Generate CACP task contract", icon: "📜" },
  { id: 7 as DemoStep, label: "Handoff", description: "Operator / robot-ready handoff", icon: "🤖" },
] as const;

export type ViewTab = "world" | "task" | "ops";

interface DemoContextType {
  currentStep: DemoStep;
  setStep: (step: DemoStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  activeView: ViewTab;
  setActiveView: (view: ViewTab) => void;
  isPlaying: boolean;
  togglePlay: () => void;
}

const DemoContext = createContext<DemoContextType | null>(null);

function getViewForStep(step: DemoStep): ViewTab {
  if (step <= 2) return "world";
  if (step <= 5) return "task";
  return "ops";
}

export function DemoProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState<DemoStep>(1);
  const [activeView, setActiveView] = useState<ViewTab>("world");
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const setStep = useCallback((step: DemoStep) => {
    setCurrentStep(step);
    setActiveView(getViewForStep(step));
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => {
      const next = Math.min(prev + 1, 7) as DemoStep;
      setActiveView(getViewForStep(next));
      return next;
    });
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => {
      const next = Math.max(prev - 1, 1) as DemoStep;
      setActiveView(getViewForStep(next));
      return next;
    });
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  // Auto-play timer: advance every 3 seconds
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= 7) {
            setIsPlaying(false);
            return prev;
          }
          const next = (prev + 1) as DemoStep;
          setActiveView(getViewForStep(next));
          return next;
        });
      }, 3000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  return (
    <DemoContext.Provider
      value={{
        currentStep,
        setStep,
        nextStep,
        prevStep,
        activeView,
        setActiveView,
        isPlaying,
        togglePlay,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) throw new Error("useDemo must be used within DemoProvider");
  return context;
}
