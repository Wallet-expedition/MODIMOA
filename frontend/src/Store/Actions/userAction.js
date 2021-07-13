import axios from "axios";
import { AUTH_USER, LOGIN_USER, LOGOUT_USER, WITHDRAW_USER } from "./type";

/**
 *
 * @params tokenId : string
 * @params body : request we need (nickname, image, email)
 *
 * @return user.response.data
 */
export const loginUser = async (tokenId, body) => {
  const res = await axios.post(`${process.env.SERVER}/api/auth/login`, body, {
    headers: {
      authorization: tokenId,
    },
  });

  return {
    type: LOGIN_USER,
    payload: res.data,
  };
};

export const logoutUser = async (tokenId) => {
  const res = await axios.delete(`${process.env.SERVER}/api/user/logout`, {
    headers: {
      authorization: tokenId,
    },
  });

  return {
    type: LOGOUT_USER,
    payload: res.data,
  };
};

/**
 *
 * @param {string} tokenId from server
 *
 * isLogin method
 */
export const auth = async (tokenId) => {
  const res = await axios.get(`${process.env.SERVER}}/api/user/auth`, {
    headers: {
      authorization: tokenId,
    },
  });
  console.log(res.data);
  return {
    type: AUTH_USER,
    payload: res.data,
  };
};

export const withDrawUser = async (tokenId) => {
  const res = await axios.delete(`${process.env.SERVER}/api/user`, {
    headers: {
      authorization: tokenId,
    },
  });

  return {
    type: WITHDRAW_USER,
    payload: res.data,
  };
};
