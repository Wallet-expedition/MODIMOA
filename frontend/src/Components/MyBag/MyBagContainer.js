import React, { useState } from "react";
import { SampleList } from "../Util/SampleList";
import MyBagPresenter from "./MyBagPresenter";

const MyBagContainer = ({ filterOption }) => {
  const [selectedId, setSelectedId] = useState(-1);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleBuyClick = async (event) => {
    setIsOpenModal(true);
    setSelectedId(event.target.id);
  };

  return (
    <MyBagPresenter
      list={SampleList}
      filterOption={filterOption}
      isOpenModal={isOpenModal}
      handleBuyClick={handleBuyClick}
      setIsOpenModal={setIsOpenModal}
      selectedId={selectedId}
    />
  );
};

export default MyBagContainer;
