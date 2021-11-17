import { combineReducers } from 'redux';
import eventReducer from './eventReducer';
import clientReducer from './clientReducer';
const rootReducer = combineReducers({ eventReducer, clientReducer });
export default rootReducer;
