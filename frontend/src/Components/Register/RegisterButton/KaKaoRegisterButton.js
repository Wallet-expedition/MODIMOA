import React, { useCallback, useEffect } from "react";

import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../Store/Actions/userAction";

/**
 *
 * @param {History} history react-router-dom history
 * @see {@link https://developers.kakao.com/sdk/reference/js/release}
 * @see {@link https://developers.kakao.com/tool/rest-api/open/get/v2-user-me}
 *
 * @returns KakaoLogin Button
 */
const KaKaoRegisterButton = ({ history }) => {
  const dispatch = useDispatch();

  const kakaoLoginSuccess = useCallback(
    async (response) => {
      console.log(response);
      const account = response?.kakao_account;
      const body = {
        user_email: account.email,
        user_image: account.profile.profile_image_url,
      };

      const res = await dispatch(registerUser(body));

      if (res.payload.status === 200) {
        history.push("/login");
      } else {
        alert("회원가입에 실패하였습니다.");
      }
    },
    [dispatch, history]
  );

  const kakaoLoginError = useCallback(() => {
    alert("fail Google Login");
  }, []);

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
        id="kakao-register"
        alt="kakao-register"
        src="img/kakao_btn.png"
      ></img>
      <span> 카카오계정으로 회원가입 </span>
    </div>
  );
};

export default withRouter(KaKaoRegisterButton);
