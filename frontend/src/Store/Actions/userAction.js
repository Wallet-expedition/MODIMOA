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
  const res = await axios.post(
    `${process.env.REACT_APP_SERVER}/api/users/login`,
    body,
    {
      headers: {
        authorization: tokenId,
      },
    }
  );

  return {
    type: LOGIN_USER,
    payload: res.data,
  };
};

export const registerUser = async (body, tokenId) => {
  const res = await axios.post(
    `${process.env.REACT_APP_SERVER}/api/users/new`,
    body,
    {
      headers: {
        authorization: tokenId,
      },
    }
  );
  return {
    type: LOGIN_USER,
    payload: res.data,
  };
};

export const logoutUser = async (tokenId) => {
  console.log(tokenId);
  const res = await axios.post(
    `${process.env.REACT_APP_SERVER}/api/users/logout`,
    {},
    {
      headers: {
        authorization: tokenId,
      },
    }
  );
  console.log(res);

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
  const res = await axios.get(`${process.env.REACT_APP_SERVER}/api/auth/auth`, {
    headers: {
      authorization: tokenId,
    },
  });
  console.log(res.data);
  return {
    type: AUTH_USER,
    // payload: res.data,
    payload: 1,
  };
};

export const withDrawUser = async (tokenId) => {
  console.log(tokenId);
  const res = await axios.delete(
    `${process.env.REACT_APP_SERVER}/api/users/withdrawal`,
    {
      headers: {
        authorization: tokenId,
      },
    }
  );

  return {
    type: WITHDRAW_USER,
    payload: res.data,
  };
};

export const getUserInfo = async (tokenId) => {
  const res = await axios.post(
    `${process.env.REACT_APP_SERVER}/api/users/info`,
    {},
    {
      headers: {
        authorization: tokenId,
      },
    }
  );

  return {
    type: GET_USER_INFO,
    payload: res.data,
  };
};
