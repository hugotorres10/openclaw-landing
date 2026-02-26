'use client';

import { motion } from 'framer-motion';
import { STEPS } from '@/lib/constants';

export default function HowItWorks() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-16">Como funciona?</h2>
        <div className="space-y-8">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="flex gap-6 items-start"
            >
              <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                <span className="text-blue-400 font-bold text-lg">{step.number}</span>
              </div>
              <div>
                <h3 className="text-white font-semibold text-xl mb-1">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-12 text-center text-gray-600 italic"
        >
          &quot;Não precisas de instalar nada manualmente. Abre e funciona.&quot;
        </motion.p>
      </div>
    </section>
  );
}
