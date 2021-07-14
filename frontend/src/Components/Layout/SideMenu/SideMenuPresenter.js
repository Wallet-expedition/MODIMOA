import React from "react";

import { Link } from "react-router-dom";

const SideMenuPresenter = () => {
  return (
    <div className="sidemenu-container">
      <div className="logo"> MODIMOA </div>
      <div className="sidemenu-nav">
        <Link to="/main"> 홈 </Link>
        <Link to="/login"> 로그인 </Link>
        <Link to="/login"> 장바구니 </Link>
        <Link to="/mypage"> 마이페이지 </Link>
      </div>

      <div className="sidemenu-foot">
        <p> About </p>
        <p> Contact Us </p>
      </div>
    </div>
  );
};

export default SideMenuPresenter;
