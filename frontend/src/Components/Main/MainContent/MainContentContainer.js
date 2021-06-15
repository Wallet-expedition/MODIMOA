import React, { useState } from "react";
import MainContentPresenter from "./MainContentPresenter";

const MainContentContainer = () => {
  const [showModal, setShowModal] = useState(false);

  const handleModalClick = (event) => {
    event.preventDefault();
    setShowModal(!showModal);
    console.log(showModal);
  }

  return <MainContentPresenter handleModalClick={handleModalClick} />;
};

export default MainContentContainer;
