import { LoadFromLoaclStorage,CheckLanguageAvailability, getCountry } from "../../components/helpers";
import {
  SET_LANGUAGE,
  SET_DARK_MODE,
  SET_PAGE_TITLE,
  SET_CURRENT_COUNTRY,
  SET_PAGE_DESCRIPTION,
  SET_VIEWPORT,
  SET_MAP_LOADED,
  SET_FETCHED_DATA,
  SET_CURRENT_COUNTRY_DATA,
  SET_COUNTRY_STATISTICS,
  SET_CURRENT_COUNTRY_STATISTICS,
} from "../constants/action-types";
import detectBrowserLanguage from 'detect-browser-language'
import { MAPBOX_API_ACCESS_TOKEN, MAPBPX_MAPSTYLE_DARK, MAPBPX_MAPSTYLE_LIGHT ,DEFAULT_COUNTRY,DEFAULT_LANGUAGE_KEY,DEFAULT_DARKMODE, WEBSITE_TITLE,WEBSITE_DESCRIPTION} from "../../config";

let BrowserLanguage = detectBrowserLanguage().split("-")[0]
let LanguageAvailability =CheckLanguageAvailability(BrowserLanguage) ;

const initialState = {
  user: {
    language: LanguageAvailability ? BrowserLanguage : DEFAULT_LANGUAGE_KEY,
    darkMode: LoadFromLoaclStorage("darkMode",DEFAULT_DARKMODE),
    viewport: {
      latitude: 26.96,
      longitude: 50.06,
      zoom: 3,
    },
  },
  country: {
    currentKey: getCountry(DEFAULT_COUNTRY).currentKey,
    currentCountry: getCountry(DEFAULT_COUNTRY).currentCountry,
    currentCountryData: null,
    currentCountryStatistics: null,
    currentCordinates: { latitude: 0, longitude: 0 },
  },
  page: {
    title:WEBSITE_TITLE,
    description:WEBSITE_DESCRIPTION,
  },
  data: {
    countriesStatistics: [],
    fetchedData: {
      isLoaded: false,
      data: [],
    },
  },
  MapConfig: {
    ref: null,
    loaded: false,
    styles: {
      dark: MAPBPX_MAPSTYLE_DARK,
      light: MAPBPX_MAPSTYLE_LIGHT,
    },
    defaultStyle: "light",
    mapboxApiAccessToken:MAPBOX_API_ACCESS_TOKEN,
  },
};

function root(state = initialState, action) {
  switch (action.type) {
    case SET_LANGUAGE:
      return Object.assign({}, state, {
        ...state,
        user: Object.assign({}, state.user, {
          ...state.user,
          language: action.payload,
        }),
        MapConfig: Object.assign({}, state.MapConfig, {
          ...state.MapConfig,
          ref: 1,
        }),
      });
    case SET_DARK_MODE:
      return Object.assign({}, state, {
        ...state,
        user: Object.assign({}, state.user, {
          ...state.user,
          darkMode: action.payload,
        }),
      });
    case SET_CURRENT_COUNTRY:
      return Object.assign({}, state, {
        ...state,
        country: Object.assign({}, state.country, {
          currentKey: action.payload.currentKey,
          currentCountry: action.payload.currentCountry,
        }),
      });
    case SET_PAGE_TITLE:
      return Object.assign({}, state, {
        ...state,
        page: Object.assign({}, state.page, {
          ...state.page,
          title: action.payload,
        }),
      });

    case SET_PAGE_DESCRIPTION:
      return Object.assign({}, state, {
        ...state,
        page: Object.assign({}, state.page, {
          ...state.page,
          description: action.payload,
        }),
      });
    case SET_VIEWPORT:
      return Object.assign({}, state, {
        ...state,
        user: Object.assign({}, state.user, {
          ...state.user,
          viewport: action.payload,
        }),
      });
    case SET_COUNTRY_STATISTICS:
      return Object.assign({}, state, {
        ...state,
        data: Object.assign({}, state.data, {
          ...state.data,
          countriesStatistics: action.payload,
        }),
      });
    case SET_MAP_LOADED:
      return Object.assign({}, state, {
        ...state,
        MapConfig: Object.assign({}, state.MapConfig, {
          ...state.MapConfig,
          loaded: action.payload,
        }),
      });
    case SET_FETCHED_DATA:
      return Object.assign({}, state, {
        ...state,
        data: Object.assign({}, state.data, {
          ...state.data,
          fetchedData: action.payload,
        }),
      });
    case SET_CURRENT_COUNTRY_DATA:
      return Object.assign({}, state, {
        ...state,
        country: Object.assign({}, state.country, {
          ...state.country,
          currentCountryData: action.payload,
        }),
      });
    case SET_CURRENT_COUNTRY_STATISTICS:
      return Object.assign({}, state, {
        ...state,
        country: Object.assign({}, state.country, {
          ...state.country,
          currentCountryStatistics: action.payload,
        }),
      });
    default:
      return state;
  }
}

export default root;
