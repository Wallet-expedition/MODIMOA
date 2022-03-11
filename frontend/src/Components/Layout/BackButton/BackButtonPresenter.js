import React from "react";

const BackButtonPresenter = ({ handleGoBack }) => {
  return (
    <div className="back-button" onClick={handleGoBack}>
      <img src="/img/back_button.png" alt="back-button" />
    </div>
  );
};

export default BackButtonPresenter;
