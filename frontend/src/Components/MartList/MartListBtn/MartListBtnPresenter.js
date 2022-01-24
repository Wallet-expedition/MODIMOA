import React from "react";

const MartListBtnPresenter = ({
  handleMartListBtnClick,
  showMartList,
  openedSideMenu,
}) => {
  const className = openedSideMenu
    ? `martlist-modal-btn martlist-modal-btn-hide`
    : `martlist-modal-btn`;
  return (
    <div className={className} onClick={handleMartListBtnClick}>
      {!showMartList ? (
        <img src="./img/mart_folder.png" alt="mart_folder" />
      ) : (
        "X"
      )}
    </div>
  );
};

export default MartListBtnPresenter;
