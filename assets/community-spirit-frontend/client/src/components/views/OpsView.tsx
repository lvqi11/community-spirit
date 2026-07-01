/**
 * OpsView — Operator Console / Community Ops Loop
 * Layout: Left (Pulse Conversion metrics) | Center (Workflow Queue) | Right (CACP Handoff panel)
 * NOT a property dashboard — this is a community ops loop
 */

import { useDemo } from "@/contexts/DemoContext";
import { OPS_TASKS, CONTRACTS, STATS } from "@/lib/data";
import { ArrowRight, Bot, CheckCircle2, AlertTriangle, Clock, Shield, Zap, Activity, FileCheck } from "lucide-react";
import { CACPFlowDiagram } from "@/components/CACPFlowDiagram";

export function OpsView() {
  const { currentStep } = useDemo();

  const isHandoff = currentStep >= 7;
  const hasContract = currentStep >= 6;

  return (
    <div className="flex-1 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden p-2 md:p-3 gap-2 md:gap-3 pb-16 md:pb-3">
      {/* Left — Community Pulse Conversion */}
      <div className="w-full md:w-72 flex-shrink-0 flex flex-col gap-3 animate-float-in stagger-1">
        {/* Conversion Metrics */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-border/40">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Community Pulse Conversion</span>
          <div className="mt-3 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Pulses Today</span>
              <span className="text-sm font-bold font-[var(--font-display)]">{STATS.activePulses}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Contracts Generated</span>
              <span className="text-sm font-bold font-[var(--font-display)] text-[var(--color-moss)]">{STATS.contractsGenerated}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Robot-ready POIs</span>
              <span className="text-sm font-bold font-[var(--font-display)]">{STATS.robotReadyPOIs}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Approvals Pending</span>
              <span className="text-sm font-bold font-[var(--font-display)] text-[var(--color-amber)]">{STATS.operatorApprovals}</span>
            </div>
          </div>
          {/* Conversion funnel mini */}
          <div className="mt-4 pt-3 border-t border-border/40">
            <div className="flex items-center gap-2 text-[10px]">
              <div className="flex-1 text-center">
                <div className="h-8 bg-[var(--color-moss)]/10 rounded flex items-center justify-center">
                  <Activity size={12} className="text-[var(--color-moss)]" />
                </div>
                <span className="text-muted-foreground mt-1 block">Pulse</span>
              </div>
              <ArrowRight size={10} className="text-muted-foreground flex-shrink-0" />
              <div className="flex-1 text-center">
                <div className="h-8 bg-[var(--color-moss)]/15 rounded flex items-center justify-center">
                  <FileCheck size={12} className="text-[var(--color-moss)]" />
                </div>
                <span className="text-muted-foreground mt-1 block">Contract</span>
              </div>
              <ArrowRight size={10} className="text-muted-foreground flex-shrink-0" />
              <div className="flex-1 text-center">
                <div className="h-8 bg-[var(--color-amber-light)] rounded flex items-center justify-center">
                  <Bot size={12} className="text-[var(--color-amber)]" />
                </div>
                <span className="text-muted-foreground mt-1 block">Handoff</span>
              </div>
            </div>
          </div>
        </div>

        {/* Risk & Access Review */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-border/40 flex-1">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Risk & Access Review</span>
          <div className="mt-3 space-y-2">
            <div className="p-2.5 rounded-lg bg-[var(--color-amber-light)]/30 border border-[var(--color-amber)]/20">
              <div className="flex items-center gap-2">
                <AlertTriangle size={12} className="text-[var(--color-amber)]" />
                <span className="text-[11px] font-medium">Robot access requires operator approval</span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1 ml-5">Hub POI — Seed Exchange delivery</p>
            </div>
            <div className="p-2.5 rounded-lg bg-accent border border-border/30">
              <div className="flex items-center gap-2">
                <Shield size={12} className="text-muted-foreground" />
                <span className="text-[11px] font-medium">All data synthetic — no real resident info</span>
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-accent border border-border/30">
              <div className="flex items-center gap-2">
                <Shield size={12} className="text-muted-foreground" />
                <span className="text-[11px] font-medium">Consent model: opt-in per contract</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Center — Workflow Queue */}
      <div className="flex-1 min-w-0 flex flex-col gap-3 animate-float-in stagger-2">
        {/* CACP Protocol Flow Diagram */}
        <CACPFlowDiagram />

        <div className="bg-white rounded-xl p-4 shadow-sm border border-border/40 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Operator Console — Workflow Queue</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--color-moss)]/10 text-[var(--color-moss)] font-semibold">
              {OPS_TASKS.length} tasks
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2">
            {OPS_TASKS.map((task) => (
              <div
                key={task.id}
                className={`p-3 rounded-lg border transition-all duration-200 ${
                  task.status === "approval-needed"
                    ? "border-[var(--color-amber)]/40 bg-[var(--color-amber-light)]/10"
                    : task.status === "in-progress"
                      ? "border-[var(--color-moss)]/30 bg-[var(--color-moss)]/5"
                      : "border-border/30 hover:border-border"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {task.status === "approval-needed" ? (
                      <AlertTriangle size={13} className="text-[var(--color-amber)]" />
                    ) : task.status === "in-progress" ? (
                      <Zap size={13} className="text-[var(--color-moss)]" />
                    ) : task.status === "done" ? (
                      <CheckCircle2 size={13} className="text-[var(--color-moss)]" />
                    ) : (
                      <Clock size={13} className="text-muted-foreground" />
                    )}
                    <span className="text-xs font-medium">{task.title}</span>
                  </div>
                  <span className={`text-[9px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                    task.priority === "high" ? "bg-red-50 text-red-500" :
                    task.priority === "medium" ? "bg-amber-50 text-amber-600" :
                    "bg-gray-50 text-gray-500"
                  }`}>
                    {task.priority}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] text-muted-foreground">Assignee: {task.assignee}</span>
                  <span className={`text-[10px] font-medium capitalize ${
                    task.status === "approval-needed" ? "text-[var(--color-amber)]" :
                    task.status === "in-progress" ? "text-[var(--color-moss)]" :
                    "text-muted-foreground"
                  }`}>
                    {task.status.replace("-", " ")}
                  </span>
                </div>
                {task.status === "approval-needed" && (
                  <div className="mt-2 flex gap-2">
                    <button className="flex-1 h-7 rounded-md bg-[var(--color-moss)] text-white text-[10px] font-semibold hover:bg-[var(--color-moss-dark)] transition-colors active:scale-[0.98]">
                      Approve
                    </button>
                    <button className="flex-1 h-7 rounded-md border border-border text-[10px] font-medium hover:bg-accent transition-colors active:scale-[0.98]">
                      Review Details
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — CACP Handoff Panel */}
      <div className="w-full md:w-80 flex-shrink-0 flex flex-col gap-3 animate-float-in stagger-3">
        <div className={`bg-white rounded-xl shadow-sm border overflow-hidden flex-1 flex flex-col transition-all duration-500 ${
          isHandoff ? "border-[var(--color-amber)]/40" : "border-border/40"
        }`}>
          <div className={`h-1 w-full transition-all duration-500 ${isHandoff ? "bg-[var(--color-amber)]" : "bg-border"}`} />
          <div className="p-4 flex-1 overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Bot size={10} /> CACP Handoff
              </span>
              <span className={`text-[9px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                isHandoff ? "bg-[var(--color-amber)]/10 text-[var(--color-amber)]" : "bg-muted text-muted-foreground"
              }`}>
                {isHandoff ? "Robot-ready" : "Waiting"}
              </span>
            </div>

            {isHandoff ? (
              <div className="space-y-3">
                <div className="p-3 rounded-xl border-2 border-[var(--color-amber)] bg-[var(--color-amber-light)]/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Bot size={16} className="text-[var(--color-amber)]" />
                    <span className="text-xs font-semibold">Operator / Robot-ready Handoff</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Contract {CONTRACTS[0].id} is ready for physical-AI handoff. Operator approval granted.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="p-2 rounded-lg bg-[var(--color-canvas)]">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Contract</p>
                    <p className="text-xs font-mono">{CONTRACTS[0].id}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-[var(--color-canvas)]">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Operator</p>
                    <p className="text-xs">{CONTRACTS[0].operator}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-[var(--color-canvas)]">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Robot Status</p>
                    <p className="text-xs text-[var(--color-amber)] font-medium">Ready — awaiting dispatch</p>
                  </div>
                  <div className="p-2 rounded-lg bg-[var(--color-canvas)]">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Safety Check</p>
                    <p className="text-xs text-[var(--color-moss)] font-medium flex items-center gap-1">
                      <CheckCircle2 size={10} /> Passed — synthetic environment only
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-border/40">
                  <div className="p-2.5 rounded-lg bg-red-50/50 border border-red-200/50">
                    <p className="text-[10px] font-semibold text-red-600 flex items-center gap-1">
                      <AlertTriangle size={10} /> Important
                    </p>
                    <p className="text-[10px] text-red-500 mt-0.5">
                      Approval required before real robot operation. This demo uses synthetic data only.
                    </p>
                  </div>
                </div>

                <button className="w-full h-9 rounded-lg bg-[var(--color-amber)] text-white text-xs font-semibold hover:opacity-90 transition-opacity active:scale-[0.98] flex items-center justify-center gap-2">
                  <Bot size={14} /> Dispatch Robot (Demo)
                </button>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
                <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                  <Bot size={24} className="text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground">Waiting for CACP contract generation</p>
                <p className="text-[10px] text-muted-foreground mt-1">Complete step 6 to enable handoff</p>
              </div>
            )}
          </div>
        </div>

        {/* Robot Readiness */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-border/40">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Robot-ready Readiness</span>
          <div className="mt-3 space-y-2">
            {[
              { label: "Community Hub", ready: true },
              { label: "Fitness Grove", ready: true },
              { label: "Jade Garden", ready: false },
              { label: "Moss Café", ready: false },
            ].map((poi) => (
              <div key={poi.label} className="flex items-center justify-between">
                <span className="text-[11px]">{poi.label}</span>
                <span className={`text-[10px] font-medium ${poi.ready ? "text-[var(--color-moss)]" : "text-muted-foreground"}`}>
                  {poi.ready ? "Ready" : "Not ready"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
