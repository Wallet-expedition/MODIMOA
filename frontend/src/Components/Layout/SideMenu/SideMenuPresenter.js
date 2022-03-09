import React from "react";
import LogoutToastMessage from "../../LogoutToastMessage";
import { Link } from "react-router-dom";

const SideMenuPresenter = ({
  isLogin,
  handleLogout,
  isToastActive,
  handleLink,
  showSideMenu,
}) => {
  return (
    <>
      {!isToastActive ? (
        <div
          className={`sidemenu-container ${
            showSideMenu ? "" : "sidemenu-hide"
          }`}
        >
          <header className="logo">
            <img alt="logo" src="/img/logo_long_no_empty.png" />
          </header>
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
            <Link to="/about/what"> About </Link>
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
