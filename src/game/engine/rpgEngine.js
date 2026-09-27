import {
  applyDevelopmentEvent,
  completeMission,
  createPlayerProfile,
} from '../player/playerProfile';

export const RPG_EVENT_XP = {
  agent_selected: 20,
  choice: 10,
  inventory_confirmed: 15,
  item_used: 8,
  tradeoff_confirmed: 15,
  power_card_used: 20,
  mission_completed: 50,
};

export function startPlayerJourney(agent, options = {}) {
  let profile = createPlayerProfile({ agent, grade: options.grade || 9 });

  profile = applyDevelopmentEvent(profile, {
    type: 'agent_selected',
    label: `Agente ${agent?.name || ''}`,
    xp: RPG_EVENT_XP.agent_selected,
    powers: agent?.powers || {},
    meta: { agentId: agent?.id || null },
  });

  return profile;
}

export function recordChoice(profile, { node, choice }) {
  return applyDevelopmentEvent(profile, {
    type: 'choice',
    label: choice?.label || '',
    xp: RPG_EVENT_XP.choice,
    powers: choice?.powers || {},
    meta: {
      nodeId: node?.id || null,
      chapter: node?.chapter || null,
      next: choice?.next || null,
    },
  });
}

export function recordInventory(profile, items = []) {
  const powers = items.reduce((acc, item) => {
    Object.entries(item?.powers || {}).forEach(([key, value]) => {
      acc[key] = (acc[key] || 0) + value;
    });
    return acc;
  }, {});

  return applyDevelopmentEvent(profile, {
    type: 'inventory_confirmed',
    label: 'Mochila confirmada',
    xp: RPG_EVENT_XP.inventory_confirmed,
    powers,
    meta: { itemIds: items.map((item) => item.id) },
  });
}

export function recordItemUse(profile, item, prompt) {
  return applyDevelopmentEvent(profile, {
    type: 'item_used',
    label: prompt?.label || item?.label || 'Item usado',
    xp: RPG_EVENT_XP.item_used,
    powers: prompt?.powers || item?.powers || {},
    meta: { itemId: item?.id || null },
  });
}

export function recordTradeoff(profile, items = []) {
  const powers = items.reduce((acc, item) => {
    Object.entries(item?.powers || {}).forEach(([key, value]) => {
      acc[key] = (acc[key] || 0) + value;
    });
    return acc;
  }, {});

  return applyDevelopmentEvent(profile, {
    type: 'tradeoff_confirmed',
    label: 'Trade-off resolvido',
    xp: RPG_EVENT_XP.tradeoff_confirmed,
    powers,
    meta: { tradeoffIds: items.map((item) => item.id) },
  });
}

export function recordPowerCard(profile, card) {
  return applyDevelopmentEvent(profile, {
    type: 'power_card_used',
    label: card?.title || card?.label || 'Carta de poder',
    xp: RPG_EVENT_XP.power_card_used,
    powers: card?.powers || {},
    meta: { powerKey: card?.key || null },
  });
}

export function recordMission(profile, mission) {
  return completeMission(profile, mission);
}
