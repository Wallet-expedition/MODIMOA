import React, { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";

import { openedSideMenu } from "../../../Store/Actions/sideMenuAction";

import SideMenuBtnPresenter from "./SideMenuBtnPresenter";

const SideMenuBtnContainer = ({ showSideMenu, setShowSideMenu }) => {
  const dispatch = useDispatch();
  const detectMobile = () => {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i,
    ];

    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    });
  };

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
      setShowSideMenu(true);
    }
  }, [setShowSideMenu]);

  return (
    <SideMenuBtnPresenter
      handleSideMenuBtnClick={handleSideMenuBtnClick}
      showSideMenu={showSideMenu}
    />
  );
};

export default SideMenuBtnContainer;
