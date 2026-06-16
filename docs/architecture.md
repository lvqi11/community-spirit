# Architecture

This document describes the first architecture direction for Community Spirit.

The prototype is intentionally small. It is designed to make the core model visible before adding production complexity.

## Layered View

```text
Resident / Property / Robot Interfaces
  -> AI Community Agent
  -> Physical AI Social Layer
  -> Task and Activity Layer
  -> Route Layer
  -> POI and Spatial Data Layer
  -> Fictional Community Dataset
```

## 1. Spatial Data Layer

The spatial data layer defines where things are.

Current file:

- `data/sample-pois.json`

Main objects:

- community;
- POI;
- POI type;
- local position;
- visibility;
- access level;
- tags;
- robot accessibility.

This layer should remain clean and factual.

It should not contain private resident data, real access credentials, or sensitive security details.

## 2. Route Layer

The route layer defines how people and robots move.

Current file:

- `data/sample-routes.json`

Main objects:

- route;
- start POI;
- end POI;
- waypoints;
- estimated time;
- distance;
- access requirements;
- AI prompt examples.

Routes are not only navigation paths. They encode product scenarios:

- visitor guidance;
- package pickup;
- activity check-in;
- repair reporting;
- robot patrol.

## 3. Task Layer

The task layer defines why a user needs the route.

Current file:

- `data/sample-tasks.json`

Main objects:

- task;
- task type;
- user roles;
- linked route;
- linked activity;
- user value;
- property value;
- expected outputs;
- privacy notes.

Tasks turn the community map into a product experience.

## 4. Activity Layer

The activity layer defines recurring community operations.

Current file:

- `data/sample-activities.json`

Main objects:

- activity;
- host;
- location POI;
- linked route;
- signup;
- check-in;
- capacity;
- reward;
- safety notes.

Activities create reasons for residents to return to the product.

## 5. AI Community Agent

The AI agent should not be a free-form chatbot at first.

It should map natural-language intent to structured tasks.

Example:

```text
User: How can my guest get to Building 3?
Intent: visitor_guidance
Task: task-guide-visitor-to-building-3
Route: route-visitor-north-gate-to-building-3
Output: route preview + instructions + share link
```

Initial implementation can be rule-based or retrieval-based. A large language model can be added later once the data model is stable.

## 6. Property Dashboard

The property dashboard should expose maintainable operations:

- POI list;
- activity publishing;
- repair reports;
- route usage;
- signup and check-in;
- patrol task generation;
- moderation and governance.

The dashboard is essential because a community is not static.

## 7. Physical AI Social Layer

The physical-AI social layer defines how a task becomes acceptable before a person, AI agent, or robot acts.

It should encode:

- intent;
- actor type;
- interaction mode;
- permission;
- visibility;
- privacy boundary;
- risk level;
- resident touch;
- fallback owner;
- feedback and trust signals.

This layer is different from robot control. It prepares the social contract around a task so future physical AI does not enter community life as a black-box automation.

Example:

```text
Intent: activate an underused basketball court
Interaction mode: parallel or buddy
Actor: resident first, operator visible
Permission: public community activity
Privacy boundary: no real identity or camera feed in the public demo
Feedback: check-in, repeat participation, and willingness to join again
```

## 8. Robot-ready Interface

The robot-ready layer should start as a structured export.

Initial output can include:

- route waypoints;
- accessible POIs;
- inspection goals;
- access requirements;
- privacy notes;
- expected report schema.

This avoids depending on a real robot in the MVP while preserving the long-term direction.

## Prototype Implementation Recommendation

Recommended first implementation:

```text
React / Next.js or simple Vite app
  -> loads JSON data
  -> renders a 2D / 2.5D community map
  -> shows POIs and route paths
  -> provides a mock AI assistant
  -> shows task and activity cards
```

Do not start with a heavy game engine for the open prototype.

The first goal is clarity, not visual spectacle.
