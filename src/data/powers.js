import {
  Search,
  Wand2,
  Heart,
  Hammer,
  MessageCircle,
  Map,
  Shield,
  Users,
} from 'lucide-react';

export const powers = {
  investigar: {
    label: 'Investigar',
    icon: Search,
    text: 'Você percebe pistas, faz perguntas e tenta entender o que está por trás das coisas.',
    shadow: 'Pode travar quando sente que precisa ter todas as respostas antes de começar.',
    missions: [
      'Descobrir por que um problema acontece na escola',
      'Comparar informações antes de decidir',
      'Entrevistar pessoas para entender diferentes pontos de vista',
    ],
    tools: ['pesquisa', 'perguntas', 'dados simples', 'observação', 'IA para organizar ideias'],
  },
  criar: {
    label: 'Criar',
    icon: Wand2,
    text: 'Você gosta de imaginar, inventar, mudar o formato das coisas e colocar sua marca nas ideias.',
    shadow: 'Pode ter muitas ideias ao mesmo tempo e precisar de ajuda para escolher uma e terminar.',
    missions: [
      'Criar uma campanha visual',
      'Inventar uma solução diferente para um problema da turma',
      'Transformar uma ideia em história, vídeo, desenho ou protótipo',
    ],
    tools: ['desenho', 'vídeo', 'storytelling', 'design', 'IA generativa'],
  },
  cuidar: {
    label: 'Cuidar',
    icon: Heart,
    text: 'Você percebe o clima das pessoas, quando alguém está de fora ou quando o grupo precisa de acolhimento.',
    shadow: 'Pode carregar problemas demais ou tentar resolver tudo sozinho.',
    missions: [
      'Criar uma ação de acolhimento',
      'Aproximar pessoas que não se falam',
      'Escutar histórias da comunidade',
    ],
    tools: ['escuta', 'roda de conversa', 'mediação', 'observação'],
  },
  construir: {
    label: 'Construir',
    icon: Hammer,
    text: 'Você aprende fazendo, testando e transformando ideia em algo que funciona no mundo real.',
    shadow: 'Pode querer agir rápido demais antes de entender o problema por completo.',
    missions: [
      'Montar um protótipo simples',
      'Testar uma melhoria na escola',
      'Transformar ideia em plano prático',
    ],
    tools: ['prototipagem', 'materiais simples', 'robótica', 'maquetes', 'teste rápido'],
  },
  comunicar: {
    label: 'Comunicar',
    icon: MessageCircle,
    text: 'Você ajuda ideias a chegarem nas pessoas. Explica, conta, apresenta, convence ou traduz.',
    shadow: 'Pode se preocupar demais com como os outros vão reagir.',
    missions: [
      'Produzir um vídeo curto',
      'Apresentar uma ideia para a turma',
      'Criar uma história sobre o futuro da cidade',
    ],
    tools: ['fala', 'texto', 'vídeo', 'podcast', 'apresentação'],
  },
  organizar: {
    label: 'Organizar',
    icon: Map,
    text: 'Você transforma bagunça em caminho, separando etapas, prioridades e combinados.',
    shadow: 'Pode se irritar quando o grupo muda o plano ou não segue os combinados.',
    missions: [
      'Montar um plano de ação',
      'Dividir tarefas do grupo',
      'Criar uma trilha de passos',
    ],
    tools: ['checklist', 'cronograma', 'mapa mental', 'quadros de tarefas'],
  },
  proteger: {
    label: 'Proteger',
    icon: Shield,
    text: 'Você percebe riscos, injustiças, regras, privacidade e impactos que outras pessoas podem não ver.',
    shadow: 'Pode parecer desconfiado ou rígido quando está tentando evitar problemas.',
    missions: [
      'Criar combinados de uso de IA',
      'Pensar em segurança digital',
      'Defender uma solução mais justa',
    ],
    tools: ['ética', 'privacidade', 'checagem', 'direitos', 'sustentabilidade'],
  },
  conectar: {
    label: 'Conectar',
    icon: Users,
    text: 'Você liga pessoas, grupos e ideias. Muitas vezes seu valor aparece quando ninguém está se entendendo.',
    shadow: 'Pode depender demais do clima do grupo para se sentir bem na missão.',
    missions: [
      'Juntar pessoas para uma causa',
      'Criar ponte entre alunos e professores',
      'Organizar um grupo por afinidade',
    ],
    tools: ['rede', 'convite', 'facilitação', 'parcerias'],
  },
};

export const powerKeys = Object.keys(powers);
