import React, { useEffect, useLayoutEffect, useState } from "react";
import SideMenuPresenter from "./SideMenuPresenter";
import { useHistory } from "react-router-dom";

const SideMenuContainer = ({ setShowSideMenu }) => {
  const [isToastActive, setIsToastActive] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [path, setPath] = useState("main");
  const history = useHistory();

  const handleLogout = (event) => {
    event.preventDefault();
    window.sessionStorage.removeItem("token");
    setIsToastActive(true);

    if (path === "mypage") {
      history.push("/main");
    }
  };

  // 로그인 되어있는지 파악.
  useLayoutEffect(() => {
    let token = window.sessionStorage.getItem("token") || "A";

    if (token !== "A") {
      setIsLogin(true);
    }
  }, [path]);

  // 로그아웃 버튼 누를 시 2초간 토스트 메세지 생성
  useEffect(() => {
    // toast 활성화
    if (isToastActive === true) {
      setTimeout(() => {
        setIsToastActive(false);
        setShowSideMenu(false);
      }, 2000);
    }
  }, [history, isToastActive, path, setShowSideMenu]);

  useLayoutEffect(() => {
    setPath(history.location.pathname.split("/")[1]);
  }, [setShowSideMenu, path, history.location.pathname]);

  return (
    <SideMenuPresenter
      isLogin={isLogin}
      handleLogout={handleLogout}
      isToastActive={isToastActive}
    />
  );
};

export default SideMenuContainer;
