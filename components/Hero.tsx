'use client';

import { useState, useEffect } from 'react';
import { detectOS } from '@/lib/detectOS';
import { ArrowRight, Loader2 } from 'lucide-react';

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

    // Try Stripe first, fallback to direct setup
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

    // Direct flow (payments not yet configured)
    window.location.href = `/setup?session_id=demo&email=${encodeURIComponent(email)}`;
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h2 className="text-xl font-mono text-blue-400 mb-8 tracking-widest">OPENCLAW</h2>

      <h1 className="text-4xl md:text-6xl font-bold text-white max-w-2xl leading-tight">
        Automatiza o teu WhatsApp
        <span className="text-blue-400"> com um clique.</span>
      </h1>

      <p className="mt-6 text-gray-400 text-lg max-w-md">
        Mete o email, paga, e nós tratamos do resto.
        Sem instalações complicadas. Sem configurações.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row gap-3 w-full max-w-md">
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(''); }}
          placeholder="o-teu@email.com"
          className="flex-1 px-4 py-3 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500 transition"
          onKeyDown={(e) => e.key === 'Enter' && handleStart()}
        />
        <button
          onClick={handleStart}
          disabled={loading}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>Começar — 9,99 USDC <ArrowRight className="w-4 h-4" /></>
          )}
        </button>
      </div>

      {error && (
        <p className="mt-3 text-red-400 text-sm">{error}</p>
      )}

      <p className="mt-4 text-gray-600 text-sm">
        Pagamento único · Sem subscrição
      </p>
      {os && (
        <p className="mt-2 text-gray-500 text-xs">
          Detetámos que usas{' '}
          <span className="text-blue-400 font-medium">
            {os === 'windows' ? 'Windows' : os === 'macos' ? 'macOS' : os === 'linux' ? 'Linux' : 'Desktop'}
          </span>{' '}
          ✓
        </p>
      )}

      <div className="mt-8 pt-6 border-t border-[#1A1A1A] w-full max-w-md">
        <a
          href="/connect"
          className="text-gray-500 hover:text-blue-400 text-sm transition-colors"
        >
          Já tenho o OpenClaw instalado — Conectar WhatsApp
        </a>
      </div>
    </section>
  );
}
