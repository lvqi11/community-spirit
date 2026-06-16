# Community Task Contract

This document is part of the CACP draft:

```text
CACP: Community AI Collaboration Protocol
```

Community Spirit needs a contract layer between human intent and physical-AI execution.

The contract exists because a community task is not only an action. It is a social agreement:

```text
Someone wants something to happen
at a real place
under a permission boundary
with a clear interaction mode
and a fallback if uncertainty appears.
```

## Purpose

The Community Task Contract defines the shared language between:

- residents;
- families;
- elders;
- property operators;
- AI agents;
- future robots;
- pilot reviewers.

It should make the task understandable before it becomes automation.

## Contract Shape

```json
{
  "contract_id": "ctc-evening-basketball-lin",
  "intent": "activate an underused basketball court through low-pressure participation",
  "place": {
    "poi_id": "poi-basketball-court",
    "route_id": "route-building-3-to-basketball-court"
  },
  "actor": "resident",
  "interaction_mode": "parallel",
  "permission": {
    "level": "public_activity",
    "approved_by": "community_ops",
    "human_review_required": false,
    "resident_notice_required": false
  },
  "visibility": "participant_and_operator",
  "risk_level": "low",
  "resident_touch": "optional",
  "privacy_boundary": {
    "real_identity_required": false,
    "camera_feed_allowed": false,
    "raw_video_storage_allowed": false,
    "public_profile_required": false
  },
  "fallback": {
    "owner": "operator",
    "condition": "low turnout, safety issue, or resident discomfort"
  },
  "feedback": {
    "retention_signal": "7_day_return",
    "trust_signal": "accepted_low_pressure_activity",
    "acceptance_signal": "no interruption reported"
  },
  "data_policy": "fictional_or_synthetic_only"
}
```

## Required Fields

- `contract_id`: stable contract identifier.
- `intent`: why the task exists in human terms.
- `place`: linked POI and route context.
- `actor`: primary executor or participant.
- `interaction_mode`: social mode of the task.
- `permission`: who or what authorizes the task.
- `visibility`: who can see task state and result.
- `risk_level`: social, privacy, safety, or operational risk.
- `resident_touch`: whether residents are directly affected.
- `privacy_boundary`: what data must not be captured or exposed.
- `fallback`: who handles uncertainty, failure, or discomfort.
- `feedback`: how retention, trust, and acceptance are measured.
- `data_policy`: public demos must stay fictional or synthetic.

## Interaction Modes

Community Spirit should avoid one generic "social" mode.

The contract should support:

- `solo`: one resident completes the task alone.
- `parallel`: residents share place or timing without forced conversation.
- `buddy`: two or three residents opt into light companionship.
- `family`: household or parent-child participation.
- `elder_friendly`: slower pace, clearer route, lower noise, optional helper.
- `helper`: a resident contributes to shared maintenance or neighbor support.
- `operator`: property staff reviews, coordinates, or executes.
- `robot_assist`: a robot assists only after approval and safety checks.

## Actor Types

Suggested values:

- `resident`
- `family`
- `elder`
- `operator`
- `ai_agent`
- `robot`
- `mixed`

## Permission Levels

Suggested values:

- `resident_initiated`
- `public_activity`
- `operator_approved`
- `human_review_required`
- `restricted`
- `not_allowed`

## Visibility Levels

Suggested values:

- `private`
- `participant_only`
- `participant_and_operator`
- `operator_only`
- `community_summary`

## Risk Levels

Suggested values:

- `low`
- `medium`
- `high`

The prototype should avoid high-risk real-world claims. High-risk contracts should require human review and should not be connected to real devices in the public demo.

## Feedback Signals

Retention asks whether people come back.

Trust and acceptance ask whether physical AI should be allowed deeper into community life.

Candidate signals:

- `accepted_recommendation`
- `joined_low_pressure_activity`
- `returned_within_7_days`
- `requested_human_review`
- `accepted_ai_guidance`
- `accepted_robot_assist`
- `reported_discomfort`
- `reported_belonging`
- `reported_safety_improvement`

## Relation to Current Prototype

The current data model already contains early pieces of this contract:

- POI: where the task happens.
- Route: how movement happens.
- Task: why movement matters.
- Pulse: why now and for whom.
- Lifecycle: whether joining, leaving, or check-in is allowed.
- Benefit: what value or right is unlocked.
- Retention: whether the resident comes back.
- World Ops: how operators review the loop.
- Robot-ready export: how the task could later leave the product boundary.

The next technical step is to make the contract explicit in data and validation without using real personal data.

## Machine-readable Draft

Current draft assets:

- `schemas/community-task-contract.schema.json`
- `examples/contracts/evening-basketball-social-pulse.json`
- `examples/contracts/elder-friendly-walking-helper.json`
- `examples/contracts/robot-fire-passage-patrol.json`
- `scripts/validate-contracts.mjs`

Run:

```powershell
npm.cmd run validate:protocol
```
