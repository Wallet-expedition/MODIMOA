import React, { useCallback, useLayoutEffect } from "react";
// import { useDispatch } from "react-redux";
// import { auth } from "../../Store/Actions/userAction";

/**
 *
 * @param {Component} SpecificPage Next Page
 * @param {boolean} authority true: 로그인 유저만 가능, false: 로그인 아닌 유저만 가능, null: 모두 가능
 *
 */
const Auth = (SpecificPage, authority) => {
  const AuthenticationCheck = (props) => {
    // const dispatch = useDispatch();

    // const tokenId = getTokenId();

    const tokenId = window.sessionStorage.getItem("token") || "A";

    const loginCheck = useCallback(async () => {
      //   const response = await dispatch(auth(tokenId));
      //   if (!response.payload.isLogin) {
      //     if (authority) {
      //       props.history.push("/");
      //     }
      //   } else {
      //     if (authority === false) {
      //       props.history.push("/main");
      //     }
      //   }

      // login X
      if (tokenId === "A") {
        if (authority) {
          props.history.push("./login");
        }
      } else {
        // login O
        if (authority === false) {
          props.history.push("./main");
        }
      }
    }, [props.history, tokenId]);

    useLayoutEffect(() => {
      loginCheck();
    }, [loginCheck]);

    return <SpecificPage />;
  };

  return AuthenticationCheck;
};

export default Auth;
