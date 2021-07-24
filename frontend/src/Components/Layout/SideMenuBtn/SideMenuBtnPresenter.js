import React from "react";

const SideMenuBtnPresenter = ({ handleSideMenuBtnClick, showSideMenu }) => {
  return (
    <div className="side-modal-btn" onClick={handleSideMenuBtnClick}>
      {!showSideMenu ? "≡" : "X"}
    </div>
  );
};

export default SideMenuBtnPresenter;
