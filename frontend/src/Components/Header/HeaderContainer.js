import React from "react";

import HeaderPresenter from "./HeaderPresenter";

const HeaderContainer = ({ children, setFinalSearchKeyword }) => {
  return (
    <HeaderPresenter setFinalSearchKeyword={setFinalSearchKeyword}>
      {children}
    </HeaderPresenter>
  );
};

export default HeaderContainer;
