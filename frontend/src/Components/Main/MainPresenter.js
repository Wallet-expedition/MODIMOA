import React from "react";
import { Link } from "react-router-dom";

import { TextField } from "@material-ui/core";
import {
  EMART,
  HOMEPLUS,
  COSTCO,
  LOTTE_MART,
  CU,
  SEVEN_ELEVEN,
  GS25,
  EMART24,
} from "../Util/Constant";

const LogoIcon = ({ name }) => {
  return (
    <Link className="mart-container" to={`./list`}>
      <img
        className={`mart-${name}`}
        src={`/img/mart_${name}.jpg`}
        alt="mart"
        width="70"
        height="70"
      />
    </Link>
  );
};

const MainPresenter = ({ searchKeyword, handleChange }) => {
  return (
    <div className="content-container">
      <div className="content-beer">
        <div className="content-description">
          <p> 맥주 마시기 좋은 시간 </p>
          <p> 12:34 </p>
        </div>
      </div>

      <div className="content-logo">
        <img
          className="modimoa-logo"
          src={`/img/logo_512.png`}
          alt="modimoa-logo"
        ></img>
      </div>

      <div className="content-search">
        <TextField
          value={searchKeyword}
          onChange={handleChange}
          label="검색어를 입력하세요"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <span className="search-btn">
          <img
            className="search-icon"
            src={`/img/search_icon.png`}
            alt="search-icon"
          ></img>
        </span>
      </div>

      <div className="mart">
        <p> 대형 마트</p>
        <div className="logo-container">
          <LogoIcon name={EMART} />
          <LogoIcon name={HOMEPLUS} />
          <LogoIcon name={COSTCO} />
          <LogoIcon name={LOTTE_MART} />
        </div>
      </div>

      <div className="mart">
        <p> 편의점</p>
        <div className="logo-container">
          <LogoIcon name={CU} />
          <LogoIcon name={SEVEN_ELEVEN} />
          <LogoIcon name={GS25} />
          <LogoIcon name={EMART24} />
        </div>
      </div>
    </div>
  );
};

export default MainPresenter;
