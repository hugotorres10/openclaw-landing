'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Power, PowerOff, Check, Bell, BellOff, Menu, X, Loader2 } from 'lucide-react';
import { useTranslation } from '@/lib/hooks/useTranslation';
import type { TranslationKeys } from '@/lib/translations/pt';
import LanguageSwitcher from '@/components/LanguageSwitcher';

/* ── SVG Icons ── */
const GreenArrow = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="text-pink-400">
    <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
    <circle cx="18" cy="6" r="1.5" fill="currentColor"/>
  </svg>
);

const XTwitterIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="text-white">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const FacebookIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="text-blue-500">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const WhatsAppIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#25D366">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const TelegramIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#26A5E4">
    <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.492-1.302.48-.428-.013-1.252-.242-1.865-.44-.751-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

/* ── Types ── */
interface SubService {
  id: string;
  name: string;
  icon: React.ReactNode;
  connected: boolean;
  description: string;
  fields: { key: string; label: string; placeholder: string; type?: string }[];
}

interface Integration {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: React.ReactNode;
  sidebarIcon: React.ReactNode;
  color: string;
  borderColor: string;
  enabled: boolean;
  notifications: boolean;
  subServices: SubService[];
}

/* ── Data ── */
const INITIAL: Integration[] = [
  {
    id: 'trader',
    title: 'Stock & Crypto Trader',
    shortTitle: 'Trading',
    description: 'Conecta exchanges e automatiza trades com IA. Recebe alertas de preço e executa ordens automaticamente.',
    icon: <GreenArrow />,
    sidebarIcon: <GreenArrow />,
    color: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'border-green-500/30',
    enabled: false,
    notifications: true,
    subServices: [
      {
        id: 'binance', name: 'Binance',
        icon: <span className="text-yellow-400 font-bold text-sm">B</span>,
        connected: false,
        description: 'Trading automático de crypto na Binance.',
        fields: [
          { key: 'apiKey', label: 'API Key', placeholder: 'A tua Binance API key' },
          { key: 'apiSecret', label: 'API Secret', placeholder: 'O teu API secret', type: 'password' },
        ],
      },
      {
        id: 'coinbase', name: 'Coinbase',
        icon: <span className="text-blue-400 font-bold text-sm">C</span>,
        connected: false,
        description: 'Compra e vende crypto na Coinbase.',
        fields: [
          { key: 'apiKey', label: 'API Key', placeholder: 'A tua Coinbase API key' },
          { key: 'apiSecret', label: 'API Secret', placeholder: 'O teu API secret', type: 'password' },
        ],
      },
      {
        id: 'tradingview', name: 'TradingView',
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
    shortTitle: 'Assistente',
    description: 'IA pessoal que gere tarefas, agenda e lembretes. Escolhe o teu provedor de IA preferido.',
    icon: <img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/openclaw-dark.png" alt="OpenClaw" width={20} height={20} />,
    sidebarIcon: <img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/openclaw-dark.png" alt="OpenClaw" width={18} height={18} />,
    color: 'from-orange-500/20 to-red-500/20',
    borderColor: 'border-orange-500/30',
    enabled: false,
    notifications: true,
    subServices: [
      {
        id: 'openai', name: 'OpenAI (GPT-4)',
        icon: <span className="text-green-400 font-bold text-sm">AI</span>,
        connected: false,
        description: 'Usa GPT-4 como motor de IA.',
        fields: [{ key: 'apiKey', label: 'API Key', placeholder: 'sk-...', type: 'password' }],
      },
      {
        id: 'anthropic', name: 'Claude (Anthropic)',
        icon: <span className="text-orange-400 font-bold text-sm">C</span>,
        connected: false,
        description: 'Usa Claude como motor de IA.',
        fields: [{ key: 'apiKey', label: 'API Key', placeholder: 'sk-ant-...', type: 'password' }],
      },
      {
        id: 'google', name: 'Gemini (Google)',
        icon: <span className="text-blue-400 font-bold text-sm">G</span>,
        connected: false,
        description: 'Usa Gemini como motor de IA.',
        fields: [{ key: 'apiKey', label: 'API Key', placeholder: 'AIza...', type: 'password' }],
      },
    ],
  },
  {
    id: 'social',
    title: 'Redes Sociais',
    shortTitle: 'Social',
    description: 'Publica, agenda e responde automaticamente no Instagram, X e Facebook.',
    icon: <div className="flex gap-1"><InstagramIcon size={14} /><XTwitterIcon size={12} /><FacebookIcon size={14} /></div>,
    sidebarIcon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
    color: 'from-pink-500/20 to-purple-500/20',
    borderColor: 'border-pink-500/30',
    enabled: false,
    notifications: true,
    subServices: [
      {
        id: 'instagram', name: 'Instagram',
        icon: <InstagramIcon />,
        connected: false,
        description: 'Publica stories, reels e posts automaticamente.',
        fields: [
          { key: 'username', label: 'Username', placeholder: '@o_teu_username' },
          { key: 'accessToken', label: 'Access Token', placeholder: 'Token da Meta API', type: 'password' },
        ],
      },
      {
        id: 'twitter', name: 'X (Twitter)',
        icon: <XTwitterIcon />,
        connected: false,
        description: 'Publica tweets e responde a menções.',
        fields: [
          { key: 'apiKey', label: 'API Key', placeholder: 'A tua X API key' },
          { key: 'apiSecret', label: 'API Secret', placeholder: 'O teu API secret', type: 'password' },
          { key: 'bearerToken', label: 'Bearer Token', placeholder: 'Bearer token', type: 'password' },
        ],
      },
      {
        id: 'facebook', name: 'Facebook',
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
    shortTitle: 'Mensagens',
    description: 'Respostas automáticas e gestão de contactos no WhatsApp e Telegram.',
    icon: <div className="flex gap-1"><WhatsAppIcon size={16} /><TelegramIcon size={16} /></div>,
    sidebarIcon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    color: 'from-green-500/20 to-blue-500/20',
    borderColor: 'border-green-500/30',
    enabled: false,
    notifications: true,
    subServices: [
      {
        id: 'whatsapp', name: 'WhatsApp',
        icon: <WhatsAppIcon />,
        connected: false,
        description: 'Liga o teu WhatsApp via QR code.',
        fields: [],
      },
      {
        id: 'telegram', name: 'Telegram',
        icon: <TelegramIcon />,
        connected: false,
        description: 'Conecta o teu bot de Telegram.',
        fields: [{ key: 'botToken', label: 'Bot Token', placeholder: '123456:ABC-DEF...', type: 'password' }],
      },
    ],
  },
];

/* ── Service Config Card ── */
function ServiceCard({ service, onToggle, email, category, t }: { service: SubService; onToggle: () => void; email: string; category: string; t: (key: TranslationKeys) => string }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; error?: string } | null>(null);

  const handleSave = async () => {
    setSaving(true);
    setTestResult(null);
    try {
      // 1. Save credentials to DB
      await fetch('/api/integrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, serviceId: service.id, category, credentials: values }),
      });

      // 2. Test the connection
      setTesting(true);
      const testRes = await fetch('/api/integrations/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, serviceId: service.id }),
      });
      const testData = await testRes.json();
      setTestResult(testData);

      if (testData.success) {
        setSaved(true);
        onToggle();
        setTimeout(() => setSaved(false), 3000);
      }
    } catch {
      setTestResult({ success: false, error: t('dashboard.testFailed') });
    } finally {
      setSaving(false);
      setTesting(false);
    }
  };

  if (service.id === 'whatsapp') {
    return (
      <div className="p-5 bg-[#08090E] border border-[#1A1D2B] rounded-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-[#0D0F17] border border-[#1A1D2B] flex items-center justify-center">{service.icon}</div>
          <div className="flex-1">
            <p className="text-white font-medium">{service.name}</p>
            <p className="text-gray-500 text-xs">{service.description}</p>
          </div>
          <span className={`text-xs px-3 py-1 rounded-full font-medium ${service.connected ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-gray-500/10 text-gray-500 border border-gray-500/20'}`}>
            {service.connected ? t('dashboard.connected') : t('dashboard.disconnected')}
          </span>
        </div>
        {!service.connected && (
          <div className="flex flex-col items-center gap-4 p-8 border border-dashed border-[#1A1D2B] rounded-xl bg-[#0D0F17]/50">
            <div className="w-40 h-40 bg-white rounded-xl flex items-center justify-center">
              <span className="text-gray-400 text-xs text-center px-4">{t('dashboard.qrPlaceholder')}</span>
            </div>
            <button onClick={onToggle} className="px-6 py-2.5 bg-green-600 hover:bg-green-500 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer">
              {t('dashboard.generateQR')}
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-5 bg-[#08090E] border border-[#1A1D2B] rounded-xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-[#0D0F17] border border-[#1A1D2B] flex items-center justify-center">{service.icon}</div>
        <div className="flex-1">
          <p className="text-white font-medium">{service.name}</p>
          <p className="text-gray-500 text-xs">{service.description}</p>
        </div>
        <span className={`text-xs px-3 py-1 rounded-full font-medium ${service.connected ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-gray-500/10 text-gray-500 border border-gray-500/20'}`}>
          {service.connected ? t('dashboard.connected') : t('dashboard.disconnected')}
        </span>
      </div>
      <div className="space-y-3">
        {service.fields.map((field) => (
          <div key={field.key}>
            <label className="text-gray-400 text-xs mb-1.5 block">{field.label}</label>
            <input
              type={field.type || 'text'}
              placeholder={field.placeholder}
              value={values[field.key] || ''}
              onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
              className="w-full px-4 py-3 bg-[#0D0F17] border border-[#1A1D2B] rounded-lg text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 transition"
            />
          </div>
        ))}
        <button
          onClick={handleSave}
          disabled={saving || testing}
          className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2"
        >
          {saving && !testing ? `${t('dashboard.saved')}...` : testing ? `${t('dashboard.testing')}` : saved ? <><Check className="w-4 h-4" /> {t('dashboard.testSuccess')}</> : service.connected ? t('dashboard.update') : t('dashboard.connect')}
        </button>
        {testResult && !testResult.success && (
          <p className="mt-2 text-red-400 text-xs">{testResult.error || t('dashboard.testFailed')}</p>
        )}
        {testResult && testResult.success && (
          <p className="mt-2 text-green-400 text-xs">{t('dashboard.testSuccess')}</p>
        )}
      </div>
    </div>
  );
}

/* ── Main Page ── */
export default function DashboardWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#08090E] flex items-center justify-center"><Loader2 className="w-6 h-6 text-blue-400 animate-spin" /></div>}>
      <DashboardPage />
    </Suspense>
  );
}

function DashboardPage() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const [integrations, setIntegrations] = useState(INITIAL);
  const [activeId, setActiveId] = useState('trader');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load integrations from DB on mount
  const loadIntegrations = useCallback(async () => {
    if (!email) { setLoading(false); return; }
    try {
      const res = await fetch(`/api/integrations?email=${encodeURIComponent(email)}`);
      if (!res.ok) { setLoading(false); return; }
      const data = await res.json();
      if (data.integrations?.length > 0) {
        setIntegrations((prev) => prev.map((integration) => {
          const dbServices = data.integrations.filter((db: { category: string }) => db.category === integration.id);
          if (dbServices.length === 0) return integration;
          return {
            ...integration,
            enabled: dbServices.some((db: { enabled: boolean }) => db.enabled),
            subServices: integration.subServices.map((sub) => {
              const dbSub = dbServices.find((db: { serviceId: string }) => db.serviceId === sub.id);
              return dbSub ? { ...sub, connected: dbSub.connected } : sub;
            }),
          };
        }));
      }
    } catch { /* ignore */ }
    setLoading(false);
  }, [email]);

  useEffect(() => { loadIntegrations(); }, [loadIntegrations]);

  const active = integrations.find((i) => i.id === activeId)!;

  const updateIntegration = (updated: Integration) => {
    setIntegrations((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
  };

  const toggleEnabled = async () => {
    updateIntegration({ ...active, enabled: !active.enabled });
    if (email) {
      // Toggle all sub-services enabled state
      for (const sub of active.subServices) {
        await fetch('/api/integrations/toggle', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, serviceId: sub.id, field: 'enabled' }),
        });
      }
    }
  };

  const toggleNotifications = async () => {
    updateIntegration({ ...active, notifications: !active.notifications });
    if (email) {
      for (const sub of active.subServices) {
        await fetch('/api/integrations/toggle', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, serviceId: sub.id, field: 'notifications' }),
        });
      }
    }
  };

  const toggleSubService = (idx: number) => {
    const updated = { ...active, subServices: active.subServices.map((s, i) => i === idx ? { ...s, connected: !s.connected } : s) };
    updateIntegration(updated);
  };

  const connectedCount = active.subServices.filter((s) => s.connected).length;

  return (
    <div className="min-h-screen bg-[#08090E] text-white flex flex-col">
      {/* Top Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 bg-[#08090E]/90 backdrop-blur-xl border-b border-[#1A1D2B]/50">
        <div className="flex items-center gap-3">
          <button onClick={() => setMobileMenu(!mobileMenu)} className="lg:hidden p-1 cursor-pointer">
            {mobileMenu ? <X className="w-5 h-5 text-gray-400" /> : <Menu className="w-5 h-5 text-gray-400" />}
          </button>
          <a href="/" className="flex items-center gap-2">
            <img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/openclaw-dark.png" alt="OpenClaw" width={24} height={24} />
            <span className="font-semibold text-white text-sm">OpenClaw</span>
          </a>
          <LanguageSwitcher />
        </div>
        <a href="/" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
          {t('nav.backToSite')}
        </a>
      </nav>

      <div className="flex flex-1 pt-[49px]">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:flex w-64 flex-col fixed top-[49px] left-0 bottom-0 bg-[#0A0B10] border-r border-[#1A1D2B]/50">
          <div className="p-4">
            <p className="text-[10px] uppercase tracking-widest text-gray-600 mb-3 px-3">{t('dashboard.integrations')}</p>
            <div className="space-y-1">
              {integrations.map((item) => {
                const isActive = item.id === activeId;
                const connected = item.subServices.filter((s) => s.connected).length;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveId(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#0D0F17] border border-[#1A1D2B]'
                        : 'hover:bg-[#0D0F17]/50 border border-transparent'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0`}>
                      {item.sidebarIcon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${isActive ? 'text-white' : 'text-gray-400'}`}>
                        {item.shortTitle}
                      </p>
                      <p className="text-[10px] text-gray-600">
                        {connected}/{item.subServices.length} {t('dashboard.linked')}
                        {item.enabled && <span className="text-green-400 ml-1.5">{t('dashboard.active').toLowerCase()}</span>}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-auto p-4 border-t border-[#1A1D2B]/50">
            <a href="mailto:suporte@openclaw.io" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
              {t('dashboard.needHelp')}
            </a>
          </div>
        </aside>

        {/* Sidebar - Mobile overlay */}
        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed top-[49px] left-0 bottom-0 w-64 bg-[#0A0B10] border-r border-[#1A1D2B]/50 z-40"
            >
              <div className="p-4">
                <p className="text-[10px] uppercase tracking-widest text-gray-600 mb-3 px-3">{t('dashboard.integrations')}</p>
                <div className="space-y-1">
                  {integrations.map((item) => {
                    const isActive = item.id === activeId;
                    const connected = item.subServices.filter((s) => s.connected).length;
                    return (
                      <button
                        key={item.id}
                        onClick={() => { setActiveId(item.id); setMobileMenu(false); }}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all cursor-pointer ${
                          isActive ? 'bg-[#0D0F17] border border-[#1A1D2B]' : 'hover:bg-[#0D0F17]/50 border border-transparent'
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0`}>
                          {item.sidebarIcon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium truncate ${isActive ? 'text-white' : 'text-gray-400'}`}>{item.shortTitle}</p>
                          <p className="text-[10px] text-gray-600">{connected}/{item.subServices.length} {t('dashboard.linked')}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64">
          <div className="max-w-2xl mx-auto px-6 py-8">
            {/* Integration Header */}
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${active.color} border ${active.borderColor} flex items-center justify-center shrink-0`}>
                  {active.icon}
                </div>
                <div className="flex-1">
                  <h1 className="text-xl font-bold text-white">{active.title}</h1>
                  <p className="text-gray-500 text-sm mt-1">{active.description}</p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-4 mb-8 p-4 bg-[#0D0F17] border border-[#1A1D2B] rounded-xl">
                <button onClick={toggleEnabled} className="flex items-center gap-2 cursor-pointer">
                  {active.enabled
                    ? <Power className="w-4 h-4 text-green-400" />
                    : <PowerOff className="w-4 h-4 text-gray-600" />}
                  <span className={`text-sm ${active.enabled ? 'text-green-400 font-medium' : 'text-gray-600'}`}>
                    {active.enabled ? t('dashboard.active') : t('dashboard.inactive')}
                  </span>
                </button>

                <div className="w-px h-5 bg-[#1A1D2B]" />

                <button onClick={toggleNotifications} className="flex items-center gap-2 cursor-pointer">
                  {active.notifications
                    ? <Bell className="w-4 h-4 text-blue-400" />
                    : <BellOff className="w-4 h-4 text-gray-600" />}
                  <span className="text-sm text-gray-500">{t('dashboard.alerts')}</span>
                </button>

                <div className="w-px h-5 bg-[#1A1D2B]" />

                <span className="text-sm text-gray-500">
                  <span className="text-white font-medium">{connectedCount}</span>/{active.subServices.length} {t('dashboard.services').toLowerCase()}
                </span>
              </div>

              {/* Sub-services */}
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-widest text-gray-600">{t('dashboard.services')}</p>
                {active.subServices.map((sub, idx) => (
                  <ServiceCard key={sub.id} service={sub} email={email} category={active.id} onToggle={() => toggleSubService(idx)} t={t} />
                ))}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
