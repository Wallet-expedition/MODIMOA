import React, { useState } from "react";
import MainPresenter from "./MainPresenter";

const MainContainer = () => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  return (
    <MainPresenter searchKeyword={searchKeyword} handleChange={handleChange} />
  );
};

export default MainContainer;
