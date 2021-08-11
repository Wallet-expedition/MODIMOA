import React from "react";
import { useHistory } from "react-router";
import { withDrawUser } from "../../Store/Actions/userAction";
import MyPagePresenter from "./MyPagePresenter";
import { useDispatch } from "react-redux";

const User = {
  email: "hongildong@naver.com",
  image: "https://avatars.githubusercontent.com/u/43488305?v=4",
};

const MyPageContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  /**
   * TODO : session ? cookie ?, delete Token
   */
  const handleLogout = () => {
    window.sessionStorage.removeItem("token");
    history.push("/main");
  };

  const handleWithDraw = async () => {
    const tokenId = window.sessionStorage.getItem("token") || "A";

    const res = await dispatch(withDrawUser(tokenId));

    if (res.success) {
      history.push("/main");
    }
  };

  return (
    <MyPagePresenter
      handleLogout={handleLogout}
      handleWithDraw={handleWithDraw}
      User={User}
    />
  );
};

export default MyPageContainer;
