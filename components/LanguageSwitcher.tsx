'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { SUPPORTED_LOCALES, type Locale } from '@/lib/i18n';
import { useTranslation } from '@/lib/hooks/useTranslation';

const FLAG_EMOJI: Record<Locale, string> = {
  pt: '\uD83C\uDDF5\uD83C\uDDF9',
  en: '\uD83C\uDDEC\uD83C\uDDE7',
  fr: '\uD83C\uDDEB\uD83C\uDDF7',
  es: '\uD83C\uDDEA\uD83C\uDDF8',
  de: '\uD83C\uDDE9\uD83C\uDDEA',
  it: '\uD83C\uDDEE\uD83C\uDDF9',
};

export default function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const current = SUPPORTED_LOCALES.find((l) => l.code === locale) ?? SUPPORTED_LOCALES[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-400 hover:text-white border border-[#1A1D2B] rounded-lg hover:border-[#2A2D3B] transition-all bg-[#0D0F17] cursor-pointer"
      >
        <span className="text-base leading-none">{FLAG_EMOJI[current.code]}</span>
        <span className="text-xs font-medium uppercase">{current.code}</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-44 bg-[#0D0F17] border border-[#1A1D2B] rounded-xl overflow-hidden shadow-2xl shadow-black/50 z-[100]">
          {SUPPORTED_LOCALES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLocale(lang.code);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors cursor-pointer ${
                lang.code === locale
                  ? 'bg-blue-500/10 text-blue-400'
                  : 'text-gray-400 hover:bg-[#12141E] hover:text-white'
              }`}
            >
              <span className="text-base leading-none">{FLAG_EMOJI[lang.code]}</span>
              <span className="flex-1">{lang.label}</span>
              {lang.code === locale && (
                <span className="text-blue-400 text-xs">&#10003;</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
