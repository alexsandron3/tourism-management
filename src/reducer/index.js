import { combineReducers } from 'redux';
import eventReducer from './eventReducer';
import clientReducer from './clientReducer';
import paymentReducer from './paymentReducer';
import stepperReducer from './stepperReducer';
const rootReducer = combineReducers({
  eventReducer,
  clientReducer,
  paymentReducer,
  stepperReducer,
});
export default rootReducer;
