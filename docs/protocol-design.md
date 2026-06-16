# CACP Protocol Design

Working name:

```text
CACP: Community AI Collaboration Protocol
```

CACP is an open protocol direction for coordinating people, places, operators, AI agents, and future robots in real community environments.

Community Spirit is the first reference implementation and demonstration environment. The protocol should be independent enough to become its own repository later, but concrete enough to avoid becoming an empty standard.

## Why This Protocol Exists

Physical AI systems are becoming better at perception, planning, simulation, adaptation, and action execution.

Community deployment still needs a separate layer:

```text
Can this action happen here,
around these people,
under this permission boundary,
with this privacy rule,
with this fallback,
and with enough trust to continue?
```

CACP standardizes that layer.

## Relationship to MCP and A2A

MCP connects models to tools, resources, and context.

A2A connects independent agents through agent cards, messages, tasks, artifacts, streaming updates, capability discovery, authentication, authorization, and extensions.

CACP connects physical-AI tasks to real community environments:

```text
MCP: model -> tools / resources
A2A: agent -> agent tasks
CACP: people + places + operators + AI agents + robots -> community task contracts
```

CACP should reuse the successful patterns:

- capability discovery before execution;
- explicit task lifecycle;
- task status updates for long-running work;
- artifacts separated from messages;
- cancellation, pause, and incident review;
- authentication and authorization boundaries;
- extension points instead of one closed model;
- versioned schemas and examples;
- human-in-the-loop states for approval, input, and override.

## Non-goals

CACP is not:

- a robot motion-control protocol;
- a SLAM or world-model format;
- a replacement for MCP or A2A;
- a property management system;
- a surveillance system;
- a claim that real community data is included.

The public prototype stays fictional or synthetic.

## Core Objects

### CommunityActorCard

Equivalent spirit: A2A `AgentCard` and MCP capability negotiation.

It declares what an actor can do before any task is assigned.

Actor examples:

- resident app;
- property operator console;
- AI community assistant;
- patrol robot;
- cleaning robot;
- human helper;
- community supervisor.

Core fields:

```text
actor_id
actor_type
display_name
capabilities
supported_interaction_modes
allowed_zones
forbidden_zones
requires_human_approval
data_boundaries
security
```

### CommunityTaskContract

The main protocol object.

It defines the social, spatial, privacy, and operational terms of a task before execution.

See:

```text
schemas/community-task-contract.schema.json
docs/community-task-contract.md
examples/contracts/
```

### CommunityTaskState

CACP tasks should support a lifecycle suitable for physical spaces:

```text
draft
proposed
needs_resident_notice
needs_operator_approval
approved
scheduled
running
paused
input_required
auth_required
completed
rejected
canceled
failed
incident_review
```

The extra states matter because public and semi-public spaces are not ordinary software queues.

### CommunityArtifact

Messages are for communication. Artifacts are task outputs.

Examples:

- inspection report;
- resident benefit pass;
- anonymized participation summary;
- operator approval record;
- incident report;
- robot-ready route payload;
- resident notice.

### CommunityEvidence

Evidence is the audit-friendly subset of task output.

It should answer:

- what happened;
- when it happened;
- who approved it;
- whether residents were touched;
- whether raw sensor data was stored;
- whether human review was required;
- whether complaints, discomfort, or interruption were reported.

## Operations

The first protocol draft can stay simple:

```text
actors/getCard
contracts/propose
contracts/riskAssess
contracts/requestApproval
contracts/approve
contracts/reject
contracts/schedule
contracts/start
contracts/pause
contracts/cancel
contracts/complete
contracts/reportIncident
contracts/get
contracts/list
contracts/getAuditLog
```

Future bindings can map these to JSON-RPC, REST, A2A extensions, or MCP tools.

## Capability Discovery

Before assigning a task, a client should know:

- supported actor type;
- supported zones;
- supported interaction modes;
- supported sensors;
- supported artifact types;
- whether human approval is required;
- whether resident notice is required;
- whether emergency stop/manual override is available;
- what data boundaries are enforced.

This keeps the protocol closer to MCP/A2A and farther from brittle one-off integrations.

## Human-in-the-loop

CACP should treat human oversight as protocol state, not a vague policy.

Human involvement appears as:

- `needs_operator_approval`;
- `needs_resident_notice`;
- `input_required`;
- `auth_required`;
- `paused`;
- `incident_review`;
- `fallback.owner`.

This is the main difference between a community physical-AI protocol and a pure agent protocol.

## Extension Model

CACP should support versioned extensions:

```text
https://community-spirit.dev/cacp/extensions/elder-friendly/v0.1
https://community-spirit.dev/cacp/extensions/robot-assist/v0.1
https://community-spirit.dev/cacp/extensions/public-notice/v0.1
https://community-spirit.dev/cacp/extensions/incident-review/v0.1
```

Extensions should be optional unless a task declares them as required.

## Versioning

The initial draft should be:

```text
cacp.community_task_contract.v0.1
```

Breaking changes should create a new schema id and migration notes.

## Path to an Independent Repository

CACP should remain inside Community Spirit until the protocol has:

- protocol design document;
- JSON schema;
- at least three contracts;
- validator;
- README explanation;
- one reference implementation path in Community Spirit.

Then it can be extracted to a separate repository, with Community Spirit as its first reference implementation.

