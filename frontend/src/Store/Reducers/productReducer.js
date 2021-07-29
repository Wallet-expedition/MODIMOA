import { SELECT_PRODUCT, WISH_PRODUCT } from "../Actions/type";

const productReducer = (state = {}, action) => {
  switch (action.type) {
    case SELECT_PRODUCT:
      console.log(action.payload);
      return { ...state, product: action.payload };
    case WISH_PRODUCT:
      console.log(action.payload);
      return { ...state, product: action.payload };
    default:
      return state;
  }
};

export default productReducer;
