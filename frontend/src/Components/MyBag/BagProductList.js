import BagProduct from "./BagProduct";

const BagProductList = ({
  list,
  handleBuyClick,
  handleDeleteClick,
  buyProductName,
  filterOption,
}) => {
  return list.map((item) => (
    <BagProduct
      key={item.productId}
      id={item.productId}
      product_name={item.productName}
      product_image={item.productImage}
      original_price={item.originalPrice}
      sale_price={item.salePrice}
      handleBuyClick={handleBuyClick}
      handleDeleteClick={handleDeleteClick}
      buyProductName={buyProductName}
      filterOption={filterOption}
    />
  ));
};

export default BagProductList;
