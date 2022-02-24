import actionTypes from "../actions-types";

const { IS_LOADING } = actionTypes;

const initialState = {
  isLoading: false,
};

// eslint-disable-next-line default-param-last
const loading = (state = initialState, action) => {
  if (action.type === IS_LOADING) {
    return {
      isLoading: action.payload.status,
    };
  }
  return state;
};

export default loading;
