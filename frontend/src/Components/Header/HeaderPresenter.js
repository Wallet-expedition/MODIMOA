import React from "react";

import { Link } from "react-router-dom";
import { TextField } from "@material-ui/core";
import { Grid } from "@material-ui/core";

const HeaderPresenter = ({ handleChange, searchKeyword, children }) => {
  const LogoLong = () => {
    return (
      <Link to="./main">
        <div className="logo-long-text-container">
          <img
            className="logo-image"
            src={`/img/logo_long_and_text_512.png`}
            alt="logo"
          />
        </div>
      </Link>
    );
  };

  const SearchBar = () => {
    return (
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
    );
  };

  return (
    <div className="header-container">
      <LogoLong />
      <SearchBar />
      <Grid id="wrap"> {children} </Grid>
    </div>
  );
};

export default HeaderPresenter;
