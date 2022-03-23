import NoData from "../NoData";
import BagProduct from "./BagProduct";
import { PURCHASE_OPTION } from "../../Util/Constant";

const MyBagProductList = ({
  list,
  filterOption,
  handleBuyClick,
  handleDeleteClick,
}) => {
  return (
    <div className="my-bag-product-list-container">
      {list.map((item) => (
        <BagProduct
          key={item.myBagId}
          id={item.myBagId}
          item={item}
          handleBuyClick={handleBuyClick}
          handleDeleteClick={handleDeleteClick}
          isWishDisplay={filterOption === PURCHASE_OPTION.BEFORE_PURCHASE}
        />
      ))}
    </div>
  );
};

const BagProductList = ({
  list,
  handleBuyClick,
  handleDeleteClick,
  filterOption,
}) => {
  return (
    <div className="my-bag-product-list-container-container">
      {list.length === 0 ? (
        <NoData />
      ) : (
        <MyBagProductList
          list={list}
          handleBuyClick={handleBuyClick}
          handleDeleteClick={handleDeleteClick}
          filterOption={filterOption}
        />
      )}
    </div>
  );
};

export default BagProductList;
