import * as AuthTypes from "../actionTypes/authTypes";

const initialState = {
  auth: {
    isLoggedIn: false,
    user: {}
  }
};

const authReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case AuthTypes.SET_LOGIN:
      return {
        ...state.auth,
        isLoggedIn: true,
        user: actions.payload
      };
    case AuthTypes.SET_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: {}
      };
    default:
      return state;
  }
};

export default authReducer;
