import React from "react";
import { Link } from "react-router-dom";

const IntroPresenter = () => {
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
        <img
          className="logo-image"
          src="https://user-images.githubusercontent.com/42960217/123408733-4fa0cf80-d5e8-11eb-9956-8250d7599bed.png"
          alt="logo"
        />
        <span>CAN BEER CAN !</span>
      </div>
    );
  };
  const EnterBtn = () => {
    return (
      <Link className="enter-container" to="./main">
        <img
          className="enter-image"
          src="https://user-images.githubusercontent.com/42960217/123426721-b8934200-d5fe-11eb-9250-752427639266.png"
          alt="enter"
        />
      </Link>
    );
  };
  return (
    <div className="intro-container">
      <Slogan />
      <Logo />
      <EnterBtn />
    </div>
  );
};

export default IntroPresenter;
