import React from "react";
import { Link } from "react-router-dom";

const Slogan = () => {
  return (
    <div className="slogan-container">
      <span>우리가 돈이 없지, 할인이 없어?</span>
      <span>할인 모디모아 맥주 한 잔 마셔보자!</span>
    </div>
  );
};

const Logo = () => {
  return (
    <div className="logo-container">
      <img className="logo-image" src="/img/logo_beer_512.png" alt="logo" />
      <span>CAN BEER CAN !</span>
    </div>
  );
};

const EnterBtn = () => {
  return (
    <Link className="enter-container" to="./main">
      <img className="enter-image" src="/img/enter_icon_512.png" alt="enter" />
    </Link>
  );
};

const IntroPresenter = () => {
  return (
    <div className="intro-container">
      <Slogan />
      <Logo />
      <EnterBtn />
    </div>
  );
};

export default IntroPresenter;
