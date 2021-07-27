import React from "react";

import { withRouter } from "react-router-dom";
import FacebookLogin from "react-facebook-login";

/**
 *
 * @param {History} history react-router-dom history
 * @see {@link https://developers.facebook.com/docs/facebook-login/web}
 * @see {@link https://www.npmjs.com/package/react-facebook-login}
 *
 * issue @see {@link https://developers.facebook.com/blog/post/2018/06/08/enforce-https-facebook-login/}
 * Facebook Login requires HTTPS, not HTTP
 *
 * @returns FacebookLoginButton
 */
const FacebookRegisterButton = ({ history }) => {
  const facebookLoginSuccess = async (response) => {
    const tokenId = response.accessToken;
    const body = {
      user_email: response.email,
      user_image: response.picture.data.url,
    };
    /* temp */
    window.sessionStorage.setItem("token", JSON.stringify(tokenId));

    // const res = await dispatch(loginUser(tokenId, body));

    if (tokenId) {
      history.push("./main");
    }
  };

  return (
    <FacebookLogin
      appId={process.env.REACT_APP_FACEBOOK_API_KEY}
      autoLoad={false}
      fields="name,email,picture"
      callback={facebookLoginSuccess}
      icon="fa-facebook-square"
      textButton={"페이스북으로 회원가입"}
    />
  );
};

export default withRouter(FacebookRegisterButton);
