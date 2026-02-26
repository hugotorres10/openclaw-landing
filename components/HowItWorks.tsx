'use client';

import { motion } from 'framer-motion';
import { STEPS } from '@/lib/constants';

export default function HowItWorks() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-4">Como funciona?</h2>
        <p className="text-gray-500 text-center mb-16 max-w-md mx-auto">Três passos. Sem complicações.</p>
        <div className="space-y-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="flex gap-5 items-start p-5 rounded-xl bg-[#0D0F17] border border-[#1A1D2B] hover:border-[#2A2D3B] transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/20 flex items-center justify-center shrink-0">
                <span className="text-blue-400 font-bold text-sm">{step.number}</span>
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
