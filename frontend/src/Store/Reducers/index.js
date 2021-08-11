import { combineReducers } from "redux";
import userReducer from "./userReducer";
import productReducer from "./productReducer";
import sideMenuReducer from "./sideMenuReducer";
import martReducer from "./martReducer";

/**
 * if other Reducer exist, add reducer
 */
const rootReducer = combineReducers({
  userReducer,
  productReducer,
  sideMenuReducer,
  martReducer,
});

export default rootReducer;
