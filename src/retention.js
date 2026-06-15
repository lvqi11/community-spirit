export function createRetentionMetrics(profiles, progressByProfile, seasons) {
  const byProfile = Object.fromEntries(
    profiles.map((profile) => [
      profile.id,
      createResidentRetention(profile, progressByProfile[profile.id], seasons)
    ])
  );
  const profileMetrics = Object.values(byProfile);
  const participants = profileMetrics.filter((metric) => metric.totalCheckins > 0);
  const firstParticipants = participants.length;
  const returners = participants.filter((metric) => metric.returnedWithin7Days).length;
  const totalStreak = profileMetrics.reduce((sum, metric) => sum + metric.currentStreak, 0);
  const seasonComparison = Object.fromEntries(
    seasons.map((season) => [
      season.id,
      profileMetrics.reduce((sum, metric) => sum + (metric.seasonVisits[season.id] || 0), 0)
    ])
  );

  return {
    byProfile,
    firstParticipationRate: percentage(firstParticipants, profiles.length),
    sevenDayReturnRate: percentage(returners, Math.max(1, participants.length)),
    averageStreak: roundOne(totalStreak / Math.max(1, profiles.length)),
    seasonComparison
  };
}

export function createResidentRetention(profile, progress = {}, seasons = []) {
  const baseline = profile.retention || {};
  const seasonVisits = Object.fromEntries(
    seasons.map((season) => [
      season.id,
      (baseline.season_visits?.[season.id] || 0) + (progress.seasonCheckins?.[season.id] || 0)
    ])
  );
  const completedNow = progress.taskHistory?.length || 0;
  const totalCheckins = (baseline.prior_checkins_30d || 0) + completedNow;
  const lastSeenDaysAgo = completedNow > 0 ? 0 : baseline.last_seen_days_ago ?? null;
  const currentStreak = (baseline.current_streak || 0) + completedNow;

  return {
    totalCheckins,
    firstParticipated: totalCheckins > 0,
    returnedWithin7Days: totalCheckins >= 2 && lastSeenDaysAgo !== null && lastSeenDaysAgo <= 7,
    currentStreak,
    lastSeenDaysAgo,
    seasonVisits
  };
}

function percentage(value, total) {
  return Math.round((value / Math.max(1, total)) * 100);
}

function roundOne(value) {
  return Math.round(value * 10) / 10;
}
