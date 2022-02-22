import {
  SET_LANGUAGE,
  SET_DARK_MODE,
  SET_PAGE_TITLE,
  SET_CURRENT_COUNTRY,
  SET_PAGE_DESCRIPTION,
  SET_FINAL_SERIES,
  SET_STATUS_DATA,
  SET_ZOOM,
  SET_LAT,
  SET_LONG,
  SET_VIEWPORT,
  SET_MAP_LOADED,
  SET_FETCHED_DATA,
  SET_CURRENT_COUNTRY_DATA,
  SET_COUNTRY_STATISTICS,
  SET_CURRENT_COUNTRY_STATISTICS
} from "../constants/action-types";


const initialState = {
  user: {
    language: "en",
    darkMode: false,
    viewport: {
      latitude: 26.96,
      longitude: 50.06,
      zoom: 3,
    },
  },
  country: {
    currentKey:   "BH",
    currentCountry: "Bahrain",
    currentCountryData: null,
    currentCountryStatistics:null,
    currentCordinates : {latitude:0,longitude:0}
  },
  page: {
    title: "page small title | page title",
    description: "page full title",
  },
  data: {
    status_data: [],
    final_seriess: [],
    countriesStatistics: [],
    fetchedData: {
      isLoaded: false,
      data: [],
    }
  },
  MapConfig: {
    ref : null ,
    loaded: false,
    styles: {
      dark: "mapbox://styles/tawfek/ck96xjmt86a9i1iqpz6bbcvbo",
      light: "mapbox://styles/tawfek/ck8uc13qd0diz1ipbot2iv6w1",
    },
    defaultStyle: "light",
    mapboxApiAccessToken: "pk.eyJ1IjoidGF3ZmVrIiwiYSI6ImNqMG14bjFrYTAwMW8yd251cm14dnNiaGwifQ.HBES0LqkE-Jcxs24amwGuw"
  },
};

function rootReducer(state = initialState, action) {
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
    case SET_STATUS_DATA:
      return Object.assign({}, state, {
        ...state,
        data: Object.assign({}, state.data, {
          ...state.data,
          status_data: action.payload,
        }),
      });
    case SET_FINAL_SERIES:
      return Object.assign({}, state, {
        ...state,
        data: Object.assign({}, state.data, {
          ...state.data,
          final_seriess: action.payload,
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
    case SET_LAT:
      return Object.assign({}, state, {
        ...state,
        user: Object.assign({}, state.user, {
          ...state.user,
          viewport: Object.assign({}, state.user.viewport, {
            ...state.user.viewport,
            latitude: action.payload,
          }),
        }),
      });
    case SET_LONG:
      return Object.assign({}, state, {
        ...state,
        user: Object.assign({}, state.user, {
          ...state.user,
          viewport: Object.assign({}, state.user.viewport, {
            ...state.user.viewport,
            longitude: action.payload,
          }),
        }),
      });
    case SET_ZOOM:
      return Object.assign({}, state, {
        ...state,
        user: Object.assign({}, state.user, {
          ...state.user,
          viewport: Object.assign({}, state.user.viewport, {
            ...state.user.viewport,
            zoom: action.payload,
          }),
        }),
      });
      case SET_MAP_LOADED:
        return Object.assign({}, state, {
          ...state,
          MapConfig : Object.assign({}, state.MapConfig, {
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

export default rootReducer;
