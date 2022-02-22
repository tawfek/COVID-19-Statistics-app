import store from "../store";
import { FlyToInterpolator } from "react-map-gl";
import {
  setViewport,
  setCurrentCountry,
  setCurrentCountryData,
  setCurrentCountryStatistics,
} from "../store/actions";
import * as d3 from "d3-ease";
import * as Countries from "../countries.json";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ar from "javascript-time-ago/locale/ar";
TimeAgo.addLocale(en);
TimeAgo.addLocale(ar);

const { MapConfig, user } = store.getState();
const { mapboxApiAccessToken } = MapConfig;
const { language } = user;

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

export const setCountry = (CountryIsoOrName) => {
  let { data } = store.getState();
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

export const getCountry = (CountryIsoOrName) => {
  let getCurrentCountry = Countries.countries.find(function (country) {
    return (
      country.country.iso.indexOf(CountryIsoOrName) !== -1 ||
      country.country.name.indexOf(CountryIsoOrName) !== -1
    );
  });
  let { search, iso } = getCurrentCountry.country;
  let Country = { currentKey: iso, currentCountry: search };
  return Country;
};

export const ReactTimeago = (date) => {
  const timeAgo = new TimeAgo(language);
  return timeAgo.format(date);
};
export const GetToday = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
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
