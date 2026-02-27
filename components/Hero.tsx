'use client';

import { useState, useEffect } from 'react';
import { detectOS } from '@/lib/detectOS';
import { Loader2, Zap, Users } from 'lucide-react';
import { useTranslation } from '@/lib/hooks/useTranslation';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const GreenArrow = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

const ClawLobster = () => (
  <img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/openclaw-dark.png" alt="OpenClaw" width={28} height={28} />
);

const SocialIcons = () => (
  <div className="flex items-center gap-2.5">
    {/* Instagram */}
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-pink-400">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2"/>
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
      <circle cx="18" cy="6" r="1.5" fill="currentColor"/>
    </svg>
    {/* X (Twitter) */}
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
    {/* Facebook */}
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-blue-500">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  </div>
);

const MessagingIcons = () => (
  <div className="flex items-center gap-2.5">
    {/* WhatsApp */}
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
    {/* Telegram */}
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#26A5E4">
      <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.492-1.302.48-.428-.013-1.252-.242-1.865-.44-.751-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  </div>
);


const CURRENCY_MAP: Record<string, { symbol: string; code: string; rate: number }> = {
  US: { symbol: '$', code: 'USD', rate: 1.08 },
  GB: { symbol: '£', code: 'GBP', rate: 0.86 },
  JP: { symbol: '¥', code: 'JPY', rate: 162 },
  CN: { symbol: '¥', code: 'CNY', rate: 7.8 },
  BR: { symbol: 'R$', code: 'BRL', rate: 5.4 },
  IN: { symbol: '₹', code: 'INR', rate: 90 },
  CH: { symbol: 'CHF', code: 'CHF', rate: 0.96 },
  AU: { symbol: 'A$', code: 'AUD', rate: 1.66 },
  CA: { symbol: 'C$', code: 'CAD', rate: 1.47 },
  SE: { symbol: 'kr', code: 'SEK', rate: 11.2 },
  NO: { symbol: 'kr', code: 'NOK', rate: 11.5 },
  DK: { symbol: 'kr', code: 'DKK', rate: 7.46 },
  PL: { symbol: 'zł', code: 'PLN', rate: 4.32 },
  CZ: { symbol: 'Kč', code: 'CZK', rate: 25.2 },
  HU: { symbol: 'Ft', code: 'HUF', rate: 395 },
  RO: { symbol: 'lei', code: 'RON', rate: 4.97 },
  TR: { symbol: '₺', code: 'TRY', rate: 34.5 },
  SA: { symbol: '﷼', code: 'SAR', rate: 4.05 },
  AE: { symbol: 'د.إ', code: 'AED', rate: 3.97 },
  KR: { symbol: '₩', code: 'KRW', rate: 1420 },
  MX: { symbol: '$', code: 'MXN', rate: 18.5 },
  AR: { symbol: '$', code: 'ARS', rate: 920 },
  ZA: { symbol: 'R', code: 'ZAR', rate: 19.8 },
  RU: { symbol: '₽', code: 'RUB', rate: 98 },
};

const BASE_PRICE_EUR = 9.99;

function formatLocalPrice(countryCode: string): string {
  const currency = CURRENCY_MAP[countryCode];
  if (!currency) return '€9,99';
  const converted = BASE_PRICE_EUR * currency.rate;
  const formatted = converted >= 100 ? Math.round(converted).toLocaleString() : converted.toFixed(2).replace('.', ',');
  return `${currency.symbol}${formatted}`;
}

export default function Hero() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [os, setOs] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [price, setPrice] = useState('€9,99');

  useEffect(() => {
    const detected = detectOS();
    setOs(detected.os);

    // Detect country via timezone/locale
    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(data => {
        if (data.country_code) {
          const local = formatLocalPrice(data.country_code);
          if (local !== '€9,99') {
            setPrice(`${local} (~€9,99)`);
          }
        }
      })
      .catch(() => {});
  }, []);

  const handleStart = async () => {
    if (!email || !email.includes('@')) {
      setError(t('hero.invalidEmail'));
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, os }),
      });
      const data = await res.json();
      if (data.url && !data.url.includes('placeholder')) {
        window.location.href = data.url;
        return;
      }
    } catch {
      // Stripe not configured
    }

    window.location.href = `/setup?session_id=demo&email=${encodeURIComponent(email)}`;
  };

  return (
    <section className="aurora-bg min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-16 relative">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#08090E]/80 backdrop-blur-xl border-b border-[#1A1D2B]/50">
        <div className="flex items-center gap-2">
          <img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/openclaw-dark.png" alt="OpenClaw" width={28} height={28} />
          <span className="font-semibold text-white">OpenClaw</span>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <a href="/connect" className="px-4 py-2 text-sm text-gray-400 hover:text-white border border-[#1A1D2B] rounded-lg hover:border-[#2A2D3B] transition-all">
            {t('nav.alreadyInstalled')}
          </a>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-2xl mx-auto text-center mt-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
          {t('hero.title1')}
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {t('hero.title2')}
          </span>
        </h1>

        <p className="mt-6 text-gray-400 text-lg max-w-lg mx-auto">
          {t('hero.subtitle')}
        </p>

        {/* Main CTA Card */}
        <div className="mt-10 p-6 bg-[#0D0F17] border border-[#1A1D2B] rounded-2xl text-left">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              placeholder={t('hero.emailPlaceholder')}
              className="flex-1 px-4 py-3.5 bg-[#08090E] border border-[#1A1D2B] rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 transition font-sans"
              onKeyDown={(e) => e.key === 'Enter' && handleStart()}
            />
            <button
              onClick={handleStart}
              disabled={loading}
              className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)] disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <><Zap className="w-4 h-4" /> {t('hero.cta')}</>
              )}
            </button>
          </div>
          {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}
          <p className="mt-3 text-gray-600 text-xs">{price}</p>
        </div>

        {/* Templates */}
        <div className="mt-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { content: <GreenArrow />, label: t('templates.trader') },
              { content: <ClawLobster />, label: t('templates.assistant') },
              { content: <SocialIcons />, label: t('templates.social') },
              { content: <MessagingIcons />, label: t('templates.messaging') },
            ].map(({ content, label }) => (
              <button
                key={label}
                onClick={() => {
                  if (!email) {
                    setError(t('hero.emailFirst'));
                    return;
                  }
                  handleStart();
                }}
                className="flex flex-col items-center gap-3 p-4 bg-[#0D0F17] border border-[#1A1D2B] rounded-xl hover:border-[#2A2D3B] transition-all cursor-pointer group"
              >
                <div className="h-8 flex items-center justify-center">{content}</div>
                <span className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Trust + Stats */}
        <div className="mt-10 flex items-center justify-center gap-2 text-sm text-gray-500">
          <Users className="w-4 h-4" />
          <span>{t('hero.usedBy')} <span className="text-white font-medium">1.200+</span> {t('hero.users')}</span>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-6 text-center">
          {[
            { title: t('hero.runs247'), sub: t('hero.onYourPC') },
            { title: t('hero.yourData'), sub: t('hero.staysLocal') },
            { title: t('hero.anyAI'), sub: 'OpenAI, Claude, Gemini' },
          ].map((stat) => (
            <div key={stat.title}>
              <p className="text-white font-medium text-sm">{stat.title}</p>
              <p className="text-gray-600 text-xs mt-1">{stat.sub}</p>
            </div>
          ))}
        </div>

        {os && (
          <p className="mt-6 text-gray-600 text-xs">
            {t('hero.detectedOS')}{' '}
            <span className="text-blue-400 font-medium">
              {os === 'windows' ? 'Windows' : os === 'macos' ? 'macOS' : os === 'linux' ? 'Linux' : 'Desktop'}
            </span>{' '}✓
          </p>
        )}
      </div>
    </section>
  );
}
