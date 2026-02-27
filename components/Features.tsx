'use client';

import { Zap, MessageSquare, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/hooks/useTranslation';

const iconMap: Record<string, React.ElementType> = {
  Zap,
  MessageSquare,
  Shield,
};

export default function Features() {
  const { t } = useTranslation();

  const features = [
    { icon: 'Zap', title: t('features.autoInstall'), description: t('features.autoInstallDesc') },
    { icon: 'MessageSquare', title: t('features.whatsappAI'), description: t('features.whatsappAIDesc') },
    { icon: 'Shield', title: t('features.privacy'), description: t('features.privacyDesc') },
  ];

  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-4">{t('features.title')}</h2>
        <p className="text-gray-500 text-center mb-12 max-w-lg mx-auto">{t('features.subtitle')}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, i) => {
            const Icon = iconMap[feature.icon];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="p-6 rounded-2xl bg-[#0D0F17] border border-[#1A1D2B] hover:border-[#2A2D3B] transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/15 transition-colors">
                  <Icon className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
