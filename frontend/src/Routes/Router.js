import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { Main, Login } from '../Pages';

const Router = () => {
  return (
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/auth" component={Login} />
    </Switch>
  );
};

export default Router;
