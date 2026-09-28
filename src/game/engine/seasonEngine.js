import { applyDevelopmentEvent } from '../player/playerProfile.js';
import { weeklyQuests } from '../data/seasonData.js';

export function getWeeklyQuestCompletions(v4State) {
  return { ...(v4State?.weeklyQuestCompletions || {}) };
}

export function isWeeklyQuestComplete(v4State, questId) {
  return Boolean(v4State?.weeklyQuestCompletions?.[questId]);
}

export function nextSeasonQuest(v4State) {
  return weeklyQuests.find((quest) => !isWeeklyQuestComplete(v4State, quest.id)) || weeklyQuests[weeklyQuests.length - 1];
}

export function completedSeasonQuestCount(v4State) {
  return weeklyQuests.filter((quest) => isWeeklyQuestComplete(v4State, quest.id)).length;
}

export function markWeeklyQuestComplete(v4State, quest, reflection = '') {
  return {
    ...(v4State || {}),
    weeklyQuestCompletions: {
      ...(v4State?.weeklyQuestCompletions || {}),
      [quest.id]: {
        completedAt: new Date().toISOString(),
        reflection: String(reflection || '').trim(),
        xp: Number(quest.xp || 0),
      },
    },
  };
}

export function applyWeeklyQuestToProfile(profile, quest, reflection = '') {
  const powers = {};
  (quest?.powerKeys || []).forEach((key) => {
    powers[key] = 3;
  });

  return applyDevelopmentEvent(profile, {
    type: 'weekly_quest',
    label: quest?.title || 'Quest semanal',
    xp: Number(quest?.xp || 0),
    powers,
    meta: {
      questId: quest?.id || null,
      week: quest?.week || null,
      territory: 'escola',
      reflection: String(reflection || '').trim(),
    },
  });
}


export function isEpicQuestComplete(v4State) {
  return Boolean(v4State?.epicQuestCompletion);
}

export function markEpicQuestComplete(v4State, epic, reflection = '') {
  return {
    ...(v4State || {}),
    epicQuestCompletion: {
      epicId: epic?.id || 'epic',
      completedAt: new Date().toISOString(),
      reflection: String(reflection || '').trim(),
      xp: Number(epic?.xp || 0),
    },
  };
}

export function applyEpicQuestToProfile(profile, epic, reflection = '') {
  const powers = {};
  (epic?.powerKeys || []).forEach((key) => {
    powers[key] = 3;
  });

  return applyDevelopmentEvent(profile, {
    type: 'epic_quest',
    label: epic?.title || 'Epic Quest',
    xp: Number(epic?.xp || 0),
    powers,
    meta: {
      epicId: epic?.id || null,
      territory: 'escola',
      reflection: String(reflection || '').trim(),
    },
  });
}
