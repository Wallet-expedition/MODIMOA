import axios from "axios";
import { getCookie } from "./Cookie";

const ACCESS_TOKEN = "accessToken";
const baseUrl = process.env.REACT_APP_SERVER;

const getHeader = (_tokenId) => {
  const tokenId = _tokenId || getCookie(ACCESS_TOKEN);

  return {
    headers: {
      authorization: tokenId,
      withCredentials: true,
    },
  };
};

const request = {
  get: (url) => axios.get(`${baseUrl}${url}`),
  post: (url, body, tokenId) =>
    axios.post(`${baseUrl}${url}`, body, getHeader(tokenId)),
  patch: (url) => axios.patch(`${baseUrl}${url}`),
  delete: (url) => axios.delete(`${baseUrl}${url}`, getHeader()),
};

export default request;
