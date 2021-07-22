import React, { useState } from "react";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import MyBag from "../Components/MyBag";
import Layout from "../Components/Layout";
import "../scss/MyBagPage.scss";
import { Link } from "react-router-dom";

const ProductListPage = () => {
  const [filterOption, setFilterOption] = useState(0);

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

  const SortBar = () => {
    const handleChange = (event, newOption) => {
      setFilterOption(newOption);
    };
    return (
      <AppBar position="static" className="mybag-filter-bar">
        <Tabs
          value={filterOption}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="구매예정" />
          <Tab label="구매내역" />
          <Tab label=" " disabled />
          {filterOption === 0 ? (
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
        </Tabs>
      </AppBar>
    );
  };

  const BagDescription = () => {
    return (
      <div className="bag-description">
        <img className="gear-image" src={`/img/gear.png`} alt="gear" />
        <span> 각 상품을 누르면 상품의 수량을 변경하실 수 있습니다. </span>
      </div>
    );
  };

  return (
    <Layout>
      <LogoLong />
      <SortBar />
      {filterOption === 0 ? (
        <BagDescription />
      ) : (
        <div style={{ whiteSpace: "nowrap" }} />
      )}
      <MyBag filterOption={filterOption} />
    </Layout>
  );
};

export default ProductListPage;
