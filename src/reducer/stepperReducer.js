import {
  DISABLE_BUTTON,
  ENABLE_BUTTON,
  NEXT_STEP,
  PREVIOUS_STEP,
} from '../actions';
const INITIAL_STATE = {
  isButtonDisabled: true,
  activeStep: 1,
};
const stepperReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NEXT_STEP:
      return { ...state, activeStep: state.activeStep + 1 };
    case PREVIOUS_STEP:
      return { ...state, activeStep: state.activeStep - 1 };
    case ENABLE_BUTTON:
      return { ...state, isButtonDisabled: false };
    case DISABLE_BUTTON:
      return { ...state, isButtonDisabled: true };
    default:
      return state;
  }
};

export default stepperReducer;
