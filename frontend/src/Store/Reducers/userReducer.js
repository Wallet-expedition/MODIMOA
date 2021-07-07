import { LOGOUT_USER, LOGIN_USER, AUTH_USER } from "../Actions/type";

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, login: action.payload };
    case LOGOUT_USER:
      return { ...state, logout: action.payload };
    case AUTH_USER:
      return { ...state, auth: action.payload };
    default:
      return state;
  }
};

export default userReducer;
