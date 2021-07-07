import { combineReducers } from "redux";
import userReducer from "./userReducer";

/**
 * if other Reducer exist, add reducer
 */
const rootReducer = combineReducers({
  userReducer,
});

export default rootReducer;
