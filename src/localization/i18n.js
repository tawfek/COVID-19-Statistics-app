import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import {English} from "./languages/english"
import {Arabic} from "./languages/arabic"
import store from "../store"
const resources = Object.assign({},Arabic,English) ;


let lng = "en";

store.subscribe( () => {
  lng =  store.getState().user.language ;
})

 i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng,
    fallbackLng: 'en',
    keySeparator: false,
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });


  export default i18n ;