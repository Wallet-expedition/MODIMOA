import React, { useState } from "react";

import { Link, useHistory } from "react-router-dom";
import { TextField } from "@material-ui/core";
import { Grid } from "@material-ui/core";

export const LogoLong = () => {
  return (
    <Link to="/main">
      <div className="logo-long-text-container">
        <img
          className="logo-image"
          src="/img/logo_long_and_text_512.png"
          alt="logo"
        />
      </div>
    </Link>
  );
};

const HeaderPresenter = ({ children }) => {
  const SearchBar = () => {
    const [searchKeyword, setSearchKeyword] = useState("");
    const history = useHistory();
    const handleChange = (e) => {
      setSearchKeyword(e.target.value);
    };
    const onClickSearch = () => {
      if (searchKeyword)
        history.push({
          pathname: "/list",
          search: `?keyword=${searchKeyword}`,
        });
      else alert("검색어를 입력해주세요");
    };
    const onEnterPress = (e) => {
      if (e.key === "Enter") {
        onClickSearch();
      }
    };
    return (
      <div className="content-search content-search-border-grey">
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
            src="/img/search_icon.png"
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
      <Grid>{children}</Grid>
    </div>
  );
};

export default HeaderPresenter;
