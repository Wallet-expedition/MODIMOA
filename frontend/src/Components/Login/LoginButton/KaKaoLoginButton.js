import React, { useEffect } from "react";

import { withRouter } from "react-router-dom";

/**
 *
 * @param {History} history react-router-dom history
 * @see {@link https://developers.kakao.com/sdk/reference/js/release}
 * @see {@link https://developers.kakao.com/tool/rest-api/open/get/v2-user-me}
 *
 * @returns KakaoLogin Button
 */
const KakaoLoginButton = ({ history }) => {
  let token = ""; // not useState

  const kakaoLoginSuccess = async (response) => {
    console.log(response);
    const account = response?.kakao_account;
    const tokenId = token;
    const body = {
      email: account.email,
      name: account.profile.nickname,
      image: account.profile.profile_image_url,
    };

    /* temp */
    window.sessionStorage.setItem("token", JSON.stringify(tokenId));

    // const res = await dispatch(loginUser(tokenId, body));
    console.log(body);

    if (tokenId) {
      history.push("./main");
    }
  };

  const kakaoLoginError = () => {
    alert("fail Google Login");
  };

  const loadScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://developers.kakao.com/sdk/js/kakao.js";
      script.type = "text/javascript";
      script.async = true;
      script.defer = true;
      script.onload = resolve;
      document.head.appendChild(script);
    });
  };

  const loginWithKakao = () => {
    window?.Kakao.Auth.login(
      {
        success: (authObj) => {
          token = authObj.access_token;
          window?.Kakao.API.request({
            url: "/v2/user/me",
            success: kakaoLoginSuccess,
            fail: kakaoLoginError,
          });
        },
      },
      {
        fail: kakaoLoginError,
      }
    );
  };

  useEffect(() => {
    const loadKakaoSDK = async () => {
      await loadScript();
      window?.Kakao.init(process.env.REACT_APP_KAKAO_API_KEY);
    };
    loadKakaoSDK();
  }, []);

  return (
    <div id="kakao-login-btn" onClick={loginWithKakao}>
      <img
        id="kakao-login"
        alt="kakao-login"
        src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
        width="240px"
      ></img>
    </div>
  );
};

export default withRouter(KakaoLoginButton);
