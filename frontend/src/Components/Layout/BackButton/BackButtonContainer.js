import React, { useCallback } from "react";
import { useHistory } from "react-router";

import BackButtonPresenter from "./BackButtonPresenter";

const BackButtonContainer = () => {
  const history = useHistory();

  const handleGoBack = useCallback(() => {
    history.goBack();
  }, [history]);

  return <BackButtonPresenter handleGoBack={handleGoBack} />;
};

export default BackButtonContainer;
