import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import ProductList from "../Components/ProductList";
import Layout from "../Components/Layout";
import Header from "../Components/Header";
import MartList from "../Components/MartList";
import HelmetComponent from "../Components/HelmetComponent";

import "../scss/ProductList.scss";
import "../scss/MartList.scss";

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

const initialState = {
  CU: true,
  SEVEN_ELEVEN: false,
  GS25: false,
  EMART24: false,
};

const ProductListPage = () => {
  const [sortOption, setSortOption] = useState(0);
  const martList =
    useSelector((state) => state.martReducer.martList) || initialState;

  const location = useLocation();
  const keyword =
    location.search &&
    decodeURI(location.search.match(/\?keyword=(?<keyword>.+)/).groups.keyword);

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
          <Tab label="이름순" />
          <Tab label="가격순" />
        </Tabs>
      </AppBar>
    );
  };
  return (
    <Layout>
      <HelmetComponent subTitle="상품 목록" />
      <Header>
        <MartList martList={martList} />
        {keyword && <ResultField searchKeyword={keyword} />}
        <SortBar />
      </Header>
      <ProductList
        searchKeyword={keyword}
        martList={martList}
        sortOption={sortOption}
      />
    </Layout>
  );
};

export default ProductListPage;
