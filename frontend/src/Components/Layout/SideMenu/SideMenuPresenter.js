import React from "react";

import LogoutToastMessage from "../../LogoutToastMessage";
import { Link } from "react-router-dom";

const SideMenuPresenter = ({
  isLogin,
  handleLogout,
  isToastActive,
  handleLink,
}) => {
  return (
    <>
      {!isToastActive ? (
        <div className="sidemenu-container">
          <header className="logo"> MODIMOA </header>
          <nav className="sidemenu-nav">
            <Link to="/main" onClick={handleLink}>
              홈
            </Link>
            {!isLogin ? (
              <>
                <Link to="/login" onClick={handleLink}>
                  로그인
                </Link>
                <Link to="/register" onClick={handleLink}>
                  회원가입
                </Link>
              </>
            ) : (
              <div className="side-logout-btn" onClick={handleLogout}>
                로그아웃
              </div>
            )}
            <Link to="/mybag" onClick={handleLink}>
              장바구니
            </Link>
            <Link to="/mypage" onClick={handleLink}>
              마이페이지
            </Link>
          </nav>

          <footer className="sidemenu-foot">
            <p> About </p>
            <p> Contact Us </p>
          </footer>
        </div>
      ) : (
        <LogoutToastMessage />
      )}
    </>
  );
};

export default SideMenuPresenter;
