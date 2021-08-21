import React from "react";

import HeaderPresenter from "./HeaderPresenter";

const HeaderContainer = ({ children }) => {
  return <HeaderPresenter>{children}</HeaderPresenter>;
};

export default HeaderContainer;
