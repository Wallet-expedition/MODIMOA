import React from "react";

import LogoutToastMessage from "../../LogoutToastMessage";
import { Link } from "react-router-dom";

const SideMenuPresenter = ({ isLogin, handleLogout, isToastActive }) => {
  return (
    <>
      {!isToastActive ? (
        <div className="sidemenu-container">
          <div className="logo"> MODIMOA </div>
          <div className="sidemenu-nav">
            <Link to="/main"> 홈 </Link>
            {!isLogin ? (
              <>
                <Link to="/login">로그인</Link>
                <Link to="/register">회원가입</Link>
              </>
            ) : (
              <div className="side-logout-btn" onClick={handleLogout}>
                로그아웃
              </div>
            )}
            <Link to="/mybag"> 장바구니 </Link>
            <Link to="/mypage"> 마이페이지 </Link>
          </div>

          <div className="sidemenu-foot">
            <p> About </p>
            <p> Contact Us </p>
          </div>
        </div>
      ) : (
        <LogoutToastMessage />
      )}
    </>
  );
};

export default SideMenuPresenter;
