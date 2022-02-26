import {
  SET_LANGUAGE,
  SET_DARK_MODE,
  SET_CURRENT_COUNTRY,
  SET_PAGE_TITLE,
  SET_PAGE_DESCRIPTION,
  SET_VIEWPORT,
  SET_MAP_LOADED,
  SET_FETCHED_DATA,
  SET_CURRENT_COUNTRY_DATA,
  SET_COUNTRY_STATISTICS,
  SET_CURRENT_COUNTRY_STATISTICS,
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
export function setCurrentCountryData(payload) {
  return { type: SET_CURRENT_COUNTRY_DATA, payload };
}
export function setPageTitle(payload) {
  return { type: SET_PAGE_TITLE, payload };
}
export function setPageDescription(payload) {
  return { type: SET_PAGE_DESCRIPTION, payload };
}

export function setViewport(payload) {
  return { type: SET_VIEWPORT, payload };
}

export function setMapLoaded(payload) {
  return { type: SET_MAP_LOADED, payload };
}

export function setFetchedData(payload) {
  return { type: SET_FETCHED_DATA, payload };
}

export function setCountryStatistics(payload) {
  return { type: SET_COUNTRY_STATISTICS, payload };
}
export function setCurrentCountryStatistics(payload) {
  return { type: SET_CURRENT_COUNTRY_STATISTICS, payload };
}
