import React, { useState } from "react";
import MainContentPresenter from "./MainContentPresenter";

const MainContentContainer = () => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  return (
    <MainContentPresenter
      searchKeyword={searchKeyword}
      handleChange={handleChange}
    />
  );
};

export default MainContentContainer;
