import React from "react";
import Intro from "../Components/Intro";
import "../scss/Intro.scss";
import { Helmet } from "react-helmet-async";

const IntroPage = () => {
  return (
    <main>
      <Helmet title="모디모아 맥주 한 잔" />
      <Intro />
    </main>
  );
};

export default IntroPage;
