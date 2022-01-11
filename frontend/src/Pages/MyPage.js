import React from "react";

import MyPageContent from "../Components/MyPageContent";
import Layout from "../Components/Layout";
import { Link } from "react-router-dom";
import "../scss/MyPage.scss";
import HelmetComponent from "../Components/HelmetComponent";

const LogoLong = () => {
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

const MyPage = () => {
  return (
    <Layout className="main-container">
      <HelmetComponent subTitle={"내 정보"} />
      <LogoLong />
      <MyPageContent />
    </Layout>
  );
};

export default MyPage;
