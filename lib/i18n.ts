import pt, { type TranslationKeys } from './translations/pt';
import en from './translations/en';
import fr from './translations/fr';
import es from './translations/es';
import de from './translations/de';
import it from './translations/it';

export type { TranslationKeys };

export type Locale = 'pt' | 'en' | 'fr' | 'es' | 'de' | 'it';

export type Translations = Record<TranslationKeys, string>;

export const SUPPORTED_LOCALES: { code: Locale; label: string; flag: string }[] = [
  { code: 'pt', label: 'Portugues', flag: 'PT' },
  { code: 'en', label: 'English', flag: 'EN' },
  { code: 'fr', label: 'Francais', flag: 'FR' },
  { code: 'es', label: 'Espanol', flag: 'ES' },
  { code: 'de', label: 'Deutsch', flag: 'DE' },
  { code: 'it', label: 'Italiano', flag: 'IT' },
];

export const DEFAULT_LOCALE: Locale = 'pt';

const translations: Record<Locale, Translations> = {
  pt,
  en,
  fr,
  es,
  de,
  it,
};

/**
 * Get translation object for a given locale.
 * Falls back to Portuguese (default) if locale is not supported.
 */
export function getTranslation(locale: string): Translations {
  const loc = locale as Locale;
  return translations[loc] ?? translations[DEFAULT_LOCALE];
}

/**
 * Get the current locale from cookie (server-side).
 * Reads the 'locale' cookie or defaults to 'pt'.
 */
export function getLocale(): Locale {
  if (typeof document === 'undefined') {
    // Server-side: try to read from headers (Next.js)
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { cookies } = require('next/headers');
      const cookieStore = cookies();
      const localeCookie = cookieStore.get('locale');
      if (localeCookie && isValidLocale(localeCookie.value)) {
        return localeCookie.value as Locale;
      }
    } catch {
      // Not in a server component context
    }
    return DEFAULT_LOCALE;
  }

  // Client-side: read from document.cookie
  const match = document.cookie.match(/(?:^|;\s*)locale=([^;]*)/);
  if (match && isValidLocale(match[1])) {
    return match[1] as Locale;
  }
  return DEFAULT_LOCALE;
}

/**
 * Check if a string is a valid locale code.
 */
export function isValidLocale(locale: string): locale is Locale {
  return SUPPORTED_LOCALES.some((l) => l.code === locale);
}
