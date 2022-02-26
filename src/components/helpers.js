import store from "../store";
import { FlyToInterpolator } from "react-map-gl";
import __ from "../localization/tr";
import {
  setViewport,
  setCurrentCountry,
  setCurrentCountryData,
  setCurrentCountryStatistics,
  setPageTitle,
  setPageDescription,
  setLanguage,
} from "../store/actions";
import { Languages } from "../localization/languages";
import detectCountry from "../api/detectCountry";
import * as d3 from "d3-ease";
import * as Countries from "../countries.json";
import i18n from "../localization/i18n";
import { history } from "../store";
import { matchPath } from "react-router-dom";
import { DEFAULT_LANGUAGE_KEY } from "../config";

const defaultViewPort = {
  latitude: 26.96,
  longitude: 50.06,
  zoom: 3,
};

export const FlyMe = (
  lat = defaultViewPort.latitude,
  lng = defaultViewPort.longitude,
  zoom = defaultViewPort.zoom,
  iso = {},
  reload = true
) => {
  const { mapboxApiAccessToken } = store.getState().root.MapConfig;
  const FlyTo = {
    latitude: Number(lat),
    longitude: Number(lng),
    zoom: Number(zoom),
    mapboxApiAccessToken: mapboxApiAccessToken,
    width: "100vw",
    logoPosition: "top-right",
    transitionDuration: 500,
    transitionInterpolator: new FlyToInterpolator(),
    transitionEasing: d3.easeCubic,
  };
  store.dispatch(setViewport(FlyTo));
  if (!reload) {
    store.dispatch(setViewport(FlyTo));
    setCountry(iso.currentKey);
  }
};

export const RedirectToCountry = (country) => {
  let { pathname } = history.location;
  let { user } = store.getState().root;

  let params = matchPath(pathname, {
    path: "/:lng/:country",
  });
  if (params == null) {
    detectCountry((country) => {
      history.replace({ ...history, pathname: `${user.language}/${country}` });
      setCountry(country);
    });
  } else {
    params = params.params;
    if (
      params.country !== country &&
      params.country !== null &&
      params.country !== undefined
    ) {
      history.replace({ ...history, pathname: `/${user.language}/${country}` });
    }
    if (
      params.lng !== user.language &&
      params.lng !== null &&
      params.lng !== undefined
    ) {
      history.replace({ ...history, pathname: `/${params.lng}/${country}` });
      setLanguage(params.lng);
    }
  }
};

export const RedirectToLanguage = (language) => {
  let { pathname } = history.location;
  let { country } = store.getState().root;
  let params = matchPath(pathname, {
    path: "/:lng/:country",
  });
  if (params !== null) {
    params = params.params;
    history.replace({
      ...history,
      pathname: `/${language}/${country.currentCountry}`,
    });
    refreshCurrentCountry();
  }
};

export const setCountry = (CountryIsoOrName) => {
  let { data } = store.getState().root;
  let { isLoaded } = data.fetchedData;
  let fetchedDataData = data.fetchedData.data;
  if (CountryIsoOrName !== null) {
    let Country = getCountry(CountryIsoOrName);
    store.dispatch(setCurrentCountry(Country));
    let { countriesStatistics } = data;
    let currentCountry7DaysData = countriesStatistics.find(function (country) {
      return country.name.indexOf(Country.currentCountry) !== -1;
    });

    store.dispatch(setCurrentCountryStatistics(currentCountry7DaysData));
    store.dispatch(
      setPageTitle(
        `${__(Country.currentCountry)} | ${__("header title")} ${__(
          Country.currentCountry
        )} `
      )
    );
    store.dispatch(
      setPageDescription(
        `${__("header info")} ${__(Country.currentCountry)} ${__(
          "with charts"
        )}`
      )
    );
    RedirectToCountry(Country.currentCountry);
    if (isLoaded) {
      let CountryData = fetchedDataData.find(function (country) {
        return country.country.indexOf(Country.currentCountry) !== -1;
      });
      if (CountryData !== undefined) {
        store.dispatch(setCurrentCountryData(CountryData.response));
      }
    }

    return Country;
  }
};

export const refreshCurrentCountry = () => {
  let { country } = store.getState().root;
  let { currentKey } = country;
  setCountry(currentKey);
};

export const getCountry = (CountryIsoOrName) => {
  let Country = { currentKey: "BH", currentCountry: "Bahrain" };
  let getCurrentCountry = Countries.countries.find(function (country) {
    return (
      country.country.iso.indexOf(CountryIsoOrName) !== -1 ||
      country.country.name.indexOf(CountryIsoOrName) !== -1
    );
  });
  if (getCurrentCountry !== undefined) {
    let { search, iso } = getCurrentCountry.country;
    Country = { currentKey: iso, currentCountry: search };
  }
  return Country;
};

export const GetDays = (d, Mention_today = false) => {
  var DateArray = [];
  var days = d;
  for (var i = 0; i < days; i++) {
    if (!Mention_today && i === 0) {
      i = 1;
      days += 1;
    }
    var date = new Date();
    var last = new Date(date.getTime() - i * 24 * 60 * 60 * 1000);
    var day = "" + last.getDate();
    var month = "" + (last.getMonth() + 1);
    var year = last.getFullYear();
    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }
    const fulld = Number(year) + "-" + month + "-" + day;
    DateArray.push(fulld);
  }
  return DateArray;
};
export const GetOneKey = (arrayOfObjects, key, asArray = false) => {
  return arrayOfObjects.map((object) => object[key] || 0);
};

export const changeLanguage = async (language_key) => {
  if (CheckLanguageAvailability(language_key)) {
    store.dispatch(setLanguage(language_key));
    i18n.changeLanguage(language_key);
    RedirectToLanguage(language_key);
  } else {
    RedirectToLanguage(DEFAULT_LANGUAGE_KEY);
    store.dispatch(setLanguage(DEFAULT_LANGUAGE_KEY));
    i18n.changeLanguage(DEFAULT_LANGUAGE_KEY);
  }
  refreshCurrentCountry();
  return language_key;
};

export const CheckLanguageAvailability = (language_key) => {
  let language = Languages.filter((language) => {
    return language_key.toLowerCase() === language.key.toLowerCase();
  });

  return language.length > 0 ? true : false;
};

function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export const SaveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
export const LoadFromLoaclStorage = (key, defaultValue) => {
  let Values = localStorage.getItem(key)
    ? isJson(localStorage.getItem(key))
      ? JSON.parse(localStorage.getItem(key))
      : defaultValue
    : defaultValue;
  return Values;
};
