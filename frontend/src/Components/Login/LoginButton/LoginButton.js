import React from "react";

import GoogleLoginButton from "./GoogleLoginButton";
import KaKaoLoginButton from "./KaKaoLoginButton";
import FacebookLoginButton from "./FacebookLoginButton";
import { GOOGLE, FACEBOOK, KAKAO } from "../../Util/Constant";

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
