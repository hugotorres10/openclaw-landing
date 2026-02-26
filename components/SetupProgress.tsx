'use client';

import { useEffect, useState } from 'react';
import { Check, Download, Loader2, Smartphone, Key, ExternalLink, Copy, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { triggerAutoDownload } from '@/lib/downloadManager';
import { detectOS } from '@/lib/detectOS';

type SetupStep = 'verifying' | 'confirmed' | 'downloading' | 'apikey' | 'ready';

const AI_PROVIDERS = [
  {
    name: 'OpenAI (ChatGPT)',
    slug: 'openai',
    url: 'https://platform.openai.com/api-keys',
    instructions: 'Abre platform.openai.com → API Keys → Create new secret key → Copia a chave',
    placeholder: 'sk-...',
    color: 'text-green-400',
  },
  {
    name: 'Anthropic (Claude)',
    slug: 'anthropic',
    url: 'https://console.anthropic.com/settings/keys',
    instructions: 'Abre console.anthropic.com → Settings → API Keys → Create Key → Copia a chave',
    placeholder: 'sk-ant-...',
    color: 'text-orange-400',
  },
  {
    name: 'Google (Gemini)',
    slug: 'google',
    url: 'https://aistudio.google.com/apikey',
    instructions: 'Abre aistudio.google.com → Get API Key → Create API Key → Copia a chave',
    placeholder: 'AIza...',
    color: 'text-blue-400',
  },
];

export default function SetupProgress({ sessionId }: { sessionId: string }) {
  const [step, setStep] = useState<SetupStep>('verifying');
  const [osLabel, setOsLabel] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [copied, setCopied] = useState(false);
  const isDemo = sessionId === 'demo';

  useEffect(() => {
    const detected = detectOS();
    setOsLabel(detected.label);

    async function verifyAndSetup() {
      if (isDemo) {
        setTimeout(() => {
          setStep('confirmed');
          setTimeout(() => {
            setStep('downloading');
            setTimeout(() => setStep('apikey'), 2500);
          }, 1500);
        }, 1500);
        return;
      }

      try {
        const res = await fetch(`/api/verify-payment?session_id=${sessionId}`);
        const data = await res.json();

        if (data.paid) {
          setStep('confirmed');
          setTimeout(() => {
            setStep('downloading');
            triggerAutoDownload();
            setTimeout(() => setStep('apikey'), 2500);
          }, 1500);
        } else {
          window.location.href = '/';
        }
      } catch {
        window.location.href = '/';
      }
    }

    if (sessionId) verifyAndSetup();
  }, [sessionId, isDemo]);

  const handleConfirmKey = () => {
    if (!apiKey || apiKey.length < 10) return;
    setStep('ready');
  };

  const provider = AI_PROVIDERS.find(p => p.slug === selectedProvider);

  const progressSteps = [
    { id: 'verifying', label: 'A preparar tudo...', Icon: Loader2, done: step !== 'verifying' },
    { id: 'confirmed', label: 'Conta criada com sucesso', Icon: Check, done: ['downloading', 'apikey', 'ready'].includes(step) },
    { id: 'downloading', label: `A instalar para ${osLabel}`, Icon: Download, done: ['apikey', 'ready'].includes(step) },
    { id: 'apikey', label: 'Configurar IA', Icon: Key, done: step === 'ready' },
    { id: 'ready', label: 'Tudo pronto!', Icon: CheckCircle, done: false },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="max-w-lg w-full space-y-8">
        <h1 className="text-2xl font-bold text-center">A preparar o teu OpenClaw</h1>

        {/* Progress Steps */}
        <div className="space-y-3">
          {progressSteps.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className={`flex items-center gap-3 p-4 rounded-xl border ${
                s.done
                  ? 'border-green-500/30 bg-green-500/5'
                  : s.id === step
                  ? 'border-blue-500/30 bg-blue-500/5'
                  : 'border-[#1A1A1A] bg-[#0A0A0A]'
              }`}
            >
              <s.Icon
                className={`w-5 h-5 shrink-0 ${
                  s.done ? 'text-green-400' : s.id === step ? 'text-blue-400' : 'text-gray-600'
                } ${s.id === step && step === 'verifying' ? 'animate-spin' : ''}`}
              />
              <span className={
                s.done ? 'text-green-400' : s.id === step ? 'text-blue-400' : 'text-gray-600'
              }>
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* API Key Configuration Step */}
        <AnimatePresence>
          {step === 'apikey' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="p-6 rounded-xl border border-[#1A1A1A] bg-[#0A0A0A] space-y-4">
                <div className="text-center space-y-2">
                  <Key className="w-8 h-8 text-blue-400 mx-auto" />
                  <h2 className="text-lg font-semibold">Último passo: Liga a tua IA</h2>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    O OpenClaw precisa de uma API key de um provedor de IA para funcionar.
                    <br />
                    É a <span className="text-white font-medium">única coisa</span> que precisas de configurar.
                  </p>
                </div>

                {/* Provider Selection */}
                <div className="space-y-2">
                  <p className="text-gray-500 text-xs uppercase tracking-wider">Escolhe o teu provedor de IA:</p>
                  <div className="grid gap-2">
                    {AI_PROVIDERS.map((p) => (
                      <button
                        key={p.slug}
                        onClick={() => setSelectedProvider(p.slug)}
                        className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all cursor-pointer ${
                          selectedProvider === p.slug
                            ? 'border-blue-500/50 bg-blue-500/10'
                            : 'border-[#1A1A1A] hover:border-[#2A2A2A] bg-[#050505]'
                        }`}
                      >
                        <span className={`font-medium text-sm ${p.color}`}>{p.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Provider Instructions */}
                <AnimatePresence>
                  {provider && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4"
                    >
                      <div className="p-4 rounded-lg bg-[#111] border border-[#1A1A1A] space-y-3">
                        <p className="text-sm text-gray-300 font-medium">Como obter a API key:</p>
                        <p className="text-sm text-gray-400 leading-relaxed">{provider.instructions}</p>
                        <a
                          href={provider.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm transition-colors"
                        >
                          Abrir {provider.name} <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>

                      {/* API Key Input */}
                      <div className="space-y-2">
                        <label className="text-sm text-gray-400">Cola a tua API key aqui:</label>
                        <div className="flex gap-2">
                          <input
                            type="password"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder={provider.placeholder}
                            className="flex-1 px-4 py-3 bg-[#050505] border border-[#1A1A1A] rounded-xl text-white placeholder:text-gray-700 focus:outline-none focus:border-blue-500 transition font-mono text-sm"
                            onKeyDown={(e) => e.key === 'Enter' && handleConfirmKey()}
                          />
                        </div>
                        <p className="text-xs text-gray-600">
                          A tua chave é guardada apenas no teu computador. Nunca sai da tua máquina.
                        </p>
                      </div>

                      {/* Confirm Button */}
                      <button
                        onClick={handleConfirmKey}
                        disabled={!apiKey || apiKey.length < 10}
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-[1.01] disabled:opacity-30 disabled:hover:scale-100 cursor-pointer"
                      >
                        Confirmar e activar OpenClaw
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* All Done */}
        <AnimatePresence>
          {step === 'ready' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-xl border border-green-500/30 bg-green-500/5 text-center space-y-4"
            >
              <CheckCircle className="w-12 h-12 text-green-400 mx-auto" />
              <h2 className="text-xl font-bold">OpenClaw está pronto!</h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                O OpenClaw vai abrir automaticamente.<br />
                Aponta a câmara do telemóvel ao QR code do WhatsApp que aparece no ecrã.<br />
                <span className="text-white font-medium mt-2 block">É só isto. Está tudo configurado.</span>
              </p>
              <div className="pt-2 space-y-2">
                <button
                  onClick={() => triggerAutoDownload()}
                  className="text-blue-400 hover:text-blue-300 text-sm underline cursor-pointer"
                >
                  Re-descarregar instalador
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-center">
          <a href="/" className="text-gray-600 hover:text-gray-400 text-sm transition-colors">
            Voltar ao início
          </a>
        </div>
      </div>
    </div>
  );
}
