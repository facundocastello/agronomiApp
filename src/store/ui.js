const RECEIVE_ERRORS = 'ui/errors';
const RECEIVE_SUCCESS_MESSAGE = 'ui/successMessage';
const RECEIVE_SPINNER = 'ui/RECEIVE_SPINNER';
const RECEIVE_MODAL = 'ui/RECEIVE_MODAL';

const initialState = {
  errors: {},
  successMessage: '',
  activeModal: false,
  activeSpinner: false
};

export const receiveErrors = errors => {
  return {
    type: RECEIVE_ERRORS,
    errors: errors
  };
};

export const receiveSuccessMessage = successMessage => {
  return {
    type: RECEIVE_SUCCESS_MESSAGE,
    successMessage: successMessage
  };
};

export const receiveSpinner = active => {
  return {
    type: RECEIVE_SPINNER,
    active: active
  };
};

export const receiveModal = active => {
  return {
    type: RECEIVE_MODAL,
    active: active
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ERRORS:
      return { ...state, errors: action.errors };
    case RECEIVE_SUCCESS_MESSAGE:
      return { ...state, successMessage: action.successMessage };
    case RECEIVE_SPINNER:
      return { ...state, activeSpinner: action.active };
    case RECEIVE_MODAL:
      return { ...state, activeModal: action.active };
    default:
      return state;
  }
};
