import React from "react";

import RegisterButton from "./RegisterButton";
import { FACEBOOK, GOOGLE, KAKAO } from "../Util/Constant";

const RegisterPresenter = () => {
  const Logo = () => {
    return (
      <div className="logo-container">
        <img className="logo-image" src={`/img/logo_long_512.png`} alt="logo" />
        <span>CAN BEER CAN !</span>
      </div>
    );
  };

  return (
    <main className="login-container">
      <Logo />
      <article className="login-btn-container">
        <RegisterButton name={GOOGLE} />
        <RegisterButton name={KAKAO} />
        <RegisterButton name={FACEBOOK} />
      </article>
    </main>
  );
};

export default RegisterPresenter;
