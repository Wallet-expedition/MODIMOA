import { Grid } from "@material-ui/core";
import addComma from "../Util/AddComma";

const WishDisplay = ({
  id,
  product_name,
  handleBuyClick,
  handleDeleteClick,
}) => {
  return (
    <div className="wish-btn-container">
      <div
        id={"id=" + id + "&wish&name=" + product_name}
        variant="contained"
        onClick={handleBuyClick}
        className="buy-btn wish-btn"
      >
        구매하기
      </div>
      <div
        id={"id=" + id + "&delete&name=" + product_name}
        variant="contained"
        onClick={handleDeleteClick}
        className="delete-btn wish-btn"
      >
        삭제하기
      </div>
    </div>
  );
};

const WishBagProduct = ({
  id,
  product_name,
  product_image,
  sale_price,
  product_count,
  handleBuyClick,
  handleDeleteClick,
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
            {`${addComma(sale_price)}원 • `} <b>{product_count}개</b>
          </span>
        </Grid>
      </Grid>
      <WishDisplay
        id={id}
        product_name={product_name}
        handleBuyClick={handleBuyClick}
        handleDeleteClick={handleDeleteClick}
      />
    </Grid>
  );
};

export default WishBagProduct;
