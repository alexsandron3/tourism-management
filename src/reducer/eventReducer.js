import { SET_NEW_EVENT } from '../actions';
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

    default:
      return state;
  }
};

export default eventReducer;
