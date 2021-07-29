import axios from "axios";
import { GET_PRODUT_LIST, SELECT_PRODUCT, WISH_PRODUCT } from "./type";

export const selectProduct = (product_info) => {
  return {
    type: SELECT_PRODUCT,
    payload: product_info,
  };
};

export const wishProduct = async (body, id) => {
  const res = await axios.post(`${process.env.SERVER}/api/mybag/${id}`, body);

  return {
    type: WISH_PRODUCT,
    payload: res.data,
  };
};


