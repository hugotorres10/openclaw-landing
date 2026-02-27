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
    answer: 'Não. Zero. Nada. Metes o email, pagas, e o OpenClaw instala-se sozinho no teu computador. Só precisas de colar a tua API key de IA (OpenAI, Claude ou Gemini) e apontar a câmara do telemóvel ao QR code do WhatsApp.',
  },
  {
    question: 'O que é uma API key?',
    answer: 'É uma chave que liga o OpenClaw a um serviço de inteligência artificial (como o ChatGPT ou o Claude). Crias uma conta gratuita no provedor, geras a chave, e colas no OpenClaw. Nós guiamos-te passo a passo durante a instalação.',
  },
  {
    question: 'Funciona em que sistemas?',
    answer: 'Windows, macOS e Linux. O site deteta automaticamente o teu sistema operativo e descarrega a versão correta.',
  },
  {
    question: 'Os meus dados estão seguros?',
    answer: 'Sim. O OpenClaw corre 100% no teu computador. As tuas mensagens, contactos e API key nunca saem da tua máquina. Não temos acesso a nada.',
  },
  {
    question: 'E se precisar de ajuda?',
    answer: 'Envia-nos um email para suporte@openclaw.io ou contacta-nos pelo WhatsApp. Respondemos em menos de 24 horas.',
  },
];

export const FEATURES = [
  {
    icon: 'Zap',
    title: 'Instalação automática',
    description: 'Descarrega, instala e abre sozinho. Sem terminal. Sem configurações.',
  },
  {
    icon: 'MessageSquare',
    title: 'WhatsApp com IA',
    description: 'Liga o teu ChatGPT, Claude ou Gemini. Respostas inteligentes automáticas.',
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
    title: 'Mete o teu email e paga',
    description: 'Pagamento único de €9,99. Preço adaptado à tua moeda local.',
  },
  {
    number: '2',
    title: 'Cola a tua API key',
    description: 'Escolhe o teu provedor de IA (OpenAI, Claude ou Gemini) e cola a chave. Nós explicamos tudo.',
  },
  {
    number: '3',
    title: 'Aponta a câmara e pronto',
    description: 'O OpenClaw abre automaticamente. Sincroniza o WhatsApp com o QR code e está feito.',
  },
];
