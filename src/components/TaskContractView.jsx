export function TaskContractView({ contract, helpers, compact = false }) {
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
