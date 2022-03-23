import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

import { getMyBagList } from "../Store/Actions/productAction";
import { PURCHASE_OPTION } from "../Util/Constant";

const useSetMyBagList = () => {
  const dispatch = useDispatch();

  const [wishList, setWishList] = useState([]);
  const [purchasedList, setPurchasedList] = useState([]);
  const [wishSaveMoney, setWishSaveMoney] = useState(0);
  const [savedMoney, setSavedMoney] = useState(0);

  const setMoney = (nextWishList, nextPurchasedList) => {
    const nextWishSaveMoney = nextWishList.reduce(
      (willSaved, item) =>
        willSaved +
        Number((item.originalPrice - item.salePrice) * item.productCnt),
      0
    );
    const nextSavedMoney = nextPurchasedList.reduce(
      (willSaved, item) =>
        willSaved +
        Number((item.originalPrice - item.salePrice) * item.productCnt),
      0
    );
    setWishSaveMoney(nextWishSaveMoney);
    setSavedMoney(nextSavedMoney);
  };

  const setNextList = useCallback((nextList) => {
    const [nextWishList, nextPurchasedList] = nextList.reduce(
      ([wish, purchased], item) => {
        // 새로운 list반환
        return item.status === PURCHASE_OPTION.BEFORE_PURCHASE
          ? [[...wish, item], purchased]
          : [wish, [...purchased, item]];
      },
      [[], []]
    );
    setWishList(nextWishList);
    setPurchasedList(nextPurchasedList);
    setMoney(nextWishList, nextPurchasedList);
  }, []);

  useEffect(() => {
    const getMyBagListFun = async () => {
      const res = await dispatch(getMyBagList());
      if (res.payload.status === 200) {
        const itemNumberList = res.payload.data;
        const nextMyBagList = itemNumberList.map((item) => {
          return {
            myBagId: item.id,
            productId: item.product.productId,
            productName: item.product.productName,
            productImage: item.product.productImage,
            originalPrice: item.product.originalPrice,
            salePrice: item.product.salePrice,
            productCnt: item.count,
            status: item.status,
          };
        });
        setNextList(nextMyBagList);
      }
    };
    getMyBagListFun();
  }, [dispatch, setNextList]);

  return { wishList, purchasedList, setNextList, wishSaveMoney, savedMoney };
};

export default useSetMyBagList;
