export const powers = {
  investigar: 'Investigar',
  criar: 'Criar',
  cuidar: 'Cuidar',
  construir: 'Construir',
  comunicar: 'Comunicar',
  organizar: 'Organizar',
  proteger: 'Proteger',
  conectar: 'Conectar',
};

export const agents = [
  {
    id: 'luma',
    name: 'Luma',
    role: 'Agente das Pistas',
    phrase: 'Toda fase tem uma pista escondida.',
    powers: { investigar: 3, organizar: 1 },
  },
  {
    id: 'nexo',
    name: 'Nexo',
    role: 'Agente das Pontes',
    phrase: 'Quando ninguém se entende, eu procuro a ponte.',
    powers: { conectar: 3, comunicar: 1, cuidar: 1 },
  },
  {
    id: 'kira',
    name: 'Kira',
    role: 'Agente das Ideias',
    phrase: 'E se a gente tentasse de outro jeito?',
    powers: { criar: 3, comunicar: 1 },
  },
  {
    id: 'teo',
    name: 'Téo',
    role: 'Agente da Construção',
    phrase: 'Ideia boa precisa sair do papel.',
    powers: { construir: 3, organizar: 1 },
  },
  {
    id: 'zuri',
    name: 'Zuri',
    role: 'Agente do Cuidado',
    phrase: 'Ninguém passa de fase sozinho.',
    powers: { cuidar: 3, conectar: 1 },
  },
  {
    id: 'orin',
    name: 'Orin',
    role: 'Agente da Estratégia',
    phrase: 'Se tem caos, dá para virar caminho.',
    powers: { organizar: 3, investigar: 1 },
  },
  {
    id: 'vega',
    name: 'Vega',
    role: 'Agente da Proteção',
    phrase: 'Antes de avançar, eu vejo quem pode se machucar.',
    powers: { proteger: 3, cuidar: 1, investigar: 1 },
  },
  {
    id: 'mio',
    name: 'Mio',
    role: 'Agente da Voz',
    phrase: 'Uma boa ideia precisa encontrar as pessoas.',
    powers: { comunicar: 3, criar: 1, conectar: 1 },
  },
];

export const nodes = {
  world_entry: {
    id: 'world_entry',
    world: 'forest',
    type: 'choice',
    chapter: 'O Chamado',
    title: 'O tabuleiro acendeu três caminhos.',
    text: 'Seu agente aponta para rotas diferentes. Qual caminho você escolhe primeiro?',
    choices: [
      {
        label: 'Seguir as pistas brilhando no chão',
        next: 'ai_portal',
        powers: { investigar: 3, organizar: 1 },
      },
      {
        label: 'Ir até onde o grupo está tentando se entender',
        next: 'arena_conflict',
        powers: { conectar: 2, cuidar: 2 },
      },
      {
        label: 'Entrar pela porta das ideias estranhas',
        next: 'creative_studio',
        powers: { criar: 3, comunicar: 1 },
      },
    ],
  },

  ai_portal: {
    id: 'ai_portal',
    world: 'ai',
    type: 'choice',
    chapter: 'Portal da IA',
    title: 'O portal respondeu rápido demais.',
    text: 'A resposta parece bonita, mas algo nela parece estranho. O que você faz?',
    choices: [
      {
        label: 'Acendo a lanterna nas partes suspeitas',
        next: 'inventory',
        powers: { investigar: 3, proteger: 1 },
      },
      {
        label: 'Peço para explicar de outro jeito',
        next: 'inventory',
        powers: { comunicar: 2, investigar: 1 },
      },
      {
        label: 'Chamo alguém para revisar comigo',
        next: 'inventory',
        powers: { conectar: 2, cuidar: 1 },
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

  creative_studio: {
    id: 'creative_studio',
    world: 'studio',
    type: 'choice',
    chapter: 'Estúdio das Ideias',
    title: 'As paredes começaram a virar possibilidades.',
    text: 'Tudo pode virar vídeo, desenho, campanha, protótipo ou história.',
    choices: [
      {
        label: 'Transformo o problema em campanha',
        next: 'inventory',
        powers: { criar: 2, comunicar: 2 },
      },
      {
        label: 'Faço um rascunho rápido para testar',
        next: 'inventory',
        powers: { criar: 2, construir: 2 },
      },
      {
        label: 'Procuro a ideia que ajuda mais gente',
        next: 'inventory',
        powers: { cuidar: 1, conectar: 2, criar: 1 },
      },
    ],
  },

  inventory: {
    id: 'inventory',
    world: 'inventory',
    type: 'inventory',
    chapter: 'Inventário',
    title: 'A mochila abriu sozinha.',
    text: 'Escolha 4 itens para atravessar a próxima parte do tabuleiro.',
  },

  tradeoff: {
    id: 'tradeoff',
    world: 'tradeoff',
    type: 'tradeoff',
    chapter: 'Portão dos Trade-offs',
    title: 'O portão exige uma troca.',
    text: 'Você só consegue salvar 2 coisas nesta missão. O que escolhe?',
  },

  mission: {
    id: 'mission',
    world: 'final',
    type: 'mission',
    chapter: 'Missão Final',
    title: 'A torre abriu três missões possíveis.',
    text: 'Escolha a missão que mais combina com o caminho que você construiu.',
  },
};

export const inventoryItems = [
  { id: 'lanterna', label: 'Lanterna de pistas', powers: { investigar: 3 } },
  { id: 'escudo', label: 'Escudo seguro', powers: { proteger: 3, cuidar: 1 } },
  { id: 'microfone', label: 'Microfone de ideias', powers: { comunicar: 3 } },
  { id: 'mapa', label: 'Mapa mutante', powers: { organizar: 3 } },
  { id: 'ferramenta', label: 'Caixa de ferramentas', powers: { construir: 3 } },
  { id: 'pincel', label: 'Pincel de mundos', powers: { criar: 3 } },
  { id: 'chave', label: 'Chave de atalhos', powers: { construir: 1, investigar: 1 } },
  { id: 'corda', label: 'Corda de conexão', powers: { conectar: 2, cuidar: 1 } },
];

export const tradeoffs = [
  { id: 'justica', label: 'Justiça', powers: { proteger: 3, comunicar: 1 } },
  { id: 'grupo', label: 'Clima do grupo', powers: { cuidar: 2, conectar: 2 } },
  { id: 'tempo', label: 'Tempo', powers: { construir: 2, organizar: 1 } },
  { id: 'originalidade', label: 'Originalidade', powers: { criar: 3 } },
  { id: 'qualidade', label: 'Qualidade', powers: { organizar: 2, investigar: 2 } },
  { id: 'seguranca', label: 'Segurança', powers: { proteger: 3 } },
];

export const missions = [
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
];
