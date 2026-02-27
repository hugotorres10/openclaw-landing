'use client';

import { useState, useCallback, useMemo } from 'react';
import {
  getTranslation,
  isValidLocale,
  DEFAULT_LOCALE,
  type Locale,
  type TranslationKeys,
  type Translations,
} from '@/lib/i18n';

function readLocaleCookie(): Locale {
  if (typeof document === 'undefined') return DEFAULT_LOCALE;
  const match = document.cookie.match(/(?:^|;\s*)locale=([^;]*)/);
  if (match && isValidLocale(match[1])) {
    return match[1] as Locale;
  }
  return DEFAULT_LOCALE;
}

/**
 * React hook for client-side translations.
 *
 * Returns:
 * - t(key): get translation for key
 * - locale: current locale string
 * - setLocale(locale): change language (sets cookie + reloads)
 */
export function useTranslation() {
  const [locale, setLocaleState] = useState<Locale>(readLocaleCookie);

  const translations: Translations = useMemo(() => getTranslation(locale), [locale]);

  const t = useCallback(
    (key: TranslationKeys): string => {
      return translations[key] ?? key;
    },
    [translations],
  );

  const setLocale = useCallback((newLocale: Locale) => {
    if (!isValidLocale(newLocale)) return;

    // Set cookie with 1-year expiry, path=/
    document.cookie = `locale=${newLocale};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
    setLocaleState(newLocale);

    // Reload to apply everywhere (server components, metadata, etc.)
    window.location.reload();
  }, []);

  return { t, locale, setLocale };
}
