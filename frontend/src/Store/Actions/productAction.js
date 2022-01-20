import {
  GET_PRODUT_LIST,
  SELECT_PRODUCT,
  WISH_PRODUCT,
  GET_ONE_PRODUCT,
  DELETE_PRODUCT,
  GET_MY_BAG_LIST,
  CHANGE_MY_BAG_PRODUCT_CNT,
} from "./type";
import request from "../../Components/Util/Request";

export const selectProduct = (product_info) => {
  return {
    type: SELECT_PRODUCT,
    payload: product_info,
  };
};

export const wishProduct = async (body, id) => {
  const res = await request.post(`/api/mybag/${id}`, body);

  return {
    type: WISH_PRODUCT,
    payload: res,
  };
};

export const deleteWishProduct = async (id) => {
  const res = await request.delete(`/api/mybag/delete/${id}`);

  return {
    type: DELETE_PRODUCT,
    payload: res,
  };
};

export const getProductList = async (mart, searchKeyword, page, sortFilter) => {
  const res = await request.get(
    `/api/product/pickmart/${mart}?q=${searchKeyword}&size=15&page=${page}&sort=${sortFilter}`
  );

  return {
    type: GET_PRODUT_LIST,
    payload: res,
  };
};

export const changeMyBagState = async (productId, body) => {
  const res = await request.patch(`/api/mybag/changestat/${productId}`, body);

  return {
    type: GET_PRODUT_LIST,
    payload: res,
  };
};

export const getMyBagList = async () => {
  const res = await request.get(`/api/mybag`);

  return {
    type: GET_MY_BAG_LIST,
    payload: res,
  };
};

export const changeMyBagCnt = async (prodcutId, body) => {
  const res = await request.post(`/api/mybag/${prodcutId}`, body);
  return {
    type: CHANGE_MY_BAG_PRODUCT_CNT,
    payload: res,
  };
};

export const getOneProduct = async (productId) => {
  const res = await request.get(`/api/product/${productId}`);

  return {
    type: GET_ONE_PRODUCT,
    payload: res,
  };
};
