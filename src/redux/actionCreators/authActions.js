import * as AuthActionTypes from "../actionTypes/authTypes";

export const setLogin = user => {
  return {
    type: AuthActionTypes.SET_LOGIN,
    payload: user
  };
};


export const setLogout = () => {
  return {
    type: AuthActionTypes.SET_LOGOUT,
    payload: {}
  };
};