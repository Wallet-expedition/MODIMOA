import React from "react";
import BuyModal from "../BuyModal";
import { Grid } from "@material-ui/core";

const MyBagPresenter = ({
  list,
  filterOption,
  handleBuyClick,
  isOpenModal,
  setIsOpenModal,
  selectedId,
}) => {
  const BagProduct = ({
    id,
    product_name,
    product_image,
    original_price,
    sale_price,
    handleBuyClick,
  }) => {
    return (
      <Grid className="product-container">
        <Grid className="product-image-container">
          <img src={product_image} alt={product_name} />
        </Grid>
        <Grid className="product-info-container">
          <span className="product-info-text"> {product_name} </span>
          <Grid className="product-info-price-container">
            <span>
              {`${sale_price}원 • `} <b> 1개 </b>
            </span>
          </Grid>
        </Grid>
        {filterOption === 0 ? (
          <button
            id={id}
            variant="contained"
            onClick={handleBuyClick}
            className="buy-btn"
          >
            구매
          </button>
        ) : (
          <Grid className="product-state-info-container">
            <Grid className="product-state-info"> 구매 완료 </Grid>
            <Grid className="product-state-price">
              {original_price - sale_price}원 이득
            </Grid>
          </Grid>
        )}
      </Grid>
    );
  };

  const BagDescription = () => {
    return (
      <div className="bag-description">
        <img className="gear-image" src={`/img/gear.png`} alt="gear" />
        <span> 각 상품을 누르면 상품의 수량을 변경하실 수 있습니다. </span>
      </div>
    );
  };

  return (
    <div className="my-bag-container">
      {filterOption === 0 ? <BagDescription /> : ""}
      {list.map((item) => {
        return (
          <BagProduct
            key={item.productId}
            id={item.productId}
            product_name={item.productName}
            product_image={item.productImage}
            original_price={item.originalPrice}
            sale_price={item.salePrice}
            handleBuyClick={handleBuyClick}
          />
        );
      })}
      {isOpenModal ? (
        <BuyModal setIsOpenModal={setIsOpenModal} selectedId={selectedId} />
      ) : (
        ""
      )}
    </div>
  );
};

export default MyBagPresenter;
