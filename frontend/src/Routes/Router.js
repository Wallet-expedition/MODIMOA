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
  Register
} from "../Pages";
import Auth from "../Components/Util/Auth";

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
      {detectMobile() && <Route exact path="/" component={Auth(Intro, null)} />}
      {!detectMobile() && <Route exact path="/" component={Auth(Main, null)} />}
      <Route path="/main" component={Auth(Main, null)} />
      <Route exact path="/list" component={Auth(ProductList, null)} />
      <Route path="/login" component={Auth(Login, false)} />
      <Route path="/list/:id" component={Auth(ProductDetail, null)} />
      <Route path="/mypage" component={Auth(MyPage, true)} />
      <Route path="/mybag" component={Auth(MyBag, true)} />
      <Route path="/register" component={Auth(Register, false)} />
    </Switch>
  );
};

export default Router;
