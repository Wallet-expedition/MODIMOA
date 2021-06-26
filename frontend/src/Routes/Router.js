import React from "react";

import { Route, Switch } from "react-router-dom";
import { Intro, Main, Login } from "../Pages";

const Router = () => {
  const detectMobile = () => {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i,
    ];

    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    });
  };
  return (
    <Switch>
      {detectMobile() && <Route exact path="/" component={Intro} />}
      {!detectMobile() && <Route exact path="/" component={Main} />}
      <Route path="/main" component={Main} />
      <Route path="/auth" component={Login} />
    </Switch>
  );
};

export default Router;
