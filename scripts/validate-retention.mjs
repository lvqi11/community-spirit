import assert from "node:assert/strict";
import { createRetentionMetrics } from "../src/retention.js";

const seasons = [
  { id: "season-a" },
  { id: "season-b" }
];
const profiles = [
  {
    id: "resident-a",
    retention: {
      prior_checkins_30d: 1,
      last_seen_days_ago: 4,
      current_streak: 1,
      season_visits: { "season-a": 1 }
    }
  },
  {
    id: "resident-b",
    retention: {
      prior_checkins_30d: 0,
      last_seen_days_ago: null,
      current_streak: 0,
      season_visits: { "season-b": 0 }
    }
  }
];
const progressByProfile = {
  "resident-a": {
    taskHistory: [{ task_id: "task-a" }],
    seasonCheckins: { "season-a": 1 }
  },
  "resident-b": {
    taskHistory: [],
    seasonCheckins: {}
  }
};

const metrics = createRetentionMetrics(profiles, progressByProfile, seasons);

assert.equal(metrics.firstParticipationRate, 50);
assert.equal(metrics.sevenDayReturnRate, 100);
assert.equal(metrics.averageStreak, 1);
assert.equal(metrics.byProfile["resident-a"].totalCheckins, 2);
assert.equal(metrics.byProfile["resident-a"].currentStreak, 2);
assert.equal(metrics.byProfile["resident-a"].returnedWithin7Days, true);
assert.equal(metrics.seasonComparison["season-a"], 2);
assert.equal(metrics.seasonComparison["season-b"], 0);

console.log("Validated retention metrics for first participation, 7-day return, streaks, and season comparison.");
