# Devpost Final Copy

Use this concise version for the final Devpost form. Do not click final submit until explicitly approved.

## Project Name

```text
Community Spirit
```

## Tagline

```text
A community life RPG and physical-AI social layer for low-pressure participation, World Ops, and CACP task contracts.
```

## Elevator Pitch

```text
Community Spirit turns shared community spaces into playable quests and measurable task contracts, creating a gentle social layer before physical AI enters everyday life.
```

## Project URL

```text
https://lvqi11.github.io/community-spirit/
```

## Repository URL

```text
https://github.com/lvqi11/community-spirit
```

## Video URL

```text
https://youtu.be/KJaRD5GPcqA
```

## Built With

```text
React, Vite, JavaScript, CSS, SVG map rendering, structured JSON data, GitHub Pages, GitHub Actions, Novus.ai, Pendo Web SDK, CACP draft schema
```

## Short Description

```text
Community Spirit is a working community life RPG and physical-AI social layer. It uses synthetic community data to turn underused shared spaces into low-pressure quests, resident growth, benefits, retention loops, World Ops metrics, and CACP task contracts for future AI agents and robots.
```

## Full Description

Community Spirit is not a conventional smart-community dashboard. It is a product prototype for a future community interaction model: one where young people, older adults, families, operators, AI agents, and eventually robots can coordinate around shared places through gentle, permission-aware tasks.

The resident side is intentionally light. Instead of forcing people into noisy group chats or heavy social networking, Community Spirit gives residents low-pressure reasons to show up, join a small activity, help a neighbor, walk to a place, or activate a shared space. Community Pulse recommendations match interests, availability, social comfort, and walking distance, then turn that recommendation into a route, check-in, XP, Spirit Points, badges, benefits, and a shared community goal.

The operator side sees the same story as World Ops: conversion, lifecycle state, space activation, retention, commerce, workflow handoff, and risk review. The goal is to make community vitality measurable without reducing community life to a dashboard.

The project also introduces CACP, the Community AI Collaboration Protocol. CACP is a proposed task-contract layer for physical AI in shared community spaces. Before an AI agent or future robot acts in a physical place, the community needs a clear contract: intent, place, interaction mode, permission, privacy boundary, fallback owner, feedback, and human handoff. Community Spirit is the first reference implementation and demo scene for that protocol direction.

This submission uses a synthetic dataset because the project is currently an early prototype built by a very small team. The direction is not to stay synthetic forever. If there is a chance to work with a community, campus, property operator, or robot company, the next step is to collect real participation and place-operation data with consent, clear permissions, privacy boundaries, audit logs, and human oversight, then use that data to validate and evolve Community Spirit and CACP in the real world.

## Inspiration

Community life often fails at the last mile. Activities disappear into noisy chat groups, residents lack a personalized reason to participate, underused spaces stay quiet, and operators cannot connect recommendations to arrival, repeat participation, or benefit conversion.

At the same time, physical AI is moving closer to daily life. Future robots will need more than maps and action planning. They will need a social contract for where they can act, who approved the task, what data is off-limits, who takes over when uncertainty appears, and how trust is measured. Community Spirit started from that gap.

## What It Does

- Scores live Community Pulse opportunities against a resident profile.
- Turns recommendations into spatial tasks and routes.
- Simulates join, leave, check-in, reward, benefit, and retention lifecycle states.
- Updates XP, badges, Spirit Points, wallet history, and shared community goals.
- Gives operators World Ops metrics for conversion, activation, retention, commerce, and workflow handoff.
- Shows CACP Community Task Contracts directly inside the product experience.
- Exports robot-ready semantic task payloads without claiming robot control.
- Uses Novus.ai / Pendo instrumentation to make the deployed product loop measurable.

## How We Built It

The prototype is a React/Vite app backed by structured JSON data. The synthetic community model includes POIs, routes, tasks, activities, Community Pulses, resident profiles, seasons, benefits, and CACP task contracts. Automated validation checks data references, pulse lifecycle rules, retention metrics, CACP contract examples, build output, and submission assets with `npm run check`.

## Challenges

- Keeping the project from collapsing into a generic smart-community dashboard.
- Making the resident experience playful without losing operational rigor.
- Explaining CACP clearly because it is a proposed protocol direction, not a judge-known standard.
- Designing for physical AI without pretending to control real robots.
- Keeping privacy and synthetic-data boundaries explicit.

## Accomplishments

- Shipped a public working demo with a deterministic guided story.
- Built a loop from recommendation to route, check-in, reward, benefit, retention, and World Ops.
- Added CACP as a visible product layer through task contracts, schema validation, examples, and workflow export.
- Installed Novus.ai / Pendo and generated visible dashboard metrics and Signals for the deployed product.
- Created a 2-3 minute public demo video that explains the motivation, product loop, CACP, and Novus proof.

## What We Learned

Physical AI readiness is not only about robots executing tasks. It is about social acceptance, permission, privacy, fallback, and measurable trust. Residents need low-pressure ways to participate. Operators need measurable loops. Future AI agents and robots need explicit community task contracts before they enter everyday shared spaces.

```text
MCP connects models to tools and resources.
A2A connects agents to agents.
CACP connects people, places, operators, AI agents, and robots through community task contracts.
```

## What's Next

- Expand CACP with actor cards, audit logs, resident notice flows, and contract lifecycle transitions.
- Add more synthetic scenarios for senior living communities, campuses, mixed-use parks, and robot company pilots.
- Improve accessibility and multilingual flows for youth, families, older adults, and operators.
- Eventually extract CACP into an independent protocol repository while keeping Community Spirit as the first reference implementation.

## Current Data Boundary and Next Step

```text
This submission uses a synthetic dataset because the project is currently an early prototype built by a very small team. The direction is not to stay synthetic forever. If there is a chance to work with a community, campus, property operator, or robot company, the next step is to collect real participation and place-operation data with consent, clear permissions, privacy boundaries, audit logs, and human oversight, then use that data to validate and evolve Community Spirit and CACP in the real world.
```
