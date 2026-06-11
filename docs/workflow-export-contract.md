# Workflow Export Contract

The demo can export the currently selected workflow as JSON. This contract describes the prototype payload so judges, developers, or pilot partners can understand what is being handed off.

## Purpose

The export is not a production API. It is a prototype handoff object that shows how a community task can be represented as structured data for:

- resident apps;
- property dashboards;
- AI assistants;
- future service robots.

## Current Export Shape

```json
{
  "schema_version": "0.1.0",
  "exported_at": "2026-06-09T00:00:00.000Z",
  "community_id": "omniweave-community",
  "task": {},
  "route": {},
  "activity": null,
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
- `task`: selected task object from `data/sample-tasks.json`.
- `dashboard_context`: derived operator metrics at export time.
- `data_policy`: must remain `fictional_or_synthetic_only` for public demos.

## Optional Fields

- `route`: selected route object from `data/sample-routes.json`, or `null`.
- `activity`: selected activity object from `data/sample-activities.json`, or `null`.

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
