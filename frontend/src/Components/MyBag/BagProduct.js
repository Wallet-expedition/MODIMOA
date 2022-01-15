import { Grid } from "@material-ui/core";

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
const PurchasedDisplay = ({ profit }) => {
  return (
    <Grid className="product-state-info-container">
      <Grid className="product-state-info"> 구매 완료 </Grid>
      <Grid className="product-state-price">{profit}원 이득</Grid>
    </Grid>
  );
};

const BagProduct = ({
  id,
  product_name,
  product_image,
  original_price,
  sale_price,
  handleBuyClick,
  handleDeleteClick,
  filterOption,
}) => {
  const profit = parseInt(original_price) - parseInt(sale_price);

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
        <WishDisplay
          id={id}
          product_name={product_name}
          handleBuyClick={handleBuyClick}
          handleDeleteClick={handleDeleteClick}
        />
      ) : (
        <PurchasedDisplay profit={profit} />
      )}
    </Grid>
  );
};

export default BagProduct;
