# Data Model

Community Spirit starts with a small set of spatial business objects.

The current model is intentionally simple:

```text
Community
  -> POI
  -> Route
  -> Task
  -> Activity
  -> Pulse
  -> Season
  -> Benefit
  -> Community Task Contract
```

## Community

A community is the top-level container.

Example fields:

- `id`
- `name`
- `display_name`
- `description`
- `data_policy`
- `coordinate_system`

In the open prototype, the community is fictional:

```text
omniweave-community
```

## POI

A POI is a meaningful place in the community.

It can be a gate, building, property center, package locker, playground, clubhouse, garage entrance, fire passage, or waste collection point.

Important fields:

- `id`
- `name`
- `type`
- `position`
- `public_visibility`
- `access_level`
- `tags`
- `description`
- `robot_accessible`

Product meaning:

```text
POI = where something happens
```

## Route

A route describes a path between places.

Important fields:

- `id`
- `name`
- `scenario`
- `user_roles`
- `start_poi_id`
- `end_poi_id`
- `estimated_minutes`
- `distance_meters`
- `access_requirements`
- `waypoints`
- `ai_prompt_examples`
- `tags`

Product meaning:

```text
Route = how a person or robot moves through the community
```

## Task

A task describes the user goal behind a route.

Important fields:

- `id`
- `name`
- `type`
- `primary_user_role`
- `linked_route_id`
- `linked_activity_id`
- `start_poi_id`
- `target_poi_id`
- `goal`
- `user_value`
- `property_value`
- `ai_intents`
- `expected_outputs`
- `privacy_notes`

Product meaning:

```text
Task = why the route matters
```

Examples:

- guide a visitor;
- pick up a package;
- join a parent-child activity;
- report a broken light;
- create a property activity;
- generate a robot patrol route.

## Activity

An activity is a scheduled community operation or event.

Important fields:

- `id`
- `name`
- `type`
- `status`
- `host_role`
- `location_poi_id`
- `linked_route_id`
- `time_window`
- `capacity`
- `signup_required`
- `checkin_supported`
- `target_residents`
- `resident_value`
- `property_value`
- `rewards`
- `safety_notes`

Product meaning:

```text
Activity = a recurring reason for residents and property teams to use the system
```

## Pulse

A Pulse is a live community opportunity matched to a resident profile.

Important fields:

- `id`
- `title`
- `linked_task_id`
- `linked_route_id`
- `linked_activity_id`
- `social_mode`
- `time_window`
- `participant_goal`
- `matching_reasons`
- `lifecycle`

Product meaning:

```text
Pulse = why this resident should participate now
```

## Community Task Contract

A Community Task Contract is the future physical-AI social layer around a task.

It should eventually connect the current objects:

```text
POI + Route + Task + Pulse + Benefit + Retention + World Ops + Robot-ready Export
```

Important fields:

- `intent`
- `place`
- `actor`
- `interaction_mode`
- `permission`
- `visibility`
- `risk_level`
- `resident_touch`
- `privacy_boundary`
- `fallback`
- `feedback`
- `data_policy`

Product meaning:

```text
Community Task Contract = what must be socially true before a person, AI agent, or robot acts
```

Interaction modes should support:

- `solo`
- `parallel`
- `buddy`
- `family`
- `elder_friendly`
- `helper`
- `operator`
- `robot_assist`

See `docs/community-task-contract.md` for the proposed contract language.

## Reference Integrity

The data model uses ids to connect objects:

```text
Task -> Route
Task -> Activity
Task -> POI
Activity -> POI
Activity -> Route
Route -> POI
Pulse -> Task
Pulse -> Route
Pulse -> Activity
Contract -> POI
Contract -> Route
Contract -> Task
```

The current prototype should keep these references valid.

## Privacy and Safety

The open dataset must not include:

- real community maps;
- resident names;
- unit numbers;
- phone numbers;
- access-control credentials;
- camera streams;
- security-sensitive patrol details;
- private property documents.

Real pilot data should only be used with explicit permission and a separate governance policy.
