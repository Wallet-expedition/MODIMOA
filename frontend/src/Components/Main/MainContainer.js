import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import MainPresenter from "./MainPresenter";
import { CU, SEVEN_ELEVEN, GS25, EMART24 } from "../../Util/Constant";
import { selectMart } from "../../Store/Actions/martAction";

const initialState = {
  CU: false,
  SEVEN_ELEVEN: false,
  GS25: false,
  EMART24: false,
};

const MainContainer = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const martList = useSelector((state) => state.martReducer.martList);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleChange = useCallback((event) => {
    setSearchKeyword(event.target.value);
  }, []);

  const handleLogoClick = (event) => {
    const name = event.target.id;
    switch (name) {
      case CU:
        dispatch(selectMart({ ...martList, CU: true }));
        break;
      case SEVEN_ELEVEN:
        dispatch(selectMart({ ...martList, SEVEN_ELEVEN: true }));
        break;
      case GS25:
        dispatch(selectMart({ ...martList, GS25: true }));
        break;
      case EMART24:
        dispatch(selectMart({ ...martList, EMART24: true }));
        break;
      default:
        break;
    }
    history.push("/list");
  };

  useEffect(() => {
    dispatch(selectMart(initialState));
  }, [dispatch]);

  return (
    <MainPresenter
      searchKeyword={searchKeyword}
      handleChange={handleChange}
      handleLogoClick={handleLogoClick}
    />
  );
};

export default MainContainer;
