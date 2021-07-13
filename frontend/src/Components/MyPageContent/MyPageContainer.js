import React from "react";
import { useHistory } from "react-router";
import { withDrawUser } from "../../Store/Actions/userAction";
import MyPagePresenter from "./MyPagePresenter";
import { useDispatch } from "react-redux";

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
    />
  );
};

export default MyPageContainer;
