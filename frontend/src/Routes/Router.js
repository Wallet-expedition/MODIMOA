import React from "react";

import { Route, Switch } from "react-router-dom";
import { Intro, Main, Login } from "../Pages";

const Router = () => {
  return (
    <Switch>
      <Route exact path="/" component={Intro} />
      <Route path="/main" component={Main} />
      <Route path="/auth" component={Login} />
    </Switch>
  );
};

export default Router;
