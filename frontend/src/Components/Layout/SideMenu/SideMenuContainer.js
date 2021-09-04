import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import SideMenuPresenter from "./SideMenuPresenter";
import { useHistory } from "react-router-dom";
import { getCookie } from "../../Util/Cookie";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../Store/Actions/userAction";
import { closedSideMenu } from "../../../Store/Actions/sideMenuAction";

const SideMenuContainer = ({ setShowSideMenu }) => {
  const [isToastActive, setIsToastActive] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [path, setPath] = useState("main");
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = useCallback(async () => {
    const tokenId = getCookie("accessToken");
    const res = await dispatch(logoutUser(tokenId));

    setIsToastActive(true);
    dispatch(closedSideMenu(false));
    if (res.payload && (path === "mypage" || path === "mybag")) {
      history.push("/main");
    }
  }, [dispatch, history, path]);

  const handleLink = useCallback(() => {
    dispatch(closedSideMenu(false));
  }, [dispatch]);

  // 로그인 되어있는지 파악.
  useLayoutEffect(() => {
    let token = getCookie("accessToken");

    if (token !== "NO_HAVE") {
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
      handleLink={handleLink}
    />
  );
};

export default SideMenuContainer;
