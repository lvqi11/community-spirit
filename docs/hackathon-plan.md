# Hackathon Plan

This plan describes how to turn Community Spirit into a 48-hour hackathon demo.

## Demo Goal

Build a small web demo that shows:

```text
AI assistant -> task selection -> POI / route display -> activity or repair workflow -> robot-ready patrol export
```

The demo should make the core idea obvious in less than three minutes.

## Demo Story

Use the fictional community:

```text
OmniWeave Community / Wanlian Chuangjie
```

Demo flow:

1. User opens the community map.
2. User asks: "How can my guest get from the North Gate to Building 3?"
3. The system highlights the visitor route.
4. User asks: "What activities are happening this weekend?"
5. The system shows the parent-child activity and route to the playground.
6. User reports: "A light near the playground is broken."
7. The system creates a spatial repair ticket.
8. Property operator asks: "Generate a robot patrol route for the fire passage."
9. The system exports a robot-ready task preview.

## 48-hour Scope

### Must Have

- Load JSON data.
- Render POIs on a 2D or 2.5D map.
- Show route paths.
- Show task cards.
- Show activity cards.
- Mock AI assistant that maps sample prompts to tasks.
- Robot patrol export preview.

### Nice to Have

- Simple property dashboard panel.
- Route animation.
- Badge reward preview.
- Bilingual UI.
- Screenshot-ready landing header.

### Do Not Build

- real authentication;
- real property system integration;
- real map provider integration;
- real robot SDK integration;
- real resident data;
- high-fidelity 3D reconstruction;
- complex chat or social features.

## Suggested Tech Stack

Fast web prototype:

```text
Vite + React + TypeScript
SVG or Canvas map
JSON data files
CSS modules or plain CSS
```

Alternative:

```text
Next.js + React
```

Avoid heavy engine dependency in the hackathon version.

## UI Layout

Recommended layout:

```text
Left panel:
  AI assistant
  sample prompts
  selected task

Center:
  community map
  POI markers
  highlighted route

Right panel:
  task details
  activity / repair / robot export card
```

## Core Components

```text
App
CommunityMap
PoiMarker
RouteLayer
AssistantPanel
TaskCard
ActivityCard
RepairTicketPreview
RobotExportPreview
PropertyPanel
```

## Data Files

Use:

- `data/sample-pois.json`
- `data/sample-routes.json`
- `data/sample-tasks.json`
- `data/sample-activities.json`

The static demo also supports opening a specific task with a query parameter:

```text
demo/web/index.html?task=task-robot-fire-passage-patrol
```

## Prompt Mapping

The first assistant can use simple keyword matching:

```text
guest / visitor / building 3 -> task-guide-visitor-to-building-3
package / delivery / locker -> task-pick-up-package
activity / weekend / parent -> task-join-parent-child-activity
broken / light / repair -> task-report-playground-light
robot / patrol / fire passage -> task-robot-fire-passage-patrol
```

This is acceptable for a hackathon because the goal is to demonstrate data grounding and product flow, not general chatbot intelligence.

## Judging Narrative

Three-minute pitch:

1. Communities are spatial but current service tools are not.
2. Community Spirit turns places into POIs, movement into routes, needs into tasks, and operations into activities.
3. The AI assistant does not hallucinate. It uses structured community data.
4. The same data can later become semantic maps and patrol routes for service robots.
5. This starts as a resident and property tool, but can grow into an AI and robot-ready community operating layer.

## Team Split for Two People

### Person A: Product + Data + Pitch

- refine README;
- prepare demo script;
- clean sample data;
- write pitch slides;
- record demo narration.

### Person B: Demo Engineering

- build web app;
- load JSON;
- render map and routes;
- implement assistant mock;
- build detail panels.

If only one developer is available, reduce scope to:

- map;
- POIs;
- route selection;
- task details;
- robot export preview.

## Final Submission Checklist

- Runnable demo URL or local demo video.
- GitHub repo with README.
- Demo screenshots.
- 3-minute pitch video or live script.
- One-slide architecture.
- One-slide business potential.
- Clear data privacy note.

## Success Criteria

The hackathon demo succeeds if viewers understand:

- this is not just a 3D map;
- the AI assistant is grounded in structured community data;
- property operations are connected to resident tasks;
- robot readiness is a natural extension, not a gimmick.
