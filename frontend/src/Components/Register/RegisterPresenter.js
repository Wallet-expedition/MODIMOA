import React from "react";

import RegisterButton from "./RegisterButton";
import { FACEBOOK, GOOGLE, KAKAO } from "../../Util/Constant";

const Logo = () => {
  return (
    <div className="logo-container">
      <img className="logo-image" src="/img/logo_long_512.png" alt="logo" />
      <span>CAN BEER CAN !</span>
    </div>
  );
};

const RegisterPresenter = () => {
  return (
    <main className="login-container">
      <Logo />
      <div className="login-btn-container">
        <RegisterButton name={GOOGLE} />
        <RegisterButton name={KAKAO} />
        <RegisterButton name={FACEBOOK} />
      </div>
    </main>
  );
};

export default RegisterPresenter;
