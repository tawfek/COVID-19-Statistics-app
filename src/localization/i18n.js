import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { English } from "./languages/english";
import { Arabic } from "./languages/arabic";
import { Turkish } from "./languages/turkish";
import store from "../store";
import { DEFAULT_LANGUAGE_KEY } from "../config";
const resources = Object.assign({},  English,Turkish,Arabic);

let lng = DEFAULT_LANGUAGE_KEY

store.subscribe(() => {
  lng = store.getState().root.user.language;
  i18n.changeLanguage(lng);
});

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng,
    fallbackLng: DEFAULT_LANGUAGE_KEY,
    keySeparator: false,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
