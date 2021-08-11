import React from "react";
import { Grid } from "@material-ui/core";

import SideMenu from "./SideMenu";
import SideMenuBtn from "./SideMenuBtn";

import "../../scss/Layout.scss";

const LayoutPresenter = ({ children, showSideMenu, setShowSideMenu }) => {
  return (
    <div className="layout-container">
      <SideMenuBtn
        showSideMenu={showSideMenu}
        setShowSideMenu={setShowSideMenu}
      />
      {showSideMenu ? <SideMenu setShowSideMenu={setShowSideMenu} /> : null}
      <Grid id="wrap"> {children} </Grid>
    </div>
  );
};

export default LayoutPresenter;
