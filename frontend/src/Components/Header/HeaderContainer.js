import React, { useState } from "react";

import HeaderPresenter from "./HeaderPresenter";

const HeaderContainer = ({ children }) => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleChange = (event) => {
    setSearchKeyword(event.target.value);
  };
  return (
    <HeaderPresenter searchKeyword={searchKeyword} handleChange={handleChange}>
      {children}
    </HeaderPresenter>
  );
};

export default HeaderContainer;
