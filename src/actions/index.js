export const NEW_EVENT = 'NEW_EVENT';
export const SET_NEW_EVENT = 'SET_NEW_EVENT';

export const setNewEvent = (payload) => ({ type: SET_NEW_EVENT, payload });

export const NEW_CLIENT = 'NEW_CLIENT';
export const SET_NEW_CLIENT = 'SET_NEW_CLIENT';

export const setNewClient = (payload) => ({ type: SET_NEW_CLIENT, payload });

export const CHANGE_STEP = 'CHANGE_STEP';
export const SET_STEP = 'SET_STEP';
export const changeStep = (payload) => ({ type: CHANGE_STEP, payload });
