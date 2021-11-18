import {
  ENABLE_BUTTON,
  FETCH_PAYMENT,
  NEW_PAYMENT,
  PAYMENT_EXISTS,
} from '../actions';
const INITIAL_STATE = {
  success: 0,
  message: '',
  pagamento: [
    {
      valorVendido: 0,
      valorPago: 0,
      novoValorPago: 0,
      valorPendente: 0,
      taxaPagamento: 0,
      previsaoPagamento: null,
      localEmbarque: ' ',
      transporte: ' ',
      opcionais: ' ',
      anotacoes: ' ',
      seguroViagem: 0,
      clienteParceiro: 0,
      referenciaCliente: ' ',
      valorContrato: 0,
      clienteDesistente: 0,
      historicoPagamento: ' ',
      defaultHistoricoPagamento: ' ',
    },
  ],
  isButtonDisabled: true,
};

const paymentReducer = (state = INITIAL_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
    case NEW_PAYMENT:
      return { ...state };
    case FETCH_PAYMENT:
      return { idPasseio: payload[0], idCliente: payload[1] };
    case PAYMENT_EXISTS:
      return { ...state };
    // case ENABLE_BUTTON:
    //   return { ...state, isButtonDisabled: false };
    default:
      return state;
  }
};

export default paymentReducer;
