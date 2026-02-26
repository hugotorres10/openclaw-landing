'use client';

import { Zap, MessageSquare, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { FEATURES } from '@/lib/constants';

const iconMap: Record<string, React.ElementType> = {
  Zap,
  MessageSquare,
  Shield,
};

export default function Features() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {FEATURES.map((feature, i) => {
          const Icon = iconMap[feature.icon];
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="p-6 rounded-2xl bg-[#0A0A0A] border border-[#1A1A1A] hover:border-[#2A2A2A] transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
