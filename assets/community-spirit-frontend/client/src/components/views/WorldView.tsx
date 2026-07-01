/**
 * WorldView — The community world map + Live Pulse panel
 * Layout: Left panel (agent/resident list) | Center (spatial map) | Right (live pulses)
 * Design: Terrarium aesthetic, map is the hero
 */

import { useDemo } from "@/contexts/DemoContext";
import { RESIDENTS, PULSES, POIS } from "@/lib/data";
import { MapPin, Users, Zap, Clock, Bot, Compass } from "lucide-react";
import { PulseHighlight } from "@/components/PulseHighlight";

export function WorldView() {
  const { currentStep } = useDemo();

  // Simulate state changes based on demo step
  const matchedResident = currentStep >= 1 ? RESIDENTS[0] : null;
  const activePulse = currentStep >= 1 ? PULSES[0] : null;
  const hasJoined = currentStep >= 2;

  return (
    <div className="flex-1 flex overflow-hidden p-2 md:p-3 gap-2 md:gap-3 pb-16 md:pb-3">
      {/* Left Panel — Residents & Agents (hidden on mobile) */}
      <div className="hidden lg:flex w-64 flex-shrink-0 flex-col gap-3 animate-float-in stagger-1">
        {/* Resident Profile Card */}
        <PulseHighlight active={currentStep === 1}>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-border/40">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Active Resident</span>
          </div>
          {matchedResident ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--color-moss)]/10 flex items-center justify-center text-sm font-semibold text-[var(--color-moss)]">
                {matchedResident.avatar}
              </div>
              <div>
                <p className="text-sm font-medium">{matchedResident.name}</p>
                <p className="text-[11px] text-muted-foreground">Lv.{matchedResident.level} · {matchedResident.spiritPoints} SP</p>
              </div>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground italic">No resident selected</p>
          )}
          {matchedResident && (
            <div className="mt-3 pt-3 border-t border-border/40">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">Quests Done</span>
                <span className="font-medium">{matchedResident.questsCompleted}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] mt-1">
                <span className="text-muted-foreground">Status</span>
                <span className={`font-medium capitalize ${
                  hasJoined ? "text-[var(--color-moss)]" : "text-[var(--color-amber)]"
                }`}>
                  {hasJoined ? "joined" : currentStep >= 1 ? "matched" : "idle"}
                </span>
              </div>
            </div>
          )}
        </div>

        </PulseHighlight>

        {/* Community Agent Card */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-border/40">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Community Agent</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--color-pulse)]/10 flex items-center justify-center">
              <Zap size={16} className="text-[var(--color-pulse)]" />
            </div>
            <div>
              <p className="text-sm font-medium">Spirit Guide v0.3</p>
              <p className="text-[11px] text-muted-foreground">Matching · Routing · Rewards</p>
            </div>
          </div>
          <div className="mt-3 flex gap-1.5">
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--color-moss)]/10 text-[var(--color-moss)] font-medium">CACP-enabled</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent text-muted-foreground font-medium">Synthetic</span>
          </div>
        </div>

        {/* Task Queue */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-border/40 flex-1 overflow-hidden">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Pulse Queue</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--color-moss)]/10 text-[var(--color-moss)] font-semibold">{PULSES.length}</span>
          </div>
          <div className="space-y-2 overflow-y-auto max-h-[200px]">
            {PULSES.map((pulse) => (
              <div
                key={pulse.id}
                className={`p-2.5 rounded-lg border transition-all duration-200 ${
                  activePulse?.id === pulse.id
                    ? "border-[var(--color-moss)]/40 bg-[var(--color-moss)]/5 shadow-sm"
                    : "border-border/30 hover:border-border"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium truncate">{pulse.title}</span>
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                    pulse.status === "active" ? "bg-[var(--color-pulse)] animate-pulse-glow" : "bg-muted"
                  }`} />
                </div>
                <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-0.5"><MapPin size={9} />{pulse.location}</span>
                  <span className="flex items-center gap-0.5"><Users size={9} />{pulse.participants}/{pulse.maxParticipants}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Center — Spatial Community Map */}
      <div className="flex-1 min-w-0 flex flex-col gap-3 animate-float-in stagger-2">
        <div className="flex-1 relative rounded-2xl overflow-hidden border border-border/40 shadow-sm bg-white">
          {/* Map Header */}
          <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm border border-border/30">
              Spatial Community Map
            </span>
            {currentStep >= 1 && (
              <span className="text-[10px] font-medium text-[var(--color-moss)] bg-[var(--color-moss)]/10 backdrop-blur-sm px-2 py-1 rounded-full">
                Route Active
              </span>
            )}
          </div>

          {/* Map Image */}
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663559238234/2ALskXbJvjgJ5AR2zcTEFC/cs-hero-map-D9YJYctoYAV2GEuRvNskpN.webp"
            alt="Spatial Community Map"
            className="w-full h-full object-cover"
          />

          {/* POI Markers Overlay */}
          <div className="absolute inset-0">
            {POIS.map((poi) => (
              <div
                key={poi.id}
                className="absolute group"
                style={{ left: `${poi.x}%`, top: `${poi.y}%`, transform: "translate(-50%, -50%)" }}
              >
                <div className={`
                  w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200
                  ${poi.robotReady
                    ? "bg-[var(--color-amber)] shadow-md shadow-[var(--color-amber)]/30"
                    : "bg-white shadow-md border border-border/50"
                  }
                  group-hover:scale-125
                `}>
                  {poi.robotReady ? (
                    <Bot size={11} className="text-white" />
                  ) : (
                    <MapPin size={11} className="text-[var(--color-moss)]" />
                  )}
                </div>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-foreground text-white text-[10px] px-2 py-1 rounded whitespace-nowrap">
                    {poi.name}
                    {poi.robotReady && <span className="ml-1 text-[var(--color-amber-light)]">⚡ Robot-ready</span>}
                  </div>
                </div>
              </div>
            ))}

            {/* Animated route line (visible when step >= 1) */}
            {currentStep >= 1 && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path
                  d="M 25 35 Q 35 40 50 45"
                  fill="none"
                  stroke="oklch(0.55 0.15 155)"
                  strokeWidth="0.4"
                  strokeDasharray="1.5 1"
                  className="animate-[dash_3s_linear_infinite]"
                  opacity="0.7"
                />
              </svg>
            )}
          </div>

          {/* Map Legend */}
          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm border border-border/30">
            <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-white border border-border" /> POI
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[var(--color-amber)]" /> Robot-ready
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-0.5 bg-[var(--color-moss)] rounded" /> Route
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel — Live Community Pulse (hidden on small screens) */}
      <div className="hidden xl:flex w-72 flex-shrink-0 flex-col gap-3 animate-float-in stagger-3">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-border/40 flex-1 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Live Community Pulse</span>
            <span className="w-2 h-2 rounded-full bg-[var(--color-pulse)] animate-pulse-glow" />
          </div>

          {/* Active Pulse Detail */}
          {activePulse && (
            <div className={`p-3 rounded-xl border-2 transition-all duration-300 mb-3 ${
              hasJoined
                ? "border-[var(--color-moss)] bg-[var(--color-moss)]/5"
                : "border-[var(--color-amber)] bg-[var(--color-amber-light)]/30"
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-semibold uppercase tracking-wider ${
                  hasJoined ? "text-[var(--color-moss)]" : "text-[var(--color-amber)]"
                }`}>
                  {hasJoined ? "Joined" : "Matched"}
                </span>
                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <Clock size={9} />{activePulse.timeSlot}
                </span>
              </div>
              <h3 className="text-sm font-semibold mb-1">{activePulse.title}</h3>
              <p className="text-[11px] text-muted-foreground mb-2">{activePulse.location}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Users size={10} />
                  <span>{activePulse.participants}/{activePulse.maxParticipants} joined</span>
                </div>
                <span className="text-[11px] font-semibold text-[var(--color-amber)] flex items-center gap-0.5">
                  +{activePulse.xpReward} SP
                </span>
              </div>
              {/* Progress bar */}
              <div className="mt-2 h-1 rounded-full bg-border overflow-hidden">
                <div
                  className="h-full rounded-full bg-[var(--color-moss)] transition-all duration-500"
                  style={{ width: `${(activePulse.participants / activePulse.maxParticipants) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Other Pulses */}
          <div className="space-y-2 overflow-y-auto flex-1">
            {PULSES.slice(1).map((pulse) => (
              <div key={pulse.id} className="p-2.5 rounded-lg border border-border/30 hover:border-border transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">{pulse.title}</span>
                  <span className={`text-[9px] font-medium uppercase px-1.5 py-0.5 rounded ${
                    pulse.type === "wellness" ? "bg-green-50 text-green-600" :
                    pulse.type === "eco" ? "bg-emerald-50 text-emerald-600" :
                    pulse.type === "creative" ? "bg-purple-50 text-purple-600" :
                    "bg-blue-50 text-blue-600"
                  }`}>
                    {pulse.type}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
                  <span>{pulse.location}</span>
                  <span>·</span>
                  <span>{pulse.timeSlot}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Match CTA */}
          {!hasJoined && (
            <button className="mt-3 w-full h-9 rounded-lg bg-[var(--color-moss)] text-white text-xs font-semibold hover:bg-[var(--color-moss-dark)] transition-colors active:scale-[0.98] duration-150 flex items-center justify-center gap-1.5">
              <Compass size={13} /> Match to Nearest Pulse
            </button>
          )}
          {hasJoined && (
            <div className="mt-3 w-full h-9 rounded-lg bg-[var(--color-moss)]/10 border border-[var(--color-moss)]/20 text-[var(--color-moss)] text-xs font-semibold flex items-center justify-center gap-1.5">
              <MapPin size={13} /> En route to {activePulse?.location}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
