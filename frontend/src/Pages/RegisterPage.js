import React from "react";

import Register from "../Components/Register";
import Layout from "../Components/Layout";
import "../scss/Login.scss";
import HelmetComponent from "../Components/HelmetComponent";

const LoginPage = () => {
  return (
    <Layout>
      <HelmetComponent subTitle="회원가입" />
      <Register />
    </Layout>
  );
};

export default LoginPage;
