import React from "react";

const LoginPresenter = () => {
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

  /**
   *
   * @param {string} name if sdk load, update this Button.
   * Will Make with switch case grammer
   * name="google" return <GoogleLoginButton />
   * name="naver" return <NaverLoginButton />
   * @returns LoginButtonComponent
   */
  const LoginButton = ({ name }) => {
    return (
      <div className={`login-btn-container ${name}`}>
        <p className={`login-btn-icon`}>{name[0]}</p>
        <p>{name}</p>
      </div>
    );
  };

  return (
    <div className="login-container">
      <Logo />
      <LoginButton name="google" />
      <LoginButton name="kakao" />
      <LoginButton name="naver" />
    </div>
  );
};

export default LoginPresenter;
