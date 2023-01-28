import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translation_en from "./EN.json";
import translation_cn from "./CN.json";

const resources = {
    cn: {
      translation: translation_cn
    },
    en: {
      translation: translation_en
    }
  };

  i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "cn", 
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;