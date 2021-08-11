import { SELECT_MART } from "../Actions/type";

const martReducer = (state = {}, action) => {
  switch (action.type) {
    case SELECT_MART:
      console.log(action.payload);
      return { ...state, martList: action.payload };
    default:
      return state;
  }
};

export default martReducer;
