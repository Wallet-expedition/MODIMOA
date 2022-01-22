import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMyBagList } from "../../Store/Actions/productAction";
import { PURCHASE_OPTION } from "./Constant";

const useSetMyBagList = () => {
  const dispatch = useDispatch();

  const [wishList, setWishList] = useState([]);
  const [purchasedList, setPurchasedList] = useState([]);

  const setNextList = (nextList, willUpdateStatusProductId) => {
    const [nextWishList, nextPurchasedList] = nextList.reduce(
      ([wish, purchased], item) => {
        // 상태를 바꿔야 하는 품목만 상태 변경
        if (item.productId === willUpdateStatusProductId) {
          item.status =
            item.status === PURCHASE_OPTION.BEFORE_PURCHASE
              ? PURCHASE_OPTION.AFTER_PURCHASE
              : PURCHASE_OPTION.BEFORE_PURCHASE;
        }
        // 새로운 list반환
        return item.status === PURCHASE_OPTION.BEFORE_PURCHASE
          ? [[...wish, item], purchased]
          : [wish, [...purchased, item]];
      },
      [[], []]
    );
    setWishList(nextWishList);
    setPurchasedList(nextPurchasedList);
  };

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
        setNextList(nextMyBagList);
      }
    };
    getMyBagListFun();
  }, [dispatch]);

  return [wishList, purchasedList, setNextList];
};

export default useSetMyBagList;
