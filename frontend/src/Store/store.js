// Redux
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./Reducers";
import ReduxPromise from "redux-promise";

const store = applyMiddleware(ReduxPromise)(createStore)(rootReducer);

export default store;
