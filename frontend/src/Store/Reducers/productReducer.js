import {
  CHANGE_STATE_PRODUCT,
  GET_PRODUT_LIST,
  SELECT_PRODUCT,
  WISH_PRODUCT,
} from "../Actions/type";

const productReducer = (state = {}, action) => {
  switch (action.type) {
    case SELECT_PRODUCT:
      console.log(action.payload);
      return { ...state, product: action.payload };
    case WISH_PRODUCT:
      console.log(action.payload);
      return { ...state, success: action.payload };
    case GET_PRODUT_LIST:
      console.log(action.payload);
      return { ...state, productList: action.payload };
    case CHANGE_STATE_PRODUCT:
      console.log(action.payload);
      return { ...state, myBagProduct: action.payload };
    default:
      return state;
  }
};

export default productReducer;
