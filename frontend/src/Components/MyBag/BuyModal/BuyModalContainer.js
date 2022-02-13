import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  changeMyBagCnt,
  changeMyBagState,
} from "../../../Store/Actions/productAction";
import BuyModalPresenter from "./BuyModalPresenter";
import { PURCHASE_OPTION } from "../../Util/Constant";

const BuyModalContainer = ({
  isBuyModalOpen,
  setIsBuyModalOpen,
  selectedId,
  buyProductName,
  wishList,
  purchasedList,
  setNextList,
  isCntChange,
}) => {
  const [productName, setProductName] = useState("");
  const [number, setNumber] = useState(1);
  const dispatch = useDispatch();

  const handleCancelClick = useCallback(
    (event) => {
      event.preventDefault();
      setIsBuyModalOpen(false);
    },
    [setIsBuyModalOpen]
  );

  const handleUpClick = useCallback((event) => {
    event.preventDefault();
    setNumber((v) => v + 1);
  }, []);

  const handleDownClick = useCallback(
    (event) => {
      event.preventDefault();
      if (number === 0) return;
      setNumber((v) => v - 1);
    },
    [number]
  );

  const handleConfirmClick = useCallback(async () => {
    const cntBody = {
      count: number,
    };
    const changeCntRes = await dispatch(changeMyBagCnt(selectedId, cntBody));
    if (!isCntChange && changeCntRes.payload.status === 200) {
      const stateBody = {
        status: PURCHASE_OPTION.AFTER_PURCHASE,
      };
      const res = await dispatch(changeMyBagState(selectedId, stateBody));
      /**
       * TODO
       * React Toastify 적용
       */
      if (res.payload.status === 200) {
        const nextList = [...wishList, ...purchasedList];
        setNextList(nextList, parseInt(selectedId));
        alert("구매가 완료되었습니다.");
      }
    }
    setIsBuyModalOpen(false);
  }, [
    dispatch,
    isCntChange,
    number,
    purchasedList,
    selectedId,
    setIsBuyModalOpen,
    setNextList,
    wishList,
  ]);

  useEffect(() => {
    setProductName(buyProductName);
  }, [buyProductName]);

  return (
    <BuyModalPresenter
      isBuyModalOpen={isBuyModalOpen}
      handleCancelClick={handleCancelClick}
      handleUpClick={handleUpClick}
      handleDownClick={handleDownClick}
      handleConfirmClick={handleConfirmClick}
      number={number}
      productName={productName}
      isCntChange={isCntChange}
    />
  );
};

export default BuyModalContainer;
