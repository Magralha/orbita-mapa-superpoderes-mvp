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
        label: 'Conduzo o grupo para um acordo respeitoso',
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
        next: 'reveal_memory_wall',
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


  forest_mirror: {
    id: 'forest_mirror',
    world: 'forest',
    type: 'choice',
    chapter: 'Espelho da Floresta',
    title: 'A floresta devolveu a sua escolha como um espelho.',
    text: 'Você percebe que o problema não está só fora. Tem algo no seu jeito de decidir também.',
    choices: [
      {
        label: 'Reconheço que fui rápido demais',
        next: 'forest_pattern',
        powers: { investigar: 2, cuidar: 1 },
      },
      {
        label: 'Procuro o padrão que se repetiu',
        next: 'forest_pattern',
        powers: { investigar: 3, organizar: 1 },
      },
      {
        label: 'Peço outra visão antes de concluir',
        next: 'bridge_entry',
        powers: { conectar: 2, comunicar: 1 },
      },
    ],
  },

  forest_pattern: {
    id: 'forest_pattern',
    world: 'forest',
    type: 'choice',
    chapter: 'Padrão Escondido',
    title: 'As pistas começaram a formar um desenho.',
    text: 'Agora não é mais sobre achar uma pista solta. É sobre entender o sistema.',
    choices: [
      {
        label: 'Organizo as pistas em causas e efeitos',
        next: 'ai_safety_entry',
        powers: { organizar: 3, investigar: 1 },
      },
      {
        label: 'Procuro quem é afetado pelo padrão',
        next: 'schoolyard_entry',
        powers: { cuidar: 2, investigar: 1 },
      },
      {
        label: 'Transformo o padrão em uma história visual',
        next: 'studio_entry',
        powers: { criar: 2, comunicar: 1 },
      },
    ],
  },

  ai_bias_warning: {
    id: 'ai_bias_warning',
    world: 'ai',
    type: 'choice',
    chapter: 'Alerta de Viés',
    title: 'O portal mostrou uma resposta com aparência neutra.',
    text: 'Mas uma resposta pode parecer neutra e ainda assim carregar viés, exclusão ou erro.',
    choices: [
      {
        label: 'Pergunto quem ficou fora da resposta',
        next: 'ai_context_test',
        powers: { cuidar: 2, proteger: 2 },
      },
      {
        label: 'Peço critérios antes de aceitar a conclusão',
        next: 'ai_context_test',
        powers: { investigar: 2, organizar: 2 },
      },
      {
        label: 'Transformo a resposta em perguntas melhores',
        next: 'ai_context_test',
        powers: { comunicar: 2, investigar: 1 },
      },
    ],
  },

  ai_context_test: {
    id: 'ai_context_test',
    world: 'ai',
    type: 'choice',
    chapter: 'Teste de Contexto',
    title: 'A IA tem informação, mas não vive a situação.',
    text: 'Você precisa decidir o que só uma pessoa no contexto conseguiria perceber.',
    choices: [
      {
        label: 'Levo a resposta para conversar com o grupo',
        next: 'bridge_entry',
        powers: { conectar: 2, comunicar: 1 },
      },
      {
        label: 'Crio uma regra para revisar respostas de IA',
        next: 'inventory',
        powers: { proteger: 3, organizar: 1 },
      },
      {
        label: 'Comparo a resposta com sinais do mundo real',
        next: 'inventory',
        powers: { investigar: 3 },
      },
    ],
  },

  bridge_noise: {
    id: 'bridge_noise',
    world: 'bridge',
    type: 'choice',
    chapter: 'Ruído na Ponte',
    title: 'Todo mundo fala, mas ninguém escuta direito.',
    text: 'A ponte está cheia de ruído. A missão só avança se alguém melhorar a comunicação.',
    choices: [
      {
        label: 'Repito o que entendi antes de responder',
        next: 'bridge_role_split',
        powers: { comunicar: 2, cuidar: 1 },
      },
      {
        label: 'Crio turnos para cada pessoa falar',
        next: 'bridge_role_split',
        powers: { organizar: 2, conectar: 1 },
      },
      {
        label: 'Procuro o conflito que está por trás das falas',
        next: 'arena_conflict',
        powers: { investigar: 2, cuidar: 1 },
      },
    ],
  },

  bridge_role_split: {
    id: 'bridge_role_split',
    world: 'bridge',
    type: 'choice',
    chapter: 'Papéis na Ponte',
    title: 'A ponte só aguenta se cada pessoa souber seu papel.',
    text: 'Sem função clara, o grupo anda em círculos.',
    choices: [
      {
        label: 'Dou uma função objetiva para cada pessoa',
        next: 'inventory',
        powers: { organizar: 3, conectar: 1 },
      },
      {
        label: 'Deixo cada um escolher onde contribui melhor',
        next: 'inventory',
        powers: { cuidar: 2, conectar: 2 },
      },
      {
        label: 'Faço um resumo visual da missão',
        next: 'studio_entry',
        powers: { criar: 2, comunicar: 1 },
      },
    ],
  },

  studio_overload: {
    id: 'studio_overload',
    world: 'studio',
    type: 'choice',
    chapter: 'Excesso de Ideias',
    title: 'O estúdio ficou cheio de possibilidades.',
    text: 'Ideia demais também pode travar. Agora você precisa escolher sem matar a criatividade.',
    choices: [
      {
        label: 'Escolho a ideia mais simples de testar',
        next: 'studio_filter',
        powers: { construir: 2, organizar: 1 },
      },
      {
        label: 'Escolho a ideia mais diferente',
        next: 'studio_filter',
        powers: { criar: 3 },
      },
      {
        label: 'Escolho a ideia que mais ajuda alguém',
        next: 'studio_filter',
        powers: { cuidar: 2, criar: 1 },
      },
    ],
  },

  studio_filter: {
    id: 'studio_filter',
    world: 'studio',
    type: 'choice',
    chapter: 'Filtro Criativo',
    title: 'A ideia precisa passar por um filtro.',
    text: 'Uma ideia forte precisa ser desejável, possível e útil.',
    choices: [
      {
        label: 'Testo se alguém realmente usaria',
        next: 'inventory',
        powers: { cuidar: 2, investigar: 1 },
      },
      {
        label: 'Vejo se dá para construir com poucos recursos',
        next: 'workshop_entry',
        powers: { construir: 2, organizar: 1 },
      },
      {
        label: 'Transformo a ideia em uma narrativa clara',
        next: 'inventory',
        powers: { comunicar: 2, criar: 1 },
      },
    ],
  },

  workshop_failure: {
    id: 'workshop_failure',
    world: 'workshop',
    type: 'choice',
    chapter: 'Falha do Protótipo',
    title: 'O primeiro teste falhou.',
    text: 'O tabuleiro não pune o erro. Ele observa como você reage.',
    choices: [
      {
        label: 'Investigo exatamente onde quebrou',
        next: 'workshop_iteration',
        powers: { investigar: 2, construir: 2 },
      },
      {
        label: 'Peço ajuda para testar melhor',
        next: 'workshop_iteration',
        powers: { conectar: 2, cuidar: 1 },
      },
      {
        label: 'Faço uma versão menor e mais segura',
        next: 'workshop_iteration',
        powers: { proteger: 2, construir: 1 },
      },
    ],
  },

  workshop_iteration: {
    id: 'workshop_iteration',
    world: 'workshop',
    type: 'choice',
    chapter: 'Iteração',
    title: 'A segunda versão ficou mais inteligente.',
    text: 'Agora você precisa decidir o que aprendeu com o teste.',
    choices: [
      {
        label: 'Aprendi que preciso simplificar',
        next: 'inventory',
        powers: { organizar: 2, construir: 1 },
      },
      {
        label: 'Aprendi que preciso ouvir usuários',
        next: 'schoolyard_entry',
        powers: { cuidar: 2, investigar: 1 },
      },
      {
        label: 'Aprendi que preciso explicar melhor',
        next: 'stage_intro',
        powers: { comunicar: 2, criar: 1 },
      },
    ],
  },

  schoolyard_pressure: {
    id: 'schoolyard_pressure',
    world: 'schoolyard',
    type: 'choice',
    chapter: 'Pressão do Grupo',
    title: 'A turma começou a seguir a opinião mais barulhenta.',
    text: 'Nem sempre a decisão mais popular é a mais justa.',
    choices: [
      {
        label: 'Pergunto quem discorda e não está falando',
        next: 'schoolyard_boundary',
        powers: { cuidar: 3, comunicar: 1 },
      },
      {
        label: 'Peço uma pausa antes da decisão',
        next: 'schoolyard_boundary',
        powers: { proteger: 2, organizar: 1 },
      },
      {
        label: 'Trago dados antes de votar',
        next: 'city_entry',
        powers: { investigar: 2, organizar: 1 },
      },
    ],
  },

  schoolyard_boundary: {
    id: 'schoolyard_boundary',
    world: 'schoolyard',
    type: 'choice',
    chapter: 'Limite Saudável',
    title: 'A fase pede um limite.',
    text: 'Cuidar também pode significar dizer não.',
    choices: [
      {
        label: 'Defino o que não deve ser exposto',
        next: 'inventory',
        powers: { proteger: 3 },
      },
      {
        label: 'Combino uma forma respeitosa de continuar',
        next: 'inventory',
        powers: { cuidar: 2, conectar: 1 },
      },
      {
        label: 'Transformo o limite em uma regra clara',
        next: 'inventory',
        powers: { organizar: 2, proteger: 1 },
      },
    ],
  },

  city_signal: {
    id: 'city_signal',
    world: 'city',
    type: 'choice',
    chapter: 'Sinal da Cidade',
    title: 'A cidade mostrou muitos dados ao mesmo tempo.',
    text: 'Dados ajudam, mas também podem confundir quando não existe pergunta boa.',
    choices: [
      {
        label: 'Escolho uma pergunta principal',
        next: 'city_priority',
        powers: { organizar: 3 },
      },
      {
        label: 'Procuro uma história por trás dos números',
        next: 'city_priority',
        powers: { investigar: 2, comunicar: 1 },
      },
      {
        label: 'Vejo quem vive o problema de perto',
        next: 'bridge_entry',
        powers: { cuidar: 2, conectar: 1 },
      },
    ],
  },

  city_priority: {
    id: 'city_priority',
    world: 'city',
    type: 'choice',
    chapter: 'Prioridade Urbana',
    title: 'Nem todo problema cabe na primeira missão.',
    text: 'Você precisa escolher o que gera mais impacto agora.',
    choices: [
      {
        label: 'Priorizar o que afeta mais pessoas',
        next: 'inventory',
        powers: { cuidar: 2, organizar: 1 },
      },
      {
        label: 'Priorizar o que tem solução viável',
        next: 'inventory',
        powers: { construir: 2, organizar: 1 },
      },
      {
        label: 'Priorizar o que evita risco maior',
        next: 'inventory',
        powers: { proteger: 2, investigar: 1 },
      },
    ],
  },

  boss_doubt: {
    id: 'boss_doubt',
    world: 'boss',
    type: 'choice',
    chapter: 'Dúvida no Palco',
    title: 'Uma pergunta inesperada desmontou sua certeza.',
    text: 'A fase observa se você tenta parecer perfeito ou se consegue ajustar a rota.',
    choices: [
      {
        label: 'Admito o que ainda não sei',
        next: 'boss_reframe',
        powers: { comunicar: 2, cuidar: 1 },
      },
      {
        label: 'Volto para a evidência principal',
        next: 'boss_reframe',
        powers: { investigar: 2, organizar: 1 },
      },
      {
        label: 'Transformo a pergunta em próximo teste',
        next: 'boss_reframe',
        powers: { construir: 2, criar: 1 },
      },
    ],
  },

  boss_reframe: {
    id: 'boss_reframe',
    world: 'boss',
    type: 'choice',
    chapter: 'Reenquadramento',
    title: 'Você encontrou outro jeito de explicar.',
    text: 'Às vezes a solução não muda. O enquadramento muda.',
    choices: [
      {
        label: 'Uso uma metáfora simples',
        next: 'impact_decision',
        powers: { comunicar: 2, criar: 1 },
      },
      {
        label: 'Mostro o caminho em etapas',
        next: 'impact_decision',
        powers: { organizar: 3 },
      },
      {
        label: 'Conecto a ideia com uma dor real',
        next: 'impact_decision',
        powers: { cuidar: 2, conectar: 1 },
      },
    ],
  },


  forest_fog: {
    id: 'forest_fog',
    world: 'forest',
    type: 'choice',
    chapter: 'Névoa da Floresta',
    title: 'A névoa deixou tudo parecido.',
    text: 'Quando tudo parece importante, o desafio é separar sinal de ruído.',
    choices: [
      {
        label: 'Procuro o sinal que se repete mais vezes',
        next: 'forest_signal_split',
        powers: { investigar: 3, organizar: 1 },
      },
      {
        label: 'Pergunto o que pode estar sendo ignorado',
        next: 'forest_signal_split',
        powers: { cuidar: 2, investigar: 1 },
      },
      {
        label: 'Marco o caminho para não voltar ao mesmo ponto',
        next: 'forest_signal_split',
        powers: { organizar: 2, proteger: 1 },
      },
    ],
  },

  forest_signal_split: {
    id: 'forest_signal_split',
    world: 'forest',
    type: 'choice',
    chapter: 'Sinal ou Ruído',
    title: 'A floresta separou três pistas.',
    text: 'Uma pista fala de causa, outra de pessoa, outra de consequência.',
    choices: [
      {
        label: 'Começo pela causa',
        next: 'forest_hidden_clue',
        powers: { investigar: 2, organizar: 1 },
      },
      {
        label: 'Começo pela pessoa afetada',
        next: 'schoolyard_entry',
        powers: { cuidar: 2, conectar: 1 },
      },
      {
        label: 'Começo pela consequência futura',
        next: 'city_entry',
        powers: { proteger: 2, investigar: 1 },
      },
    ],
  },

  forest_courage: {
    id: 'forest_courage',
    world: 'forest',
    type: 'choice',
    chapter: 'Coragem de Investigar',
    title: 'A última pista pede uma escolha desconfortável.',
    text: 'Algumas descobertas mudam a rota. Outras mudam quem precisa participar.',
    choices: [
      {
        label: 'Levo a descoberta para o grupo',
        next: 'bridge_entry',
        powers: { comunicar: 2, conectar: 1 },
      },
      {
        label: 'Testo a descoberta antes de falar',
        next: 'ai_safety_entry',
        powers: { investigar: 3 },
      },
      {
        label: 'Protejo quem pode ser exposto',
        next: 'schoolyard_entry',
        powers: { proteger: 2, cuidar: 1 },
      },
    ],
  },

  ai_source_check: {
    id: 'ai_source_check',
    world: 'ai',
    type: 'choice',
    chapter: 'Cheque de Fonte',
    title: 'A IA mostrou uma resposta sem mostrar de onde veio.',
    text: 'Resposta sem fonte pode ser atalho ou armadilha.',
    choices: [
      {
        label: 'Peço evidências antes de aceitar',
        next: 'ai_human_review',
        powers: { investigar: 3, proteger: 1 },
      },
      {
        label: 'Comparo com uma fonte humana confiável',
        next: 'ai_human_review',
        powers: { conectar: 1, investigar: 2 },
      },
      {
        label: 'Transformo a resposta em hipótese, não verdade',
        next: 'ai_human_review',
        powers: { organizar: 2, investigar: 1 },
      },
    ],
  },

  ai_human_review: {
    id: 'ai_human_review',
    world: 'ai',
    type: 'choice',
    chapter: 'Revisão Humana',
    title: 'Agora você precisa decidir o papel da pessoa.',
    text: 'A IA pode acelerar. Mas alguém precisa revisar intenção, contexto e impacto.',
    choices: [
      {
        label: 'Reviso o impacto antes da eficiência',
        next: 'ai_ethics_gate',
        powers: { cuidar: 2, proteger: 2 },
      },
      {
        label: 'Reviso a lógica antes da conclusão',
        next: 'ai_ethics_gate',
        powers: { investigar: 2, organizar: 2 },
      },
      {
        label: 'Reviso se o grupo entendeu',
        next: 'ai_ethics_gate',
        powers: { comunicar: 2, conectar: 1 },
      },
    ],
  },

  ai_ethics_gate: {
    id: 'ai_ethics_gate',
    world: 'ai',
    type: 'choice',
    chapter: 'Portão Ético',
    title: 'O portal só abre se a escolha for responsável.',
    text: 'A melhor resposta não é só rápida. Ela precisa ser justa, verificável e útil.',
    choices: [
      {
        label: 'Escolho justiça antes de velocidade',
        next: 'inventory',
        powers: { proteger: 3, cuidar: 1 },
      },
      {
        label: 'Escolho clareza antes de aparência',
        next: 'inventory',
        powers: { comunicar: 2, organizar: 1 },
      },
      {
        label: 'Escolho checagem antes de confiança',
        next: 'inventory',
        powers: { investigar: 3 },
      },
    ],
  },

  ai_prompt_lab: {
    id: 'ai_prompt_lab',
    world: 'ai',
    type: 'choice',
    chapter: 'Laboratório de Prompt',
    title: 'A resposta muda quando a pergunta melhora.',
    text: 'Você percebe que perguntar bem é uma forma de pensar melhor.',
    choices: [
      {
        label: 'Escrevo uma pergunta mais específica',
        next: 'ai_source_check',
        powers: { comunicar: 2, organizar: 1 },
      },
      {
        label: 'Incluo limites e critérios na pergunta',
        next: 'ai_source_check',
        powers: { proteger: 2, organizar: 1 },
      },
      {
        label: 'Peço alternativas com riscos diferentes',
        next: 'ai_source_check',
        powers: { investigar: 2, criar: 1 },
      },
    ],
  },

  bridge_trust_test: {
    id: 'bridge_trust_test',
    world: 'bridge',
    type: 'choice',
    chapter: 'Teste de Confiança',
    title: 'A ponte treme quando alguém promete demais.',
    text: 'O grupo precisa de confiança, mas confiança não nasce de discurso bonito.',
    choices: [
      {
        label: 'Transformo promessa em tarefa clara',
        next: 'bridge_conflict_repair',
        powers: { organizar: 3, conectar: 1 },
      },
      {
        label: 'Pergunto o que cada pessoa consegue assumir',
        next: 'bridge_conflict_repair',
        powers: { cuidar: 2, conectar: 2 },
      },
      {
        label: 'Crio um acordo simples e visível',
        next: 'bridge_conflict_repair',
        powers: { comunicar: 2, organizar: 1 },
      },
    ],
  },

  bridge_conflict_repair: {
    id: 'bridge_conflict_repair',
    world: 'bridge',
    type: 'choice',
    chapter: 'Reparo de Conflito',
    title: 'Uma falha de comunicação virou conflito.',
    text: 'Agora a ponte precisa de reparo, não de pressa.',
    choices: [
      {
        label: 'Reconheço o mal-entendido sem atacar ninguém',
        next: 'arena_conflict',
        powers: { cuidar: 2, comunicar: 2 },
      },
      {
        label: 'Volto ao objetivo comum',
        next: 'arena_conflict',
        powers: { conectar: 2, organizar: 1 },
      },
      {
        label: 'Defino um novo combinado para seguir',
        next: 'inventory',
        powers: { organizar: 2, proteger: 1 },
      },
    ],
  },

  arena_pressure_vote: {
    id: 'arena_pressure_vote',
    world: 'arena',
    type: 'choice',
    chapter: 'Voto sob Pressão',
    title: 'A turma quer decidir rápido para acabar logo.',
    text: 'Mas decidir rápido pode esconder quem não teve coragem de discordar.',
    choices: [
      {
        label: 'Faço uma rodada silenciosa antes do voto',
        next: 'inventory',
        powers: { cuidar: 2, proteger: 1 },
      },
      {
        label: 'Peço uma justificativa para cada opção',
        next: 'inventory',
        powers: { investigar: 2, comunicar: 1 },
      },
      {
        label: 'Transformo a votação em critérios',
        next: 'inventory',
        powers: { organizar: 3 },
      },
    ],
  },

  studio_reference_hunt: {
    id: 'studio_reference_hunt',
    world: 'studio',
    type: 'choice',
    chapter: 'Caça de Referências',
    title: 'O estúdio mostrou ideias parecidas demais.',
    text: 'Criar não é copiar uma referência. É entender por que ela funciona.',
    choices: [
      {
        label: 'Procuro a lógica por trás da referência',
        next: 'studio_original_twist',
        powers: { investigar: 2, criar: 1 },
      },
      {
        label: 'Misturo referências de mundos diferentes',
        next: 'studio_original_twist',
        powers: { criar: 3 },
      },
      {
        label: 'Pergunto para quem essa ideia seria útil',
        next: 'studio_original_twist',
        powers: { cuidar: 2, comunicar: 1 },
      },
    ],
  },

  studio_original_twist: {
    id: 'studio_original_twist',
    world: 'studio',
    type: 'choice',
    chapter: 'Virada Original',
    title: 'A ideia ganhou uma forma própria.',
    text: 'Agora você precisa escolher como ela vai existir no mundo.',
    choices: [
      {
        label: 'Como campanha para mudar comportamento',
        next: 'creative_test',
        powers: { comunicar: 2, criar: 1 },
      },
      {
        label: 'Como protótipo para testar uma solução',
        next: 'workshop_entry',
        powers: { construir: 2, criar: 1 },
      },
      {
        label: 'Como história para gerar empatia',
        next: 'schoolyard_entry',
        powers: { cuidar: 2, comunicar: 1 },
      },
    ],
  },

  studio_feedback_room: {
    id: 'studio_feedback_room',
    world: 'studio',
    type: 'choice',
    chapter: 'Sala de Feedback',
    title: 'A ideia encontrou olhares diferentes.',
    text: 'Feedback bom não serve para obedecer. Serve para enxergar melhor.',
    choices: [
      {
        label: 'Aceito a crítica que melhora a ideia',
        next: 'inventory',
        powers: { cuidar: 1, criar: 2 },
      },
      {
        label: 'Separo opinião de problema real',
        next: 'inventory',
        powers: { investigar: 2, organizar: 1 },
      },
      {
        label: 'Explico a intenção antes de defender',
        next: 'inventory',
        powers: { comunicar: 2, proteger: 1 },
      },
    ],
  },

  workshop_material_choice: {
    id: 'workshop_material_choice',
    world: 'workshop',
    type: 'choice',
    chapter: 'Escolha de Materiais',
    title: 'A oficina só libera recursos limitados.',
    text: 'Você precisa construir com pouco. Isso força clareza.',
    choices: [
      {
        label: 'Uso o material mais simples',
        next: 'workshop_stress_test',
        powers: { construir: 2, organizar: 1 },
      },
      {
        label: 'Uso o material mais seguro',
        next: 'workshop_stress_test',
        powers: { proteger: 2, construir: 1 },
      },
      {
        label: 'Uso o material mais expressivo',
        next: 'workshop_stress_test',
        powers: { criar: 2, comunicar: 1 },
      },
    ],
  },

  workshop_stress_test: {
    id: 'workshop_stress_test',
    world: 'workshop',
    type: 'choice',
    chapter: 'Teste de Estresse',
    title: 'A solução funcionou no cenário fácil.',
    text: 'Agora o tabuleiro testa o que acontece quando algo dá errado.',
    choices: [
      {
        label: 'Vejo onde a solução quebra primeiro',
        next: 'prototype_problem',
        powers: { investigar: 2, construir: 2 },
      },
      {
        label: 'Crio uma proteção antes do teste',
        next: 'prototype_problem',
        powers: { proteger: 2, organizar: 1 },
      },
      {
        label: 'Peço para outra pessoa tentar usar',
        next: 'prototype_problem',
        powers: { cuidar: 1, investigar: 2 },
      },
    ],
  },

  workshop_launch_choice: {
    id: 'workshop_launch_choice',
    world: 'workshop',
    type: 'choice',
    chapter: 'Escolha de Lançamento',
    title: 'A versão teste está pronta para sair da oficina.',
    text: 'Lançar não é terminar. É aprender com o mundo real.',
    choices: [
      {
        label: 'Lanço pequeno para aprender rápido',
        next: 'inventory',
        powers: { construir: 2, investigar: 1 },
      },
      {
        label: 'Lanço com explicação clara',
        next: 'stage_intro',
        powers: { comunicar: 2, organizar: 1 },
      },
      {
        label: 'Lanço com proteção para quem usar',
        next: 'schoolyard_entry',
        powers: { proteger: 2, cuidar: 1 },
      },
    ],
  },

  schoolyard_empathy_scan: {
    id: 'schoolyard_empathy_scan',
    world: 'schoolyard',
    type: 'choice',
    chapter: 'Leitura de Empatia',
    title: 'O pátio está cheio de sinais pequenos.',
    text: 'Nem todo desconforto aparece em voz alta.',
    choices: [
      {
        label: 'Observo quem se afastou',
        next: 'schoolyard_micro_action',
        powers: { cuidar: 3, investigar: 1 },
      },
      {
        label: 'Pergunto sem colocar a pessoa em exposição',
        next: 'schoolyard_micro_action',
        powers: { cuidar: 2, proteger: 1 },
      },
      {
        label: 'Crio uma saída sem constranger ninguém',
        next: 'schoolyard_micro_action',
        powers: { proteger: 2, criar: 1 },
      },
    ],
  },

  schoolyard_micro_action: {
    id: 'schoolyard_micro_action',
    world: 'schoolyard',
    type: 'choice',
    chapter: 'Microação',
    title: 'Uma ação pequena pode mudar o clima.',
    text: 'A fase não pede heroísmo. Pede percepção prática.',
    choices: [
      {
        label: 'Chamo uma pessoa para perto',
        next: 'viral_video',
        powers: { conectar: 2, cuidar: 1 },
      },
      {
        label: 'Mudo o assunto para reduzir exposição',
        next: 'viral_video',
        powers: { proteger: 2, comunicar: 1 },
      },
      {
        label: 'Transformo o ocorrido em aprendizado',
        next: 'inventory',
        powers: { comunicar: 2, cuidar: 1 },
      },
    ],
  },

  schoolyard_repair_circle: {
    id: 'schoolyard_repair_circle',
    world: 'schoolyard',
    type: 'choice',
    chapter: 'Círculo de Reparo',
    title: 'A situação precisa de reparo, não de culpa.',
    text: 'Depois do erro, o grupo precisa decidir como reconstruir confiança.',
    choices: [
      {
        label: 'Ouvir quem foi afetado primeiro',
        next: 'inventory',
        powers: { cuidar: 3 },
      },
      {
        label: 'Criar um combinado para não repetir',
        next: 'inventory',
        powers: { proteger: 2, organizar: 1 },
      },
      {
        label: 'Transformar o erro em campanha educativa',
        next: 'studio_entry',
        powers: { criar: 2, comunicar: 1 },
      },
    ],
  },

  city_hidden_system: {
    id: 'city_hidden_system',
    world: 'city',
    type: 'choice',
    chapter: 'Sistema Invisível',
    title: 'A cidade mostrou que o problema tem camadas.',
    text: 'O que parece falha individual pode ser desenho ruim do sistema.',
    choices: [
      {
        label: 'Mapeio as regras que empurram as pessoas',
        next: 'city_resource_limit',
        powers: { organizar: 2, investigar: 2 },
      },
      {
        label: 'Procuro quem tem menos opção de escolha',
        next: 'city_resource_limit',
        powers: { cuidar: 2, proteger: 1 },
      },
      {
        label: 'Imagino outro desenho para o sistema',
        next: 'city_resource_limit',
        powers: { criar: 2, construir: 1 },
      },
    ],
  },

  city_resource_limit: {
    id: 'city_resource_limit',
    world: 'city',
    type: 'choice',
    chapter: 'Recursos Limitados',
    title: 'A cidade não deixa resolver tudo de uma vez.',
    text: 'Orçamento, tempo, espaço e atenção são limitados.',
    choices: [
      {
        label: 'Escolho a solução com maior alcance',
        next: 'city_map',
        powers: { organizar: 2, cuidar: 1 },
      },
      {
        label: 'Escolho a solução mais rápida de testar',
        next: 'workshop_entry',
        powers: { construir: 2, investigar: 1 },
      },
      {
        label: 'Escolho a solução mais justa',
        next: 'schoolyard_entry',
        powers: { proteger: 2, cuidar: 1 },
      },
    ],
  },

  city_future_scenario: {
    id: 'city_future_scenario',
    world: 'city',
    type: 'choice',
    chapter: 'Cenário Futuro',
    title: 'A cidade mostrou três futuros possíveis.',
    text: 'Toda decisão de hoje empurra um futuro para mais perto.',
    choices: [
      {
        label: 'Futuro eficiente, mas frio',
        next: 'city_future_scenario',
        powers: { organizar: 2, proteger: 1 },
      },
      {
        label: 'Futuro criativo, mas incerto',
        next: 'tradeoff',
        powers: { criar: 2, construir: 1 },
      },
      {
        label: 'Futuro humano, mas mais lento',
        next: 'tradeoff',
        powers: { cuidar: 2, conectar: 1 },
      },
    ],
  },

  boss_time_attack: {
    id: 'boss_time_attack',
    world: 'boss',
    type: 'choice',
    chapter: 'Ataque do Tempo',
    title: 'O boss reduziu o tempo da missão.',
    text: 'Pressa revela prioridades. Você precisa escolher o que não pode cair.',
    choices: [
      {
        label: 'Mantenho a mensagem principal',
        next: 'boss_focus_lock',
        powers: { comunicar: 2, organizar: 1 },
      },
      {
        label: 'Mantenho a segurança do grupo',
        next: 'boss_focus_lock',
        powers: { proteger: 2, cuidar: 1 },
      },
      {
        label: 'Mantenho o teste mais importante',
        next: 'boss_focus_lock',
        powers: { investigar: 2, construir: 1 },
      },
    ],
  },

  boss_focus_lock: {
    id: 'boss_focus_lock',
    world: 'boss',
    type: 'choice',
    chapter: 'Foco Travado',
    title: 'Você escolheu o que não pode cair.',
    text: 'Agora precisa abrir mão do resto sem perder a missão.',
    choices: [
      {
        label: 'Corto o excesso de explicação',
        next: 'boss_pressure',
        powers: { comunicar: 2, organizar: 1 },
      },
      {
        label: 'Corto a parte menos segura',
        next: 'boss_pressure',
        powers: { proteger: 2, investigar: 1 },
      },
      {
        label: 'Corto a ideia que não foi testada',
        next: 'boss_pressure',
        powers: { construir: 2, organizar: 1 },
      },
    ],
  },

  reveal_memory_wall: {
    id: 'reveal_memory_wall',
    world: 'reveal',
    type: 'choice',
    chapter: 'Mural da Jornada',
    title: 'A torre montou um mural com suas escolhas.',
    text: 'O que você repetiu ao longo do caminho provavelmente não foi acaso.',
    choices: [
      {
        label: 'Percebo que eu sempre busquei evidências',
        next: 'reveal_gate',
        powers: { investigar: 3 },
      },
      {
        label: 'Percebo que eu sempre protegi pessoas',
        next: 'reveal_gate',
        powers: { proteger: 2, cuidar: 2 },
      },
      {
        label: 'Percebo que eu sempre tentei transformar em ação',
        next: 'reveal_gate',
        powers: { construir: 2, criar: 2 },
      },
    ],
  },


  power_challenge_1: {
    id: 'power_challenge_1',
    world: 'boss',
    type: 'power-challenge',
    chapter: 'Carta de Poder',
    title: 'Um obstáculo bloqueou o caminho.',
    text: 'Agora não basta escolher uma resposta. Você precisa jogar uma carta de poder para resolver a situação.',
    next: 'tradeoff',
  },

  power_challenge_2: {
    id: 'power_challenge_2',
    world: 'reveal',
    type: 'power-challenge',
    chapter: 'Desafio de Poder',
    title: 'A torre pediu uma prova do seu jeito de agir.',
    text: 'Escolha uma carta para mostrar como você resolve quando não existe resposta óbvia.',
    next: 'boss_pressure',
  },

  power_challenge_3: {
    id: 'power_challenge_3',
    world: 'final',
    type: 'power-challenge',
    chapter: 'Última Carta',
    title: 'Antes da missão final, escolha seu poder decisivo.',
    text: 'Essa escolha mostra o tipo de força que você mais usaria no mundo real.',
    next: 'mission',
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
