import React from "react";
import { Grid } from "@material-ui/core";

import SideMenu from "./SideMenu";
import SideMenuBtn from "./SideMenuBtn";
import BackButton from "./BackButton";
import "../../scss/Layout.scss";

const LayoutPresenter = ({
  children,
  showSideMenu,
  setShowSideMenu,
  isNotRequiredBackBtn,
}) => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  window.addEventListener("resize", () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });
  return (
    <div className="layout-container">
      <SideMenuBtn
        showSideMenu={showSideMenu}
        setShowSideMenu={setShowSideMenu}
      />
      {showSideMenu ? <SideMenu setShowSideMenu={setShowSideMenu} /> : null}
      {isNotRequiredBackBtn ? null : <BackButton />}
      <Grid id="wrap"> {children} </Grid>
    </div>
  );
};

export default LayoutPresenter;
