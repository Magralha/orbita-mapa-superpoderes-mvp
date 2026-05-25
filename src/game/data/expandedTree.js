export const agentStartNode = {
  luma: 'forest_entry',
  nexo: 'bridge_entry',
  kira: 'studio_entry',
  teo: 'workshop_entry',
  zuri: 'schoolyard_entry',
  orin: 'city_entry',
  vega: 'ai_safety_entry',
  mio: 'stage_intro',
};

export const expandedNodes = {
  forest_entry: {
    id: 'forest_entry',
    world: 'forest',
    type: 'choice',
    chapter: 'Floresta do Instinto',
    title: 'A floresta acendeu pistas no chão.',
    text: 'O caminho se divide antes que você consiga entender tudo. Qual sinal chama mais sua atenção?',
    choices: [
      {
        label: 'Seguir as pegadas que aparecem e somem',
        next: 'forest_hidden_clue',
        powers: { investigar: 3, organizar: 1 },
      },
      {
        label: 'Chamar alguém antes de entrar sozinho',
        next: 'bridge_entry',
        powers: { conectar: 2, cuidar: 1 },
      },
      {
        label: 'Criar uma marca no caminho para não se perder',
        next: 'studio_entry',
        powers: { criar: 2, organizar: 1 },
      },
    ],
  },

  forest_hidden_clue: {
    id: 'forest_hidden_clue',
    world: 'forest',
    type: 'choice',
    chapter: 'Pista Escondida',
    title: 'A pista aponta para um problema invisível.',
    text: 'Parece que todo mundo está olhando para o lugar errado.',
    choices: [
      {
        label: 'Investigo o que ninguém perguntou ainda',
        next: 'ai_safety_entry',
        powers: { investigar: 3 },
      },
      {
        label: 'Desenho um mapa do que já sabemos',
        next: 'city_entry',
        powers: { organizar: 2, comunicar: 1 },
      },
      {
        label: 'Protejo a pista antes que alguém apague',
        next: 'schoolyard_entry',
        powers: { proteger: 2, cuidar: 1 },
      },
    ],
  },

  ai_safety_entry: {
    id: 'ai_safety_entry',
    world: 'ai',
    type: 'choice',
    chapter: 'Portal da IA',
    title: 'O portal respondeu rápido demais.',
    text: 'A resposta parece bonita, mas alguma coisa nela está estranha.',
    choices: [
      {
        label: 'Testo onde a resposta pode estar errada',
        next: 'ai_truth_check',
        powers: { investigar: 3, proteger: 1 },
      },
      {
        label: 'Peço para a IA explicar de outro jeito',
        next: 'stage_intro',
        powers: { comunicar: 2, investigar: 1 },
      },
      {
        label: 'Transformo a resposta em algo visual para comparar',
        next: 'studio_entry',
        powers: { criar: 2, investigar: 1 },
      },
    ],
  },

  ai_truth_check: {
    id: 'ai_truth_check',
    world: 'ai',
    type: 'choice',
    chapter: 'Teste da Verdade',
    title: 'A IA acertou o tom, mas talvez não o fato.',
    text: 'Você precisa decidir como lidar com uma resposta que parece convincente.',
    choices: [
      {
        label: 'Comparo com outras fontes antes de seguir',
        next: 'inventory',
        powers: { investigar: 3, proteger: 1 },
      },
      {
        label: 'Faço uma versão mais simples para o grupo entender',
        next: 'inventory',
        powers: { comunicar: 2, cuidar: 1 },
      },
      {
        label: 'Crio uma regra de uso para a turma',
        next: 'inventory',
        powers: { proteger: 3, organizar: 1 },
      },
    ],
  },

  bridge_entry: {
    id: 'bridge_entry',
    world: 'bridge',
    type: 'choice',
    chapter: 'Ponte da Conexão',
    title: 'Duas partes do grupo não se falam.',
    text: 'A ponte só aparece quando alguém decide aproximar lados diferentes.',
    choices: [
      {
        label: 'Escuto os dois lados antes de propor caminho',
        next: 'arena_conflict',
        powers: { cuidar: 2, conectar: 2 },
      },
      {
        label: 'Crio uma regra simples para todo mundo participar',
        next: 'schoolyard_entry',
        powers: { organizar: 2, conectar: 1 },
      },
      {
        label: 'Uso uma história para fazer o grupo se enxergar',
        next: 'stage_intro',
        powers: { comunicar: 2, cuidar: 1 },
      },
    ],
  },

  arena_conflict: {
    id: 'arena_conflict',
    world: 'arena',
    type: 'choice',
    chapter: 'Arena da Turma',
    title: 'O grupo travou antes da missão.',
    text: 'Uma pessoa quer mandar, outra sumiu e alguém está quase desistindo.',
    choices: [
      {
        label: 'Aproximo quem ficou de fora',
        next: 'inventory',
        powers: { cuidar: 3, conectar: 1 },
      },
      {
        label: 'Organizo as tarefas antes que vire caos',
        next: 'inventory',
        powers: { organizar: 3, comunicar: 1 },
      },
      {
        label: 'Falo o que ninguém está querendo falar',
        next: 'inventory',
        powers: { comunicar: 2, proteger: 2 },
      },
    ],
  },

  studio_entry: {
    id: 'studio_entry',
    world: 'studio',
    type: 'choice',
    chapter: 'Estúdio das Ideias',
    title: 'As paredes começaram a virar possibilidades.',
    text: 'Tudo pode virar vídeo, desenho, campanha, protótipo ou história.',
    choices: [
      {
        label: 'Transformo o problema em campanha',
        next: 'creative_test',
        powers: { criar: 2, comunicar: 2 },
      },
      {
        label: 'Faço um rascunho rápido para testar',
        next: 'workshop_entry',
        powers: { criar: 2, construir: 2 },
      },
      {
        label: 'Procuro a ideia que ajuda mais gente',
        next: 'schoolyard_entry',
        powers: { cuidar: 1, conectar: 2, criar: 1 },
      },
    ],
  },

  creative_test: {
    id: 'creative_test',
    world: 'studio',
    type: 'choice',
    chapter: 'Teste Criativo',
    title: 'A primeira ideia ficou bonita, mas ainda frágil.',
    text: 'Agora você precisa decidir como melhorar antes de mostrar.',
    choices: [
      {
        label: 'Mostro para alguém e escuto reação real',
        next: 'inventory',
        powers: { comunicar: 2, cuidar: 1 },
      },
      {
        label: 'Faço três versões diferentes',
        next: 'inventory',
        powers: { criar: 3 },
      },
      {
        label: 'Organizo a ideia para ela ficar mais clara',
        next: 'inventory',
        powers: { organizar: 2, comunicar: 1 },
      },
    ],
  },

  workshop_entry: {
    id: 'workshop_entry',
    world: 'workshop',
    type: 'choice',
    chapter: 'Oficina dos Inventores',
    title: 'A oficina está cheia de peças soltas.',
    text: 'Nada está pronto. Mas quase tudo pode virar solução.',
    choices: [
      {
        label: 'Monto um protótipo feio, mas funcional',
        next: 'prototype_problem',
        powers: { construir: 3, criar: 1 },
      },
      {
        label: 'Organizo as peças antes de começar',
        next: 'city_entry',
        powers: { organizar: 3 },
      },
      {
        label: 'Chamo alguém para testar comigo',
        next: 'bridge_entry',
        powers: { conectar: 2, construir: 1 },
      },
    ],
  },

  prototype_problem: {
    id: 'prototype_problem',
    world: 'workshop',
    type: 'choice',
    chapter: 'Protótipo em Risco',
    title: 'O protótipo funciona, mas pode quebrar fácil.',
    text: 'Você precisa escolher entre velocidade, segurança e melhoria.',
    choices: [
      {
        label: 'Testo onde quebra antes de mostrar',
        next: 'inventory',
        powers: { investigar: 2, construir: 2 },
      },
      {
        label: 'Faço uma versão mais segura',
        next: 'inventory',
        powers: { proteger: 2, construir: 1 },
      },
      {
        label: 'Explico o que ainda falta melhorar',
        next: 'inventory',
        powers: { comunicar: 2, organizar: 1 },
      },
    ],
  },

  schoolyard_entry: {
    id: 'schoolyard_entry',
    world: 'schoolyard',
    type: 'choice',
    chapter: 'Pátio da Escola',
    title: 'O problema apareceu no pátio.',
    text: 'Não é uma pergunta abstrata. Tem gente, convivência, vergonha, pressão e escolha.',
    choices: [
      {
        label: 'Percebo quem ficou desconfortável',
        next: 'viral_video',
        powers: { cuidar: 3, proteger: 1 },
      },
      {
        label: 'Entendo por que aquilo virou problema',
        next: 'forest_hidden_clue',
        powers: { investigar: 2, cuidar: 1 },
      },
      {
        label: 'Transformo a situação em conversa clara',
        next: 'stage_intro',
        powers: { comunicar: 2, conectar: 1 },
      },
    ],
  },

  viral_video: {
    id: 'viral_video',
    world: 'schoolyard',
    type: 'choice',
    chapter: 'Vídeo Viral',
    title: 'Um vídeo da turma começou a circular.',
    text: 'Parece engraçado para alguns, mas alguém ficou exposto.',
    choices: [
      {
        label: 'Penso primeiro em quem pode se machucar',
        next: 'inventory',
        powers: { proteger: 3, cuidar: 1 },
      },
      {
        label: 'Chamo o grupo para entender o limite',
        next: 'inventory',
        powers: { comunicar: 2, conectar: 1 },
      },
      {
        label: 'Crio uma campanha sobre respeito digital',
        next: 'inventory',
        powers: { criar: 2, proteger: 1 },
      },
    ],
  },

  city_entry: {
    id: 'city_entry',
    world: 'city',
    type: 'choice',
    chapter: 'Cidade do Futuro',
    title: 'A cidade abriu problemas por todos os lados.',
    text: 'Mobilidade, escola, tecnologia, lixo, convivência, segurança. Por onde começar?',
    choices: [
      {
        label: 'Escolho o problema com maior impacto',
        next: 'city_map',
        powers: { organizar: 2, proteger: 1 },
      },
      {
        label: 'Procuro quem já vive esse problema',
        next: 'bridge_entry',
        powers: { cuidar: 2, investigar: 1 },
      },
      {
        label: 'Imagino uma solução que ninguém tentou',
        next: 'studio_entry',
        powers: { criar: 3 },
      },
    ],
  },

  city_map: {
    id: 'city_map',
    world: 'city',
    type: 'choice',
    chapter: 'Mapa da Cidade',
    title: 'O mapa mostra conexões que ninguém viu.',
    text: 'O problema não está em um lugar só. Ele se espalha.',
    choices: [
      {
        label: 'Desenho uma rota de causa e efeito',
        next: 'inventory',
        powers: { organizar: 3, investigar: 1 },
      },
      {
        label: 'Faço uma pergunta melhor antes de propor solução',
        next: 'inventory',
        powers: { investigar: 3 },
      },
      {
        label: 'Transformo o mapa em uma apresentação',
        next: 'inventory',
        powers: { comunicar: 2, organizar: 1 },
      },
    ],
  },

  stage_intro: {
    id: 'stage_intro',
    world: 'boss',
    type: 'choice',
    chapter: 'Boss da Apresentação',
    title: 'As luzes acenderam e o grupo travou.',
    text: 'Agora todo mundo olha para o palco. O que você faz primeiro?',
    choices: [
      {
        label: 'Começo com uma frase simples',
        next: 'stage_recovery',
        powers: { comunicar: 3 },
      },
      {
        label: 'Divido as falas para tirar pressão',
        next: 'stage_recovery',
        powers: { organizar: 2, cuidar: 1 },
      },
      {
        label: 'Faço uma imagem explicar por nós',
        next: 'stage_recovery',
        powers: { criar: 2, comunicar: 1 },
      },
    ],
  },

  stage_recovery: {
    id: 'stage_recovery',
    world: 'boss',
    type: 'choice',
    chapter: 'Virada do Boss',
    title: 'A apresentação ainda pode ser salva.',
    text: 'O boss não era a plateia. Era a sensação de travar.',
    choices: [
      {
        label: 'Acalmo o grupo antes de continuar',
        next: 'inventory',
        powers: { cuidar: 2, conectar: 1 },
      },
      {
        label: 'Simplifico a mensagem principal',
        next: 'inventory',
        powers: { comunicar: 2, organizar: 1 },
      },
      {
        label: 'Improviso uma saída criativa',
        next: 'inventory',
        powers: { criar: 2, comunicar: 1 },
      },
    ],
  },

  inventory: {
    id: 'inventory',
    world: 'inventory',
    type: 'inventory',
    chapter: 'Inventário',
    title: 'A mochila abriu sozinha.',
    text: 'Escolha 4 itens. Eles serão usados depois para resolver uma fase.',
  },

  item_solution: {
    id: 'item_solution',
    world: 'reveal',
    type: 'use-item',
    chapter: 'Uso do Inventário',
    title: 'Agora escolha um item para resolver a fase.',
    text: 'A ferramenta que você usa mostra como você tenta transformar problema em ação.',
  },

  tradeoff: {
    id: 'tradeoff',
    world: 'tradeoff',
    type: 'tradeoff',
    chapter: 'Portão dos Trade-offs',
    title: 'O portão exige uma troca.',
    text: 'Você só consegue salvar 2 coisas nesta missão. O que escolhe?',
  },

  second_world_choice: {
    id: 'second_world_choice',
    world: 'city',
    type: 'choice',
    chapter: 'Nova Bifurcação',
    title: 'Sua escolha abriu uma nova rota.',
    text: 'O tabuleiro oferece mais um caminho antes da missão final.',
    choices: [
      {
        label: 'Voltar para entender melhor o problema',
        next: 'future_lab',
        powers: { investigar: 2, organizar: 1 },
      },
      {
        label: 'Chamar pessoas para agir junto',
        next: 'bridge_final',
        powers: { conectar: 2, cuidar: 1 },
      },
      {
        label: 'Construir uma solução pequena e testar',
        next: 'workshop_final',
        powers: { construir: 2, criar: 1 },
      },
    ],
  },

  future_lab: {
    id: 'future_lab',
    world: 'ai',
    type: 'choice',
    chapter: 'Laboratório de Futuro',
    title: 'Você entrou no laboratório das perguntas melhores.',
    text: 'Aqui não vence quem responde rápido. Vence quem pergunta melhor.',
    choices: [
      {
        label: 'Testo hipóteses antes de decidir',
        next: 'boss_pressure',
        powers: { investigar: 3, organizar: 1 },
      },
      {
        label: 'Crio critérios para comparar soluções',
        next: 'boss_pressure',
        powers: { organizar: 3 },
      },
      {
        label: 'Procuro o risco escondido da ideia',
        next: 'boss_pressure',
        powers: { proteger: 2, investigar: 1 },
      },
    ],
  },

  bridge_final: {
    id: 'bridge_final',
    world: 'bridge',
    type: 'choice',
    chapter: 'Ponte Final',
    title: 'A missão precisa de mais de uma pessoa.',
    text: 'Você pode escolher como juntar gente diferente.',
    choices: [
      {
        label: 'Crio um combinado para o grupo',
        next: 'boss_pressure',
        powers: { conectar: 2, organizar: 1 },
      },
      {
        label: 'Escuto quem quase nunca fala',
        next: 'boss_pressure',
        powers: { cuidar: 3 },
      },
      {
        label: 'Explico a missão de um jeito que todo mundo entende',
        next: 'boss_pressure',
        powers: { comunicar: 3 },
      },
    ],
  },

  workshop_final: {
    id: 'workshop_final',
    world: 'workshop',
    type: 'choice',
    chapter: 'Teste Final',
    title: 'A solução pequena precisa sair do papel.',
    text: 'Você não precisa resolver tudo. Precisa criar o primeiro passo.',
    choices: [
      {
        label: 'Monto uma versão teste',
        next: 'boss_pressure',
        powers: { construir: 3 },
      },
      {
        label: 'Desenho como a solução funcionaria',
        next: 'boss_pressure',
        powers: { criar: 2, organizar: 1 },
      },
      {
        label: 'Protejo o grupo de um erro previsível',
        next: 'boss_pressure',
        powers: { proteger: 2, construir: 1 },
      },
    ],
  },


  boss_pressure: {
    id: 'boss_pressure',
    world: 'boss',
    type: 'choice',
    chapter: 'Boss de Pressão',
    title: 'O tabuleiro colocou pressão em cima da sua escolha.',
    text: 'Agora não basta escolher uma boa ideia. Você precisa sustentar ela quando a situação aperta.',
    choices: [
      {
        label: 'Respiro, simplifico e explico o essencial',
        next: 'impact_decision',
        powers: { comunicar: 3, organizar: 1 },
      },
      {
        label: 'Protejo o grupo de uma decisão apressada',
        next: 'impact_decision',
        powers: { proteger: 3, cuidar: 1 },
      },
      {
        label: 'Transformo o erro em teste para melhorar',
        next: 'impact_decision',
        powers: { construir: 2, investigar: 2 },
      },
    ],
  },

  impact_decision: {
    id: 'impact_decision',
    world: 'schoolyard',
    type: 'choice',
    chapter: 'Impacto Real',
    title: 'A escolha saiu do tabuleiro e chegou nas pessoas.',
    text: 'A missão agora toca a escola, o grupo ou alguém que pode ser afetado pela sua decisão.',
    choices: [
      {
        label: 'Pergunto quem é mais afetado antes de agir',
        next: 'team_alignment',
        powers: { cuidar: 3, investigar: 1 },
      },
      {
        label: 'Crio um combinado para ninguém ficar perdido',
        next: 'team_alignment',
        powers: { organizar: 2, conectar: 2 },
      },
      {
        label: 'Faço uma mensagem clara para evitar ruído',
        next: 'team_alignment',
        powers: { comunicar: 3, proteger: 1 },
      },
    ],
  },

  team_alignment: {
    id: 'team_alignment',
    world: 'bridge',
    type: 'choice',
    chapter: 'Alinhamento do Time',
    title: 'A ponte só aparece quando o grupo entende o plano.',
    text: 'Você precisa escolher como fazer a missão andar sem virar bagunça.',
    choices: [
      {
        label: 'Divido papéis para cada pessoa saber sua parte',
        next: 'prototype_or_plan',
        powers: { organizar: 3, conectar: 1 },
      },
      {
        label: 'Escuto a pessoa que parece menos envolvida',
        next: 'prototype_or_plan',
        powers: { cuidar: 3, conectar: 1 },
      },
      {
        label: 'Crio uma forma rápida de todo mundo visualizar a ideia',
        next: 'prototype_or_plan',
        powers: { criar: 2, comunicar: 2 },
      },
    ],
  },

  prototype_or_plan: {
    id: 'prototype_or_plan',
    world: 'workshop',
    type: 'choice',
    chapter: 'Primeiro Passo',
    title: 'Antes da missão final, o tabuleiro pede uma prova.',
    text: 'Você precisa mostrar que sua ideia pode virar ação, mesmo pequena.',
    choices: [
      {
        label: 'Monto uma versão teste em poucos minutos',
        next: 'reveal_gate',
        powers: { construir: 3, criar: 1 },
      },
      {
        label: 'Crio um mapa simples de próximos passos',
        next: 'reveal_gate',
        powers: { organizar: 3, investigar: 1 },
      },
      {
        label: 'Apresento a ideia e recolho reação real',
        next: 'reveal_gate',
        powers: { comunicar: 2, cuidar: 1, conectar: 1 },
      },
    ],
  },

  reveal_gate: {
    id: 'reveal_gate',
    world: 'reveal',
    type: 'choice',
    chapter: 'Torre da Revelação',
    title: 'A torre mostra o que seu caminho ativou.',
    text: 'Antes de receber sua missão final, escolha o que mais apareceu na sua jornada.',
    choices: [
      {
        label: 'Eu percebi padrões e pistas escondidas',
        next: 'mission',
        powers: { investigar: 3 },
      },
      {
        label: 'Eu ajudei pessoas a se entenderem',
        next: 'mission',
        powers: { conectar: 2, cuidar: 2 },
      },
      {
        label: 'Eu transformei ideia em ação possível',
        next: 'mission',
        powers: { construir: 2, criar: 2 },
      },
    ],
  },

  mission: {
    id: 'mission',
    world: 'final',
    type: 'mission',
    chapter: 'Missão Final',
    title: 'A torre abriu missões possíveis.',
    text: 'Escolha a missão que mais combina com o caminho que você construiu.',
  },
};

export const inventoryItemsExpanded = [
  { id: 'lanterna', label: 'Lanterna de pistas', powers: { investigar: 3 }, useText: 'Iluminar a parte escondida do problema' },
  { id: 'escudo', label: 'Escudo seguro', powers: { proteger: 3, cuidar: 1 }, useText: 'Proteger alguém antes de avançar' },
  { id: 'microfone', label: 'Microfone de ideias', powers: { comunicar: 3 }, useText: 'Explicar a situação para o grupo' },
  { id: 'mapa', label: 'Mapa mutante', powers: { organizar: 3 }, useText: 'Organizar a rota antes de agir' },
  { id: 'ferramenta', label: 'Caixa de ferramentas', powers: { construir: 3 }, useText: 'Construir uma solução simples' },
  { id: 'pincel', label: 'Pincel de mundos', powers: { criar: 3 }, useText: 'Imaginar uma saída diferente' },
  { id: 'chave', label: 'Chave de atalhos', powers: { construir: 1, investigar: 1 }, useText: 'Abrir um atalho que ninguém viu' },
  { id: 'corda', label: 'Corda de conexão', powers: { conectar: 2, cuidar: 1 }, useText: 'Puxar alguém para dentro da missão' },
  { id: 'bussola', label: 'Bússola de grupo', powers: { conectar: 2, organizar: 1 }, useText: 'Ajudar o grupo a escolher direção' },
  { id: 'relogio', label: 'Relógio da calma', powers: { cuidar: 2, organizar: 1 }, useText: 'Ganhar tempo antes de reagir' },
  { id: 'lupa', label: 'Lupa de verdades', powers: { investigar: 3, proteger: 1 }, useText: 'Checar o que parece certo demais' },
  { id: 'coringa', label: 'Carta coringa', powers: { criar: 1, conectar: 1, comunicar: 1 }, useText: 'Criar uma virada inesperada' },
];

export const tradeoffsExpanded = [
  { id: 'justica', label: 'Justiça', powers: { proteger: 3, comunicar: 1 } },
  { id: 'grupo', label: 'Clima do grupo', powers: { cuidar: 2, conectar: 2 } },
  { id: 'tempo', label: 'Tempo', powers: { construir: 2, organizar: 1 } },
  { id: 'originalidade', label: 'Originalidade', powers: { criar: 3 } },
  { id: 'qualidade', label: 'Qualidade', powers: { organizar: 2, investigar: 2 } },
  { id: 'seguranca', label: 'Segurança', powers: { proteger: 3 } },
];

export const missionsExpanded = [
  {
    id: 'ia_segura',
    label: 'Criar combinados para usar IA sem copiar e sem cair em resposta errada.',
    powers: { proteger: 2, investigar: 2, comunicar: 1 },
  },
  {
    id: 'campanha_turma',
    label: 'Criar uma campanha para melhorar o clima da turma.',
    powers: { comunicar: 2, cuidar: 2, criar: 1 },
  },
  {
    id: 'prototipo_escola',
    label: 'Prototipar uma melhoria simples para a escola.',
    powers: { construir: 3, organizar: 1, criar: 1 },
  },
  {
    id: 'mapa_problema',
    label: 'Investigar um problema real e transformar em mapa de soluções.',
    powers: { investigar: 3, organizar: 2 },
  },
  {
    id: 'ponte_grupo',
    label: 'Criar uma ponte entre pessoas que não estão conseguindo colaborar.',
    powers: { conectar: 3, cuidar: 1, comunicar: 1 },
  },
  {
    id: 'seguranca_digital',
    label: 'Criar um guia de segurança digital para evitar exposição e boatos.',
    powers: { proteger: 3, comunicar: 1, investigar: 1 },
  },
];
