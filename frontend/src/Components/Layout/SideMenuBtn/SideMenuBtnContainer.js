import React, { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";

import { openedSideMenu } from "../../../Store/Actions/sideMenuAction";
import detectMobile from "../../../Util/DetectMobile";
import SideMenuBtnPresenter from "./SideMenuBtnPresenter";

const SideMenuBtnContainer = ({ showSideMenu, setShowSideMenu }) => {
  const dispatch = useDispatch();
  const handleSideMenuBtnClick = (event) => {
    event.preventDefault();
    setShowSideMenu(!showSideMenu);
    dispatch(openedSideMenu(!showSideMenu));
  };

  /**
   *  if User uses mobile, side menu is toggle with default no showing.
   */
  useLayoutEffect(() => {
    const isMobile = detectMobile();
    if (!isMobile) {
      dispatch(openedSideMenu(true));
    }
  }, [dispatch, setShowSideMenu]);

  return (
    <SideMenuBtnPresenter
      handleSideMenuBtnClick={handleSideMenuBtnClick}
      showSideMenu={showSideMenu}
    />
  );
};

export default SideMenuBtnContainer;
