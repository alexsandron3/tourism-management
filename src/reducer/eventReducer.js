import { SET_NEW_EVENT, CLEAR_EVENT } from '../actions';
const INITIAL_STATE = {
  nomePasseio: '',
  localPasseio: '',
  valorPasseio: 0,
  lotacao: 0,
  idadeIsencao: 0,
  anotacoes: '',
  itensPacote: '',
  dataPasseio: '',
  statusPasseio: 1,
  dataLancamento: '',
  prazoVigencia: '',
};

const eventReducer = (state = INITIAL_STATE, action) => {
  const { payload } = action;

  switch (action.type) {
    case SET_NEW_EVENT:
      return { ...payload };
    case CLEAR_EVENT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default eventReducer;
