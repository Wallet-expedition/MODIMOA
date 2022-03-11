import React from "react";

import LoginButton from "./LoginButton";
import { FACEBOOK, GOOGLE, KAKAO } from "../Util/Constant";

const Logo = () => {
  return (
    <div className="logo-container">
      <img className="logo-image" src="/img/logo_long_512.png" alt="logo" />
      <span>CAN BEER CAN !</span>
    </div>
  );
};

const LoginPresenter = () => {
  return (
    <main className="login-container">
      <Logo />
      <div className="login-btn-container">
        <LoginButton name={GOOGLE} />
        <LoginButton name={KAKAO} />
        <LoginButton name={FACEBOOK} />
      </div>
    </main>
  );
};

export default LoginPresenter;
