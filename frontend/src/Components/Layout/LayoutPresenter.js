import React from "react";
import { Grid } from "@material-ui/core";

import SideMenu from "./SideMenu";
import SideMenuBtn from "./SideMenuBtn";

const LayoutPresenter = ({ children, showSideMenu, setShowSideMenu }) => {
  return (
    <div className="layout-container">
      <SideMenuBtn
        showSideMenu={showSideMenu}
        setShowSideMenu={setShowSideMenu}
      />
      {showSideMenu ? <SideMenu /> : null}
      <Grid id="wrap"> {children} </Grid>
    </div>
  );
};

export default LayoutPresenter;
