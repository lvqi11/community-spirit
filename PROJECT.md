# Community Spirit Project Overview

## Project

Community Spirit: Community Life RPG for Real Residential Spaces

## Pitch

Most community products digitize management. Community Spirit turns physical community life into a shared quest/task language for residents, operators, AI agents, and future robots.

Community Spirit is not a dashboard for managing communities. It is an operating grammar for future communities: residents explore real places, accept community quests, join activities, report issues, and build a visible community identity, while property teams operate the world and future robots receive structured reality-layer tasks.

The project is designed as a physical-AI preparation layer. Before robots enter everyday residential life, communities need spatial tasks that are understandable to people, auditable by operators, and exportable to machines. Community Spirit shows that loop with synthetic data and a resident-friendly RPG experience.

The headline demo is Community Pulse: multiple real-space events are ranked against a resident's interests, available time, social comfort, and walking distance. Switching from an after-work athlete to a weekend family or community helper changes the top recommendation, route, shared goal, reward, and property conversion context.

## Demo Links

Static demo after local server:

```text
http://127.0.0.1:4177/demo/web/index.html
```

React/Vite demo:

```text
http://127.0.0.1:5173/
```

Community Pulse deep link:

```text
http://127.0.0.1:5173/?task=task-join-evening-basketball
```

Deep-link scenarios:

```text
http://127.0.0.1:4177/demo/web/index.html?task=task-report-playground-light
http://127.0.0.1:4177/demo/web/index.html?task=task-join-parent-child-activity
http://127.0.0.1:4177/demo/web/index.html?task=task-robot-fire-passage-patrol
```

## What to Show in 3 Minutes

1. Open Community Pulse: the system explains why tonight's basketball meetup matches this resident.
2. Switch resident profiles and show the recommendation order change to family exploration and world maintenance.
3. Return to the athlete profile and join: the task, real route, participant count, and privacy-aware participation state update together.
4. Check in: resident XP and Sports Neighbor progress increase while the shared movie-night goal advances.
5. Scroll to World Ops: show recommendation-to-check-in conversion, projected space activation, and the Retention Loop.
6. End with Community Explorer depth and robot patrol export as the future reality layer.

## What Is Built

- Current validated scale: 13 POIs, 8 routes, 9 tasks, 4 activities, 3 Community Pulses, 3 synthetic resident profiles, 3 seasons, and 3 benefits.
- Static zero-dependency web demo.
- Vite + React primary product demo with Resident World, Task & Benefits, and World Ops views.
- Synthetic POI, route, task, activity, and i18n data.
- Community life RPG framing and spatial quest flow.
- Community Explorer Quest with POI check-ins and badge reward.
- Explainable Community Pulse ranking across three synthetic resident profiles and three real-space event types.
- Community Pulse vertical loop: profile match, join, route, check-in, XP, shared goal, and operations conversion.
- Separate resident and operational Pulse lifecycles with leave, full, expired, and ended rules.
- Resident-specific growth state with duplicate-reward protection.
- Three recurring season arcs with milestones, community rights, and operator goals.
- Spirit Points wallet and contextual benefit redemption without touching real payment systems.
- Synthetic resident benefit passes and an itemized Spirit Points wallet ledger.
- Commerce conversion from Pulse check-in to claim, activation, and redemption.
- Retention Loop metrics for first participation, 7-day return, streaks, and season-by-season repeat visits.
- Season Arc panel for recurring engagement and community identity.
- Scheduled side quest cards with time, place, status, and action prompts.
- Property Dashboard as a world operations console.
- Risk/access review and workflow handoff cards.
- Robot-ready semantic task export.
- Data validation script and CI workflow.
- Project validation for current data scale, required materials, synthetic-data declarations, and built production assets.
- Mobile-first seven-step demo navigation with compact progress and touch-sized actions.
- GitHub Pages workflow for publishing the static demo.

## What Is Not Claimed

- This is not a production property management system.
- This is not connected to real access-control, camera, resident, or robot systems.
- This does not use real community data.
- This does not claim that smart community, property AI, digital twin, or robot operation products do not exist.

## Differentiation

Community Spirit should not be judged as only a smart-community dashboard. Its differentiated direction is:

```text
community life RPG
+ resident-visible spatial quests
+ lightweight social participation across youth, families, and elders
+ recurring season arcs and badge identity
+ property world-ops workflows
+ robot-ready semantic exports
```

The social model is intentionally light: the product creates low-pressure reasons to show up, help, play, walk, or maintain shared spaces, instead of forcing residents into heavy social networking. The same loop can reduce isolation, activate underused spaces, and create trustworthy physical context for future robots.

## Safety

All public data is fictional or synthetic. Real pilots require permission management, resident consent, role-based access control, audit logs, data minimization, and security review.

## Release Gate

```powershell
npm.cmd run check
```

This validates data references, Pulse lifecycle rules, retention metrics, the production build, project materials, and generated assets.
