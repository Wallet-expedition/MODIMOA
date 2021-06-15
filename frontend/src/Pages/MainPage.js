import React from "react";

import MainBox from '../Components/Main/MainContent';
import SideMenu from '../Components/Main/SideMenu';

import '../scss/MainPage.scss';

const MainPage = () => {
  return(
    <div className="main-container">
      <SideMenu />
      <MainBox />
    </div>
  );
};

export default MainPage;
