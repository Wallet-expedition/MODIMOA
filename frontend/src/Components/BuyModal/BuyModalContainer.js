import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeMyBagState } from "../../Store/Actions/productAction";
import BuyModalPresenter from "./BuyModalPresenter";

const BuyModalContainer = ({ setIsOpenModal, selectedId, buyProductName }) => {
  const [productName, setProductName] = useState("");
  const [number, setNumber] = useState(1);
  const dispatch = useDispatch();

  const handleCancelClick = (event) => {
    event.preventDefault();
    setIsOpenModal(false);
  };

  const handleUpClick = (event) => {
    event.preventDefault();
    setNumber(number + 1);
  };

  const handleDownClick = (event) => {
    event.preventDefault();
    if (number === 0) return;
    setNumber(number - 1);
  };

  const handleConfirmClick = async () => {
    const res = await dispatch(changeMyBagState(selectedId));

    console.log(res);
    setIsOpenModal(false);
  };

  useEffect(() => {
    setProductName(buyProductName);
    console.log(buyProductName);
  }, [buyProductName]);

  return (
    <BuyModalPresenter
      handleCancelClick={handleCancelClick}
      handleUpClick={handleUpClick}
      handleDownClick={handleDownClick}
      handleConfirmClick={handleConfirmClick}
      number={number}
      productName={productName}
    />
  );
};

export default BuyModalContainer;
