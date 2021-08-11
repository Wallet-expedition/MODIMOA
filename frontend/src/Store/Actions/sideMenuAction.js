import { CLOSED_SIDE_MENU, OPENED_SIDE_MENU } from "./type";

export const openedSideMenu = (showSideMenu) => {
  return {
    type: OPENED_SIDE_MENU,
    payload: showSideMenu,
  };
};

export const closedSideMenu = (showSideMenu) => {
  return {
    type: CLOSED_SIDE_MENU,
    payload: showSideMenu,
  };
};
