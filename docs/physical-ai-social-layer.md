# Physical AI Social Layer

Community Spirit should not compete with world models, robot control stacks, simulation engines, or embodied AI foundation models.

Those systems answer a machine question:

```text
How can an AI agent perceive the environment, plan steps, and turn a goal into actions?
```

Community Spirit answers a community question:

```text
How should a real residential community translate human intent, permissions, relationships, and trust into tasks that people, operators, AI agents, and future robots can share?
```

## Positioning

If physical AI becomes strong, Community Spirit still has a role because daily community life needs more than perception and motion.

It needs a social operating layer:

```text
resident intent
-> spatial context
-> light participation mode
-> operator approval
-> privacy boundary
-> task contract
-> human / AI / robot handoff
-> feedback, trust, and retention
```

The project should therefore be framed as:

```text
A social operating layer for physical-AI communities.
```

The community RPG experience remains important. It is the human-facing interface that makes spatial tasks feel approachable instead of administrative or robotic.

## What Physical AI Will Do

Physical AI systems can increasingly handle:

- environment sensing;
- scene understanding;
- world modeling;
- simulation and synthetic training;
- reinforcement learning;
- route planning;
- action execution on robots or other embodied devices.

Community Spirit should treat these as downstream or adjacent capabilities, not as the product's core.

## What Community Spirit Should Own

### 1. Social Intent Layer

A model can know that a basketball court exists, but it may not know that tonight the court should be activated with two more residents, that some residents prefer activity-first social connection, or that an elder-friendly walking task should avoid high-pressure group chat.

Community Spirit turns spatial facts into community intentions.

### 2. Human-readable Task Language

Robots can execute actions such as move, inspect, report, and return.

Communities need richer questions answered first:

- Who authorized this?
- Why should this happen now?
- Which residents might be affected?
- Is this public, semi-public, or private?
- Does the task need human review?
- Can residents participate without pressure?
- What happens if the task fails?

Community Spirit should encode these questions before any robot or external automation receives a task.

### 3. Light Social Modes

The project should support multiple interaction modes instead of one generic social feed:

- `solo`: a resident can complete the task alone.
- `parallel`: residents participate in the same place or time without needing to talk.
- `buddy`: two or three residents can opt into low-pressure companionship.
- `family`: parent-child or household-friendly participation.
- `elder_friendly`: slower pace, clearer route, lower noise, and optional helper support.
- `helper`: a resident contributes to shared maintenance or neighbor assistance.
- `operator`: property staff reviews or coordinates.
- `robot_assist`: a future robot assists after approval.

These modes protect the core idea: activate community life without forcing heavy social networking.

### 4. Trust and Acceptance Metrics

Retention is necessary but not enough for physical-AI communities.

Future versions should track synthetic or permissioned signals such as:

- willingness to accept another recommendation;
- willingness to join another low-pressure activity;
- willingness to let an AI agent suggest a spatial task;
- willingness to accept a robot-assisted task in that area;
- whether the resident felt interrupted;
- whether the action improved perceived safety, belonging, or convenience;
- whether human review was requested.

This turns the project from an engagement loop into a deployment-readiness loop.

### 5. Synthetic Community Simulation

Robot companies can simulate movement and manipulation.

Community Spirit can simulate community interaction:

```text
resident profiles
-> time windows
-> social comfort
-> spatial tasks
-> benefit rules
-> operator approval
-> privacy risk
-> repeat participation
-> trust and acceptance
```

This keeps the public prototype safe while creating a bridge to future pilots.

## Task Contract Direction

Every future physical-AI task should be represented as a contract, not only a route.

Suggested fields:

```json
{
  "intent": "why this task exists",
  "place": "where it happens",
  "route": "how a person or robot moves",
  "actor": "resident | operator | ai_agent | robot",
  "interaction_mode": "solo | parallel | buddy | family | elder_friendly | helper | operator | robot_assist",
  "permission": "who approved it",
  "visibility": "who can see it",
  "risk_level": "low | medium | high",
  "resident_touch": "none | optional | direct",
  "privacy_boundary": "what data cannot be captured or exposed",
  "fallback": "who handles failure or uncertainty",
  "feedback": "how outcome, trust, and retention are measured"
}
```

The current prototype already has early versions of this through POIs, routes, tasks, Pulse lifecycle, benefits, retention metrics, World Ops, and robot-ready export. The next evolution is to make the contract explicit.

## Product Implication

World Ops should gradually be described as a community orchestration console, not merely a property dashboard.

It coordinates:

- resident participation;
- space activation;
- benefit issuance;
- human approval;
- robot-ready tasks;
- privacy and risk controls;
- feedback, trust, and retention.

This is the project's durable wedge if physical AI continues to improve.

