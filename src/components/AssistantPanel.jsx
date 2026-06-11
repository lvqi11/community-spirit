import { answerText } from "../domain";

export function AssistantPanel({
  helpers,
  language,
  prompt,
  promptSamples,
  selectedRoute,
  selectedTask,
  onAsk,
  onPrompt,
  onSelectTask,
  activeSeason,
  seasons,
  seasonCheckins,
  resident,
  residentProgress,
  onSelectSeason
}) {
  return (
    <aside className="assistant-panel">
      <section className="panel-section">
        <h2>{helpers.t("agent.title", "Community Agent")}</h2>
        <p className="muted">
          {helpers.t(
            "agent.description",
            "Ask a resident, property, or robot task. The prototype maps intent to structured community data."
          )}
        </p>
        <label className="prompt-label" htmlFor="promptInput">
          {helpers.t("agent.promptLabel", "Prompt")}
        </label>
        <div className="prompt-row">
          <input
            id="promptInput"
            value={prompt}
            onChange={(event) => onPrompt(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && onAsk()}
          />
          <button onClick={onAsk}>{helpers.t("agent.askButton", "Ask")}</button>
        </div>
      </section>
      <section className="panel-section">
        <h3>{helpers.t("agent.samplePrompts", "Sample Prompts")}</h3>
        <div className="prompt-buttons">
          {promptSamples.map((sample) => (
            <button
              className={sample.taskId === selectedTask.id ? "active" : ""}
              key={sample.taskId}
              onClick={() => {
                onPrompt(sample.prompt);
                onSelectTask(sample.taskId);
              }}
            >
              {helpers.t(`promptSamples.${sample.taskId}`, sample.label)}
            </button>
          ))}
        </div>
      </section>
      <section className="panel-section answer-box">
        <h3>{helpers.t("agent.answerTitle", "Grounded Answer")}</h3>
        <p className="answer-text">{answerText(selectedTask, selectedRoute, helpers, language)}</p>
      </section>
      <section className="panel-section">
        <SeasonArc
          activeSeason={activeSeason}
          helpers={helpers}
          resident={resident}
          residentProgress={residentProgress}
          seasonCheckins={seasonCheckins}
          seasons={seasons}
          selectedTask={selectedTask}
          onSelectSeason={onSelectSeason}
        />
      </section>
    </aside>
  );
}

function SeasonArc({ activeSeason, helpers, resident, residentProgress, seasonCheckins, seasons, selectedTask, onSelectSeason }) {
  const completedMilestones = activeSeason.milestones.filter((milestone) => seasonCheckins >= milestone.required_checkins).length;
  const progress = (completedMilestones / activeSeason.milestones.length) * 100;
  const nextLevelBase = (resident.level - 1) * 150;
  const nextLevelTarget = resident.level * 150;
  const levelProgress = Math.min(100, ((resident.xp - nextLevelBase) / (nextLevelTarget - nextLevelBase)) * 100);

  return (
    <div className="season-arc">
      <div className="season-switcher">
        {seasons.map((season) => (
          <button className={season.id === activeSeason.id ? "active" : ""} key={season.id} onClick={() => onSelectSeason(season.id)}>
            {helpers.seasonText(season, "short_name") || helpers.seasonText(season, "name")}
          </button>
        ))}
      </div>
      <div className="season-header">
        <div>
          <p className="eyebrow">{helpers.t("season.eyebrow", "Season Arc")}</p>
          <h3>{helpers.seasonText(activeSeason, "name")}</h3>
        </div>
        <strong>{completedMilestones}/{activeSeason.milestones.length}</strong>
      </div>
      <p>{helpers.seasonText(activeSeason, "theme")}</p>
      <div className="season-progress" aria-label="Season progress">
        <i style={{ width: `${progress}%` }}></i>
      </div>
      <div className="resident-growth-summary">
        <div>
          <span>{resident.display_name} · Lv. {resident.level}</span>
          <strong>{resident.xp} XP</strong>
        </div>
        <i><span style={{ width: `${levelProgress}%` }}></span></i>
        <small>{residentProgress.badges.length} {helpers.t("growth.badges", "badges")} · {residentProgress.taskHistory.length} {helpers.t("growth.completed", "completed")}</small>
      </div>
      <div className="season-active">
        <span>{helpers.t("season.activeQuest", "Active quest")}</span>
        <strong>{helpers.taskText(selectedTask, "name")}</strong>
      </div>
      <ul>
        {activeSeason.milestones.map((milestone) => (
          <li className={seasonCheckins >= milestone.required_checkins ? "completed" : ""} key={milestone.id}>
            {helpers.seasonText(activeSeason, `milestone_${milestone.id}`) || milestone.label}
          </li>
        ))}
      </ul>
      <div className="season-reward">
        <span>{helpers.t("season.rewardLabel", "Season reward")}</span>
        <strong>{helpers.seasonText(activeSeason, "reward_name") || activeSeason.reward.name}</strong>
      </div>
    </div>
  );
}
