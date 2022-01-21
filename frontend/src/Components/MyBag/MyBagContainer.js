import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteWishProduct,
  getMyBagList,
} from "../../Store/Actions/productAction";
import MyBagPresenter from "./MyBagPresenter";
import { AFTER_PURCHASE, BEFORE_PURCHASE } from "../Util/Constant";

const MyBagContainer = ({ filterOption }) => {
  const dispatch = useDispatch();

  const [buyProductName, setBuyProductName] = useState("");
  const [selectedId, setSelectedId] = useState(-1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [, setMyBagList] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [purchasedList, setPurchasedList] = useState([]);

  /**
   * TODO
   * 구매 완료, 삭제 후 리스트 업데이트
   * 상품 구매 개수 비동기처리
   */
  const handleBuyClick = useCallback(async (event) => {
    const targetId = event.target.id;
    const words = targetId.split("&");
    const productId = words[0].substr(words[0].indexOf("=") + 1);
    const productName = words[2].substr(words[2].indexOf("=") + 1);
    setIsOpenModal(true);
    setSelectedId(productId);
    setBuyProductName(productName);
  }, []);

  const handleDeleteClick = useCallback(
    async (event) => {
      const targetId = event.target.id;
      const productId = targetId.split("&")[0].split("=")[1];
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
      const ans = confirm("정말로 삭제하시겠습니까?");
      if (ans) {
        const res = await dispatch(deleteWishProduct(productId));
        if (res.payload.status === 200) {
          setMyBagList((prevState) =>
            prevState.filter((item) => item.productId !== productId)
          );
          setWishList((prevState) =>
            prevState.filter((item) => item.productId !== productId)
          );
          alert("삭제가 완료되었습니다.");
        }
      }
    },
    [dispatch]
  );

  useEffect(() => {
    const getMyBagListFun = async () => {
      const res = await dispatch(getMyBagList());
      if (res.payload.status === 200) {
        const itemNumberList = res.payload.data;
        const nextMyBagList = itemNumberList.map((item) => {
          return {
            productId: item.product.productId,
            productName: item.product.productName,
            productImage: item.product.productImage,
            originalPrice: item.product.originalPrice,
            salePrice: item.product.salePrice,
            productCnt: item.count,
            status: item.status,
          };
        });
        setMyBagList(nextMyBagList);
        setPurchasedList(
          nextMyBagList.filter((item) => item.status === AFTER_PURCHASE)
        );
        setWishList(
          nextMyBagList.filter((item) => item.status === BEFORE_PURCHASE)
        );
      }
    };
    getMyBagListFun();
  }, [dispatch]);

  return (
    <MyBagPresenter
      wishList={wishList}
      purchasedList={purchasedList}
      filterOption={filterOption}
      isOpenModal={isOpenModal}
      handleBuyClick={handleBuyClick}
      handleDeleteClick={handleDeleteClick}
      setIsOpenModal={setIsOpenModal}
      selectedId={selectedId}
      buyProductName={buyProductName}
    />
  );
};

export default MyBagContainer;
