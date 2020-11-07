import { remote } from "electron";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-electron-language-detector";

import * as resources from "./locales";

i18n.use(LanguageDetector).use(initReactI18next).init({
  // debug: true,
  // saveMissing: true,
  // saveMissingTo: "current",
  returnObjects: true,
  // lng: "en",
  fallbackLng: "en",
  detection: {},
  resources,
});

export default i18n;
