'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Key, ExternalLink, Smartphone, CheckCircle, Terminal, ArrowLeft } from 'lucide-react';

const STEPS = [
  {
    icon: Terminal,
    title: 'Abre o terminal do OpenClaw',
    description: 'No teu computador, abre a aplicação OpenClaw ou o terminal onde o gateway está a correr.',
  },
  {
    icon: Key,
    title: 'Configura a API key (se ainda não fizeste)',
    description: 'O OpenClaw precisa de uma API key de IA (OpenAI, Claude ou Gemini) para funcionar.',
    links: [
      { label: 'OpenAI — Criar API key', url: 'https://platform.openai.com/api-keys' },
      { label: 'Anthropic — Criar API key', url: 'https://console.anthropic.com/settings/keys' },
      { label: 'Google — Criar API key', url: 'https://aistudio.google.com/apikey' },
    ],
  },
  {
    icon: MessageSquare,
    title: 'Conecta o WhatsApp',
    description: 'Corre o comando abaixo no terminal. Um QR code vai aparecer.',
    command: 'openclaw channels login',
  },
  {
    icon: Smartphone,
    title: 'Aponta a câmara',
    description: 'No telemóvel: WhatsApp → Definições → Dispositivos ligados → Ligar dispositivo → Aponta ao QR code.',
  },
  {
    icon: CheckCircle,
    title: 'Pronto!',
    description: 'O OpenClaw está ligado ao teu WhatsApp. Envia uma mensagem para testar.',
  },
];

export default function ConnectPage() {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const copyCommand = (cmd: string, idx: number) => {
    navigator.clipboard.writeText(cmd);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <a href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-300 text-sm mb-12 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Voltar ao início
        </a>

        <h1 className="text-3xl font-bold mb-4">Conectar WhatsApp</h1>
        <p className="text-gray-400 mb-12 leading-relaxed">
          Já tens o OpenClaw instalado? Segue estes passos para ligar o teu WhatsApp.
        </p>

        <div className="space-y-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="flex gap-5"
            >
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <step.icon className="w-5 h-5 text-blue-400" />
                </div>
                {i < STEPS.length - 1 && (
                  <div className="w-px flex-1 bg-[#1A1A1A] mt-2" />
                )}
              </div>
              <div className="pb-8">
                <h3 className="text-white font-semibold text-lg mb-1">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-3">{step.description}</p>

                {step.command && (
                  <button
                    onClick={() => copyCommand(step.command!, i)}
                    className="flex items-center gap-3 px-4 py-3 bg-[#0A0A0A] border border-[#1A1A1A] rounded-lg hover:border-[#2A2A2A] transition-colors cursor-pointer group w-full"
                  >
                    <code className="text-blue-400 font-mono text-sm flex-1 text-left">{step.command}</code>
                    <span className="text-xs text-gray-600 group-hover:text-gray-400 transition-colors">
                      {copiedIdx === i ? 'Copiado!' : 'Copiar'}
                    </span>
                  </button>
                )}

                {step.links && (
                  <div className="space-y-2">
                    {step.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        {link.label} <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-xl border border-[#1A1A1A] bg-[#0A0A0A]">
          <h3 className="text-white font-semibold mb-2">Problemas?</h3>
          <ul className="text-gray-500 text-sm space-y-1 leading-relaxed">
            <li>O QR code expira ao fim de 60 segundos — corre o comando novamente se necessário</li>
            <li>Certifica-te que o OpenClaw gateway está a correr (<code className="text-blue-400">openclaw status</code>)</li>
            <li>Contacta-nos: <a href="mailto:suporte@openclaw.io" className="text-blue-400 hover:text-blue-300">suporte@openclaw.io</a></li>
          </ul>
        </div>
      </div>
    </main>
  );
}
