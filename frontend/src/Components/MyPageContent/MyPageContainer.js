import React, { useCallback } from "react";
import { useHistory } from "react-router";
import { withDrawUser } from "../../Store/Actions/userAction";
import MyPagePresenter from "./MyPagePresenter";
import { useDispatch } from "react-redux";
import { getCookie } from "../Util/Cookie";
import { logoutUser } from "../../Store/Actions/userAction";

const User = {
  email: "hongildong@naver.com",
  image: "https://avatars.githubusercontent.com/u/43488305?v=4",
};

const MyPageContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = useCallback(async () => {
    const tokenId = getCookie("accessToken");
    const res = await dispatch(logoutUser(tokenId));

    if (res.payload) {
      history.push("/main");
    }
  }, [dispatch, history]);

  const handleWithDraw = useCallback(async () => {
    const tokenId = getCookie("accessToken");
    const res = await dispatch(withDrawUser(tokenId));

    if (res.payload) {
      history.push("/main");
    }
  }, [dispatch, history]);

  return (
    <MyPagePresenter
      handleLogout={handleLogout}
      handleWithDraw={handleWithDraw}
      User={User}
    />
  );
};

export default MyPageContainer;
