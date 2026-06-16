# Hackathon Submission Form

Use this file as the copy-ready source for hackathon forms.

## Project Name

```text
Community Spirit
```

## Tagline

```text
A community life RPG engine grounded in real spatial operations.
```

## Short Description

```text
Community Spirit turns real residential spaces into playable quests, personalized Community Pulse recommendations, resident growth, useful benefits, retention loops, World Ops, and robot-ready tasks.
```

## Long Description

Community Spirit is not a conventional smart-community dashboard. It is a community life RPG engine grounded in real spatial operations.

The prototype uses a fictional residential community to show how structured spatial data can become a living operating loop. POIs become meaningful places, routes become paths, activities become quests, Pulse recommendations become real-space participation, and World Ops can measure what happened after residents joined.

The headline feature is Community Pulse. It ranks live opportunities against a resident's interests, availability, social comfort, and walking distance. A recommendation becomes a task and route, records join and check-in progress, advances resident XP and a shared community goal, awards Spirit Points, unlocks contextual benefits, and exposes conversion plus retention metrics to operators.

The demo also includes resident identity, season arcs, benefit passes, wallet transactions, Pulse lifecycle controls, and robot-ready semantic workflow export. All current data is fictional or synthetic.

## Problem

Community activities are usually broadcast through noisy chat groups or static notices. Residents lack a personalized reason to participate, underused spaces stay quiet, and property teams cannot connect recommendations to actual arrival, repeat participation, or benefit conversion.

Existing smart-community tools are often workflow-first, dashboard-first, or display-first. They rarely make the resident experience feel alive while still giving operators structured, measurable, spatially grounded data.

## Solution

Community Spirit connects resident motivation and property operations through one shared spatial model:

```text
POI -> Route -> Task -> Pulse -> Check-in -> Growth -> Benefit -> Retention -> World Ops
```

Residents see a personalized community world. Operators see the same activity as a measurable operating funnel. Future robots can receive structured route/task exports from the same model.

## What We Built

- A React/Vite public demo with three focused views: Resident World, Task & Benefits, and World Ops.
- A seven-step deterministic hackathon demo controller.
- A fictional community dataset with 13 POIs, 8 routes, 9 tasks, 4 activities, 3 Community Pulses, 3 synthetic resident profiles, 3 seasons, and 3 benefits.
- Explainable Community Pulse ranking based on interests, availability, social mode, and walking distance.
- Pulse lifecycle: matching, open, full, expired, ended, join, leave, and check-in.
- Resident progression: XP, levels, badges, task history, season check-ins, and Spirit Points.
- Benefits loop: locked, available, claimed, activated, redeemed, synthetic resident pass, and wallet ledger.
- Retention Loop: first participation, 7-day return, streaks, and season-by-season repeat visits.
- World Ops cards for conversion, lifecycle, space activation, season operations, retention, commerce, and workflow handoff.
- Robot-ready semantic task export as a future reality-layer interface.
- Automated validation for data references, lifecycle rules, retention metrics, production build, and submission assets.

## Innovation

Community Spirit combines four usually separate ideas into one small prototype:

```text
community life RPG
+ real spatial operations
+ measurable resident retention
+ robot-ready semantic tasks
```

The key design choice is that the AI-like assistant and product flow are grounded in structured community data rather than free-form chat. That makes the demo explainable, auditable, and safe to show publicly with synthetic data.

## Technical Stack

```text
React 19
Vite
JavaScript
CSS
SVG map rendering
Structured JSON data
GitHub Actions
GitHub Pages
```

## Links

GitHub repository:

```text
https://github.com/lvqi11/community-spirit
```

Live demo:

```text
https://lvqi11.github.io/community-spirit/demo/web/index.html
```

Demo video:

```text
https://github.com/lvqi11/community-spirit/blob/main/reports/community-spirit-demo.mp4
```

Release:

```text
https://github.com/lvqi11/community-spirit/releases/tag/v0.1.0
```

## How To Run

```powershell
npm.cmd install
npm.cmd run dev -- --port 5173
```

Open:

```text
http://127.0.0.1:5173/
```

Full release check:

```powershell
npm.cmd run check
```

## Demo Flow

1. Start with Lin, the after-work mover.
2. Show why tonight's basketball Pulse matches his interests, availability, social comfort, and walking distance.
3. Join the Pulse and generate the route/task context.
4. Check in and show XP, badges, Spirit Points, season progress, and shared-goal contribution.
5. Claim, activate, and redeem a contextual sports benefit.
6. Open World Ops and review conversion, space activation, retention, and commerce.
7. Mention robot-ready export as the future reality layer.

## Data Safety

All current data is fictional or synthetic. The prototype does not connect to real residents, payments, merchants, access control, cameras, security systems, or robots.

A real pilot would require verified spaces, resident consent, role-based permissions, audit logs, data minimization, retention policies, and property approval.

## If Asked About Prior Work

This repository is an open prototype prepared before submission. If a hackathon requires new work during the event window, use the repository as the pre-existing open-source base and submit the event-window contribution as a clearly scoped release update, such as:

- a judge landing page;
- a demo video and submission package;
- a new integration adapter;
- a focused v0.1.1 polish commit;
- or a new scenario built on the same synthetic data model.

Do not claim that the whole repository was created during a restricted event window unless that is true for the specific competition.
