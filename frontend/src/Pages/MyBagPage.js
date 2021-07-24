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

  return (
    <Layout>
      <LogoLong />
      <SortBar />
      <MyBag filterOption={filterOption} />
    </Layout>
  );
};

export default ProductListPage;
