import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { wishProduct } from "../../Store/Actions/productAction";

import ProductDetailPresenter from "./ProductDetailPresenter";

const ProductDetailContainer = () => {
  const [isToastActive, setIsToastActive] = useState(false);
  const item = useSelector((state) => state.productReducer.product);
  /* TODO : store와 url끝의 martid가 일치하지 않을 경우, API 호출해서 갱신 */
  let sale_percent = Math.round((item.sale_price * 100) / item.original_price);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    event.preventDefault();
    setIsToastActive(true);
    const body = {
      product_id: item.id,
      product_name: item.name,
      original_price: item.original_price,
      sale_price: item.sale_price,
    };

    dispatch(wishProduct(body, item.id));
  };

  useEffect(() => {
    // toast 활성화
    if (isToastActive === true) {
      setTimeout(() => {
        setIsToastActive(false);
      }, 2000);
    }
  }, [isToastActive]);

  return (
    <ProductDetailPresenter
      item={item}
      sale_percent={sale_percent}
      isToastActive={isToastActive}
      handleClick={handleClick}
    />
  );
};

export default ProductDetailContainer;
