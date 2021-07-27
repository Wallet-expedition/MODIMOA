import React from "react";

import GoogleRegisterButton from "./GoogleRegisterButton";
import KaKaoRegisterButton from "./KaKaoRegisterButton";
import FacebookRegisterButton from "./FacebookRegisterButton";
import { GOOGLE, FACEBOOK, KAKAO } from "./constant";

const RegisterButton = ({ name }) => {
  switch (name) {
    case GOOGLE:
      return <GoogleRegisterButton />;
    case FACEBOOK:
      return <FacebookRegisterButton />;
    case KAKAO:
      return <KaKaoRegisterButton />;
    default:
      alert("Button ERROR");
  }
};

export default RegisterButton;
