import actionTypes from "../actions-types";

const { IS_LOADING } = actionTypes;

const loading = (status) => ({
  type: IS_LOADING,
  payload: { status },
});

export default loading;
