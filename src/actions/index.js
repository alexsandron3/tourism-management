import { toast } from 'react-toastify';
import fetchDespesas from '../services/fetchDespesas';
import { fetchPagamento, sendPayment } from '../services/pagamento';
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
export const FETCH_PAYMENT = 'FETCH_PAYMENT';
export const SET_PAYMENT_INFO = 'SET_PAYMENT_INFO';
export const EDIT_PAYMENT = 'EDIT_PAYMENT';
// Expense
export const NEW_EXPENSE = 'NEW_EXPENSE';
export const FETCH_EXPENSE = 'FETCH_EXPENSE';

export const setPaymentInfo = (payload) => ({
  type: SET_PAYMENT_INFO,
  payload,
});
export const setNewPayment = (payload) => ({
  type: NEW_PAYMENT,
  payload,
});
export const editPayment = (payload) => ({
  type: EDIT_PAYMENT,
  payload,
});

export const newPayment = (payload) => async (dispatch) => {
  try {
    const {
      data,
      data: { success, message },
    } = await sendPayment(payload);
    dispatch(setNewPayment(data));
    if (success === 1) {
      toast.success(message, {
        pauseOnFocusLoss: true,
      });
    } else {
      toast.error(message, {
        pauseOnFocusLoss: true,
      });
    }
  } catch (error) {
    console.error(error);
  }
};
// asas
// export const fetchPayment = (payload) => ({ type: FETCH_PAYMENT, payload });
export const fetchPayment = (payload) => async (dispatch) => {
  try {
    const {
      data: { success, pagamento },
    } = await fetchPagamento(...payload);
    if (success === 1) {
      dispatch(editPayment([pagamento, success]));
      console.log('object');
    } else {
      // dispatch(editPayment({ success }));
      dispatch(enableButton());
    }
  } catch (error) {}
};

export const fetchExpense = (payload) => async (dispatch) => {
  console.log(payload);
  try {
    const {
      data: { success, despesa },
    } = await fetchDespesas(payload);
    console.log(despesa);
  } catch (error) {
    console.error(error);
  }
};
