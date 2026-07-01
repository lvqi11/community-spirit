export function TaskContractView({ contract, helpers, protocol = null, compact = false }) {
  if (!contract) {
    return (
      <section className="task-contract-card empty">
        <div>
          <p className="eyebrow">CACP Task Contract</p>
          <h3>No explicit contract yet</h3>
        </div>
        <p>
          This workflow still runs through the base spatial task model. Future releases can add a
          Community Task Contract before AI or robot handoff.
        </p>
      </section>
    );
  }

  const privacyItems = [
    ["Identity", contract.privacy_boundary.real_identity_required ? "required" : "not required"],
    ["Camera", contract.privacy_boundary.camera_feed_allowed ? "allowed" : "not allowed"],
    ["Raw video", contract.privacy_boundary.raw_video_storage_allowed ? "storage allowed" : "not stored"],
    ["Public profile", contract.privacy_boundary.public_profile_required ? "required" : "not required"]
  ];
  const lifecycle = [contract.lifecycle.state, ...contract.lifecycle.allowed_next_states];
  const timeline = buildLifecycleTimeline(contract);
  const evidenceStats = protocol
    ? [
        ["Transitions", protocol.transitions.length],
        ["Evidence", protocol.evidence.length],
        ["Artifacts", protocol.artifacts.length],
        ["Readiness", protocol.pilotReadiness?.readiness_level ?? "not reviewed"]
      ]
    : [];

  return (
    <section className={`task-contract-card ${compact ? "compact" : ""}`}>
      <div className="task-contract-header">
        <div>
          <p className="eyebrow">CACP Task Contract</p>
          <h3>{contract.title}</h3>
        </div>
        <span>{contract.schema_version.replace("cacp.community_task_contract.", "")}</span>
      </div>
      {!compact && <p>{contract.intent}</p>}
      <div className="contract-grid">
        <ContractMetric label="Mode" value={formatToken(contract.interaction_mode, helpers)} />
        <ContractMetric label="Permission" value={formatToken(contract.permission.level, helpers)} />
        <ContractMetric label="Risk" value={formatToken(contract.risk_level, helpers)} />
        <ContractMetric label="Resident touch" value={formatToken(contract.resident_touch, helpers)} />
      </div>
      <div className="contract-review">
        <div>
          <span>Visibility</span>
          <strong>{formatToken(contract.visibility, helpers)}</strong>
        </div>
        <div>
          <span>Human review</span>
          <strong>{contract.permission.human_review_required ? "Required" : "Not required"}</strong>
        </div>
        <div>
          <span>Resident notice</span>
          <strong>{contract.permission.resident_notice_required ? "Required" : "Not required"}</strong>
        </div>
      </div>
      {protocol && (
        <div className="contract-evidence-strip">
          {evidenceStats.map(([label, value]) => (
            <span key={label}>
              <b>{value}</b>
              {label}
            </span>
          ))}
        </div>
      )}
      {!compact && (
        <>
          <div className="privacy-boundary">
            {privacyItems.map(([label, value]) => (
              <span key={label}>
                <b>{label}</b>
                {value}
              </span>
            ))}
          </div>
          <div className="contract-fallback">
            <span>Fallback owner</span>
            <strong>{formatToken(contract.fallback.owner, helpers)}</strong>
            <p>{contract.fallback.condition} {contract.fallback.action}</p>
          </div>
          <div className="contract-feedback">
            <span>{contract.feedback.retention_signal}</span>
            <span>{contract.feedback.trust_signal}</span>
            <span>{contract.feedback.acceptance_signal}</span>
          </div>
        </>
      )}
      <div className="contract-timeline" aria-label="CACP lifecycle timeline">
        <div className="contract-timeline-header">
          <span>CACP lifecycle</span>
          <strong>{formatToken(contract.lifecycle.state, helpers)}</strong>
        </div>
        <ol>
          {timeline.map((step) => (
            <li className={`timeline-step ${step.status}`} key={step.key}>
              <span className="timeline-dot" aria-hidden="true" />
              <div>
                <strong>{step.label}</strong>
                <small>{step.note}</small>
              </div>
            </li>
          ))}
        </ol>
      </div>
      {!compact && (
        <>
          {protocol && <ContractEvidenceView protocol={protocol} helpers={helpers} />}
          {protocol?.pilotReadiness && <PilotReadinessView checklist={protocol.pilotReadiness} helpers={helpers} />}
          <div className="contract-lifecycle">
            {lifecycle.map((state, index) => (
              <span className={index === 0 ? "current" : ""} key={`${state}-${index}`}>
                {formatToken(state, helpers)}
              </span>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

function ContractMetric({ label, value }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function formatToken(value, helpers) {
  return helpers.t(`dashboard.labels.${value}`, value.replaceAll("_", " "));
}

function ContractEvidenceView({ protocol, helpers }) {
  if (!protocol.transitions.length) {
    return (
      <div className="contract-evidence-view empty">
        <div>
          <span>Contract Evidence View</span>
          <strong>No transition evidence yet</strong>
        </div>
        <p>This task contract has no public synthetic transition record attached in the demo data.</p>
      </div>
    );
  }

  return (
    <div className="contract-evidence-view">
      <div className="contract-evidence-title">
        <div>
          <span>Contract Evidence View</span>
          <strong>Auditable transition chain</strong>
        </div>
        <small>Synthetic public demo data · no real resident identity</small>
      </div>
      <ol className="evidence-chain">
        {protocol.transitions.map((transition) => (
          <li key={transition.transition_id}>
            <div className="evidence-transition">
              <span>
                {formatToken(transition.from_state, helpers)} → {formatToken(transition.to_state, helpers)}
              </span>
              <strong>{transition.actor?.display_name || transition.requested_by}</strong>
              <small>{formatTimestamp(transition.occurred_at)}</small>
            </div>
            <p>{transition.reason}</p>
            <div className="evidence-records">
              {transition.evidence.map((record) => (
                <article key={record.evidence_id}>
                  <span>{formatToken(record.evidence_type, helpers)}</span>
                  <strong>Evidence</strong>
                  <small>{formatFacts(record.facts)}</small>
                </article>
              ))}
              {transition.artifacts.map((artifact) => (
                <article key={artifact.artifact_id}>
                  <span>{formatToken(artifact.artifact_type, helpers)}</span>
                  <strong>Artifact</strong>
                  <small>{artifact.summary}</small>
                </article>
              ))}
            </div>
            <div className="evidence-guardrails">
              {transition.evidence.map((record) => (
                <span key={`${record.evidence_id}-policy`}>
                  {record.synthetic ? "synthetic" : "real-world gated"} · {record.data_policy.replaceAll("_", " ")}
                </span>
              ))}
              {transition.artifacts.map((artifact) => (
                <span key={`${artifact.artifact_id}-privacy`}>
                  {artifact.contains_personal_data ? "personal data present" : "no personal data"} · {artifact.visibility.replaceAll("_", " ")}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function PilotReadinessView({ checklist, helpers }) {
  const gateEntries = Object.entries(checklist.gates);
  const summary = gateEntries.reduce(
    (current, [, gate]) => ({
      ...current,
      [gate.status]: (current[gate.status] ?? 0) + 1
    }),
    {}
  );
  const priorityGates = gateEntries
    .filter(([, gate]) => gate.status === "needs_real_world_review")
    .slice(0, 4);

  return (
    <div className="pilot-readiness-view">
      <div className="pilot-readiness-title">
        <div>
          <span>Pilot Readiness</span>
          <strong>{formatToken(checklist.readiness_level, helpers)}</strong>
        </div>
        <small>Public demo boundary · real pilot still gated</small>
      </div>
      <p>{checklist.summary}</p>
      <div className="pilot-readiness-metrics">
        <span><b>{summary.simulated_for_demo ?? 0}</b>simulated</span>
        <span><b>{summary.needs_real_world_review ?? 0}</b>needs review</span>
        <span><b>{summary.not_applicable ?? 0}</b>not applicable</span>
      </div>
      <div className="pilot-readiness-gates">
        {priorityGates.map(([gateName, gate]) => (
          <article key={gateName}>
            <span>{formatToken(gateName, helpers)}</span>
            <strong>{formatToken(gate.status, helpers)}</strong>
            <small>{gate.real_pilot_requirement}</small>
          </article>
        ))}
      </div>
      <div className="evidence-guardrails">
        <span>synthetic only</span>
        <span>no real residents</span>
        <span>no locks/cameras/sensors/robots</span>
        <span>requires separate pilot approval</span>
      </div>
    </div>
  );
}

function formatFacts(facts) {
  return Object.entries(facts)
    .map(([key, value]) => `${key.replaceAll("_", " ")}: ${String(value)}`)
    .join(" · ");
}

function formatTimestamp(value) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function buildLifecycleTimeline(contract) {
  const currentState = contract.lifecycle.state;
  const allowedNextStates = new Set(contract.lifecycle.allowed_next_states);
  const currentOrder = lifecycleOrder[currentState] ?? 0;
  const noticeRequired = contract.permission.resident_notice_required;
  const reviewRequired = contract.permission.human_review_required;

  const steps = [
    {
      key: "notice",
      state: "needs_resident_notice",
      label: "Waiting notice",
      note: noticeRequired ? "Resident notice evidence required before review." : "Public activity; resident notice is not required.",
      optional: !noticeRequired
    },
    {
      key: "approval",
      state: "needs_operator_approval",
      label: "Human approval",
      note: reviewRequired ? "Operator or helper approval gates the task." : "Low-risk contract can move without extra review.",
      optional: !reviewRequired
    },
    {
      key: "scheduled",
      state: "scheduled",
      label: "Scheduled",
      note: "Time, place, and participant expectations are confirmed."
    },
    {
      key: "running",
      state: "running",
      label: "Running",
      note: "Execution starts under the contract boundaries."
    },
    {
      key: "completed",
      state: "completed",
      label: "Completed",
      note: "Outcome summary and feedback can close the loop."
    },
    {
      key: "incident_review",
      state: "incident_review",
      label: "Incident review",
      note: "Fallback branch if discomfort, safety, or robot uncertainty appears.",
      branch: true
    }
  ];

  return steps.map((step) => {
    if (currentState === step.state) {
      return { ...step, status: "current" };
    }

    if (step.branch) {
      return {
        ...step,
        status: currentState === "incident_review" || allowedNextStates.has("incident_review") ? "next" : "branch"
      };
    }

    if (step.optional && hasPassedOptionalGate(step.key, currentState)) {
      return { ...step, status: "skipped" };
    }

    const stepOrder = lifecycleOrder[step.state] ?? 99;
    if (stepOrder < currentOrder || (step.key === "approval" && currentState === "approved")) {
      return { ...step, status: "done" };
    }

    if (allowedNextStates.has(step.state) || (step.state === "scheduled" && currentState === "approved")) {
      return { ...step, status: "next" };
    }

    return { ...step, status: "locked" };
  });
}

const lifecycleOrder = {
  proposed: 0,
  needs_resident_notice: 1,
  needs_operator_approval: 2,
  approved: 3,
  scheduled: 4,
  running: 5,
  paused: 5,
  completed: 6,
  rejected: 7,
  canceled: 7,
  incident_review: 8
};

function hasPassedOptionalGate(key, currentState) {
  if (key === "notice") {
    return (lifecycleOrder[currentState] ?? 0) > lifecycleOrder.needs_resident_notice;
  }

  if (key === "approval") {
    return (lifecycleOrder[currentState] ?? 0) > lifecycleOrder.needs_operator_approval;
  }

  return false;
}
