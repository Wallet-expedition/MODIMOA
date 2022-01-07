import React from "react";

import Layout from "../Components/Layout";
import HelmetComponent from "../Components/HelmetComponent";
import AboutContainer from "../Components/About";

import "../scss/About.scss";

const AboutPage = () => {
  return (
    <Layout className="main-container">
      <HelmetComponent subTitle={"ABOUT"} />
      <AboutContainer />
    </Layout>
  );
};

export default AboutPage;
