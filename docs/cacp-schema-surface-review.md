# CACP Schema Surface Review

This review keeps the CACP draft from growing into a product-specific data model too early.

Current verdict:

```text
schema surface is usable for v0.1, but should be hardened before package extraction
```

## Core vs extension boundary

| Object | Core in v0.1 | Should stay extension / example-specific for now |
| --- | --- | --- |
| `CommunityActorCard` | actor type, capabilities, supported modes, zones, data boundaries, safety controls | device-specific controls, real auth credentials, vendor robot SDK fields |
| `CommunityTaskContract` | intent, place, actor, interaction mode, permission, visibility, risk, resident touch, privacy, fallback, feedback, lifecycle | detailed scheduling rules, payment, access-control policy, sensor payload policy |
| `CommunityTaskTransition` | from/to state, requested actor, reason, evidence ids, artifact ids | full audit log storage, approvals from real identity systems |
| `CommunityArtifact` | bounded output metadata, visibility, personal-data flag, retention label, summary | raw documents, raw images, raw video, device output payloads |
| `CommunityEvidence` | minimal facts, source artifact ids, synthetic flag | surveillance logs, full sensor streams, resident profile snapshots |
| `CACPWorkflowProtocolBundle` | compact handoff context | production transport, cryptographic signatures, real authorization tokens |
| `CACPPilotReadinessChecklist` | governance gate shape | jurisdiction-specific legal policy, operator-specific consent text |

## Current fields that are intentionally conservative

- `data_policy` is always `fictional_or_synthetic_only` in public examples.
- `privacy_boundary` stores booleans instead of raw privacy policies.
- `evidence.facts` is a small object instead of a full evidence document.
- `artifact.summary` is human-readable, not a raw report.
- `pilot_readiness.readiness_level` prevents the demo from implying real deployment.

## Fields to watch before extraction

These fields are useful now but may need stricter semantics before a standalone package:

- `capabilities`: currently a compact enum; future versions may need namespaced extension capabilities.
- `interaction_mode`: currently community-centric; future versions may need clearer mapping to AI-agent and robot modes.
- `fallback.owner`: currently a small enum; future pilots may need role references.
- `retention`: currently a label; future pilots may need structured duration and deletion policy.
- `evidence.facts`: flexible by design; future package may need typed facts for common evidence types.

## Do not add yet

Avoid adding these to v0.1 core:

- real resident identity fields;
- access-control tokens;
- camera or sensor payloads;
- payment or billing fields;
- robot vendor SDK commands;
- jurisdiction-specific legal consent text;
- production auth or signature formats.

These belong in future extensions after the protocol shape is stable.

Extension governance: `docs/cacp-extension-governance-draft.md`.
Extension registry: `examples/extensions/registry.json`.
Extension coverage matrix: `docs/cacp-extension-coverage-matrix.md`.

## v0.2 hardening targets

1. Keep four full chains passing:
   - resident social;
   - elder-friendly helper;
   - robot/operator;
   - AI-agent proposal.
2. Add typed evidence guidance without removing `facts` flexibility.
3. Decide whether `retention` should stay a label or become structured.
4. Decide whether capabilities need extension namespaces.
5. Keep `CACPWorkflowProtocolBundle` transport-neutral.
6. Keep extension naming and promotion rules explicit before adding more scenario-specific fields.
