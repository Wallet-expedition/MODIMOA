import { Grid } from "@material-ui/core";
import addComma from "../Util/AddComma";

const PurchasedDisplay = ({ profit }) => {
  return (
    <Grid className="product-state-info-container">
      <Grid className="product-state-info">구매 완료</Grid>
      <Grid className="product-state-price">{addComma(profit)}원 이득</Grid>
    </Grid>
  );
};

const PurchasedBagProduct = ({
  product_name,
  product_image,
  product_count,
  original_price,
  sale_price,
}) => {
  const profit = (original_price - sale_price) * product_count;

  return (
    <Grid className="mybag-product-container">
      <Grid className="mybag-product-image-container">
        <img src={product_image} alt={product_name} />
      </Grid>
      <Grid className="mybag-product-info-container">
        <span className="mybag-product-info-text">{product_name}</span>
        <Grid className="mybag-product-info-price-container">
          <span>
            {addComma(sale_price)}원 • <b>{addComma(product_count)}개</b>
          </span>
        </Grid>
      </Grid>
      <PurchasedDisplay profit={profit} />
    </Grid>
  );
};

export default PurchasedBagProduct;
