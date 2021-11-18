import { fetchPagamento } from '../services/pagamento';

export const NEW_EVENT = 'NEW_EVENT';
export const SET_NEW_EVENT = 'SET_NEW_EVENT';
export const setNewEvent = (payload) => ({ type: SET_NEW_EVENT, payload });

export const NEW_CLIENT = 'NEW_CLIENT';
export const SET_NEW_CLIENT = 'SET_NEW_CLIENT';
export const setNewClient = (payload) => ({ type: SET_NEW_CLIENT, payload });

export const CHANGE_STEP = 'CHANGE_STEP';
export const SET_STEP = 'SET_STEP';

export const changeStep = (payload) => ({ type: CHANGE_STEP, payload });

export const NEW_PAYMENT = 'NEW_PAYMENT';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAIL = 'FETCH_FAIL';
export const PAYMENT_EXISTS = 'PAYMENT_EXISTS';
export const ENABLE_BUTTON = 'ENABLE_BUTTON';
export const DISABLE_BUTTON = 'DISABLE_BUTTON';
export const setNewPayment = (payload) => ({ type: NEW_PAYMENT, payload });
export const enableButton = (payload) => ({ type: ENABLE_BUTTON, payload });
export const FETCH_PAYMENT = 'FETCH_PAYMENT';
// export const fetchPayment = (payload) => ({ type: FETCH_PAYMENT, payload });
export const fetchPayment = (payload) => async (dispatch) => {
  try {
    const {
      data: { success, pagamento },
      data,
    } = await fetchPagamento(...payload);
    if (success === 1) {
    } else {
      dispatch(enableButton());
    }
  } catch (error) {}
};
