import React, { useState, useLayoutEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getOneProduct, wishProduct } from "../../Store/Actions/productAction";
import ProductDetailPresenter from "./ProductDetailPresenter";

const ProductDetailContainer = () => {
  const [isToastActive, setIsToastActive] = useState(false);
  const [salePercent, setSalePercent] = useState(0);
  const itemFromRedux = useSelector((state) => state.productReducer.product);
  const [item, setItem] = useState({});

  const dispatch = useDispatch();
  const params = useParams();

  const handleClick = useCallback(
    async (event) => {
      event.preventDefault();
      const body = {
        product_id: item.id,
        product_name: item.name,
        original_price: item.original_price,
        sale_price: item.sale_price,
      };

      const res = await dispatch(wishProduct(body, item.id));
      if (res.payload.status === 201) {
        setIsToastActive(true);
      }
    },
    [dispatch, item.id, item.name, item.original_price, item.sale_price]
  );

  useLayoutEffect(() => {
    // toast 활성화
    if (isToastActive === true) {
      setTimeout(() => {
        setIsToastActive(false);
      }, 2000);
    }
  }, [isToastActive]);

  useLayoutEffect(() => {
    const setNewProduct = async () => {
      const res = await dispatch(getOneProduct(Number(params.id)));

      const data = res.payload.data;
      const newItem = {
        id: data.productId,
        product_image: data.productImage,
        product_name: data.productName,
        sale_price: data.salePrice,
        original_price: data.originalPrice,
        mart_name: data.martName,
      };
      setItem(newItem);
    };

    // 리덕스에 저장한 물품이 없거나, 저장된 아이디와 params의 id가 다르면 새로운 아이템 반환.
    if (itemFromRedux === undefined || Number(params.id) !== itemFromRedux.id) {
      setNewProduct();
    } else {
      setItem(itemFromRedux);
    }
  }, [dispatch, itemFromRedux, params.id]);

  // for SalePercent
  useLayoutEffect(() => {
    const newSalePercent = Math.round(
      ((item.original_price - item.sale_price) * 100) / item.original_price
    );
    setSalePercent(newSalePercent);
  }, [item]);

  const handleImageError = useCallback((e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "/img/logo_beer_256.png";
  }, []);

  return (
    <ProductDetailPresenter
      item={item}
      sale_percent={salePercent}
      isToastActive={isToastActive}
      handleClick={handleClick}
      handleImageError={handleImageError}
    />
  );
};

export default ProductDetailContainer;
