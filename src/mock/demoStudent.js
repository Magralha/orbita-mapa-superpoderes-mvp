import { agents } from '../game/data/gameData';
import { startPlayerJourney, recordChoice, recordPowerCard } from '../game/engine/rpgEngine';
import { addRealLifeExperience } from '../game/player/playerProfile';
import { buildRealLifeExperience } from '../core/development/realLifeXp';

export function buildDemoStudent() {
  const agent = agents.find((item) => item.id === 'kira') || agents[0];
  let profile = startPlayerJourney(agent);

  profile = recordChoice(profile, {
    node: { id: 'studio_reference_hunt', chapter: 'Caça de Referências' },
    choice: {
      label: 'Misturo referências de mundos diferentes',
      powers: { criar: 3 },
      next: 'studio_original_twist',
    },
  });

  profile = recordChoice(profile, {
    node: { id: 'schoolyard_empathy_scan', chapter: 'Leitura de Empatia' },
    choice: {
      label: 'Pergunto sem colocar a pessoa em exposição',
      powers: { cuidar: 2, proteger: 1 },
      next: 'schoolyard_micro_action',
    },
  });

  profile = recordPowerCard(profile, {
    key: 'comunicar',
    title: 'Mensagem Nítida',
    label: 'Comunicar',
    action: 'Explicar o problema de um jeito que destrava o grupo.',
    powers: { comunicar: 3, conectar: 1 },
  });

  profile = addRealLifeExperience(
    profile,
    buildRealLifeExperience('school_project', {
      id: 'demo-feira-ciencias',
      label: 'Projeto da Feira de Ciências',
      powers: { investigar: 2, comunicar: 1 },
      verified: true,
      source: 'school',
    }),
  );

  profile = addRealLifeExperience(
    profile,
    buildRealLifeExperience('sport_participation', {
      id: 'demo-volei',
      label: 'Vôlei da escola',
      powers: { conectar: 2, organizar: 1 },
      verified: true,
      source: 'school',
    }),
  );

  profile = addRealLifeExperience(
    profile,
    buildRealLifeExperience('culture_participation', {
      id: 'demo-audiovisual',
      label: 'Oficina de vídeo',
      powers: { criar: 2, comunicar: 2 },
      verified: true,
      source: 'municipality',
    }),
  );

  return { agent, profile };
}
