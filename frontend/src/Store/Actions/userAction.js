import request from "../../Components/Util/Request";
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
  const res = await request.post(`/api/user/login`, body, tokenId);

  return {
    type: LOGIN_USER,
    payload: res,
  };
};

export const registerUser = async (body, tokenId) => {
  const res = await request.post(`/api/user/new`, body, tokenId);

  return {
    type: LOGIN_USER,
    payload: res,
  };
};

export const logoutUser = async () => {
  const res = await request.post(`/api/user/logout`, {});

  return {
    type: LOGOUT_USER,
    payload: res,
  };
};

export const withDrawUser = async () => {
  const res = await request.delete(`/api/user/withdrawal`);

  return {
    type: WITHDRAW_USER,
    payload: res,
  };
};

export const getUserInfo = async () => {
  const res = await request.post(`/api/user/info`, {});

  return {
    type: GET_USER_INFO,
    payload: res,
  };
};

export const getUserProfit = async () => {
  const res = await request.get(`/api/mybag/prices`);

  return {
    type: GET_USER_PROFIT,
    payload: res.data,
  };
};
