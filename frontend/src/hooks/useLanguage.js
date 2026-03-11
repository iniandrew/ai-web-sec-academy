import { createContext, createElement, useContext, useMemo, useState } from 'react';
import { LANGUAGES, translations } from '../i18n';

const DEFAULT_LANGUAGE = LANGUAGES.en.code;
const STORAGE_KEY = 'academy_language';

const LanguageContext = createContext(null);

function readInitialLanguage() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved && translations[saved] ? saved : DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(readInitialLanguage);

  const value = useMemo(() => {
    const t = translations[language] || translations[DEFAULT_LANGUAGE];
    const apiLanguage = LANGUAGES[language]?.apiValue || LANGUAGES.en.apiValue;

    return {
      language,
      t,
      apiLanguage,
      setLanguage: (nextLanguage) => {
        const safeLanguage = translations[nextLanguage] ? nextLanguage : DEFAULT_LANGUAGE;
        localStorage.setItem(STORAGE_KEY, safeLanguage);
        setLanguage(safeLanguage);
      }
    };
  }, [language]);

  return createElement(LanguageContext.Provider, { value }, children);
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
