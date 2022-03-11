import React from "react";

import Login from "../Components/Login";
import Layout from "../Components/Layout";
import HelmetComponent from "../Components/HelmetComponent";
import "../scss/Login.scss";

const LoginPage = () => {
  return (
    <Layout>
      <HelmetComponent subTitle="로그인" />
      <Login />
    </Layout>
  );
};

export default LoginPage;
