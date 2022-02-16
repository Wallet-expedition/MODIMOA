import { PURCHASE_OPTION } from "./Constant";

const deleteMyBagProduct = (list, myBagId) => {
  const nextList = list.filter((item) => item.myBagId !== myBagId);

  return nextList;
};

const getUpdatedNextList = (
  wishList,
  purchasedList,
  myBagId,
  status,
  productCnt
) => {
  const nextList = [...wishList, ...purchasedList];
  // if delete purchase, return list filtered with myBagId
  if (status === PURCHASE_OPTION.DELETE_PURCHASE) {
    return deleteMyBagProduct(nextList, myBagId);
  }
  const indexToUpdate = nextList.findIndex((item) => item.myBagId === myBagId);
  nextList[indexToUpdate] = {
    ...nextList[indexToUpdate],
    status,
    productCnt,
  };

  return nextList;
};

export default getUpdatedNextList;
