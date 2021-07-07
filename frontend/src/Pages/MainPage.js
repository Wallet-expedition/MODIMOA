import React from "react";

import Main from "../Components/Main";
import Layout from "../Components/Layout";

import "../scss/MainPage.scss";

const MainPage = () => {
  return (
    <Layout className="main-container">
      <Main />
    </Layout>
  );
};

export default MainPage;
