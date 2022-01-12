import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
  getUserInfo,
  getUserProfit,
  withDrawUser,
} from "../../Store/Actions/userAction";
import MyPagePresenter from "./MyPagePresenter";
import { useDispatch } from "react-redux";
import { getCookie } from "../Util/Cookie";
import { logoutUser } from "../../Store/Actions/userAction";

const MyPageContainer = () => {
  const [userInfo, setUserInfo] = useState({});
  const [profit, setProfit] = useState(0);

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

  useEffect(() => {
    const tokenId = getCookie("accessToken");
    const setUserInformation = async () => {
      const res = await dispatch(getUserInfo(tokenId));
      setUserInfo(res.payload);
    };
    const setUserProfit = async () => {
      const res = await dispatch(getUserProfit(tokenId));
      setProfit(res.payload);
    };

    setUserInformation();
    setUserProfit();
  }, [dispatch]);

  return (
    <MyPagePresenter
      handleLogout={handleLogout}
      handleWithDraw={handleWithDraw}
      userInfo={userInfo}
      profit={profit}
    />
  );
};

export default MyPageContainer;
