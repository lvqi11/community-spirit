/**
 * AppShell — Living Terrarium Layout (Responsive)
 * Desktop: Left icon rail (56px) + header + content + demo bar
 * Mobile: Top header + content + bottom nav (combined with demo)
 */

import { type ReactNode } from "react";
import { useDemo, type ViewTab } from "@/contexts/DemoContext";
import { STATS } from "@/lib/data";
import { Globe, ListChecks, Settings2, Sparkles } from "lucide-react";

const NAV_ITEMS: { id: ViewTab; label: string; icon: typeof Globe }[] = [
  { id: "world", label: "World", icon: Globe },
  { id: "task", label: "Task", icon: ListChecks },
  { id: "ops", label: "Ops", icon: Settings2 },
];

export function AppShell({ children }: { children: ReactNode }) {
  const { activeView, setActiveView } = useDemo();

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-[var(--color-canvas)]">
      {/* Left Icon Rail — hidden on mobile */}
      <aside className="hidden md:flex w-14 flex-shrink-0 flex-col items-center py-4 gap-2 border-r border-border/50 bg-white/60 backdrop-blur-sm">
        {/* Logo */}
        <div className="w-9 h-9 mb-4">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663559238234/2ALskXbJvjgJ5AR2zcTEFC/cs-logo-3hrZqXbRrqx5WKptCsv7qF.webp"
            alt="Community Spirit"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Nav Items */}
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`
                w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200
                ${isActive
                  ? "bg-[var(--color-moss)] text-white shadow-md shadow-[var(--color-moss)]/20"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }
              `}
              title={item.label}
            >
              <Icon size={18} />
            </button>
          );
        })}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Spirit Points indicator */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-full bg-[var(--color-amber-light)] flex items-center justify-center">
            <Sparkles size={14} className="text-[var(--color-amber)]" />
          </div>
          <span className="text-[10px] font-medium text-muted-foreground">{(STATS.spiritPointsToday / 1000).toFixed(1)}k</span>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-12 flex-shrink-0 flex items-center justify-between px-3 md:px-5 border-b border-border/50 bg-white/40 backdrop-blur-sm">
          <div className="flex items-center gap-2 md:gap-3">
            {/* Mobile logo */}
            <div className="w-7 h-7 md:hidden flex-shrink-0">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663559238234/2ALskXbJvjgJ5AR2zcTEFC/cs-logo-3hrZqXbRrqx5WKptCsv7qF.webp"
                alt="Community Spirit"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-sm md:text-base font-semibold font-[var(--font-display)] text-foreground tracking-tight">
              Community Spirit
            </h1>
            <span className="hidden sm:inline text-[11px] font-medium uppercase tracking-wider text-[var(--color-moss)] bg-[var(--color-moss)]/10 px-2 py-0.5 rounded-full">
              Community Life RPG
            </span>
          </div>
          <div className="flex items-center gap-2 md:gap-4 text-[10px] md:text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-pulse)] animate-pulse-glow" />
              <span className="hidden sm:inline">{STATS.activePulses} Live Pulses</span>
              <span className="sm:hidden">{STATS.activePulses}</span>
            </span>
            <span className="hidden md:inline">{STATS.totalResidents} Residents</span>
            <span className="hidden lg:inline text-[10px] px-2 py-0.5 rounded border border-border bg-white/60 font-mono">
              SYNTHETIC DATA ONLY
            </span>
          </div>
        </header>

        {/* Content */}
        {children}
      </div>

      {/* Mobile Bottom Nav — visible only on mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 h-14 border-t border-border/50 bg-white/90 backdrop-blur-md flex items-center justify-around px-4">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-all duration-200 ${
                isActive
                  ? "text-[var(--color-moss)]"
                  : "text-muted-foreground"
              }`}
            >
              <Icon size={18} />
              <span className="text-[9px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
