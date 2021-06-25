import React, { useState } from "react";

import MainContent from "../Components/Main/MainContent";
import SideMenu from "../Components/Main/SideMenu";
import SideMenuBtn from "../Components/Main/SideMenuBtn";

import "../scss/MainPage.scss";

const MainPage = () => {
  const [showSideMenu, setShowSideMenu] = useState(true);

  return (
    <div className="main-container">
      <SideMenuBtn
        showSideMenu={showSideMenu}
        setShowSideMenu={setShowSideMenu}
      />
      {showSideMenu ? <SideMenu /> : null}
      <MainContent />
    </div>
  );
};

export default MainPage;
