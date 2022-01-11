import React, { useState } from "react";
import AboutPresenter from "./AboutPresenter";
import { useParams } from "react-router-dom";

const AboutContainer = () => {
  const params = useParams();
  const page = params.page;
  const [status, setStatus] = useState("stop");

  const clickLeft = (e) => {
    e.stopPropagation();
    const viewContainer = document.querySelector(".about-content");
    if (status !== "going") {
      viewContainer.classList.add("swipe-left");
      setStatus("going");
      setTimeout(() => {
        viewContainer.classList.remove("swipe-left");
        setStatus("stop");
      }, 1000);
    } else e.preventDefault();
  };

  const clickRight = (e) => {
    e.stopPropagation();
    const viewContainer = document.querySelector(".about-content");
    if (status !== "going") {
      viewContainer.classList.add("swipe-right");
      setStatus("going");
      setTimeout(() => {
        viewContainer.classList.remove("swipe-right");
        setStatus("stop");
      }, 1000);
    } else e.preventDefault();
  };

  return (
    <AboutPresenter page={page} clickLeft={clickLeft} clickRight={clickRight} />
  );
};

export default AboutContainer;
