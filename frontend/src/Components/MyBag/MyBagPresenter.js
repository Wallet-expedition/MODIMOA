import React from "react";
import { Grid, Button } from "@material-ui/core";

const MyBagPresenter = ({ list, filterOption }) => {
  const BagProduct = ({
    id,
    mart_name,
    product_name,
    product_image,
    original_price,
    sale_price,
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
          <Button variant="contained">구매</Button>
        ) : (
          <Grid className="product-state-info-container">
            <Grid className="product-state-info"> 구매 완료 </Grid>
            <Grid className="product-state-price"> 4,488원 이득 </Grid>
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
            id={item.product_id}
            mart_name={item.mart_name}
            product_name={item.product_name}
            product_image={item.product_image}
            original_price={item.original_price}
            sale_price={item.sale_price}
          />
        );
      })}
    </div>
  );
};

export default MyBagPresenter;
