import { useDispatch } from "react-redux";
import React, { useCallback, useLayoutEffect } from "react";

import { getCookie } from "./Cookie";
import { getUserInfo } from "../../Store/Actions/userAction";

/**
 *
 * @param {Component} SpecificPage Next Page
 * @param {boolean} authority true: 로그인 유저만 가능, false: 로그인 아닌 유저만 가능, null: 모두 가능
 *
 */
const Auth = (SpecificPage, authority) => {
  const AuthenticationCheck = (props) => {
    const dispatch = useDispatch();

    const loginCheck = useCallback(async () => {
      const tokenId = getCookie("accessToken");
      if (tokenId !== "") {
        // token의 값이 있다면 로그인 여부 판단
        const res = await dispatch(getUserInfo(tokenId));
        // 로그인이 되어있다면
        if (res?.payload?.status === 200) {
          // 로그인을 하지 않아야 접근할 수 있는 페이지면 main으로 redirect
          if (authority === false) {
            props.history.push("/main");
          }
        } else {
          // 로그인이 되어있지 않으면서, 로그인이 필요한 페이지면 login으로 Redirect
          if (authority === true) {
            props.history.push("/login");
          }
        }
      } else {
        // 로그인이 되어있지 않으면서, 로그인이 필요한 페이지면 login으로 Redirect
        if (authority === true) {
          props.history.push("/login");
        }
      }
    }, [dispatch, props.history]);

    useLayoutEffect(() => {
      loginCheck();
    }, [loginCheck]);

    return <SpecificPage />;
  };

  return AuthenticationCheck;
};

export default Auth;
