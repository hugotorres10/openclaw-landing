'use client';

import { useEffect, useState } from 'react';
import { Check, Download, Loader2, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import { triggerAutoDownload } from '@/lib/downloadManager';
import { detectOS } from '@/lib/detectOS';

type SetupStep = 'verifying' | 'confirmed' | 'downloading' | 'instructions';

export default function SetupProgress({ sessionId }: { sessionId: string }) {
  const [step, setStep] = useState<SetupStep>('verifying');
  const [osLabel, setOsLabel] = useState('');
  const isDemo = sessionId === 'demo';

  useEffect(() => {
    const detected = detectOS();
    setOsLabel(detected.label);

    async function verifyAndDownload() {
      if (isDemo) {
        // Direct flow without payment verification
        setTimeout(() => {
          setStep('confirmed');
          setTimeout(() => {
            setStep('downloading');
            setTimeout(() => setStep('instructions'), 3000);
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
            setTimeout(() => setStep('instructions'), 3000);
          }, 1500);
        } else {
          window.location.href = '/';
        }
      } catch {
        window.location.href = '/';
      }
    }

    if (sessionId) verifyAndDownload();
  }, [sessionId, isDemo]);

  const steps = [
    { id: 'verifying', label: 'A preparar tudo...', Icon: Loader2, done: step !== 'verifying' },
    { id: 'confirmed', label: 'Conta criada com sucesso', Icon: Check, done: ['downloading', 'instructions'].includes(step) },
    { id: 'downloading', label: `A preparar download para ${osLabel}`, Icon: Download, done: step === 'instructions' },
    { id: 'instructions', label: 'Pronto para instalar!', Icon: Smartphone, done: false },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-2xl font-bold text-center">A preparar o teu OpenClaw</h1>

        <div className="space-y-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.3 }}
              className={`flex items-center gap-3 p-4 rounded-xl border ${
                s.done ? 'border-green-500/30 bg-green-500/5' : 'border-[#1A1A1A] bg-[#0A0A0A]'
              }`}
            >
              <s.Icon
                className={`w-5 h-5 ${s.done ? 'text-green-400' : 'text-gray-500'} ${
                  s.id === step && step === 'verifying' ? 'animate-spin' : ''
                }`}
              />
              <span className={s.done ? 'text-green-400' : 'text-gray-400'}>{s.label}</span>
            </motion.div>
          ))}
        </div>

        {step === 'instructions' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 rounded-xl border border-blue-500/30 bg-blue-500/5 text-center space-y-4"
          >
            <p className="text-lg font-medium">Quase lá!</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Abre o ficheiro que foi descarregado.<br />
              O OpenClaw instala-se sozinho e abre automaticamente.<br />
              Depois é só apontar a câmara ao QR code do WhatsApp.
            </p>
            <button
              onClick={() => triggerAutoDownload()}
              className="text-blue-400 hover:text-blue-300 text-sm underline cursor-pointer"
            >
              Não começou? Clica aqui para descarregar novamente
            </button>
          </motion.div>
        )}

        <div className="text-center">
          <a href="/" className="text-gray-600 hover:text-gray-400 text-sm transition-colors">
            Voltar ao início
          </a>
        </div>
      </div>
    </div>
  );
}
