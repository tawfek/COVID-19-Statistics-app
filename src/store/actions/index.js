import {
  SET_LANGUAGE,
  SET_DARK_MODE,
  SET_CURRENT_COUNTRY,
  SET_PAGE_TITLE,
  SET_PAGE_DESCRIPTION,
} from "../constants/action-types";

export function setLanguage(payload) {
  return { type: SET_LANGUAGE, payload };
}

export function setDarkMode(payload) {
  return { type: SET_DARK_MODE, payload };
}

export function setCurrentCountry(payload) {
  return { type: SET_CURRENT_COUNTRY, payload };
}
export function setPageTitle(payload){
    return { type:SET_PAGE_TITLE, payload}
}
export function setPageDescription(payload) {
    return { type:SET_PAGE_DESCRIPTION, payload}
}
