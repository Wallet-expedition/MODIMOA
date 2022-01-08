import React, { useState, useEffect } from "react";
import LayoutPresenter from "./LayoutPresenter";

const LayoutContainer = ({ children }) => {
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [isNotRequiredBackBtn, setIsNotRequiredBackBtn] = useState(false);

  const isNowPage = (page) => {
    const isNow = window.location.pathname.indexOf(page);
    if (isNow !== -1) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    const noBackBtnPage = ["/list", "/main", "list/", "about", "/"];
    noBackBtnPage.forEach((page, idx) => {
      if (isNowPage(page) && idx !== 2) setIsNotRequiredBackBtn(true);
      else if (isNowPage(page) && idx === 2) setIsNotRequiredBackBtn(false);
    });

    return () => setIsNotRequiredBackBtn(false);
  }, [children, isNotRequiredBackBtn]);

  return (
    <LayoutPresenter
      showSideMenu={showSideMenu}
      setShowSideMenu={setShowSideMenu}
      isNotRequiredBackBtn={isNotRequiredBackBtn}
    >
      {children}
    </LayoutPresenter>
  );
};

export default LayoutContainer;
