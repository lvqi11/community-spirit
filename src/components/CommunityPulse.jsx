import { canCheckinPulse, hasActivePulsePlace, isPulseAcceptingJoins } from "../pulseLifecycle";

export function CommunityPulse({
  helpers,
  pulse,
  rankedPulses,
  match,
  pulseStage,
  operationalState,
  resident,
  residentProgress,
  activeSeason,
  residentProfiles,
  onOpen,
  onJoin,
  onCheckin,
  onLeave,
  onSelectProfile,
  onSelectPulse
}) {
  const hasActivePlace = hasActivePulsePlace(pulseStage);
  const participants = pulse.participants.confirmed + (hasActivePlace ? 1 : 0);
  const acceptingJoins = isPulseAcceptingJoins(operationalState);
  const goalPoints =
    pulse.community_goal.current_points +
    (pulseStage === "joined" ? pulse.community_goal.join_points : 0) +
    (pulseStage === "checked_in" ? pulse.community_goal.join_points + pulse.community_goal.checkin_points : 0);
  const progress = Math.min(100, (goalPoints / pulse.community_goal.target_points) * 100);

  return (
    <section className={`community-pulse pulse-${pulseStage}`}>
      <div className="pulse-profile-switcher">
        <span>{helpers.t("pulse.profileSwitcher", "Try another resident profile")}</span>
        <div>
          {residentProfiles.map((profile) => (
            <button
              className={profile.id === resident.id ? "active" : ""}
              key={profile.id}
              onClick={() => onSelectProfile(profile.id)}
            >
              <strong>{profile.display_name}</strong>
              <small>{helpers.profileText(profile, "profile_label")}</small>
            </button>
          ))}
        </div>
      </div>
      <div className="pulse-deck">
        {rankedPulses.map((entry, index) => (
          <button
            className={entry.pulse.id === pulse.id ? "active" : ""}
            key={entry.pulse.id}
            onClick={() => onSelectPulse(entry.pulse.id)}
          >
            <span>#{index + 1} · {entry.score}</span>
            <strong>{helpers.pulseText(entry.pulse, "short_label") || helpers.pulseText(entry.pulse, "headline")}</strong>
          </button>
        ))}
      </div>
      <div className="pulse-live-row">
        <span><i></i>{helpers.t("pulse.live", "LIVE COMMUNITY PULSE")}</span>
        <div>
          <b>{helpers.t(`pulse.operational.${operationalState}`, operationalState.replaceAll("_", " "))}</b>
          <b>{helpers.t(`pulse.stage.${pulseStage}`, stageLabel(pulseStage))}</b>
        </div>
      </div>
      <h2>{helpers.pulseText(pulse, "headline")}</h2>
      <p>{helpers.pulseText(pulse, "hook")}</p>
      <div className="pulse-match">
        <span>{helpers.t("pulse.whyYou", "Why this found you")}</span>
        <strong>{formatMatchReason(match, helpers)}</strong>
        <div className="pulse-score">
          <b>{match.score}</b>
          <span>{helpers.t("pulse.matchScore", "match score")}</span>
        </div>
      </div>
      <div className="pulse-resident">
        <div>
          <span>{helpers.t("pulse.residentIdentity", "Resident identity")}</span>
          <strong>{resident.display_name} · Lv. {resident.level} {helpers.profileText(resident, "identity_title")}</strong>
        </div>
        <div className="pulse-interest-row">
          {resident.interests.map((interest) => (
            <span key={interest}>{helpers.t(`pulse.interests.${interest}`, interest.replaceAll("_", " "))}</span>
          ))}
        </div>
        <div className="pulse-growth-row">
          <span>{resident.xp} XP</span>
          <span>{residentProgress.spiritPoints} SP</span>
          <span>{residentProgress.badges.length} {helpers.t("growth.badges", "badges")}</span>
          <span>{residentProgress.taskHistory.length} {helpers.t("growth.completed", "completed")}</span>
          <span>{helpers.seasonText(activeSeason, "name")}</span>
        </div>
      </div>
      <div className="pulse-facts">
        <div>
          <span>{helpers.t("pulse.time", "Time")}</span>
          <strong>{pulse.time_label}</strong>
        </div>
        <div>
          <span>{helpers.t("pulse.walk", "Walk")}</span>
          <strong>{pulse.distance_minutes} {helpers.t("units.minutes", "min")}</strong>
        </div>
        <div>
          <span>{helpers.t("pulse.players", "Players")}</span>
          <strong>{participants}/{pulse.participants.target}</strong>
        </div>
      </div>
      <div className="pulse-actions">
        {["discovered", "left"].includes(pulseStage) && acceptingJoins && (
          <>
            <button className="pulse-primary" onClick={onJoin}>{helpers.t("pulse.join", "Join the pulse")}</button>
            <button className="pulse-secondary" onClick={onOpen}>{helpers.t("pulse.viewRoute", "View route")}</button>
          </>
        )}
        {["discovered", "left"].includes(pulseStage) && !acceptingJoins && (
          <div className="pulse-unavailable">
            <strong>{helpers.t(`pulse.unavailable.${operationalState}`, "This Pulse is not accepting new participants.")}</strong>
            <span>{pulse.lifecycle.signup_closes_label}</span>
          </div>
        )}
        {pulseStage === "joined" && (
          <>
            <button className="pulse-primary" disabled={!canCheckinPulse(pulseStage, operationalState)} onClick={onCheckin}>{helpers.t("pulse.checkin", "Simulate arrival check-in")}</button>
            <button className="pulse-secondary" onClick={onLeave}>{helpers.t("pulse.leave", "Leave pulse")}</button>
          </>
        )}
        {pulseStage === "checked_in" && (
        <div className="pulse-success">
          <strong>{helpers.t("pulse.checkedIn", "You arrived. The shared world changed.")}</strong>
            <span>+{pulse.reward.xp} XP · +{pulse.reward.spirit_points} SP · {pulse.reward.badge_progress}</span>
          </div>
        )}
      </div>
      <div className="pulse-lifecycle-note">
        <span>{helpers.pulseText(pulse, "signup_closes_label") || pulse.lifecycle.signup_closes_label}</span>
        <span>{helpers.pulseText(pulse, "cancellation_policy") || pulse.lifecycle.cancellation_policy}</span>
      </div>
      <div className="pulse-goal">
        <div>
          <span>{helpers.t("pulse.sharedGoal", "Community co-op goal")}</span>
          <strong>{helpers.pulseText(pulse, "goal_name") || pulse.community_goal.name}</strong>
          <b>{goalPoints}/{pulse.community_goal.target_points}</b>
        </div>
        <i><span style={{ width: `${progress}%` }}></span></i>
        <p>{helpers.pulseText(pulse, "goal_reward") || pulse.community_goal.unlocked_reward}</p>
      </div>
    </section>
  );
}

function formatMatchReason(match, helpers) {
  const parts = [];
  if (match.reasons.interestMatches.length) {
    parts.push(`${helpers.t("pulse.reason.interests", "Interests")}: ${match.reasons.interestMatches.map((tag) => helpers.t(`pulse.interests.${tag}`, tag.replaceAll("_", " "))).join(", ")}`);
  }
  if (match.reasons.availabilityMatches.length) {
    parts.push(helpers.t("pulse.reason.time", "Your available time matches"));
  }
  if (match.reasons.socialMatch) {
    parts.push(helpers.t("pulse.reason.social", "Fits your social comfort mode"));
  }
  return parts.join(" · ") || helpers.t("pulse.reason.nearby", "Nearby and open now");
}

function stageLabel(stage) {
  if (stage === "left") return "LEFT";
  if (stage === "joined") return "JOINED";
  if (stage === "checked_in") return "CHECKED IN";
  return "MATCHING NOW";
}
