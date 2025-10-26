// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from './en/common.json';
import idTranslation from './id/common.json';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',

    interpolation: {
      escapeValue: false, // React already escapes
    },

    resources: {
      en: {
        translation: enTranslation,
      },
      id: {
        translation: idTranslation,
      },
    },

    react: {
      useSuspense: false,
    },
  });

export default i18n;
