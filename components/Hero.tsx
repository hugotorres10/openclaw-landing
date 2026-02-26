'use client';

import { useState, useEffect } from 'react';
import { detectOS } from '@/lib/detectOS';
import { ArrowRight, Loader2, Zap, MessageSquare, Bot, Users } from 'lucide-react';

export default function Hero() {
  const [email, setEmail] = useState('');
  const [os, setOs] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const detected = detectOS();
    setOs(detected.os);
  }, []);

  const handleStart = async () => {
    if (!email || !email.includes('@')) {
      setError('Introduz um email válido.');
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
          <span className="text-2xl">🦞</span>
          <span className="font-semibold text-white">OpenClaw</span>
        </div>
        <a href="/connect" className="px-4 py-2 text-sm text-gray-400 hover:text-white border border-[#1A1D2B] rounded-lg hover:border-[#2A2D3B] transition-all">
          Já tenho instalado
        </a>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-2xl mx-auto text-center mt-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
          O teu WhatsApp com IA,
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            a funcionar 24/7
          </span>
        </h1>

        <p className="mt-6 text-gray-400 text-lg max-w-lg mx-auto">
          Mete o email e o OpenClaw trata do resto. Respostas automáticas, gestão de contactos — tudo no piloto automático.
        </p>

        {/* Main CTA Card */}
        <div className="mt-10 p-6 bg-[#0D0F17] border border-[#1A1D2B] rounded-2xl text-left">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              placeholder="o-teu@email.com"
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
                <><Zap className="w-4 h-4" /> Começar</>
              )}
            </button>
          </div>
          {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}
          <p className="mt-3 text-gray-600 text-xs">9,99 USDC · Pagamento único · Sem subscrição</p>
        </div>

        {/* Templates */}
        <div className="mt-8">
          <p className="text-xs text-gray-600 uppercase tracking-widest mb-4">Ou começa com um template</p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: MessageSquare, label: 'Assistente Pessoal' },
              { icon: Bot, label: 'Suporte ao Cliente' },
              { icon: Users, label: 'Gestor de Vendas' },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                onClick={() => {
                  if (!email) {
                    setError('Introduz o email primeiro.');
                    return;
                  }
                  handleStart();
                }}
                className="flex flex-col items-center gap-2 p-4 bg-[#0D0F17] border border-[#1A1D2B] rounded-xl hover:border-[#2A2D3B] transition-all cursor-pointer group"
              >
                <Icon className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
                <span className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Trust + Stats */}
        <div className="mt-10 flex items-center justify-center gap-2 text-sm text-gray-500">
          <Users className="w-4 h-4" />
          <span>Usado por <span className="text-white font-medium">1.200+</span> utilizadores</span>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-6 text-center">
          {[
            { title: 'Corre 24/7', sub: 'No teu computador' },
            { title: 'Os teus dados', sub: 'Ficam na tua máquina' },
            { title: 'Qualquer IA', sub: 'OpenAI, Claude, Gemini' },
          ].map((stat) => (
            <div key={stat.title}>
              <p className="text-white font-medium text-sm">{stat.title}</p>
              <p className="text-gray-600 text-xs mt-1">{stat.sub}</p>
            </div>
          ))}
        </div>

        {os && (
          <p className="mt-6 text-gray-600 text-xs">
            Detetámos que usas{' '}
            <span className="text-blue-400 font-medium">
              {os === 'windows' ? 'Windows' : os === 'macos' ? 'macOS' : os === 'linux' ? 'Linux' : 'Desktop'}
            </span>{' '}✓
          </p>
        )}
      </div>
    </section>
  );
}
