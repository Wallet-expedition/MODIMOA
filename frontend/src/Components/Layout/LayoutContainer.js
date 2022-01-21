import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import LayoutPresenter from "./LayoutPresenter";

const LayoutContainer = ({ children }) => {
  const pathname = window.location.pathname;
  const params = useParams();
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [isNotRequiredBackBtn, setIsNotRequiredBackBtn] = useState(true);

  const isNowPageRequiredBackBtn = useCallback(() => {
    const noBackBtnPage = ["list", "main"];
    const isPageInlist = noBackBtnPage.includes(pathname.split("/")[1]); // 0: ""
    if (!isPageInlist) {
      return false;
    }
    if (pathname.includes("list") && params.id) {
      return false;
    }
    return true;
  }, [pathname, params]);

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
