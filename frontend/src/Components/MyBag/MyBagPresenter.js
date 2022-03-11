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
  isBuyModalOpen,
  setIsBuyModalOpen,
  handleDeleteClick,
  isCntChange,
}) => {
  const list =
    filterOption === PURCHASE_OPTION.BEFORE_PURCHASE ? wishList : purchasedList;
  return (
    <main className="my-bag-container">
      <BagDescription filterOption={filterOption} />
      <BagProductList
        list={list}
        handleBuyClick={handleBuyClick}
        handleDeleteClick={handleDeleteClick}
        filterOption={filterOption}
      />

      {isBuyModalOpen && (
        <BuyModal
          isBuyModalOpen={isBuyModalOpen}
          setIsBuyModalOpen={setIsBuyModalOpen}
          wishList={wishList}
          purchasedList={purchasedList}
          setNextList={setNextList}
          isCntChange={isCntChange}
        />
      )}
    </main>
  );
};

export default MyBagPresenter;
