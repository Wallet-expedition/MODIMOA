import { combineReducers } from "redux";
import userReducer from "./userReducer";
import productReducer from "./productReducer";

/**
 * if other Reducer exist, add reducer
 */
const rootReducer = combineReducers({
  userReducer,
  productReducer,
});

export default rootReducer;
