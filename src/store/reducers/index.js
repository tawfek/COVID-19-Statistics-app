import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import root from './root'

const rootReducer = (history) => combineReducers({
    root,
    router: connectRouter(history),
})

export default rootReducer
