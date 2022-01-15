import axios from "axios";
import {
  GET_USER_INFO,
  GET_USER_PROFIT,
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
    `${process.env.REACT_APP_SERVER}/api/user/login`,
    body,
    {
      headers: {
        authorization: tokenId,
        withCredentials: true,
      },
    }
  );
  return {
    type: LOGIN_USER,
    payload: res,
  };
};

export const registerUser = async (body, tokenId) => {
  const res = await axios.post(
    `${process.env.REACT_APP_SERVER}/api/user/new`,
    body,
    {
      headers: {
        authorization: tokenId,
      },
    }
  );
  return {
    type: LOGIN_USER,
    payload: res,
  };
};

export const logoutUser = async (tokenId) => {
  const res = await axios.post(
    `${process.env.REACT_APP_SERVER}/api/user/logout`,
    {},
    {
      headers: {
        authorization: tokenId,
      },
    }
  );

  return {
    type: LOGOUT_USER,
    payload: res,
  };
};

export const withDrawUser = async (tokenId) => {
  const res = await axios.delete(
    `${process.env.REACT_APP_SERVER}/api/user/withdrawal`,
    {
      headers: {
        authorization: tokenId,
      },
    }
  );

  return {
    type: WITHDRAW_USER,
    payload: res,
  };
};

export const getUserInfo = async (tokenId) => {
  const res = await axios.post(
    `${process.env.REACT_APP_SERVER}/api/user/info`,
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

export const getUserProfit = async (tokenId) => {
  const res = await axios.post(
    `${process.env.REACT_APP_SERVER}/api/mybag/prices`,
    {},
    {
      headers: {
        authorization: tokenId,
      },
    }
  );
  return {
    type: GET_USER_PROFIT,
    payload: res.data,
  };
};
