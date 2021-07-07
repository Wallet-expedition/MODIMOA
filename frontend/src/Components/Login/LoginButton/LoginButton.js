import React from "react";

import GoogleLoginButton from "./GoogleLoginButton";
import KaKaoLoginButton from "./KaKaoLoginButton";
import FacebookLoginButton from "./FacebookLoginButtonLoginButton";
import { GOOGLE, FACEBOOK, KAKAO } from "./constant";

const LoginButton = ({ name }) => {
  switch (name) {
    case GOOGLE:
      return <GoogleLoginButton />;
    case FACEBOOK:
      return <FacebookLoginButton />;
    case KAKAO:
      return <KaKaoLoginButton />;
    default:
      alert("Button ERROR");
  }
};

export default LoginButton;
