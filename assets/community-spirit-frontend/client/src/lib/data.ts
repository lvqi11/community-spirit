// ============================================================
// SYNTHETIC / FICTIONAL DATA ONLY
// All residents, locations, and events are entirely fabricated.
// ============================================================

export interface Resident {
  id: string;
  name: string;
  avatar: string;
  level: number;
  spiritPoints: number;
  questsCompleted: number;
  status: "idle" | "matched" | "en-route" | "checked-in" | "rewarded";
}

export interface CommunityPulse {
  id: string;
  title: string;
  type: "social" | "wellness" | "creative" | "eco";
  location: string;
  participants: number;
  maxParticipants: number;
  timeSlot: string;
  xpReward: number;
  status: "active" | "upcoming" | "completed";
}

export interface POI {
  id: string;
  name: string;
  type: "cafe" | "park" | "gym" | "garden" | "hub" | "library";
  x: number;
  y: number;
  robotReady: boolean;
}

export interface CACPContract {
  id: string;
  title: string;
  people: string[];
  place: string;
  agent: string;
  operator: string;
  robotReady: boolean;
  guardrails: string[];
  consent: "granted" | "pending";
  privacy: "synthetic-only";
  status: "draft" | "active" | "completed" | "handoff";
  createdAt: string;
}

export interface OpsTask {
  id: string;
  title: string;
  type: "conversion" | "handoff" | "review" | "robot-prep";
  priority: "low" | "medium" | "high";
  status: "queued" | "in-progress" | "approval-needed" | "done";
  assignee: string;
}

// --- Mock Data ---

export const RESIDENTS: Resident[] = [
  { id: "r1", name: "Mei Lin", avatar: "ML", level: 12, spiritPoints: 2450, questsCompleted: 34, status: "idle" },
  { id: "r2", name: "Alex Park", avatar: "AP", level: 8, spiritPoints: 1280, questsCompleted: 19, status: "idle" },
  { id: "r3", name: "Jordan Wu", avatar: "JW", level: 15, spiritPoints: 3100, questsCompleted: 47, status: "idle" },
  { id: "r4", name: "Sam Chen", avatar: "SC", level: 6, spiritPoints: 890, questsCompleted: 12, status: "idle" },
];

export const PULSES: CommunityPulse[] = [
  { id: "p1", title: "Morning Garden Walk", type: "wellness", location: "Jade Garden", participants: 4, maxParticipants: 8, timeSlot: "07:30 - 08:15", xpReward: 120, status: "active" },
  { id: "p2", title: "Seed Library Exchange", type: "eco", location: "Community Hub", participants: 6, maxParticipants: 12, timeSlot: "10:00 - 11:00", xpReward: 150, status: "upcoming" },
  { id: "p3", title: "Sketch & Sip", type: "creative", location: "Moss Café", participants: 3, maxParticipants: 6, timeSlot: "14:00 - 15:30", xpReward: 180, status: "upcoming" },
  { id: "p4", title: "Sunset Tai Chi", type: "wellness", location: "Lakeside Pavilion", participants: 7, maxParticipants: 10, timeSlot: "17:30 - 18:15", xpReward: 100, status: "upcoming" },
];

export const POIS: POI[] = [
  { id: "poi1", name: "Jade Garden", type: "garden", x: 25, y: 35, robotReady: false },
  { id: "poi2", name: "Community Hub", type: "hub", x: 50, y: 45, robotReady: true },
  { id: "poi3", name: "Moss Café", type: "cafe", x: 70, y: 30, robotReady: false },
  { id: "poi4", name: "Lakeside Pavilion", type: "park", x: 40, y: 70, robotReady: false },
  { id: "poi5", name: "Fitness Grove", type: "gym", x: 80, y: 60, robotReady: true },
  { id: "poi6", name: "Quiet Library", type: "library", x: 15, y: 60, robotReady: false },
];

export const CONTRACTS: CACPContract[] = [
  {
    id: "cacp-001",
    title: "Morning Garden Walk — Task Contract",
    people: ["Mei Lin", "Alex Park"],
    place: "Jade Garden",
    agent: "Spirit Guide v0.3",
    operator: "Green Thumb Ops",
    robotReady: false,
    guardrails: ["No real identity data", "Synthetic location only", "Consent revocable"],
    consent: "granted",
    privacy: "synthetic-only",
    status: "active",
    createdAt: "2025-06-17T07:25:00Z",
  },
  {
    id: "cacp-002",
    title: "Seed Library Exchange — Task Contract",
    people: ["Jordan Wu", "Sam Chen", "Mei Lin"],
    place: "Community Hub",
    agent: "Eco Matcher v0.2",
    operator: "Hub Coordinator",
    robotReady: true,
    guardrails: ["Robot delivery requires approval", "No payment processing", "Fictional inventory"],
    consent: "pending",
    privacy: "synthetic-only",
    status: "draft",
    createdAt: "2025-06-17T09:50:00Z",
  },
];

export const OPS_TASKS: OpsTask[] = [
  { id: "ot1", title: "Convert Morning Walk pulse → CACP contract", type: "conversion", priority: "high", status: "in-progress", assignee: "Spirit Guide v0.3" },
  { id: "ot2", title: "Review robot-ready POI access for Hub", type: "review", priority: "medium", status: "approval-needed", assignee: "Hub Coordinator" },
  { id: "ot3", title: "Handoff Seed Exchange to delivery bot", type: "handoff", priority: "high", status: "queued", assignee: "Eco Matcher v0.2" },
  { id: "ot4", title: "Prepare Fitness Grove robot patrol route", type: "robot-prep", priority: "low", status: "queued", assignee: "Patrol Agent v0.1" },
  { id: "ot5", title: "Convert Sketch & Sip pulse → contract", type: "conversion", priority: "medium", status: "queued", assignee: "Spirit Guide v0.3" },
];

export const STATS = {
  activePulses: 4,
  totalResidents: 128,
  spiritPointsToday: 4820,
  contractsGenerated: 23,
  robotReadyPOIs: 2,
  operatorApprovals: 5,
};
