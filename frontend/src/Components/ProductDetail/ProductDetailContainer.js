import React from "react";

import ProductDetailPresenter from "./ProductDetailPresenter";

const ProductDetailContainer = () => {
  const item = {
    "product_id": 1,
    "mart_name": "SEVEN11",
    "product_name": "르구르망)오레오밀크스낵30g",
    "product_image": "https://www.7-eleven.co.kr/upload/product/0000090/426278.1.jpg",
    "original_price": 2310,
    "sale_price": 1000,
    "sale_start_day": "2021-7-1",
    "sale_end_day": "2021-7-31",
    "sale_category": "OnePlusOne",
    "gift_name": "",
    "gift_image": "",
    "gift_price": "",
    "created_day": "2021-7-5",
  };

  let sale_percent = Math.round((item.sale_price * 100) / item.original_price);
  return <ProductDetailPresenter item={item} sale_percent={sale_percent} />;
};

export default ProductDetailContainer;
