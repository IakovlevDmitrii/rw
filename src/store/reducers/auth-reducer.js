import actionTypes from '../actions-types';

const { LOG_OUT, UPDATE_USER } = actionTypes.authentication;

const initialState = {
  user: {},
  isLoggedIn: false,
};

const authentication = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        user: action.payload.user,
        isLoggedIn: true,
      };

    case LOG_OUT:
      return initialState;

    default:
      return state;
  }
};

export default authentication;
