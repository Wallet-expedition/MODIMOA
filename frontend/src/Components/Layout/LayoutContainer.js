import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import detectMobile from "../Util/DetectMobile";
import LayoutPresenter from "./LayoutPresenter";

const LayoutContainer = ({ children }) => {
  const pathname = useLocation().pathname;
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [isRequiredBackBtn, setIsRequiredBackBtn] = useState(true);
  const [isRequiredSideMenuBtn, setIsRequiredSideMenuBtn] = useState(true);

  const isNowPageRequiredBackBtn = useCallback(() => {
    const noBackBtnPage = ["list", "main"];
    const params = pathname.split("/"); // 0: "", 1: "list", 2: ":id"
    const isPageInlist = noBackBtnPage.includes(params[1]);
    if (!isPageInlist) {
      return true;
    }
    if (pathname.includes("list") && params[2]) {
      return true;
    }
    return false;
  }, [pathname]);

  const isNowPageRequiredSideMenuBtn = useCallback(
    () =>
      detectMobile() ||
      (pathname !== "/" && pathname !== "/main" && !pathname.includes("about")),
    [pathname]
  );
  useEffect(() => {
    setIsRequiredBackBtn(isNowPageRequiredBackBtn());
    setIsRequiredSideMenuBtn(isNowPageRequiredSideMenuBtn());
    return () => {
      setIsRequiredBackBtn(false);
      setIsRequiredSideMenuBtn(false);
    };
  }, [isNowPageRequiredBackBtn, isNowPageRequiredSideMenuBtn]);

  return (
    <LayoutPresenter
      showSideMenu={showSideMenu}
      setShowSideMenu={setShowSideMenu}
      isRequiredBackBtn={isRequiredBackBtn}
      isRequiredSideMenuBtn={isRequiredSideMenuBtn}
    >
      {children}
    </LayoutPresenter>
  );
};

export default LayoutContainer;
