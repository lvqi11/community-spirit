# Physical AI Community Roadmap

Community Spirit's long-term direction is to become the social operating layer for physical-AI communities.

Physical AI systems are moving through three broad stages:

```text
can do
-> can adapt
-> can collaborate
```

Community Spirit should not compete with the first two layers directly. Robot foundation models, VLA models, world models, simulation platforms, synthetic-data pipelines, reinforcement-learning systems, edge inference stacks, and robot SDKs will own much of that space.

Community Spirit should focus on the third stage: safe collaboration in real community life.

## Stage 1: Can Do

Physical AI can complete specific tasks:

- patrol a route;
- inspect a passage;
- detect an obstacle;
- guide a delivery;
- execute a scripted workflow;
- report a result.

Community Spirit's current contribution:

- POIs define where tasks happen.
- Routes define how people or robots move.
- Tasks define why movement matters.
- World Ops shows the operator context.
- Robot-ready export proves that community workflows can become structured payloads.

This is the current prototype foundation.

## Stage 2: Can Adapt

Physical AI can adapt across places, objects, devices, and task variations.

Community Spirit's product contribution should be social adaptation:

- different resident profiles;
- different time windows;
- different walking distances;
- different social comfort levels;
- different activity types;
- different privacy boundaries;
- different operator approval needs.

In this stage, the community is not only a map. It is a set of changing human constraints around the same physical space.

## Stage 3: Can Collaborate

Physical AI becomes valuable in daily community life only when it can collaborate safely with people.

Community Spirit's durable wedge is here:

```text
intent
-> permission
-> interaction mode
-> privacy boundary
-> human / AI / robot handoff
-> fallback
-> feedback
-> trust and acceptance
```

This is why the project should keep the RPG layer. A resident should not experience future automation as a cold machine workflow. They should experience it as a low-pressure community quest, helper task, family route, elder-friendly walk, or operator-approved assistance.

## Product Roadmap

### v0.1: Open Prototype

Status: built.

- Synthetic community data.
- Community Pulse recommendation.
- Join, leave, route, check-in, XP, Spirit Points, benefits.
- Retention Loop.
- World Ops.
- Robot-ready export.
- Project validation.

### v0.2: CACP Draft and Community Task Contract

Goal: make the social task layer explicit.

- Add `docs/protocol-design.md`.
- Add `docs/community-task-contract.md`.
- Add `schemas/community-task-contract.schema.json`.
- Add `examples/contracts/*.json`.
- Add `scripts/validate-contracts.mjs`.
- Describe `interaction_mode`, `permission`, `visibility`, `risk_level`, `resident_touch`, `privacy_boundary`, `fallback`, and `trust_signal`.
- Connect the contract to POI, Route, Task, Pulse, Retention, World Ops, and Robot-ready Export.
- Keep using fictional or synthetic data.

### v0.3: Social Mode Data

Goal: make light social modes part of the structured model.

Candidate modes:

```text
solo
parallel
buddy
family
elder_friendly
helper
operator
robot_assist
```

Each mode should explain:

- who participates;
- how much social pressure exists;
- whether a helper is optional;
- whether operator review is needed;
- whether robot assistance is allowed.

### v0.4: Trust and Acceptance Loop

Goal: go beyond retention.

Candidate signals:

- accepted another recommendation;
- joined another low-pressure activity;
- requested human review;
- accepted AI-suggested task guidance;
- accepted robot-assisted task execution;
- reported interruption or discomfort;
- reported stronger safety, belonging, or convenience.

### v0.5: Synthetic Community Simulator

Goal: simulate social deployment before real pilots.

The simulator should vary:

- resident profiles;
- time windows;
- task density;
- social modes;
- operator approval;
- privacy risk;
- benefit rules;
- trust and acceptance feedback.

This is the community counterpart to robot simulation. Robot companies simulate motion and manipulation. Community Spirit simulates whether people will accept the task in the first place.

## Startup Direction

The strongest wedge is not "smart community dashboard" or "robot control."

The wedge is:

```text
Community task contracts for physical-AI deployment.
```

Potential first customers or partners:

- apartment and community operators;
- senior living communities;
- mixed-use parks;
- campuses;
- robot companies seeking realistic social deployment scenarios;
- property technology teams exploring AI agents and service robots.

The first commercial proof should not require real robots. It can start with synthetic task simulation, operator workflows, resident acceptance testing, and robot-ready export.
