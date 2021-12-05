import { FETCH_EXPENSE } from '../actions';

const INITIAL_STATE = {
  idPasseio: '',
};

const expenseReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_EXPENSE:
      return state;

    default:
      return state;
  }
};

export default expenseReducer;
