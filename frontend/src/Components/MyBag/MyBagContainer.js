import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteWishProduct,
  selectProduct,
} from "../../Store/Actions/productAction";
import MyBagPresenter from "./MyBagPresenter";
import getUpdatedNextList from "../Util/GetUpdatedNextList";
import { PURCHASE_OPTION } from "../Util/Constant";

const MyBagContainer = ({
  filterOption,
  wishList,
  purchasedList,
  setNextList,
}) => {
  const dispatch = useDispatch();

  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isCntChange, setIsCntChange] = useState(false);

  const handleBuyClick = useCallback(
    async (event) => {
      const targetId = event.currentTarget.id;
      const item = wishList.find((item) => item.myBagId === Number(targetId));

      // if SettingsIcon Clicked
      const nextIsCntChange = event.currentTarget.tagName === "svg";
      setIsCntChange(nextIsCntChange);

      setIsBuyModalOpen(true);
      dispatch(selectProduct(item));
    },
    [dispatch, wishList]
  );

  const handleDeleteClick = useCallback(
    async (event) => {
      const targetId = event.target.id;
      const item = [...wishList, ...purchasedList].find(
        (item) => item.myBagId === Number(targetId)
      );
      /**
       * TODO #1
       * 정말로 삭제하시겠습니까?(React Toastify)
       * YES -> 삭제
       * NO -> 삭제 X
       *
       * TODO #2
       * 삭제가 완료되었습니다.(React Toastify)
       * */
      // eslint-disable-next-line no-restricted-globals
      const ans = confirm(`${item.productName} 정말로 삭제하시겠습니까?`);
      if (ans) {
        const res = await dispatch(deleteWishProduct(item.myBagId));
        if (res.payload.status === 200) {
          const nextList = getUpdatedNextList(
            wishList,
            purchasedList,
            item.myBagId,
            PURCHASE_OPTION.DELETE_PURCHASE
          );
          setNextList(nextList);
          alert(`${item.productName} 삭제가 완료되었습니다.`);
        }
      }
    },
    [dispatch, purchasedList, setNextList, wishList]
  );

  return (
    <MyBagPresenter
      wishList={wishList}
      purchasedList={purchasedList}
      setNextList={setNextList}
      filterOption={filterOption}
      isBuyModalOpen={isBuyModalOpen}
      handleBuyClick={handleBuyClick}
      handleDeleteClick={handleDeleteClick}
      setIsBuyModalOpen={setIsBuyModalOpen}
      isCntChange={isCntChange}
    />
  );
};

export default MyBagContainer;
