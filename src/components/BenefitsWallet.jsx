export function BenefitsWallet({
  benefits,
  currency,
  helpers,
  pulseStages,
  pulses,
  resident,
  residentProgress,
  onClaim,
  onActivate,
  onRedeem
}) {
  const sortedBenefits = [...benefits].sort((left, right) => {
    const leftPulse = pulses.find((pulse) => pulse.id === left.linked_pulse_id);
    const rightPulse = pulses.find((pulse) => pulse.id === right.linked_pulse_id);
    const leftUnlocked = pulseStages[`${resident.id}:${leftPulse.id}`] === "checked_in";
    const rightUnlocked = pulseStages[`${resident.id}:${rightPulse.id}`] === "checked_in";
    return Number(rightUnlocked) - Number(leftUnlocked);
  });

  return (
    <section className="panel-section benefits-wallet">
      <div className="wallet-header">
        <div>
          <p className="eyebrow">{helpers.t("benefits.eyebrow", "Community Benefits")}</p>
          <h2>{helpers.t("benefits.title", "Spirit Wallet")}</h2>
        </div>
        <strong>{residentProgress.spiritPoints} {currency.symbol}</strong>
      </div>
      <p className="muted">{helpers.t("benefits.description", "XP grows your identity. Spirit Points unlock useful community rights and offers.")}</p>
      <div className="benefit-list">
        {sortedBenefits.map((benefit) => {
          const pulse = pulses.find((item) => item.id === benefit.linked_pulse_id);
          const unlocked = pulseStages[`${resident.id}:${pulse.id}`] === "checked_in";
          const state = residentProgress.benefitStates[benefit.id] || (unlocked ? "available" : "locked");
          const canAfford = residentProgress.spiritPoints >= benefit.points_cost;
          const credential = residentProgress.benefitCredentials[benefit.id];

          return (
            <article className={`benefit-card state-${state}`} key={benefit.id}>
              <div className="benefit-card-header">
                <span>{helpers.t(`benefits.types.${benefit.type}`, benefit.type.replaceAll("_", " "))}</span>
                <b>{helpers.t(`benefits.states.${state}`, state.replaceAll("_", " "))}</b>
              </div>
              <h3>{helpers.benefitText(benefit, "name")}</h3>
              <p>{helpers.benefitText(benefit, "description")}</p>
              <dl>
                <div>
                  <dt>{helpers.t("benefits.provider", "Provider")}</dt>
                  <dd>{helpers.benefitText(benefit, "provider_name") || benefit.provider_name}</dd>
                </div>
                <div>
                  <dt>{helpers.t("benefits.cost", "Cost")}</dt>
                  <dd>{benefit.points_cost} {currency.symbol}</dd>
                </div>
              </dl>
              <small>{helpers.benefitText(benefit, "validity_label") || benefit.validity_label}</small>
              {credential && (
                <div className={`benefit-credential credential-${state}`}>
                  <div>
                    <span>{helpers.t("benefits.credential", "Resident benefit pass")}</span>
                    <b>{credential.code}</b>
                  </div>
                  <dl>
                    <div>
                      <dt>{helpers.t("benefits.issued", "Issued")}</dt>
                      <dd>{formatLedgerTime(credential.issued_at, helpers)}</dd>
                    </div>
                    <div>
                      <dt>{helpers.t("benefits.credentialState", "Pass status")}</dt>
                      <dd>{helpers.t(`benefits.states.${state}`, state.replaceAll("_", " "))}</dd>
                    </div>
                  </dl>
                  <div className="credential-timeline" aria-label={helpers.t("benefits.timeline", "Credential timeline")}>
                    <span className="done">{helpers.t("benefits.claimedStep", "Claimed")}</span>
                    <span className={credential.activated_at ? "done" : ""}>{helpers.t("benefits.activatedStep", "Activated")}</span>
                    <span className={credential.redeemed_at ? "done" : ""}>{helpers.t("benefits.redeemedStep", "Redeemed")}</span>
                  </div>
                </div>
              )}
              <div className="benefit-action">
                {state === "locked" && <span>{helpers.t("benefits.unlockHint", "Complete the linked Pulse to unlock.")}</span>}
                {state === "available" && (
                  <button disabled={!canAfford} onClick={() => onClaim(benefit.id)}>
                    {canAfford ? helpers.t("benefits.claim", "Claim benefit") : helpers.t("benefits.needPoints", "Need more SP")}
                  </button>
                )}
                {state === "claimed" && <button onClick={() => onActivate(benefit.id)}>{helpers.t("benefits.activate", "Activate / reserve")}</button>}
                {state === "activated" && <button onClick={() => onRedeem(benefit.id)}>{helpers.t("benefits.redeem", "Simulate redemption")}</button>}
                {state === "redeemed" && <strong>{helpers.t("benefits.redeemed", "Benefit redeemed successfully")}</strong>}
              </div>
            </article>
          );
        })}
      </div>
      <div className="wallet-ledger">
        <div className="wallet-ledger-header">
          <div>
            <span>{helpers.t("benefits.ledger", "Wallet activity")}</span>
            <strong>{residentProgress.pointTransactions.length}</strong>
          </div>
          <small>{helpers.t("benefits.noCashValue", "Synthetic prototype points. No cash value.")}</small>
        </div>
        {residentProgress.pointTransactions.length === 0 ? (
          <p>{helpers.t("benefits.emptyLedger", "Complete a Pulse to create the first wallet entry.")}</p>
        ) : (
          <ol className="wallet-transactions">
            {[...residentProgress.pointTransactions].reverse().map((transaction) => {
              const benefit = benefits.find((item) => item.id === transaction.benefit_id);
              const pulse = pulses.find((item) => item.id === transaction.pulse_id);
              const isEarned = transaction.type === "earned";
              return (
                <li key={transaction.id}>
                  <div>
                    <b>{isEarned
                      ? helpers.t("benefits.earnedFromPulse", "Pulse check-in reward")
                      : helpers.benefitText(benefit, "name")}</b>
                    <span>{isEarned ? helpers.pulseText(pulse, "short_label") : helpers.t("benefits.claimTransaction", "Benefit claimed")}</span>
                  </div>
                  <div>
                    <strong className={isEarned ? "earned" : "spent"}>{isEarned ? "+" : "-"}{transaction.amount} {currency.symbol}</strong>
                    <small>{formatLedgerTime(transaction.created_at, helpers)} · {helpers.t("benefits.balance", "Balance")} {transaction.balance_after}</small>
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </section>
  );
}

function formatLedgerTime(value, helpers) {
  if (!value) return helpers.t("benefits.pending", "Pending");
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}
