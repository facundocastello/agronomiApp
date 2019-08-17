const RECEIVE_ERRORS = 'ui/errors';
const RECEIVE_SUCCESS_MESSAGE = 'ui/successMessage';

const initialState = {
  errors: {},
  successMessage: ''
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

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ERRORS:
      return { ...state, errors: action.errors };
    case RECEIVE_SUCCESS_MESSAGE:
      return { ...state, successMessage: action.successMessage };

    default:
      return state;
  }
};
