'use client';

import { useTranslation } from '@/lib/hooks/useTranslation';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="py-8 px-6 border-t border-[#1A1D2B]">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-600 text-sm">
          &copy; 2026 OpenClaw. {t('footer.rights')}
        </p>
        <div className="flex gap-6">
          <a href="#" className="text-gray-600 hover:text-gray-400 text-sm transition-colors">{t('footer.terms')}</a>
          <a href="#" className="text-gray-600 hover:text-gray-400 text-sm transition-colors">{t('footer.privacy')}</a>
          <a href="mailto:suporte@openclaw.io" className="text-gray-600 hover:text-gray-400 text-sm transition-colors">{t('footer.support')}</a>
        </div>
      </div>
    </footer>
  );
}
