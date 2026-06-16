# Vision

Community Spirit is an AI-native community RPG and spatial operating prototype.

The long-term goal is to turn residential communities from static physical places into interactive, maintainable, robot-ready, and socially acceptable physical-AI environments.

## Core Idea

A community is not just a map.

It is a living system made of:

- places residents need to find;
- routes residents and visitors need to follow;
- services property teams need to operate;
- activities that create community life;
- safety and inspection workflows;
- future robots that need semantic maps and task instructions.

Community Spirit connects these layers into one spatial operating layer.

As world models and embodied AI mature, the project should not try to own robot perception, planning, simulation, or control. Its stronger position is the social layer around those systems: what the community wants, who authorized it, how residents participate, what privacy boundaries apply, when operators review, and whether people trust the result.

## Market Context

Community Spirit is not based on the assumption that smart community products do not exist. Property SaaS, smart community AIoT platforms, digital twin dashboards, AI property copilots, and robot operation platforms are already active categories.

The prototype explores a narrower but important missing layer:

```text
resident-visible spatial tasks
+ property-operable workflows
+ robot-ready semantic exports
+ physical-AI social contracts
```

That is why the first demo is intentionally small. It tries to prove the task model before adding real community data, heavy 3D capture, access-control integrations, or robot fleets.

## What We Believe

### 1. Digital twins should be used, not only viewed

Many digital twin projects stop at visualization. They look impressive, but residents do not use them daily and property teams struggle to maintain them.

Community Spirit starts from daily tasks:

- guide a visitor;
- pick up a package;
- report a broken light;
- join a weekend activity;
- generate a patrol route.

The 3D or 2.5D world is valuable because it helps people and systems complete real tasks.

### 2. Community services should be spatial

Traditional property apps are usually form-based.

Community life is spatial:

- repairs happen at a location;
- activities happen at a location;
- visitors enter from a gate and move to a building;
- robots patrol through POIs and routes.

Community Spirit makes location a first-class business object.

### 3. AI agents need structured community context

A language model alone cannot know how a specific community works.

An AI community assistant needs:

- POIs;
- routes;
- access rules;
- activity records;
- repair workflows;
- property policies.

Community Spirit provides this structured context so an AI assistant can answer practical questions like:

- "How can my guest get to Building 3?"
- "Where is the package locker?"
- "What activities are happening this weekend?"
- "Create a repair report for the playground light."

### 4. Service robots need robot-ready semantic maps

Future service robots in communities will need more than geometry.

They need to know:

- which places are accessible;
- which routes are safe;
- which POIs require inspection;
- which spaces are privacy-sensitive;
- what task should be done at each location;
- how to report the result.

Community Spirit treats robot readiness as a future layer on top of the same community spatial data.

### 5. Physical AI needs social permission and acceptance

Even a strong physical-AI system still needs a community-level answer to:

- why this task should happen;
- who approved it;
- which residents might be touched by it;
- whether the task should be solo, parallel, buddy-based, family-friendly, elder-friendly, operator-led, or robot-assisted;
- what data must not be captured or exposed;
- who handles uncertainty or failure;
- whether residents feel more connected, safer, or interrupted.

Community Spirit should make these social and governance questions explicit before a task reaches an AI agent or robot.

## Product Direction

Community Spirit can evolve into multiple product versions:

- **Pro:** digital twin operation platform for property operators, developers, parks, and apartments.
- **Life:** resident-facing community life map with tasks, activities, repair, and light social channels.
- **Play:** a separate high-freedom virtual community and avatar space for younger users.
- **Robot-ready layer:** semantic maps, patrol routes, and task interfaces for future service robots.
- **Physical AI social layer:** task contracts, permission boundaries, interaction modes, trust metrics, and human / AI / robot handoff.

The open prototype focuses on the shared foundation:

```text
Space + POI + Route + Task + Activity + Social Mode + AI + Robot-ready semantics
```

## Current Prototype Goal

The current goal is not to rebuild a real community.

The goal is to prove the core interaction model with fictional data:

```text
POI -> Route -> Task -> Activity -> Social Mode -> AI Assistant -> Robot-ready Interface
```

If this model works, the next step is a permission-based pilot with a real community, apartment, park, or campus-like environment.
