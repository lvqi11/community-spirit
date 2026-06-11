export function isPulseAcceptingJoins(operationalState) {
  return ["matching", "open"].includes(operationalState);
}

export function hasActivePulsePlace(pulseStage) {
  return ["joined", "checked_in"].includes(pulseStage);
}

export function canCheckinPulse(pulseStage, operationalState) {
  return pulseStage === "joined" && operationalState !== "ended";
}
