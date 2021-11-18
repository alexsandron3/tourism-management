import { combineReducers } from 'redux';
import eventReducer from './eventReducer';
import clientReducer from './clientReducer';
import paymentReducer from './paymentReducer';
const rootReducer = combineReducers({
  eventReducer,
  clientReducer,
  paymentReducer,
});
export default rootReducer;
