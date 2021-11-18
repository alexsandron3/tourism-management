import { SET_NEW_CLIENT } from '../actions';

const INITIAL_STATE = {
  nomeCliente: '',
  emailCliente: '',
  rgCliente: '',
  orgaoEmissor: '',
  cpfCliente: '',
  telefoneCliente: '',
  dataNascimento: null,
  idadeCliente: 0,
  referencia: '',
  pessoaContato: '',
  telefoneContato: '',
  cpfConsultado: 0,
  dataCpfConsultado: null,
  redeSocial: '',
  enderecoCliente: '',
  nacionalidade: '',
  profissao: '',
  estadoCivil: '',
  clienteRedeSocial: 0,
  poltrona: '',
  isLoading: false,
  cliente: '2813',
};

const clientReducer = (state = INITIAL_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
    case SET_NEW_CLIENT:
      return { ...payload };
    default:
      return state;
  }
};

export default clientReducer;
