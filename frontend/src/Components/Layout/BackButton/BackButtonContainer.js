import React from "react";
import { useHistory } from "react-router";

import BackButtonPresenter from "./BackButtonPresenter";

const BackButtonContainer = () => {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  return <BackButtonPresenter handleGoBack={handleGoBack} />;
};

export default BackButtonContainer;
