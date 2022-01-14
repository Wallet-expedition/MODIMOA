import {
  LOGOUT_USER,
  LOGIN_USER,
  WITHDRAW_USER,
  GET_USER_INFO,
  REGITER_USER,
  GET_USER_PROFIT,
} from "../Actions/type";

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, login: action.payload };
    case LOGOUT_USER:
      return { ...state, logout: action.payload };
    case WITHDRAW_USER:
      return { ...state, withdraw: action.payload };
    case GET_USER_INFO:
      return { ...state, userInfo: action.payload };
    case REGITER_USER:
      return { ...state, register: action.payload };
    case GET_USER_PROFIT:
      return { ...state, profit: action.payload };
    default:
      return state;
  }
};

export default userReducer;
