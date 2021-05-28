import React from "react";
import { Link } from "react-router-dom";
import "../css/Intro.scss";

const IntroPage = () => {
  return (
    <>
      <h1>Intro Page</h1>
      <ul>
        <li><Link to="/main">Main</Link></li>
      </ul>
    </>
  );
};

export default IntroPage;
