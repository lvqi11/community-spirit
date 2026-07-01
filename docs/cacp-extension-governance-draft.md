# CACP Extension Governance Draft

This document defines the draft governance rules for CACP extensions.

The goal is to keep the v0.1 core small while still allowing real scenarios to express local needs.

## Why extensions exist

CACP core should describe stable concepts that most community task contracts need:

- intent;
- place;
- actor;
- interaction mode;
- permission;
- privacy boundary;
- fallback;
- feedback;
- lifecycle;
- artifacts;
- evidence;
- pilot readiness.

Extensions are for concepts that are useful, but not yet stable enough to become core.

## Current extension URI shape

Public examples should use this URI shape:

```text
https://community-spirit.dev/cacp/extensions/<extension-name>/v0.1
```

Examples:

```text
https://community-spirit.dev/cacp/extensions/elder-friendly/v0.1
https://community-spirit.dev/cacp/extensions/robot-assist/v0.1
https://community-spirit.dev/cacp/extensions/public-notice/v0.1
https://community-spirit.dev/cacp/extensions/incident-review/v0.1
```

The `<extension-name>` segment should use lowercase kebab-case.

## When to use an extension

Prefer an extension when the concept is:

- useful for one scenario family but not all CACP users;
- likely to change as pilots teach us more;
- tied to a domain such as elder-friendly participation, public notice, robot-assist handoff, or incident review;
- too detailed for v0.1 core, such as jurisdiction-specific notice text or vendor-specific robot behavior.

## When to change core instead

Consider a core schema change only when the concept is:

- needed by multiple actor types or scenario families;
- required for safety, privacy, lifecycle integrity, or auditability;
- stable enough that examples and validators can enforce it consistently;
- understandable without a product-specific story.

Core changes should follow `docs/cacp-versioning-and-compatibility-draft.md`.

## What extensions must not contain in public examples

Extensions must not be used to smuggle sensitive payloads into public examples.

Do not include:

- real resident identity;
- unit numbers;
- access-control tokens;
- raw camera payloads;
- raw sensor payloads;
- payment data;
- production robot commands;
- private property deployment secrets.

The public data policy remains:

```text
fictional_or_synthetic_only
```

## Naming discipline

Extension names should be:

- short;
- lowercase;
- kebab-case;
- domain-oriented rather than vendor-oriented;
- stable enough to appear in examples and docs.

Good examples:

```text
elder-friendly
robot-assist
public-notice
incident-review
ai-agent-suggestion
```

Avoid:

```text
vendor-sdk-v4
building3-special-case
cameraPayload
payment-token-beta
```

## Version discipline

Extension versions should initially follow the CACP draft line:

```text
v0.1
```

Use a new extension version when:

- the extension meaning changes;
- examples would become misleading under the old meaning;
- validators begin enforcing stricter extension semantics.

Do not bump extension versions only for wording changes or additional examples.

## Promotion rule

An extension can be considered for core only after:

- at least two scenario families use the same concept;
- the field semantics are stable;
- the safety and privacy impact is understood;
- validators can enforce it without product-specific assumptions;
- the versioning and compatibility draft identifies the change as non-breaking or explains the breaking-change path.

## Validator expectations

Current validators should at minimum check:

- extension values are strings;
- extension values follow the expected URI shape;
- duplicate extension URIs do not appear in one contract;
- public examples keep the synthetic-only data boundary.

Future validators may add known-extension registries after the extension list stabilizes.

## Current registry

The current draft registry lives at:

```text
examples/extensions/registry.json
```

Machine-readable schema:

```text
schemas/cacp-extension-registry.schema.json
```

Every extension URI used by public contract examples should appear in this registry with:

- summary;
- applicable actor types;
- applicable interaction modes;
- example contract ids;
- core-candidate flag;
- promotion notes;
- synthetic-only data policy.

The validator checks contract examples against this registry so new extension URIs cannot appear silently.

Coverage review:

```text
docs/cacp-extension-coverage-matrix.md
```

Public notice semantics:

```text
docs/cacp-public-notice-semantics-draft.md
```
