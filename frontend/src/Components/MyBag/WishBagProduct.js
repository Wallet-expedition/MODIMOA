import { Grid } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import addComma from "../Util/AddComma";

const WishDisplay = ({
  id,
  product_name,
  handleBuyClick,
  handleDeleteClick,
}) => {
  return (
    <div className="mybag-btn-container">
      <div
        id={`id=${id}&wish&name=${product_name}`}
        variant="contained"
        onClick={handleBuyClick}
        className="buy-btn wish-btn"
      >
        구매하기
      </div>
      <div
        id={`id=${id}&delete&name=${product_name}`}
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
    <Grid className="mybag-product-container">
      <Grid className="mybag-product-image-container">
        <img src={product_image} alt={product_name} />
      </Grid>
      <Grid className="mybag-product-info-container">
        <span className="mybag-product-info-text"> {product_name} </span>
        <Grid className="mybag-product-info-price-container">
          <span>
            {`${addComma(sale_price)}원 • `} <b>{product_count}개</b>
          </span>
          <SettingsIcon
            id={`id=${id}&count&name=${product_name}`}
            onClick={handleBuyClick}
            className="mybag-gear"
            color="disabled"
          />
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
