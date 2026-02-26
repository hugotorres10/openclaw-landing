'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Settings, Power, PowerOff, ChevronDown, ChevronUp,
  ExternalLink, Copy, Check, Bell, BellOff, Plus, Trash2,
} from 'lucide-react';

/* ── SVG Icons (same as Hero) ── */
const GreenArrow = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-pink-400">
    <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
    <circle cx="18" cy="6" r="1.5" fill="currentColor"/>
  </svg>
);

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-blue-500">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const TelegramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#26A5E4">
    <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.492-1.302.48-.428-.013-1.252-.242-1.865-.44-.751-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

/* ── Types ── */
type IntegrationId = 'trader' | 'assistant' | 'social' | 'messaging';

interface SubService {
  id: string;
  name: string;
  icon: React.ReactNode;
  connected: boolean;
  description: string;
  fields: { key: string; label: string; placeholder: string; type?: string }[];
}

interface Integration {
  id: IntegrationId;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  enabled: boolean;
  notifications: boolean;
  subServices: SubService[];
}

/* ── Initial State ── */
const INITIAL_INTEGRATIONS: Integration[] = [
  {
    id: 'trader',
    title: 'Stock & Crypto Trader',
    description: 'Conecta exchanges e automatiza trades com IA.',
    icon: <GreenArrow />,
    color: 'from-green-500/20 to-emerald-500/20',
    enabled: false,
    notifications: true,
    subServices: [
      {
        id: 'binance',
        name: 'Binance',
        icon: <span className="text-yellow-400 font-bold text-sm">B</span>,
        connected: false,
        description: 'Conecta à Binance para trading automático de crypto.',
        fields: [
          { key: 'apiKey', label: 'API Key', placeholder: 'A tua Binance API key' },
          { key: 'apiSecret', label: 'API Secret', placeholder: 'O teu API secret', type: 'password' },
        ],
      },
      {
        id: 'coinbase',
        name: 'Coinbase',
        icon: <span className="text-blue-400 font-bold text-sm">C</span>,
        connected: false,
        description: 'Conecta à Coinbase para comprar e vender crypto.',
        fields: [
          { key: 'apiKey', label: 'API Key', placeholder: 'A tua Coinbase API key' },
          { key: 'apiSecret', label: 'API Secret', placeholder: 'O teu API secret', type: 'password' },
        ],
      },
      {
        id: 'tradingview',
        name: 'TradingView',
        icon: <span className="text-blue-300 font-bold text-sm">TV</span>,
        connected: false,
        description: 'Recebe sinais e alertas do TradingView.',
        fields: [
          { key: 'webhook', label: 'Webhook URL', placeholder: 'Gerado automaticamente' },
        ],
      },
    ],
  },
  {
    id: 'assistant',
    title: 'Assistente Pessoal',
    description: 'IA pessoal que gere tarefas, agenda e lembretes.',
    icon: <img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/openclaw-dark.png" alt="OpenClaw" width={28} height={28} />,
    color: 'from-orange-500/20 to-red-500/20',
    enabled: false,
    notifications: true,
    subServices: [
      {
        id: 'openai',
        name: 'OpenAI',
        icon: <span className="text-green-400 font-bold text-sm">AI</span>,
        connected: false,
        description: 'Usa GPT-4 como motor de IA do assistente.',
        fields: [
          { key: 'apiKey', label: 'API Key', placeholder: 'sk-...', type: 'password' },
        ],
      },
      {
        id: 'anthropic',
        name: 'Claude',
        icon: <span className="text-orange-400 font-bold text-sm">C</span>,
        connected: false,
        description: 'Usa Claude como motor de IA do assistente.',
        fields: [
          { key: 'apiKey', label: 'API Key', placeholder: 'sk-ant-...', type: 'password' },
        ],
      },
      {
        id: 'google',
        name: 'Gemini',
        icon: <span className="text-blue-400 font-bold text-sm">G</span>,
        connected: false,
        description: 'Usa Gemini como motor de IA do assistente.',
        fields: [
          { key: 'apiKey', label: 'API Key', placeholder: 'AIza...', type: 'password' },
        ],
      },
    ],
  },
  {
    id: 'social',
    title: 'Redes Sociais',
    description: 'Publica, agenda e responde automaticamente.',
    icon: <div className="flex gap-1.5"><InstagramIcon /><XIcon /><FacebookIcon /></div>,
    color: 'from-pink-500/20 to-purple-500/20',
    enabled: false,
    notifications: true,
    subServices: [
      {
        id: 'instagram',
        name: 'Instagram',
        icon: <InstagramIcon />,
        connected: false,
        description: 'Publica stories, reels e posts automaticamente.',
        fields: [
          { key: 'username', label: 'Username', placeholder: '@o_teu_username' },
          { key: 'accessToken', label: 'Access Token', placeholder: 'Token da Meta API', type: 'password' },
        ],
      },
      {
        id: 'twitter',
        name: 'X (Twitter)',
        icon: <XIcon />,
        connected: false,
        description: 'Publica tweets e responde a menções.',
        fields: [
          { key: 'apiKey', label: 'API Key', placeholder: 'A tua X API key' },
          { key: 'apiSecret', label: 'API Secret', placeholder: 'O teu API secret', type: 'password' },
          { key: 'bearerToken', label: 'Bearer Token', placeholder: 'Bearer token', type: 'password' },
        ],
      },
      {
        id: 'facebook',
        name: 'Facebook',
        icon: <FacebookIcon />,
        connected: false,
        description: 'Gere a tua página e responde a mensagens.',
        fields: [
          { key: 'pageId', label: 'Page ID', placeholder: 'ID da tua página' },
          { key: 'accessToken', label: 'Access Token', placeholder: 'Token da Meta API', type: 'password' },
        ],
      },
    ],
  },
  {
    id: 'messaging',
    title: 'WhatsApp / Telegram',
    description: 'Respostas automáticas e gestão de contactos.',
    icon: <div className="flex gap-1.5"><WhatsAppIcon /><TelegramIcon /></div>,
    color: 'from-green-500/20 to-blue-500/20',
    enabled: false,
    notifications: true,
    subServices: [
      {
        id: 'whatsapp',
        name: 'WhatsApp',
        icon: <WhatsAppIcon />,
        connected: false,
        description: 'Liga o teu WhatsApp via QR code.',
        fields: [],
      },
      {
        id: 'telegram',
        name: 'Telegram',
        icon: <TelegramIcon />,
        connected: false,
        description: 'Conecta o teu bot de Telegram.',
        fields: [
          { key: 'botToken', label: 'Bot Token', placeholder: '123456:ABC-DEF...', type: 'password' },
        ],
      },
    ],
  },
];

/* ── SubService Card ── */
function SubServiceCard({ service, onToggle }: { service: SubService; onToggle: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    onToggle();
    setTimeout(() => setSaved(false), 2000);
  };

  // WhatsApp special case — QR code
  if (service.id === 'whatsapp') {
    return (
      <div className="p-4 bg-[#08090E] border border-[#1A1D2B] rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0D0F17] flex items-center justify-center">{service.icon}</div>
            <div>
              <p className="text-white text-sm font-medium">{service.name}</p>
              <p className="text-gray-600 text-xs">{service.description}</p>
            </div>
          </div>
          <span className={`text-xs px-2.5 py-1 rounded-full ${service.connected ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-500'}`}>
            {service.connected ? 'Ligado' : 'Desligado'}
          </span>
        </div>
        {!service.connected && (
          <div className="mt-4 flex flex-col items-center gap-3 p-6 border border-dashed border-[#1A1D2B] rounded-lg">
            <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center">
              <span className="text-gray-400 text-xs text-center px-2">QR Code aparece aqui ao ligar</span>
            </div>
            <button
              onClick={onToggle}
              className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white text-sm rounded-lg transition-colors cursor-pointer"
            >
              Gerar QR Code
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 bg-[#08090E] border border-[#1A1D2B] rounded-xl">
      <button onClick={() => setExpanded(!expanded)} className="w-full flex items-center justify-between cursor-pointer">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#0D0F17] flex items-center justify-center">{service.icon}</div>
          <div className="text-left">
            <p className="text-white text-sm font-medium">{service.name}</p>
            <p className="text-gray-600 text-xs">{service.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2.5 py-1 rounded-full ${service.connected ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-500'}`}>
            {service.connected ? 'Ligado' : 'Desligado'}
          </span>
          {expanded ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-3">
              {service.fields.map((field) => (
                <div key={field.key}>
                  <label className="text-gray-400 text-xs mb-1 block">{field.label}</label>
                  <input
                    type={field.type || 'text'}
                    placeholder={field.placeholder}
                    value={values[field.key] || ''}
                    onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#0D0F17] border border-[#1A1D2B] rounded-lg text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 transition"
                  />
                </div>
              ))}
              <button
                onClick={handleSave}
                className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {saved ? <><Check className="w-4 h-4" /> Guardado</> : service.connected ? 'Actualizar' : 'Conectar'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Integration Card ── */
function IntegrationCard({ integration, onUpdate }: { integration: Integration; onUpdate: (updated: Integration) => void }) {
  const [expanded, setExpanded] = useState(false);
  const connectedCount = integration.subServices.filter((s) => s.connected).length;

  const toggleEnabled = () => onUpdate({ ...integration, enabled: !integration.enabled });
  const toggleNotifications = () => onUpdate({ ...integration, notifications: !integration.notifications });
  const toggleSubService = (idx: number) => {
    const updated = { ...integration, subServices: integration.subServices.map((s, i) => i === idx ? { ...s, connected: !s.connected } : s) };
    onUpdate(updated);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#0D0F17] border border-[#1A1D2B] rounded-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${integration.color} border border-white/5 flex items-center justify-center`}>
              {integration.icon}
            </div>
            <div>
              <h3 className="text-white font-semibold">{integration.title}</h3>
              <p className="text-gray-500 text-sm mt-0.5">{integration.description}</p>
            </div>
          </div>
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#1A1D2B]">
          <div className="flex items-center gap-4">
            <button onClick={toggleEnabled} className="flex items-center gap-2 cursor-pointer">
              {integration.enabled
                ? <Power className="w-4 h-4 text-green-400" />
                : <PowerOff className="w-4 h-4 text-gray-600" />}
              <span className={`text-xs ${integration.enabled ? 'text-green-400' : 'text-gray-600'}`}>
                {integration.enabled ? 'Activo' : 'Inactivo'}
              </span>
            </button>
            <button onClick={toggleNotifications} className="flex items-center gap-2 cursor-pointer">
              {integration.notifications
                ? <Bell className="w-4 h-4 text-blue-400" />
                : <BellOff className="w-4 h-4 text-gray-600" />}
              <span className="text-xs text-gray-500">Alertas</span>
            </button>
            <span className="text-xs text-gray-600">
              {connectedCount}/{integration.subServices.length} serviços
            </span>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
          >
            {expanded ? 'Fechar' : 'Configurar'}
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Expanded config */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-3">
              {integration.subServices.map((sub, idx) => (
                <SubServiceCard key={sub.id} service={sub} onToggle={() => toggleSubService(idx)} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Dashboard Page ── */
export default function DashboardPage() {
  const [integrations, setIntegrations] = useState<Integration[]>(INITIAL_INTEGRATIONS);

  const updateIntegration = (idx: number, updated: Integration) => {
    setIntegrations((prev) => prev.map((item, i) => (i === idx ? updated : item)));
  };

  const totalConnected = integrations.reduce((acc, i) => acc + i.subServices.filter((s) => s.connected).length, 0);
  const totalServices = integrations.reduce((acc, i) => acc + i.subServices.length, 0);
  const activeCount = integrations.filter((i) => i.enabled).length;

  return (
    <main className="min-h-screen bg-[#08090E] text-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#08090E]/80 backdrop-blur-xl border-b border-[#1A1D2B]/50">
        <div className="flex items-center gap-2">
          <img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/openclaw-dark.png" alt="OpenClaw" width={28} height={28} />
          <span className="font-semibold text-white">OpenClaw</span>
        </div>
        <a href="/" className="px-4 py-2 text-sm text-gray-400 hover:text-white border border-[#1A1D2B] rounded-lg hover:border-[#2A2D3B] transition-all">
          Voltar ao site
        </a>
      </nav>

      <div className="max-w-3xl mx-auto px-6 pt-24 pb-16">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500 mt-2">Gere as tuas integrações e automações.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-[#0D0F17] border border-[#1A1D2B] rounded-xl text-center">
            <p className="text-2xl font-bold text-white">{activeCount}</p>
            <p className="text-gray-500 text-xs mt-1">Activas</p>
          </div>
          <div className="p-4 bg-[#0D0F17] border border-[#1A1D2B] rounded-xl text-center">
            <p className="text-2xl font-bold text-white">{totalConnected}</p>
            <p className="text-gray-500 text-xs mt-1">Serviços ligados</p>
          </div>
          <div className="p-4 bg-[#0D0F17] border border-[#1A1D2B] rounded-xl text-center">
            <p className="text-2xl font-bold text-green-400">{totalServices}</p>
            <p className="text-gray-500 text-xs mt-1">Total disponíveis</p>
          </div>
        </div>

        {/* Integration Cards */}
        <div className="space-y-4">
          {integrations.map((integration, idx) => (
            <IntegrationCard
              key={integration.id}
              integration={integration}
              onUpdate={(updated) => updateIntegration(idx, updated)}
            />
          ))}
        </div>

        {/* Help */}
        <div className="mt-8 p-5 bg-[#0D0F17] border border-[#1A1D2B] rounded-xl">
          <h3 className="text-white font-semibold mb-2">Precisas de ajuda?</h3>
          <p className="text-gray-500 text-sm">
            Cada integração funciona de forma independente. Activa apenas as que precisas.
            O OpenClaw gere tudo no piloto automático depois de configurado.
          </p>
          <a href="mailto:suporte@openclaw.io" className="inline-block mt-3 text-blue-400 hover:text-blue-300 text-sm transition-colors">
            suporte@openclaw.io
          </a>
        </div>
      </div>
    </main>
  );
}
