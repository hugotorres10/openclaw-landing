export const SITE_NAME = 'OpenClaw';
export const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://openclaw.io';
export const PRICE = '9,99';
export const CURRENCY = 'USDC';

export const FAQ_ITEMS = [
  {
    question: 'O que é o OpenClaw?',
    answer: 'O OpenClaw é uma ferramenta que automatiza o teu WhatsApp com inteligência artificial. Responde a mensagens, gere contactos e executa tarefas — tudo automaticamente.',
  },
  {
    question: 'Preciso de saber programar?',
    answer: 'Não. Zero. Nada. Metes o email, pagas, e o OpenClaw instala-se sozinho no teu computador. Só precisas de apontar a câmara do telemóvel ao QR code do WhatsApp.',
  },
  {
    question: 'Funciona em que sistemas?',
    answer: 'Windows, macOS e Linux. O site deteta automaticamente o teu sistema operativo e descarrega a versão correta.',
  },
  {
    question: 'E se precisar de ajuda?',
    answer: 'Envia-nos um email para suporte@openclaw.io ou contacta-nos pelo WhatsApp. Respondemos em menos de 24 horas.',
  },
];

export const FEATURES = [
  {
    icon: 'Zap',
    title: 'Instalação em 1 segundo',
    description: 'Sem configurações. Sem terminal. Abre e funciona.',
  },
  {
    icon: 'MessageSquare',
    title: 'WhatsApp com IA',
    description: 'Respostas automáticas inteligentes. O teu assistente pessoal.',
  },
  {
    icon: 'Shield',
    title: 'Privacidade total',
    description: 'Tudo corre no teu computador. Os teus dados nunca saem da tua máquina.',
  },
];

export const STEPS = [
  {
    number: '1',
    title: 'Mete o teu email',
    description: 'Só precisamos do teu email para ativar a licença.',
  },
  {
    number: '2',
    title: 'Paga 9,99 USDC',
    description: 'Pagamento único. Sem subscrições. Sem surpresas.',
  },
  {
    number: '3',
    title: 'Nós tratamos do resto',
    description: 'O OpenClaw descarrega, instala e configura tudo sozinho.',
  },
];
