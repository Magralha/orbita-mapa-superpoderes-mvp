import { applyDevelopmentEvent } from '../player/playerProfile';

export function localDateKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function completeDailyMission(profile, mission, option) {
  const powers = { ...(mission?.powers || {}) };

  Object.entries(option?.powers || {}).forEach(([key, value]) => {
    powers[key] = (powers[key] || 0) + value;
  });

  return applyDevelopmentEvent(profile, {
    type: 'daily_mission',
    label: mission?.title || 'Missão do dia',
    xp: Number(mission?.xp || 0),
    powers,
    meta: {
      missionId: mission?.id || null,
      territory: mission?.territory || null,
      reflectionId: option?.id || null,
      source: 'daily',
    },
  });
}

export function emptyV4State() {
  return {
    version: 1,
    onboardingComplete: false,
    dailyCompletions: {},
    weeklyQuestCompleted: false,
  };
}

export function normalizeV4State(value) {
  return {
    ...emptyV4State(),
    ...(value || {}),
    dailyCompletions: { ...(value?.dailyCompletions || {}) },
  };
}

export function markDailyComplete(state, mission, option, date = new Date()) {
  const key = localDateKey(date);
  return {
    ...normalizeV4State(state),
    dailyCompletions: {
      ...(state?.dailyCompletions || {}),
      [key]: {
        missionId: mission?.id || null,
        territory: mission?.territory || null,
        optionId: option?.id || null,
        xp: Number(mission?.xp || 0),
      },
    },
  };
}

export function weeklyCompletionCount(state, date = new Date()) {
  const current = new Date(date);
  const day = current.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  const monday = new Date(current);
  monday.setDate(current.getDate() + mondayOffset);

  let count = 0;
  for (let i = 0; i < 7; i += 1) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    if (state?.dailyCompletions?.[localDateKey(d)]) count += 1;
  }
  return count;
}
