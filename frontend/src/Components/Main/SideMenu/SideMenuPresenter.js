import React from "react";

const SideMenuPresenter = () => {
  return(
    <div className="sidemenu-container">
      <div className="logo"> MODIMOA </div>
      <div className="sidemenu-nav">
        <p> 홈 </p>
        <p> 로그인 </p>
        <p> 장바구니 </p>
        <p> 마이페이지 </p>
      </div>

      <div className="sidemenu-foot">
        <p> About </p>
        <p> Contact Us </p>
      </div>
    </div>
  );
};

export default SideMenuPresenter;
