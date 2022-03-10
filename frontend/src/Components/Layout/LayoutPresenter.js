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
  isRequiredBackBtn,
  isRequiredSideMenuBtn,
}) => {
  return (
    <div className="layout-container">
      {isRequiredSideMenuBtn && (
        <SideMenuBtn
          showSideMenu={showSideMenu}
          setShowSideMenu={setShowSideMenu}
        />
      )}
      <SideMenu showSideMenu={showSideMenu} setShowSideMenu={setShowSideMenu} />
      {isRequiredBackBtn && <BackButton />}
      <Grid id="wrap"> {children} </Grid>
    </div>
  );
};

export default LayoutPresenter;
