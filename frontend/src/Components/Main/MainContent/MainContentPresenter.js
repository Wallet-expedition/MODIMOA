import React from "react";
import { Link } from "react-router-dom";

import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";

const LogoIcon = ({ name }) => {
  return (
    <Link className="mart-container" to={`./main`}>
      <img
        className={`mart ${name}`}
        src="https://user-images.githubusercontent.com/42960217/123408733-4fa0cf80-d5e8-11eb-9956-8250d7599bed.png"
        alt="mart"
      />
    </Link>
  );
};

const MainContentPresenter = ({ searchKeyword, handleChange }) => {
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
          src="https://user-images.githubusercontent.com/42960217/123408733-4fa0cf80-d5e8-11eb-9956-8250d7599bed.png"
          alt="modimoa-logo"
        ></img>
      </div>

      <div className="content-search">
        <FormControl>
          <InputLabel htmlFor="outlined-weight-helper-text">
            검색어를 입력해주세요
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-weight"
            value={searchKeyword}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <img
                  className="modimoa-logo"
                  src="https://user-images.githubusercontent.com/42960217/123408733-4fa0cf80-d5e8-11eb-9956-8250d7599bed.png"
                  alt="modimoa-logo"
                ></img>
              </InputAdornment>
            }
          />
        </FormControl>
      </div>

      <div className="mart">
        <p> 대형 마트</p>
        <div className="logo-container">
          <LogoIcon name="emart" />
          <LogoIcon name="homeplus" />
          <LogoIcon name="costco" />
          <LogoIcon name="lottemart" />
        </div>
      </div>

      <div className="mart">
        <p> 편의점</p>
        <div className="logo-container">
          <LogoIcon name="cu" />
          <LogoIcon name="seven" />
          <LogoIcon name="gs" />
          <LogoIcon name="emart" />
        </div>
      </div>
    </div>
  );
};

export default MainContentPresenter;
