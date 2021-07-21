import React, { useState } from "react";
import LayoutPresenter from "./LayoutPresenter";

const LayoutContainer = ({ children }) => {
  const [showSideMenu, setShowSideMenu] = useState(false);
  return (
    <LayoutPresenter
      showSideMenu={showSideMenu}
      setShowSideMenu={setShowSideMenu}
    >
      {children}
    </LayoutPresenter>
  );
};

export default LayoutContainer;
