import React from "react";
import { useSelector } from "react-redux";

import ProductDetailPresenter from "./ProductDetailPresenter";

const ProductDetailContainer = () => {
  const item = useSelector((state) => state.productReducer.product);
  /* TODO : store와 url끝의 martid가 일치하지 않을 경우, API 호출해서 갱신 */
  let sale_percent = Math.round((item.sale_price * 100) / item.original_price);
  return <ProductDetailPresenter item={item} sale_percent={sale_percent} />;
};

export default ProductDetailContainer;
