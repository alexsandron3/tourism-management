import { DISABLE_BUTTON, ENABLE_BUTTON, SET_STEP } from '../actions';
import FormPagamento from '../components/partials/FormPagamento';
import SelecionarPasseio from '../components/partials/SelecionarPasseio';

// const INITIAL_STATE = [
//   {
//     label: 'Registrar Cliente',
//   },
//   {
//     label: 'Selecionar Passeio',
//     title: 'Selecione um passeio para Pagamento',
//     content: <SelecionarPasseio />,
//   },
//   {
//     label: 'Realizar Pagamento',
//     title: 'Pagamento',
//     content: <FormPagamento />,
//   },
//   {
//     label: 'Emitir Contrato',
//   },
// ];

const INITIAL_STATE = {
  isButtonDisabled: true,
};
const stepperReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_STEP:
      return { ...state, state: action.payload };
    case ENABLE_BUTTON:
      return { ...state, isButtonDisabled: false };
    case DISABLE_BUTTON:

    default:
      break;
  }
};
