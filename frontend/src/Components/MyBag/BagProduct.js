import { Grid } from "@material-ui/core";

const BagProduct = ({
  id,
  product_name,
  product_image,
  original_price,
  sale_price,
  handleBuyClick,
  filterOption,
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
          id={"id=" + id + "&name=" + product_name}
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

export default BagProduct;
