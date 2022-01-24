import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
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

const LogoIcon = ({ name, handleLogoClick }) => {
  return (
    <Button className="mart-container" onClick={handleLogoClick}>
      <img
        id={name}
        className={`mart-${name}`}
        src={`/img/mart_${name}.jpg`}
        alt="mart"
        width="70"
        height="70"
      />
    </Button>
  );
};

const MainPresenter = ({ searchKeyword, handleChange, handleLogoClick }) => {
  const history = useHistory();

  const onClickSearch = useCallback(() => {
    if (searchKeyword)
      history.push({ pathname: "/list", search: `?keyword=${searchKeyword}` });
    else alert("검색어를 입력해주세요.");
  }, [history, searchKeyword]);

  const onEnterPress = useCallback(
    (e) => {
      if (e.key === "Enter") {
        onClickSearch();
      }
    },
    [onClickSearch]
  );

  return (
    <main className="content-container">
      <div className="content-beer">
        <div className="content-description">
          <p> 맥주 마시기 좋은 시간! </p>
          <p> 12:34 </p>
        </div>
      </div>

      <header className="content-logo">
        <img
          className="modimoa-logo"
          src={`/img/logo_512.png`}
          alt="modimoa-logo"
        ></img>
      </header>

      <div className="content-search">
        <TextField
          value={searchKeyword}
          onChange={handleChange}
          onKeyPress={onEnterPress}
          label="검색어를 입력하세요"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <span className="search-btn" onClick={onClickSearch}>
          <img
            className="search-icon"
            src={`/img/search_icon.png`}
            alt="search-icon"
          ></img>
        </span>
      </div>

      <footer className="content-foot">
        <article className="mart">
          <p> 대형 마트</p>
          <div className="logo-container">
            <LogoIcon name={EMART} handleLogoClick={handleLogoClick} />
            <LogoIcon name={HOMEPLUS} handleLogoClick={handleLogoClick} />
            <LogoIcon name={COSTCO} handleLogoClick={handleLogoClick} />
            <LogoIcon name={LOTTE_MART} handleLogoClick={handleLogoClick} />
          </div>
        </article>

        <article className="mart">
          <p> 편의점</p>
          <div className="logo-container">
            <LogoIcon name={CU} handleLogoClick={handleLogoClick} />
            <LogoIcon name={SEVEN_ELEVEN} handleLogoClick={handleLogoClick} />
            <LogoIcon name={GS25} handleLogoClick={handleLogoClick} />
            <LogoIcon name={EMART24} handleLogoClick={handleLogoClick} />
          </div>
        </article>
      </footer>
    </main>
  );
};

export default MainPresenter;
