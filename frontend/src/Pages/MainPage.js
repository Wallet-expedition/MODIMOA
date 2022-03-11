import React from "react";

import Main from "../Components/Main";
import Layout from "../Components/Layout";
import "../scss/MainPage.scss";
import HelmetComponent from "../Components/HelmetComponent";

const MainPage = () => {
  return (
    <Layout className="main-container">
      <HelmetComponent subTitle="메인" />
      <Main />
    </Layout>
  );
};

export default MainPage;
