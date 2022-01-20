import React from "react";

import { Grid, Button } from "@material-ui/core";
import { CU, SEVEN_ELEVEN, GS25, EMART24 } from "../Util/Constant";
import AddComma from "../Util/AddComma";

// id={id}
// mart_name={mart_name}
// product_name={product_name}
// product_image={product_image}
// original_price={original_price}
// sale_price={sale_price}
const ProductDetailPresenter = ({
  item,
  sale_percent,
  isToastActive,
  handleClick,
}) => {
  let martClass = "product-info-mart";
  switch (item.mart_name) {
    case "CU":
      martClass = `${martClass} product-info-mart-${CU}`;
      break;
    case "SEVEN11":
      martClass = `${martClass} product-info-mart-${SEVEN_ELEVEN}`;
      break;
    case "GS25":
      martClass = `${martClass} product-info-mart-${GS25}`;
      break;
    case "EMART24":
      martClass = `${martClass} product-info-mart-${EMART24}`;
      break;
    default:
      break;
  }
  const ItemBox = ({ item, sale_percent }) => {
    return (
      <Grid className="item-container">
        <div className="item-image">
          <img src={item.product_image} alt={`${item.product_name}`}></img>
        </div>
        <Grid className="item-content">
          <div className={`${martClass} item-label`}>{item.mart_name}</div>
          <div className="item-title">{item.product_name}</div>
          <div className="item-info">
            <div className="item-price">
              <div className="item-original-price">
                기존가: {AddComma(item.original_price)}원
              </div>
              <div className="item-sale-price">
                할인가: {AddComma(item.sale_price)}원
              </div>
            </div>
            {sale_percent !== Infinity && (
              <div className="item-sale-percent">{sale_percent}% 할인!</div>
            )}
          </div>
        </Grid>
      </Grid>
    );
  };

  const BagButton = () => {
    return (
      <footer className="bag-button-container">
        <span className="cart-icon">
          <img src={`/img/cart.png`} alt="modimoa-bag-cart-icon"></img>
        </span>
        <Button
          variant="contained"
          size="large"
          onClick={handleClick}
          // startIcon={}
        >
          장바구니에 담기
        </Button>
      </footer>
    );
  };

  const MyBagToastMessage = () => {
    return (
      <div className="mybag-toast"> 장바구니에 성공적으로 담겼습니다. </div>
    );
  };

  return (
    <main className="product-detail-container">
      <ItemBox item={item} sale_percent={sale_percent} />
      <BagButton handleClick={handleClick} />
      {isToastActive ? <MyBagToastMessage /> : ""}
    </main>
  );
};

export default ProductDetailPresenter;
