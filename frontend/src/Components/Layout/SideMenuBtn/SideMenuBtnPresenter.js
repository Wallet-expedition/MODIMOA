import React from "react";
import ClearIcon from "@material-ui/icons/Clear";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBeforeRounded";
import NavigateNextIcon from "@material-ui/icons/NavigateNextRounded";

import detectMobile from "../../Util/DetectMobile";

const BtnIcon = ({ showSideMenu }) => {
  const isMobile = detectMobile();
  if (isMobile) {
    if (showSideMenu) {
      return <ClearIcon />;
    } else {
      return <MenuOpenIcon />;
    }
  } else {
    if (showSideMenu) {
      return <NavigateBeforeIcon />;
    } else {
      return <NavigateNextIcon />;
    }
  }
};

const SideMenuBtnPresenter = ({ handleSideMenuBtnClick, showSideMenu }) => {
  return (
    <div
      className={`side-modal-btn ${
        showSideMenu ? "side-modal-btn-open" : "side-modal-btn-close"
      }`}
      onClick={handleSideMenuBtnClick}
    >
      <BtnIcon showSideMenu={showSideMenu} />
    </div>
  );
};

export default SideMenuBtnPresenter;
