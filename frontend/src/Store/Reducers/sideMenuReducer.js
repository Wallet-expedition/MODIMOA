import { OPENED_SIDE_MENU } from "../Actions/type";

const sideMenuReducer = (state = {}, action) => {
  switch (action.type) {
    case OPENED_SIDE_MENU:
      return { ...state, openedSideMenu: action.payload };
    default:
      return state;
  }
};

export default sideMenuReducer;
