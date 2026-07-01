# CACP Repository README Draft

This document is a draft for the future top-level `README.md` of an extracted CACP repository.

It exists so contributors can test whether CACP is understandable as a standalone protocol project before any real repo split happens.

## Draft title

```text
Community AI Collaboration Protocol
```

Short name:

```text
CACP
```

Status:

```text
Draft v0.1
```

## One-line summary

CACP is a task-contract protocol for coordinating people, places, operators, AI agents, and future robots before action happens in a shared physical environment.

## Why this protocol exists

Physical AI in community life needs more than perception, route planning, or robot control.

Before a community task happens, someone must still define:

- what the task is trying to achieve;
- where it is allowed to happen;
- which actor may perform it;
- who must approve or be notified;
- what privacy boundary applies;
- what fallback path exists;
- what evidence justifies the lifecycle decision;
- whether the scenario is only public-demo safe or actually ready for a real pilot.

CACP turns those questions into portable protocol objects with schemas, examples, and validators.

## What this repository would contain

```text
docs/
schemas/
examples/
scripts/
cacp.manifest.json
README.md
CONTRIBUTING.md
SECURITY.md
CODE_OF_CONDUCT.md
```

## Core protocol objects

- `CommunityActorCard`
- `CommunityTaskContract`
- `CommunityTaskTransition`
- `CommunityArtifact`
- `CommunityEvidence`
- `CACPWorkflowProtocolBundle`
- `CACPPilotReadinessChecklist`

## Reference examples

The draft currently carries four full synthetic-only protocol chains:

- resident social task;
- elder-friendly helper task;
- robot/operator patrol task;
- AI-agent proposal with human review.

The portable context fixture should also travel with the repo:

```text
examples/context/community-reference-context.json
```

That fixture provides the minimum shared place context needed by portable validators without depending on a product demo data model.

## Validation

One-command protocol check:

```powershell
node scripts\validate-cacp.mjs
```

Portable extraction dry-run:

```powershell
node scripts\validate-cacp-portable-extraction.mjs
```

The validator chain should confirm:

- protocol schemas exist;
- examples are complete and synthetic-only;
- lifecycle transitions have required evidence;
- workflow bundles match source chain objects;
- pilot-readiness examples preserve governance gates;
- the portable-core audit surface does not hide reference-implementation coupling.

## Safety boundary

Public protocol examples must remain:

```text
fictional_or_synthetic_only
```

Do not include:

- real residents;
- unit numbers;
- access tokens;
- raw camera payloads;
- raw sensor payloads;
- payment records;
- real robot operation logs;
- private property deployment secrets.

## Relationship to Community Spirit

Community Spirit should be described as:

```text
first reference implementation
```

Meaning:

```text
CACP = protocol
Community Spirit = product and demo scene
```

The protocol should stay understandable even if the reader never opens the React app.

## Near-term roadmap

1. Keep the v0.1 object model stable.
2. Expand synthetic example coverage without adding product-specific fields too early.
3. Harden validator ergonomics and contributor docs.
4. Extract only when protocol docs, schemas, examples, and validators clearly stand on their own.
