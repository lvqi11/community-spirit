# Project Summary

## Project

**Community Spirit / 社区精灵**

**A community life RPG engine grounded in real spatial operations.**

Community Spirit turns real community spaces into quests, relationships, shared goals, resident growth, useful benefits, measurable world operations, and physical-AI task contracts. It is not a conventional smart-community dashboard.

## Problem

Community activities are usually broadcast through noisy chat groups or static notices. Residents lack a personalized reason to participate, underused spaces stay quiet, and property teams cannot connect recommendations to actual arrival, repeat participation, or benefit conversion.

## Solution

Community Pulse ranks live opportunities against a resident's interests, availability, social comfort, and walking distance. A recommendation becomes a real task and route, records join and check-in progress, advances resident XP and a shared community goal, awards Spirit Points, and unlocks a contextual benefit. World Ops receives the same event as an operating funnel, retention loop, and future human / AI / robot handoff context.

## Current Prototype

```text
13 POIs
8 routes
9 tasks
4 activities
3 Community Pulses
3 synthetic resident profiles
3 seasons
3 benefits
```

The React demo contains three focused views:

1. **Resident World**: personalized Community Pulse, real-space map, resident identity, and Season Arc.
2. **Task & Benefits**: route execution, check-in, Spirit Wallet, itemized transactions, and synthetic benefit passes.
3. **World Ops**: recommendation-to-check-in conversion, Pulse lifecycle, space activation, season operations, retention, and commerce conversion.

## Three-minute Story

Use the seven-step guided demo controller:

1. Explain why tonight's basketball Pulse matches the selected resident.
2. Join and generate the participant slot, task, and walking route.
3. Check in and update XP, badge progress, Spirit Points, season progress, and the shared goal.
4. Claim the contextual sports benefit.
5. Activate its synthetic resident benefit pass.
6. Redeem it once and show the wallet ledger.
7. Switch to World Ops and review the complete operating funnel, including whether residents come back.

The Pulse lifecycle also supports leaving before check-in and operational states for matching, open, full, expired, and ended.

## Technical Evidence

- React 19 and Vite.
- Structured synthetic JSON for POIs, routes, tasks, activities, pulses, seasons, benefits, and zh-CN copy.
- SVG spatial map and route highlighting.
- Resident-specific in-session state with duplicate reward and duplicate redemption protection.
- Automated cross-reference, lifecycle, retention, project-material, and production-build validation.
- Responsive mobile demo navigation with touch-sized actions.
- Robot-ready semantic task export as a future reality-layer interface.
- Physical-AI social layer direction: task intent, interaction mode, permission, privacy boundary, fallback, trust, and acceptance.

Run the full release gate:

```powershell
npm.cmd run check
```

## Judging Case

- **Innovation:** combines community life RPG mechanics with real spatial participation and an operator-visible conversion loop.
- **Feasibility:** uses a small structured model and runs locally without private infrastructure.
- **Resident value:** creates personalized reasons to explore, participate, grow, and return.
- **Operator value:** connects recommendations, joins, arrivals, repeat visits, space activation, Spirit Points, and benefits.
- **Physical-AI value:** defines the social contract that should exist before an AI agent or robot acts in a residential setting.
- **Safety:** all current data is fictional or synthetic.

## Boundaries

This prototype does not connect to real residents, payments, merchants, access control, cameras, security systems, or robots. A real pilot requires verified spaces, consent, role-based permissions, audit logs, data minimization, and property approval.
