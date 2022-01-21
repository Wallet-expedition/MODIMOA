import React, { useState, useEffect, useCallback } from "react";
import LayoutPresenter from "./LayoutPresenter";

const LayoutContainer = ({ children }) => {
  const pathname = window.location.pathname;
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [isNotRequiredBackBtn, setIsNotRequiredBackBtn] = useState(true);

  const isNowPageRequiredBackBtn = useCallback(() => {
    const noBackBtnPage = ["list", "main"];
    const params = pathname.split("/"); // 0: "", 1: "list", 2: ":id"
    const isPageInlist = noBackBtnPage.includes(params[1]);
    if (!isPageInlist) {
      return false;
    }
    if (pathname.includes("list") && params[2]) {
      return false;
    }
    return true;
  }, [pathname]);

  useEffect(() => {
    setIsNotRequiredBackBtn(isNowPageRequiredBackBtn());
    return () => setIsNotRequiredBackBtn(false);
  }, [isNowPageRequiredBackBtn]);

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
