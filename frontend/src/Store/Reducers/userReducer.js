import {
  LOGOUT_USER,
  LOGIN_USER,
  AUTH_USER,
  WITHDRAW_USER,
  GET_USER_INFO,
} from "../Actions/type";

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, login: action.payload };
    case LOGOUT_USER:
      return { ...state, logout: action.payload };
    case AUTH_USER:
      return { ...state, auth: action.payload };
    case WITHDRAW_USER:
      return { ...state, success: action.payload };
    case GET_USER_INFO:
      return { ...state, userInfo: action.payload };
    default:
      return state;
  }
};

export default userReducer;
