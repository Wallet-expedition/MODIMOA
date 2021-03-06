import {
  CHANGE_MY_BAG_PRODUCT_CNT,
  CHANGE_STATE_PRODUCT,
  DELETE_PRODUCT,
  GET_MY_BAG_LIST,
  GET_ONE_PRODUCT,
  GET_PRODUT_LIST,
  SELECT_PRODUCT,
  WISH_PRODUCT,
} from "../Actions/type";

const productReducer = (state = {}, action) => {
  switch (action.type) {
    case SELECT_PRODUCT:
      return { ...state, product: action.payload };
    case WISH_PRODUCT:
      return { ...state, success: action.payload };
    case DELETE_PRODUCT:
      return { ...state, deleteSuccess: action.payload };
    case GET_PRODUT_LIST:
      return { ...state, productList: action.payload };
    case CHANGE_STATE_PRODUCT:
      return { ...state, myBagProduct: action.payload };
    case GET_ONE_PRODUCT:
      return { ...state, getProduct: action.payload };
    case GET_MY_BAG_LIST:
      return { ...state, myBagList: action.payload };
    case CHANGE_MY_BAG_PRODUCT_CNT:
      return { ...state, productCnt: action.payload };
    default:
      return state;
  }
};

export default productReducer;
