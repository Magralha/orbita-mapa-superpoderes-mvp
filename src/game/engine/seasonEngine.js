import { applyDevelopmentEvent } from '../player/playerProfile';
import { weeklyQuests } from '../data/seasonData';

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
