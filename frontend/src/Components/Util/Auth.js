import React, { useCallback, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../Store/Actions/userAction";
import { getCookie } from "./Cookie";

/**
 *
 * @param {Component} SpecificPage Next Page
 * @param {boolean} authority true: 로그인 유저만 가능, false: 로그인 아닌 유저만 가능, null: 모두 가능
 *
 */
const Auth = (SpecificPage, authority) => {
  const AuthenticationCheck = (props) => {
    const dispatch = useDispatch();

    const tokenId = getCookie("token");

    const loginCheck = useCallback(async () => {
      const response = await dispatch(auth(tokenId));
      // Login Check Fail
      if (!response.payload.success) {
        // can go with login
        if (authority) {
          props.history.push("/login");
        }
      }
      // Login Check Success
      else {
        // can go with no login
        if (authority === false) {
          props.history.push("/main");
        }
      }
    }, [dispatch, props.history, tokenId]);

    useLayoutEffect(() => {
      loginCheck();
    }, [loginCheck]);

    return <SpecificPage />;
  };

  return AuthenticationCheck;
};

export default Auth;
