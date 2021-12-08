import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Grid, Button } from "@material-ui/core";
import { CU, SEVEN_ELEVEN, GS25, EMART24 } from "../Util/Constant";
import { selectProduct } from "../../Store/Actions/productAction";

const ProductPresenter = ({
  id,
  mart_name,
  product_name,
  product_image,
  original_price,
  sale_price,
}) => {
  let martClass = "product-info-mart";
  const productInfo = {
    id: id,
    mart_name: mart_name,
    product_name: product_name,
    product_image: product_image,
    original_price: original_price,
    sale_price: sale_price,
  };
  const dispatch = useDispatch();
  switch (mart_name) {
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
  const onClick = useCallback(() => {
    dispatch(selectProduct(productInfo));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
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
      <Link className="product-button" to={`/list/${id}`}>
        <Button onClick={onClick} variant="contained">
          자세히
        </Button>
      </Link>
    </Grid>
  );
};

export default ProductPresenter;
