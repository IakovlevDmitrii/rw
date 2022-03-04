import actionTypes from "../actions-types";

const { UPDATE_USER, LOG_OUT } = actionTypes.authentication;

const updateUser = (user) => ({
  type: UPDATE_USER,
  payload: { user },
});

const logOut = () => ({
  type: LOG_OUT,
});

const authentication = {
  updateUser,
  logOut,
};

export default authentication;
