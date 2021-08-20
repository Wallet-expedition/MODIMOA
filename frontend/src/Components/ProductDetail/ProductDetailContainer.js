import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneProduct, wishProduct } from "../../Store/Actions/productAction";
import ProductDetailPresenter from "./ProductDetailPresenter";

const ProductDetailContainer = () => {
  const [isToastActive, setIsToastActive] = useState(false);
  const [salePercent, setSalePercent] = useState(0);
  const itemFromRedux = useSelector((state) => state.productReducer.product);
  const [item, setItem] = useState({});
  /* TODO : store와 url끝의 martid가 일치하지 않을 경우, API 호출해서 갱신 */
  const dispatch = useDispatch();
  const params = useParams();

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

  useEffect(() => {
    const setNewProduct = async () => {
      const res = await dispatch(getOneProduct(Number(params.id)));

      const data = res.payload.data;
      const newItem = {
        id: data.productId,
        product_image: data.productImage,
        product_name: data.productName,
        sale_price: data.salePrice,
        original_price: data.originalPrice,
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
  useEffect(() => {
    const newSalePercent = Math.round(
      (item.sale_price * 100) / item.original_price
    );
    setSalePercent(newSalePercent);
  }, [item]);

  return (
    <ProductDetailPresenter
      item={item}
      sale_percent={salePercent}
      isToastActive={isToastActive}
      handleClick={handleClick}
    />
  );
};

export default ProductDetailContainer;
