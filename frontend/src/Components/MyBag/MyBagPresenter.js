import React from "react";
import BuyModal from "./BuyModal";
import BagProductList from "./BagProductList";
import BagDescription from "./BagDescription";
import { PURCHASE_OPTION } from "../Util/Constant";

const MyBagPresenter = ({
  wishList,
  purchasedList,
  setNextList,
  filterOption,
  handleBuyClick,
  isOpenModal,
  setIsOpenModal,
  selectedId,
  buyProductName,
  handleDeleteClick,
}) => {
  return (
    <main className="my-bag-container">
      {filterOption === PURCHASE_OPTION.BEFORE_PURCHASE && <BagDescription />}
      <BagProductList
        wishList={wishList}
        purchasedList={purchasedList}
        handleBuyClick={handleBuyClick}
        handleDeleteClick={handleDeleteClick}
        buyProductName={buyProductName}
        filterOption={filterOption}
      />

      {isOpenModal && (
        <BuyModal
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          selectedId={selectedId}
          buyProductName={buyProductName}
          wishList={wishList}
          purchasedList={purchasedList}
          setNextList={setNextList}
        />
      )}
    </main>
  );
};

export default MyBagPresenter;
