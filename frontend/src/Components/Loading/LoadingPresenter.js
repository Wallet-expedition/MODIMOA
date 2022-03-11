import React from "react";

import "../../scss/Loading.scss";

const LoadingPresenter = () => {
  return (
    <div className="loading-container">
      <img alt="loading" src="/img/loading.gif" />
    </div>
  );
};

export default LoadingPresenter;
