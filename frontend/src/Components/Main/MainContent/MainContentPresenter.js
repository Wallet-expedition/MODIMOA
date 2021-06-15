import React from "react";

const MainContentPresenter = () => {
  return(
    <div className="content-container">
      <div className="content-beer">
        <div className="content-description">
          <p> 맥주 마시기 좋은 시간 </p>
          <p> 12:34 </p>
        </div>
      </div>

      <div className="content-logo">
        <div className="modimoa-logo">MODIMOA</div>
      </div>

      <div className="content-search">
        <p> 검색어를 입력하세요.</p>
        <div className="search-btn"> 검색 </div>
      </div>

      <div className="mart">
        <p> 대형 마트</p>
        <div className="logo-container">
          <div className="logo emart"> icon </div>
          <div className="logo homeplus"> icon </div>
          <div className="logo costco"> icon </div>
          <div className="logo lottemart"> icon </div>
        </div>
      </div>

      <div className="mart">
        <p> 편의점</p>
        <div className="logo-container">
          <div className="logo cu"> icon </div>
          <div className="logo seven"> icon </div>
          <div className="logo gs"> icon </div>
          <div className="logo emart"> icon </div>
        </div>
      </div>
    </div>
  );
};

export default MainContentPresenter;
