import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeMyBagState } from "../../Store/Actions/productAction";
import BuyModalPresenter from "./BuyModalPresenter";

const BuyModalContainer = ({ setIsOpenModal, selectedId }) => {
  const [pastId, setPastId] = useState(selectedId);
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

  // 다른 상품의 구매를 눌렀을 경우 300ms정도 꺼졌다가 다시 켜짐으로써, Refresh됨을 명시.
  useEffect(() => {
    if (selectedId !== pastId) {
      setIsOpenModal(false);
      setTimeout(() => {
        setIsOpenModal(true);
        setPastId(selectedId);
      }, 300);
    }
  }, [pastId, selectedId, setIsOpenModal]);

  return (
    <BuyModalPresenter
      handleCancelClick={handleCancelClick}
      handleUpClick={handleUpClick}
      handleDownClick={handleDownClick}
      handleConfirmClick={handleConfirmClick}
      number={number}
    />
  );
};

export default BuyModalContainer;
