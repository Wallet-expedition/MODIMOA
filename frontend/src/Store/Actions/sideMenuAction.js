import { OPENED_SIDE_MENU } from "./type";

export const openedSideMenu = (showSideMenu) => {
  return {
    type: OPENED_SIDE_MENU,
    payload: showSideMenu,
  };
};
