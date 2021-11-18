import { fetchPagamento } from '../services/pagamento';
// Events
export const NEW_EVENT = 'NEW_EVENT';
export const SET_NEW_EVENT = 'SET_NEW_EVENT';
export const CLEAR_EVENT = 'CLEAR_EVENT';
export const setNewEvent = (payload) => ({ type: SET_NEW_EVENT, payload });
export const clearEvent = () => ({ type: CLEAR_EVENT });
// Clients
export const NEW_CLIENT = 'NEW_CLIENT';
export const SET_NEW_CLIENT = 'SET_NEW_CLIENT';
export const setNewClient = (payload) => ({ type: SET_NEW_CLIENT, payload });
// Stepper
export const CHANGE_STEP = 'CHANGE_STEP';
export const NEXT_STEP = 'NEXT_STEP';
export const PREVIOUS_STEP = 'PREVIOUS_STEP';
export const ENABLE_BUTTON = 'ENABLE_BUTTON';
export const DISABLE_BUTTON = 'DISABLE_BUTTON';
export const nextStep = () => ({ type: NEXT_STEP });
export const previousStep = () => ({ type: PREVIOUS_STEP });
export const enableButton = () => ({ type: ENABLE_BUTTON });
export const disableButton = () => ({ type: DISABLE_BUTTON });
// Payment
export const NEW_PAYMENT = 'NEW_PAYMENT';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAIL = 'FETCH_FAIL';
export const PAYMENT_EXISTS = 'PAYMENT_EXISTS';
export const setNewPayment = (payload) => ({ type: NEW_PAYMENT, payload });
export const FETCH_PAYMENT = 'FETCH_PAYMENT';
// export const fetchPayment = (payload) => ({ type: FETCH_PAYMENT, payload });
export const fetchPayment = (payload) => async (dispatch) => {
  try {
    const {
      data: { success, pagamento },
      data,
    } = await fetchPagamento(...payload);
    if (success === 1) {
      console.log('object');
    } else {
      dispatch(enableButton());
    }
  } catch (error) {}
};
