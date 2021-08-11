import axios from "axios";
import {
  AUTH_USER,
  GET_USER_INFO,
  LOGIN_USER,
  LOGOUT_USER,
  WITHDRAW_USER,
} from "./type";

/**
 *
 * @params tokenId : string
 * @params body : request we received (image, email)
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

export const registerUser = async (body) => {
  const res = await axios.post(`${process.env.SERVER}/api/auth/login`, body);

  return {
    type: LOGIN_USER,
    payload: res.data,
  };
};

export const logoutUser = async (tokenId) => {
  const res = await axios.delete(`${process.env.SERVER}/api/auth/logout`, {
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
  const res = await axios.get(`${process.env.SERVER}}/api/auth/auth`, {
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
  const res = await axios.delete(`${process.env.SERVER}/api/auth/removal`, {
    headers: {
      authorization: tokenId,
    },
  });

  return {
    type: WITHDRAW_USER,
    payload: res.data,
  };
};

export const getUserInfo = async (tokenId) => {
  const res = await axios.get(`${process.env.SERVER}/api/auth/myinfo`, {
    headers: {
      authorization: tokenId,
    },
  });

  return {
    type: GET_USER_INFO,
    payload: res.data,
  };
};
