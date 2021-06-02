import {combineReducers} from 'redux'
import exchangeReducer from './exchangeReducer.js'

const rootReducer = combineReducers({
	exchangeReducer,
})

export default rootReducer