import React, { useCallback, useState } from "react";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link } from "react-router-dom";

import MyBag from "../Components/MyBag";
import Layout from "../Components/Layout";
import "../scss/MyBagPage.scss";
import HelmetComponent from "../Components/HelmetComponent";
import { PURCHASE_OPTION } from "../Components/Util/Constant";
import useSetMyBagList from "../Components/Util/useSetMyBagList";

const LogoLong = () => {
  return (
    <Link to="/main">
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

const SortBar = ({ filterOption, handleFilterOptionChange }) => {
  return (
    <div className="sort-bar-container">
      <AppBar position="static" className="mybag-filter-bar">
        <Tabs
          value={filterOption}
          onChange={handleFilterOptionChange}
          aria-label="simple tabs example"
        >
          <Tab label="구매 예정"></Tab>
          <Tab label="구매 내역"></Tab>
          <Tab label=" " disabled></Tab>
        </Tabs>
        {filterOption === PURCHASE_OPTION.BEFORE_PURCHASE ? (
          <div className="tab-price-container">
            <div className="tab-description"> 얼마를 아낄까? </div>
            <div className="tab-price"> 23,501원 </div>
          </div>
        ) : (
          <div className="tab-price-container">
            <div className="tab-description"> 얼마를 아꼈을까?</div>
            <div className="tab-price"> 23,501원 </div>
          </div>
        )}
      </AppBar>
    </div>
  );
};

const ProductListPage = () => {
  const [wishList, purchasedList, setNextList] = useSetMyBagList();
  const [filterOption, setFilterOption] = useState(
    PURCHASE_OPTION.BEFORE_PURCHASE
  );

  const handleFilterOptionChange = useCallback((_, newOption) => {
    setFilterOption(newOption);
  }, []);

  return (
    <Layout>
      <HelmetComponent subTitle={"장바구니"} />
      <LogoLong />
      <SortBar
        filterOption={filterOption}
        handleFilterOptionChange={handleFilterOptionChange}
      />
      <MyBag
        filterOption={filterOption}
        wishList={wishList}
        purchasedList={purchasedList}
        setNextList={setNextList}
      />
    </Layout>
  );
};

export default ProductListPage;
