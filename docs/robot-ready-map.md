# Robot-ready Map

This document explains the future robot-facing direction of Community Spirit.

The open prototype does not control a real robot.

Instead, it defines the first semantic layer that a future service robot could use.

## Why Robots Need More Than Geometry

A robot cannot operate safely in a residential community with geometry alone.

It needs to understand:

- which places are accessible;
- which places are private;
- which routes are safe;
- which POIs are inspection targets;
- what task should be done at each point;
- what data can be captured;
- how to report results back to property operators.

Community Spirit treats this as a semantic map problem.

## Current Robot-ready Fields

The current data files already include robot-relevant fields.

In `sample-pois.json`:

- `robot_accessible`
- `access_level`
- `public_visibility`
- `tags`

In `sample-routes.json`:

- `scenario: robot_patrol`
- `robot_context`
- `access_requirements`
- `waypoints`

In `sample-tasks.json`:

- `type: robot_patrol`
- `expected_outputs`
- `privacy_notes`

In `sample-activities.json`:

- internal safety inspection activity;
- linked robot patrol route;
- safety notes.

## Example Robot Task

```text
Task:
  Robot Fire Passage Patrol

Route:
  Property Center
  -> Fire Passage
  -> Underground Garage Entrance
  -> Waste Collection Point
  -> Property Center

Inspection goals:
  - Check whether the fire passage is blocked.
  - Check whether the garage entrance is clear.
  - Capture images of abnormal obstacles.
  - Return inspection results to the property dashboard.
```

## Future Export Shape

A future robot task export might look like:

```json
{
  "task_id": "task-robot-fire-passage-patrol",
  "robot_type": "wheeled_patrol_robot",
  "route": [
    {
      "poi_id": "poi-property-center",
      "action": "start"
    },
    {
      "poi_id": "poi-fire-passage",
      "action": "inspect_obstruction"
    },
    {
      "poi_id": "poi-underground-garage-entrance",
      "action": "inspect_clearance"
    },
    {
      "poi_id": "poi-property-center",
      "action": "upload_report"
    }
  ],
  "privacy_policy": {
    "capture_faces": false,
    "store_raw_video": false,
    "require_property_approval": true
  }
}
```

## Integration Path

The integration path should be staged:

### Stage 1: Structured Export

Export semantic routes and tasks as JSON.

No real robot required.

### Stage 2: Simulation

Convert the community data into a simple simulation environment.

Possible future targets:

- Unity;
- Unreal Engine;
- Gazebo;
- Isaac Sim.

### Stage 3: Robot SDK Bridge

Connect patrol tasks to a real robot SDK after safety and governance checks.

Possible robot categories:

- wheeled patrol robot;
- quadruped patrol robot;
- cleaning robot;
- delivery robot;
- guide robot.

### Stage 4: Dynamic Update

Use robot inspection results to update the community digital twin:

- blocked passage;
- broken light;
- misplaced object;
- sanitation issue;
- temporary construction.

## Safety Principles

Robot integration should follow these principles:

- property approval before robot task execution;
- no hidden resident surveillance;
- no public exposure of raw camera data;
- no robot entry into private or unauthorized spaces;
- human review for safety-critical findings;
- clear logs for task dispatch and results.

The robot-ready layer is a long-term direction, not an MVP dependency.
