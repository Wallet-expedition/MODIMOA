import React, { useState } from "react";

import Login from "../Components/Login";
import SideMenu from "../Components/Main/SideMenu";
import SideMenuBtn from "../Components/Main/SideMenuBtn";
import "../scss/Login.scss";

const LoginPage = () => {
  const [showSideMenu, setShowSideMenu] = useState(true);

  return (
    <>
      <SideMenuBtn
        showSideMenu={showSideMenu}
        setShowSideMenu={setShowSideMenu}
      />
      {showSideMenu ? <SideMenu /> : null}
      <Login />
    </>
  );
};

export default LoginPage;
