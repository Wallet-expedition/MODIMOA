import React from "react";
import { Grid, Button } from "@material-ui/core";

const ProductPresenter = ({
  id,
  mart_name,
  product_name,
  product_image,
  original_price,
  sale_price,
}) => {
  var martClass = "product-info-mart";
  switch (mart_name) {
    case "CU":
      martClass = `${martClass} product-info-mart-cu`;
      break;
    case "SEVEN11":
      martClass = `${martClass} product-info-mart-seven11`;
      break;
    case "GS25":
      martClass = `${martClass} product-info-mart-gs25`;
      break;
    case "EMART24":
      martClass = `${martClass} product-info-mart-emart24`;
      break;
    default:
      break;
  }
  return (
    <Grid className="product-container">
      <Grid className="product-image-container">
        <img src={product_image} alt={product_name} />
      </Grid>
      <Grid className="product-info-container">
        <Grid className="product-info-price-container">
          <span>
            {`${sale_price} `}
            <del>{original_price}</del>
          </span>
        </Grid>
        <span className="product-info-text"> {product_name} </span>
        <span className={martClass}> {mart_name} </span>
      </Grid>
      <Button className="product-button" variant="contained" href={`./${id}`}>
        자세히
      </Button>
    </Grid>
  );
};

export default ProductPresenter;
