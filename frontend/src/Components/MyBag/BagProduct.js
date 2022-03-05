import { Grid } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import addComma from "../Util/AddComma";

const BagBtnContainer = ({
  id,
  handleBuyClick,
  handleDeleteClick,
  isWishDisplay,
}) => {
  return (
    <div className="mybag-btn-container">
      {isWishDisplay && (
        <div
          id={id}
          variant="contained"
          onClick={handleBuyClick}
          className="buy-btn wish-btn"
        >
          구매하기
        </div>
      )}
      <div
        id={id}
        variant="contained"
        onClick={handleDeleteClick}
        className="delete-btn wish-btn"
      >
        삭제하기
      </div>
    </div>
  );
};

const BagProduct = ({
  id,
  item,
  handleBuyClick,
  handleDeleteClick,
  isWishDisplay,
}) => {
  return (
    <Grid className="mybag-product-container">
      <Grid className="mybag-product-image-container">
        <img src={item.productImage} alt={item.productName} />
      </Grid>
      <Grid className="mybag-product-info-container">
        <span className="mybag-product-info-text"> {item.productName} </span>
        <Grid className="mybag-product-info-price-container">
          <span>
            {`${addComma(item.salePrice)}원 • `} <b>{item.productCnt}개</b>
          </span>
          {isWishDisplay && (
            <SettingsIcon
              id={id}
              onClick={handleBuyClick}
              className="mybag-gear"
              color="disabled"
            />
          )}
        </Grid>
      </Grid>
      <BagBtnContainer
        id={id}
        productName={item.productName}
        handleBuyClick={handleBuyClick}
        handleDeleteClick={handleDeleteClick}
        isWishDisplay={isWishDisplay}
      />
    </Grid>
  );
};

export default BagProduct;
