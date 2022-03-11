import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  changeMyBagCnt,
  changeMyBagState,
  selectProduct,
} from "../../../Store/Actions/productAction";
import BuyModalPresenter from "./BuyModalPresenter";
import { PURCHASE_OPTION } from "../../Util/Constant";
import getUpdatedNextList from "../../Util/GetUpdatedNextList";

const BuyModalContainer = ({
  isBuyModalOpen,
  setIsBuyModalOpen,
  wishList,
  purchasedList,
  setNextList,
  isCntChange,
}) => {
  const dispatch = useDispatch();
  const item = useSelector((state) => state.productReducer.product);

  const handleCancelClick = useCallback(
    (event) => {
      event.preventDefault();
      setIsBuyModalOpen(false);
    },
    [setIsBuyModalOpen]
  );

  const handleUpClick = useCallback(
    (event) => {
      event.preventDefault();
      const nextProduct = { ...item, productCnt: item.productCnt + 1 };
      dispatch(selectProduct(nextProduct));
    },
    [dispatch, item]
  );

  const handleDownClick = useCallback(
    (event) => {
      event.preventDefault();
      if (item.productCnt === 0) return;
      const nextProduct = { ...item, productCnt: item.productCnt - 1 };
      dispatch(selectProduct(nextProduct));
    },
    [dispatch, item]
  );

  const handleConfirmClick = useCallback(async () => {
    const { myBagId } = item;
    const cntBody = {
      count: item.productCnt,
    };
    const changeCntRes = await dispatch(changeMyBagCnt(myBagId, cntBody));
    if (!isCntChange && changeCntRes.payload.status === 200) {
      const stateBody = {
        status: PURCHASE_OPTION.AFTER_PURCHASE,
      };
      const res = await dispatch(changeMyBagState(myBagId, stateBody));
      /**
       * TODO
       * React Toastify 적용
       */
      if (res.payload.status === 200) {
        alert("구매가 완료되었습니다.");
      }
    }

    // update entire list
    const nextStatus = isCntChange
      ? PURCHASE_OPTION.BEFORE_PURCHASE
      : PURCHASE_OPTION.AFTER_PURCHASE;
    const nextList = getUpdatedNextList(
      wishList,
      purchasedList,
      myBagId,
      nextStatus,
      item.productCnt
    );
    setNextList(nextList);
    setIsBuyModalOpen(false);
  }, [
    dispatch,
    isCntChange,
    item,
    purchasedList,
    setIsBuyModalOpen,
    setNextList,
    wishList,
  ]);

  return (
    <BuyModalPresenter
      isBuyModalOpen={isBuyModalOpen}
      handleCancelClick={handleCancelClick}
      handleUpClick={handleUpClick}
      handleDownClick={handleDownClick}
      handleConfirmClick={handleConfirmClick}
      item={item}
      isCntChange={isCntChange}
    />
  );
};

export default BuyModalContainer;
