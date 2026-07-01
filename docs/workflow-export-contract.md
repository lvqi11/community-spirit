# Workflow Export Contract

The demo can export the currently selected workflow as JSON. This contract describes the prototype payload so reviewers, developers, or pilot partners can understand what is being handed off.

## Purpose

The export is not a production API. It is a prototype handoff object that shows how a community task can be represented as structured data for:

- resident apps;
- property dashboards;
- AI assistants;
- future service robots.

Longer term, this export should become a human / AI / robot task contract rather than only a route payload. The current prototype now includes both the selected `community_task_contract` and a compact `cacp_protocol_bundle` so a reviewer can see which lifecycle transition, evidence, artifacts, and actor cards justify the handoff.

## Current Export Shape

```json
{
  "schema_version": "0.1.0",
  "exported_at": "2026-06-09T00:00:00.000Z",
  "community_id": "omniweave-community",
  "task": {},
  "route": {},
  "activity": null,
  "community_task_contract": {
    "contract_id": "ctc-robot-fire-passage-patrol",
    "intent": "why this task exists",
    "interaction_mode": "robot_assist",
    "permission": {},
    "privacy_boundary": {},
    "fallback": {},
    "feedback": {},
    "lifecycle": {}
  },
  "cacp_protocol_bundle": {
    "schema_version": "cacp.workflow_protocol_bundle.v0.1",
    "contract_id": "ctc-robot-fire-passage-patrol",
    "lifecycle": {},
    "readiness": {
      "has_transition_records": true,
      "has_evidence_records": true,
      "has_artifacts": true,
      "human_review_required": true,
      "resident_notice_required": true,
      "data_policy": "fictional_or_synthetic_only"
    },
    "actors": [],
    "transitions": [],
    "evidence": [],
    "artifacts": [],
    "safety_boundary": {
      "public_demo_data": true,
      "fictional_or_synthetic_only": true,
      "excludes_real_resident_identity": true,
      "excludes_raw_camera_or_sensor_payload": true,
      "requires_real_pilot_consent_and_operator_approval": true
    }
  },
  "dashboard_context": {
    "managed_pois": 13,
    "robot_ready_pois": 8,
    "open_activities": 1
  },
  "data_policy": "fictional_or_synthetic_only"
}
```

## Required Fields

- `schema_version`: export schema version.
- `community_id`: synthetic community identifier.
- `task`: selected task object from the synthetic reference implementation context.
- `dashboard_context`: derived operator metrics at export time.
- `community_task_contract`: future-facing task context for intent, permission, privacy, interaction mode, fallback, and feedback.
- `cacp_protocol_bundle`: compact handoff bundle for the selected contract, including actor card summaries, lifecycle transitions, evidence facts, artifacts, and safety boundary flags.
- `data_policy`: must remain `fictional_or_synthetic_only` for public demos.

## Optional Fields

- `route`: selected route object from `examples/context/community-reference-context.json`, or `null`.
- `activity`: selected activity object from `examples/context/community-reference-context.json`, or `null`.
- `dashboard_context.community_pulse`: recommendation, participation, wallet, season, and retention context when the selected task is the active Pulse task.

## CACP Protocol Bundle

The bundle is intentionally smaller than a production audit log. It should prove that the task has enough social and operational context to be handed to an operator, AI agent, or future robot without exposing private payloads.

It includes:

- `readiness`: whether transition, evidence, and artifact records exist, plus human-review and resident-notice requirements.
- `actors`: referenced `CommunityActorCard` summaries only.
- `transitions`: lifecycle state changes such as `needs_operator_approval -> approved`.
- `evidence`: minimal facts that justify a lifecycle decision.
- `artifacts`: human-readable notices, schedule records, approval records, or future robot-ready outputs.
- `safety_boundary`: public-demo and real-pilot guardrails.

Machine-readable draft:

```text
schemas/cacp-workflow-protocol-bundle.schema.json
scripts/validate-cacp-workflow-export.mjs
```

The validator checks that exported bundles match the selected contract, reference known actor cards, reuse known transition / evidence / artifact examples, keep public examples synthetic, and do not include forbidden public payload keys such as access tokens, unit numbers, raw camera payloads, or sensor payloads.

## Example

See:

```text
examples/exports/robot-fire-passage-patrol.json
```

## Safety Boundary

Do not include:

- resident identity;
- unit number;
- phone number;
- access-control token;
- camera or sensor payload;
- real patrol logs;
- real community maps or private property data.

Real pilots should add authorization, audit logs, consent, redaction, and data retention rules before export data leaves a trusted environment.
