import { PURCHASE_OPTION } from "../Util/Constant";
import BagProduct from "./BagProduct";

const BagProductList = ({
  list,
  handleBuyClick,
  handleDeleteClick,
  filterOption,
}) => {
  return list.map((item) => (
    <BagProduct
      key={item.myBagId}
      id={item.myBagId}
      item={item}
      handleBuyClick={handleBuyClick}
      handleDeleteClick={handleDeleteClick}
      isWishDisplay={filterOption === PURCHASE_OPTION.BEFORE_PURCHASE}
    />
  ));
};

export default BagProductList;
