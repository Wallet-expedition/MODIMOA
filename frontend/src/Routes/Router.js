import React from "react";

import { Route, Switch } from "react-router-dom";
import {
  Intro,
  Main,
  Login,
  ProductList,
  ProductDetail,
  MyPage,
  MyBag,
  Register,
  About,
} from "../Pages";
import Auth from "../Components/Util/Auth";
import detectMobile from "../Components/Util/DetectMobile";

const Router = () => {
  return (
    <Switch>
      {detectMobile() && <Route exact path="/" component={Auth(Intro, null)} />}
      {!detectMobile() && <Route exact path="/" component={Auth(Main, null)} />}
      <Route path="/main" component={Auth(Main, null)} />
      <Route exact path="/list" component={Auth(ProductList, null)} />
      <Route path="/login" component={Auth(Login, false)} />
      <Route path="/list/:id" component={Auth(ProductDetail, null)} />
      <Route path="/mypage" component={Auth(MyPage, true)} />
      <Route path="/mybag" component={Auth(MyBag, true)} />
      <Route path="/register" component={Auth(Register, false)} />
      <Route path="/about/:page" component={Auth(About, false)} />
    </Switch>
  );
};

export default Router;
