import React from "react";
import BuyModal from "../BuyModal";
import BagProductList from "./BagProductList";
import BagDescription from "./BagDescription";

const MyBagPresenter = ({
  list,
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
      {!filterOption && <BagDescription />}
      <BagProductList
        list={list}
        handleBuyClick={handleBuyClick}
        handleDeleteClick={handleDeleteClick}
        buyProductName={buyProductName}
        filterOption={filterOption}
      />

      {isOpenModal && (
        <BuyModal
          setIsOpenModal={setIsOpenModal}
          selectedId={selectedId}
          buyProductName={buyProductName}
        />
      )}
    </main>
  );
};

export default MyBagPresenter;
