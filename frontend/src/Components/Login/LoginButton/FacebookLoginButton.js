import React, { useCallback } from "react";
import { withRouter } from "react-router-dom";
import FacebookLogin from "react-facebook-login";
import { useDispatch } from "react-redux";

import { loginUser } from "../../../Store/Actions/userAction";

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
  const dispatch = useDispatch();
  const facebookLoginSuccess = useCallback(
    async (response) => {
      const tokenId = response.accessToken;
      const body = {
        user_email: response.email,
        user_image: response.picture.data.url,
      };

      const res = await dispatch(loginUser(tokenId, body));

      if (res.payload.status === 200) {
        history.push("/main");
      } else {
        alert("로그인에 실패하였습니다.");
      }
    },
    [dispatch, history]
  );

  return (
    <FacebookLogin
      appId={process.env.REACT_APP_FACEBOOK_API_KEY}
      autoLoad={false}
      fields="name,email,picture"
      callback={facebookLoginSuccess}
      icon="fa-facebook-square"
      textButton="페이스북으로 로그인"
    />
  );
};

export default withRouter(FacebookLoginButton);
