import React, { useEffect } from "react";

import SideMenuBtnPresenter from "./SideMenuPresenter";

const SideMenuBtnContainer = ({ showSideMenu, setShowSideMenu }) => {
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
  };

  /**
   *  if User uses mobile, side menu is toggle with default no showing.
   */
  useEffect(() => {
    const isMobile = detectMobile();

    if (isMobile) {
      setShowSideMenu(false);
    }
  }, [setShowSideMenu]);

  return (
    <SideMenuBtnPresenter handleSideMenuBtnClick={handleSideMenuBtnClick} />
  );
};

export default SideMenuBtnContainer;
