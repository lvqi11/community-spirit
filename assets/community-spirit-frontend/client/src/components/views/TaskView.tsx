/**
 * TaskView — Current task detail: route, check-in, reward, CACP contract
 * Layout: Left (map mini + route) | Center (Spirit Wallet + progress) | Right (CACP Contract)
 */

import { useDemo } from "@/contexts/DemoContext";
import { RESIDENTS, PULSES, CONTRACTS } from "@/lib/data";
import { MapPin, CheckCircle2, Award, Shield, Lock, Users, Cpu, Bot, FileText } from "lucide-react";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { PulseHighlight } from "@/components/PulseHighlight";

export function TaskView() {
  const { currentStep } = useDemo();

  const resident = RESIDENTS[0];
  const pulse = PULSES[0];
  const contract = CONTRACTS[0];

  const hasCheckedIn = currentStep >= 3;
  const hasEarnedXP = currentStep >= 4;
  const hasClaimed = currentStep >= 5;
  const hasContract = currentStep >= 6;

  return (
    <div className="flex-1 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden p-2 md:p-3 gap-2 md:gap-3 pb-16 md:pb-3">
      {/* Left — Mini Map + Route Progress */}
      <div className="w-full md:w-72 flex-shrink-0 flex flex-col gap-3 animate-float-in stagger-1">
        <div className="relative rounded-xl overflow-hidden border border-border/40 shadow-sm h-44 bg-white">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663559238234/2ALskXbJvjgJ5AR2zcTEFC/cs-hero-map-D9YJYctoYAV2GEuRvNskpN.webp"
            alt="Route Map"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute top-2 left-2">
            <span className="text-[9px] font-semibold uppercase tracking-wider bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm border border-border/30">
              Active Route
            </span>
          </div>
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M 20 30 Q 35 45 50 50 T 75 35" fill="none" stroke="oklch(0.55 0.15 155)" strokeWidth="0.6" strokeDasharray="2 1" opacity="0.8" />
            <circle cx="20" cy="30" r="2" fill="oklch(0.55 0.15 155)" />
            <circle cx="75" cy="35" r="2" fill="oklch(0.75 0.12 85)" />
            {hasCheckedIn && <circle cx="50" cy="50" r="2.5" fill="oklch(0.55 0.15 155)" stroke="white" strokeWidth="0.5" />}
          </svg>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-border/40 flex-1">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Quest Progress</span>
          <div className="mt-3 space-y-3">
            {[
              { label: "Matched to pulse", done: currentStep >= 1, icon: MapPin },
              { label: "Joined community pulse", done: currentStep >= 2, icon: Users },
              { label: "Arrival check-in", done: hasCheckedIn, icon: CheckCircle2 },
              { label: "Earned Spirit Points", done: hasEarnedXP, icon: Award },
              { label: "Claimed benefit", done: hasClaimed, icon: Award },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    item.done ? "bg-[var(--color-moss)] text-white" : "bg-muted text-muted-foreground"
                  }`}>
                    <Icon size={12} />
                  </div>
                  <span className={`text-xs ${item.done ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Center — Spirit Wallet */}
      <div className="flex-1 min-w-0 flex flex-col gap-3 animate-float-in stagger-2">
        <PulseHighlight active={hasEarnedXP} color="amber">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-border/40">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Spirit Wallet</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--color-amber-light)] text-[var(--color-amber)] font-semibold">RPG Rewards</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg">
              <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663559238234/2ALskXbJvjgJ5AR2zcTEFC/cs-spirit-orb-Cat6VFerKsxcsSqzCzqPhK.webp" alt="Spirit Orb" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-2xl font-bold font-[var(--font-display)] text-foreground">
                <AnimatedNumber value={hasEarnedXP ? resident.spiritPoints + pulse.xpReward : resident.spiritPoints} />
                <span className="text-sm font-normal text-muted-foreground ml-1">SP</span>
              </p>
              <p className="text-[11px] text-muted-foreground">
                {hasEarnedXP ? `+${pulse.xpReward} from ${pulse.title}` : "Complete quest to earn points"}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Level", value: String(resident.level) },
              { label: "Quests", value: String(resident.questsCompleted + (hasClaimed ? 1 : 0)) },
              { label: "Streak", value: "7d" },
            ].map((stat) => (
              <div key={stat.label} className="bg-[var(--color-canvas)] rounded-lg p-2.5 text-center">
                <p className="text-lg font-bold font-[var(--font-display)]">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
          {hasEarnedXP && !hasClaimed && (
            <div className="mt-4 p-3 rounded-lg border-2 border-dashed border-[var(--color-amber)] bg-[var(--color-amber-light)]/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold">Benefit Available</p>
                  <p className="text-[10px] text-muted-foreground">Free coffee at Moss Café</p>
                </div>
                <button className="px-3 py-1.5 rounded-lg bg-[var(--color-amber)] text-white text-[11px] font-semibold hover:opacity-90 transition-opacity active:scale-95">
                  Claim
                </button>
              </div>
            </div>
          )}
          {hasClaimed && (
            <div className="mt-4 p-3 rounded-lg border border-[var(--color-moss)]/30 bg-[var(--color-moss)]/5">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[var(--color-moss)]" />
                <span className="text-xs font-medium text-[var(--color-moss)]">Benefit claimed: Free coffee at Moss Café</span>
              </div>
            </div>
          )}
        </div>
        </PulseHighlight>

        {/* Task Summary */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-border/40 flex-1">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Current Quest</span>
          <div className="mt-3">
            <h3 className="text-base font-semibold font-[var(--font-display)]">{pulse.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{pulse.location} · {pulse.timeSlot}</p>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-50 text-green-600 font-medium">{pulse.type}</span>
              <span className="text-[10px] text-muted-foreground">{pulse.participants}/{pulse.maxParticipants} participants</span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1">
            {RESIDENTS.slice(0, Math.min(pulse.participants, 4)).map((r) => (
              <div key={r.id} className="w-7 h-7 rounded-full bg-[var(--color-moss)]/10 flex items-center justify-center text-[10px] font-semibold text-[var(--color-moss)] border-2 border-white">
                {r.avatar}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — CACP Task Contract */}
      <div className="w-full md:w-80 flex-shrink-0 flex flex-col gap-3 animate-float-in stagger-3">
        <PulseHighlight active={hasContract} color="moss">
        <div className={`bg-white rounded-xl shadow-sm border overflow-hidden flex-1 flex flex-col transition-all duration-500 ${
          hasContract ? "border-[var(--color-moss)]/40" : "border-border/40"
        }`}>
          <div className={`h-1 w-full transition-all duration-500 ${hasContract ? "bg-[var(--color-moss)]" : "bg-border"}`} />
          <div className="p-4 flex-1 overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <FileText size={10} /> CACP Task Contract
              </span>
              <span className={`text-[9px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                hasContract ? "bg-[var(--color-moss)]/10 text-[var(--color-moss)]" : "bg-muted text-muted-foreground"
              }`}>
                {hasContract ? "Active" : "Pending"}
              </span>
            </div>

            {hasContract ? (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold font-[var(--font-display)]">{contract.title}</h3>
                <div className="space-y-2">
                  {[
                    { label: "People", value: contract.people.join(", "), icon: Users },
                    { label: "Place", value: contract.place, icon: MapPin },
                    { label: "AI Agent", value: contract.agent, icon: Cpu },
                    { label: "Operator", value: contract.operator, icon: Shield },
                    { label: "Robot-ready", value: contract.robotReady ? "Yes (approval required)" : "No", icon: Bot },
                  ].map((field) => {
                    const Icon = field.icon;
                    return (
                      <div key={field.label} className="flex items-start gap-2 p-2 rounded-lg bg-[var(--color-canvas)]">
                        <Icon size={12} className="text-[var(--color-moss)] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{field.label}</p>
                          <p className="text-xs text-foreground">{field.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="pt-2 border-t border-border/40">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1">
                    <Lock size={9} /> Guardrails
                  </p>
                  <div className="space-y-1">
                    {contract.guardrails.map((g, i) => (
                      <p key={i} className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-[var(--color-moss)] flex-shrink-0" />
                        {g}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 p-2 rounded-lg bg-[var(--color-moss)]/5 border border-[var(--color-moss)]/20">
                    <p className="text-[9px] font-medium uppercase tracking-wider text-[var(--color-moss)]">Consent</p>
                    <p className="text-[11px] font-medium capitalize">{contract.consent}</p>
                  </div>
                  <div className="flex-1 p-2 rounded-lg bg-accent border border-border/30">
                    <p className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground">Privacy</p>
                    <p className="text-[11px] font-medium font-mono">{contract.privacy}</p>
                  </div>
                </div>
                <div className="pt-2 border-t border-border/40">
                  <p className="text-[10px] font-mono text-muted-foreground">
                    ID: {contract.id} · Created: {new Date(contract.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663559238234/2ALskXbJvjgJ5AR2zcTEFC/cs-contract-illustration-84ACtJ7oSnsiyribXyM8hN.webp"
                  alt="CACP Contract"
                  className="w-32 h-auto opacity-60 mb-4"
                />
                <p className="text-xs text-muted-foreground">Complete quest steps to generate CACP task contract</p>
                <p className="text-[10px] text-muted-foreground mt-1">Steps 1-5 required</p>
              </div>
            )}
          </div>
        </div>
        </PulseHighlight>
      </div>
    </div>
  );
}
