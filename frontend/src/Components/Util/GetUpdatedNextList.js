import { PURCHASE_OPTION } from "./Constant";

const getUpdatedNextList = (
  wishList,
  purchasedList,
  myBagId,
  status = PURCHASE_OPTION.BEFORE_PURCHASE,
  productCnt = 0
) => {
  const nextList = [...wishList, ...purchasedList];
  const indexToUpdate = nextList.findIndex((item) => item.myBagId === myBagId);
  nextList[indexToUpdate] = {
    ...nextList[indexToUpdate],
    status,
    productCnt,
  };

  return nextList;
};

export default getUpdatedNextList;
