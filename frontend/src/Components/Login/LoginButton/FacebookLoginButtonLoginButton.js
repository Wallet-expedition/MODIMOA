import React from "react";

import { withRouter } from "react-router-dom";
import FacebookLogin from "react-facebook-login";
import { facebookApiKey } from "../../../api/key";

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
const FacebookLoginButton = ({ history }) => {
  return (
    <FacebookLogin
      appId={facebookApiKey}
      autoLoad={true}
      fields="name,email,picture"
      callback={() => console.log("hi")}
      icon="fa-facebook-square"
      textButton={"페이스북으로 로그인"}
    />
  );
};

export default withRouter(FacebookLoginButton);
