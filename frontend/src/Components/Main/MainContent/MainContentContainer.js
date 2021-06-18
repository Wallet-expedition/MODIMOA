import React from "react";
import MainContentPresenter from "./MainContentPresenter";

const MainContentContainer = ({ showSideMenu, setShowSideMenu }) => {
  const handleModalClick = (event) => {
    event.preventDefault();
    setShowSideMenu(!showSideMenu);
    console.log(showSideMenu);
  };

  return (
    <MainContentPresenter
      showSideMenu={showSideMenu}
      handleModalClick={handleModalClick}
    />
  );
};

export default MainContentContainer;
