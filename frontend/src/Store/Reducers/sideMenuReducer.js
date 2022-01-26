import detectMobile from "../../Components/Util/DetectMobile";
import { CLOSED_SIDE_MENU, OPENED_SIDE_MENU } from "../Actions/type";

const initialState = {
  openedSideMenu: !detectMobile(),
};

const sideMenuReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPENED_SIDE_MENU:
      return { ...state, openedSideMenu: action.payload };
    case CLOSED_SIDE_MENU:
      return { ...state, openedSideMenu: action.payload };
    default:
      return state;
  }
};

export default sideMenuReducer;
