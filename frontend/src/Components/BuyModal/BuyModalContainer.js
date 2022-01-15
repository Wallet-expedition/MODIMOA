import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeMyBagState } from "../../Store/Actions/productAction";
import BuyModalPresenter from "./BuyModalPresenter";

const BuyModalContainer = ({ setIsOpenModal, selectedId, buyProductName }) => {
  const [productName, setProductName] = useState("");
  const [number, setNumber] = useState(1);
  const dispatch = useDispatch();

  const handleCancelClick = useCallback(
    (event) => {
      event.preventDefault();
      setIsOpenModal(false);
    },
    [setIsOpenModal]
  );

  const handleUpClick = useCallback(
    (event) => {
      event.preventDefault();
      setNumber(number + 1);
    },
    [number]
  );

  const handleDownClick = useCallback(
    (event) => {
      event.preventDefault();
      if (number === 0) return;
      setNumber(number - 1);
    },
    [number]
  );

  const handleConfirmClick = useCallback(async () => {
    await dispatch(changeMyBagState(selectedId));
    setIsOpenModal(false);
  }, [dispatch, selectedId, setIsOpenModal]);

  useEffect(() => {
    setProductName(buyProductName);
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
