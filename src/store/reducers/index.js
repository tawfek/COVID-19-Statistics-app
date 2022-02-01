import { SET_LANGUAGE,SET_DARK_MODE,SET_PAGE_TITLE,SET_CURRENT_COUNTRY, SET_PAGE_DESCRIPTION } from "../constants/action-types";
const initialState = {
  user: {
    language: "en",
    darkMode: false,
  },
  country:{
      currentKey: 0,
      currentCountry:"Bahrain"
  },
  page:{
      title:"page small title | page title",
      description:"page full title"
  }
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
        return Object.assign({}, state,{
            ...state , country : Object.assign({}, state.country,{
                currentKey: action.payload.currentKey,
                currentCountry: action.payload.currentCountry
            })
        })
    case SET_PAGE_TITLE:    
        return Object.assign({}, state, {
            ...state , 
            page: Object.assign({}, state.page,{
                ...state.page,
                title: action.payload
            })
        })

        case SET_PAGE_DESCRIPTION:    
        return Object.assign({}, state, {
            ...state , 
            page: Object.assign({}, state.page,{
                ...state.page,
                description: action.payload
            })
        })
    default:
      return state;
  }
}

export default rootReducer;
