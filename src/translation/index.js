import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import {AsyncStorage} from 'react-native';

import en_translation from './en';
import zh_translation from './zh';

const resources = {
  en: {
    translation: en_translation
  },
  zh: {
    translation: zh_translation
  }
};

const init = async ()=>{
  const lng = await AsyncStorage.getItem('lang') || 'en';
  return await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'en',
      lng,
      debug: false,

      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      }
    });
};

const changeLanguage = async (lang = 'en') => {
  return await i18n.changeLanguage(lang);
};

module.exports = {init, changeLanguage};

export default i18n;