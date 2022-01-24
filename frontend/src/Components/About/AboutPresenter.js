import React from "react";
import { Link } from "react-router-dom";

import NavigateBeforeIcon from "@material-ui/icons/NavigateBeforeRounded";
import NavigateNextIcon from "@material-ui/icons/NavigateNextRounded";

import AboutWhoPresenter from "./AboutWhoPresenter";
import AboutWhatPresenter from "./AboutWhatPresenter";
import { LogoLong } from "../Header/HeaderPresenter";

const SearchArea = ({ page }) => {
  const content = page === "who" ? "개발자들" : "모디모아";
  return (
    <span className="about-title-text">{`"${content}" 검색 결과입니다.`}</span>
  );
};

const AboutPresenter = ({ page, clickLeft, clickRight }) => {
  const path = `/about/${page === "who" ? "what" : "who"}`;

  return (
    <div className="about-container">
      <LogoLong />
      <SearchArea page={page} />
      <div className="about-arrow-container">
        <Link to={path} onClick={clickLeft}>
          <NavigateBeforeIcon />
        </Link>
        <Link to={path} onClick={clickRight}>
          <NavigateNextIcon />
        </Link>
      </div>
      <section className="about-content">
        {page === "who" ? <AboutWhoPresenter /> : <AboutWhatPresenter />}
      </section>
    </div>
  );
};

export default AboutPresenter;
