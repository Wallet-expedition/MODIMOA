import PurchasedBagProduct from "./PurchasedBagProduct";
import WishBagProduct from "./WishBagProduct";

const BagProductList = ({
  wishList,
  purchasedList,
  handleBuyClick,
  handleDeleteClick,
  filterOption,
}) => {
  return filterOption === 0
    ? wishList.map((item) => (
        <WishBagProduct
          key={item.productId}
          id={item.productId}
          product_name={item.productName}
          product_image={item.productImage}
          product_count={item.productCnt}
          sale_price={item.salePrice}
          handleBuyClick={handleBuyClick}
          handleDeleteClick={handleDeleteClick}
        />
      ))
    : purchasedList.map((item) => (
        <PurchasedBagProduct
          key={item.productId}
          product_name={item.productName}
          product_image={item.productImage}
          product_count={item.productCnt}
          sale_price={item.salePrice}
          original_price={item.originalPrice}
        />
      ));
};

export default BagProductList;
