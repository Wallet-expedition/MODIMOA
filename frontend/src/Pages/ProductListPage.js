import React, { useState } from "react";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import ProductList from "../Components/ProductList";
import Layout from "../Components/Layout";
import Header from "../Components/Header";

import "../scss/ProductList.scss";

const ResultField = ({ searchKeyword }) => {
  let resultText = "";
  if (searchKeyword) {
    resultText = `"${searchKeyword}" 검색 결과입니다.`;
  }
  return (
    <div className="product-search-result-container">
      <p className="product-search-result"> {resultText} </p>
    </div>
  );
};

const ProductListPage = () => {
  const [finalSearchKeyword, setFinalSearchKeyword] = useState("");
  const [sortOption, setSortOption] = useState(0);
  const SortBar = () => {
    const handleChange = (event, newOption) => {
      setSortOption(newOption);
    };
    return (
      <AppBar position="static" className="product-sort-bar">
        <Tabs
          value={sortOption}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="가격순" />
          <Tab label="할인순" />
          <Tab label="담은순" />
        </Tabs>
      </AppBar>
    );
  };
  return (
    <Layout>
      <Header setFinalSearchKeyword={setFinalSearchKeyword}>
        <ResultField searchKeyword={finalSearchKeyword} />
        <SortBar />
      </Header>
      <ProductList searchKeyword={finalSearchKeyword} />
    </Layout>
  );
};

export default ProductListPage;