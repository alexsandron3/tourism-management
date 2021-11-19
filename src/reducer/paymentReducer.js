import {
  FETCH_PAYMENT,
  NEW_PAYMENT,
  PAYMENT_EXISTS,
  SET_PAYMENT_INFO,
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
  console.log(action);
  switch (action.type) {
    case SET_PAYMENT_INFO:
      return { ...state, pagamento: [payload] };
    case FETCH_PAYMENT:
      return { idPasseio: payload[0], idCliente: payload[1] };
    case PAYMENT_EXISTS:
      return { ...state };
    case NEW_PAYMENT:
      return { ...state, success: payload.success, message: payload.message };
    default:
      return state;
  }
};

export default paymentReducer;
