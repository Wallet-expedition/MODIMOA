import {
  SELECT_PRODUCT
} from "./type";

export const selectProduct = ( product_info ) => {
  return {
    type: SELECT_PRODUCT,
    payload: product_info,
  };
};
