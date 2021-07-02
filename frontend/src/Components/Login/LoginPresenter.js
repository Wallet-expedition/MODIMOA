import React from "react";

import LoginButton from "./LoginButton";
import { GOOGLE, KAKAO } from "./LoginButton/constant";

const LoginPresenter = () => {
  const Logo = () => {
    return (
      <div className="logo-container">
        <img className="logo-image" src={`/img/logo_long_512.png`} alt="logo" />
        <span>CAN BEER CAN !</span>
      </div>
    );
  };

  return (
    <div className="login-container">
      <Logo />
      <LoginButton name={GOOGLE} />
      <LoginButton name={KAKAO} />
      {/* <LoginButton name={FACEBOOK} /> */}
    </div>
  );
};

export default LoginPresenter;
