import { SET_STEP } from '../actions';
import FormPagamento from '../components/partials/FormPagamento';
import SelecionarPasseio from '../components/partials/SelecionarPasseio';

const INITIAL_STATE = [
  {
    label: 'Registrar Cliente',
  },
  {
    label: 'Selecionar Passeio',
    title: 'Selecione um passeio para Pagamento',
    content: <SelecionarPasseio />,
  },
  {
    label: 'Realizar Pagamento',
    title: 'Pagamento',
    content: <FormPagamento />,
  },
  {
    label: 'Emitir Contrato',
  },
];

const stepperReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_STEP:
      return { ...state, state: action.payload };
      break;

    default:
      break;
  }
};
