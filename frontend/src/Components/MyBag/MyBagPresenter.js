import React from "react";
import BuyModal from "./BuyModal";
import BagProductList from "./BagProductList";
import BagDescription from "./BagDescription";

const MyBagPresenter = ({
  wishList,
  purchasedList,
  setNextList,
  filterOption,
  handleBuyClick,
  isBuyModalOpen,
  setIsBuyModalOpen,
  selectedId,
  buyProductName,
  handleDeleteClick,
  isCntChange,
}) => {
  return (
    <main className="my-bag-container">
      <BagDescription filterOption={filterOption} />
      <BagProductList
        wishList={wishList}
        purchasedList={purchasedList}
        handleBuyClick={handleBuyClick}
        handleDeleteClick={handleDeleteClick}
        buyProductName={buyProductName}
        filterOption={filterOption}
      />

      {isBuyModalOpen && (
        <BuyModal
          isBuyModalOpen={isBuyModalOpen}
          setIsBuyModalOpen={setIsBuyModalOpen}
          selectedId={selectedId}
          buyProductName={buyProductName}
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
