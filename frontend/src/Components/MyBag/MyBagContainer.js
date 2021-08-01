import React, { useState } from "react";
import { SampleList } from "../Util/SampleList";
import MyBagPresenter from "./MyBagPresenter";

const MyBagContainer = ({ filterOption }) => {
  const [buyProductName, setBuyProductName] = useState("");
  const [selectedId, setSelectedId] = useState(-1);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleBuyClick = async (event) => {
    const targetId = event.target.id;
    const productId = targetId.split("&")[0].split("=")[1];
    const productName = targetId.split("&")[1].split("=")[1];
    setIsOpenModal(true);
    setSelectedId(productId);
    setBuyProductName(productName);
  };

  return (
    <MyBagPresenter
      list={SampleList}
      filterOption={filterOption}
      isOpenModal={isOpenModal}
      handleBuyClick={handleBuyClick}
      setIsOpenModal={setIsOpenModal}
      selectedId={selectedId}
      buyProductName={buyProductName}
    />
  );
};

export default MyBagContainer;
