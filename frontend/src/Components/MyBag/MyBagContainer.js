import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteWishProduct } from "../../Store/Actions/productAction";
import { SampleList } from "../Util/SampleList";
import MyBagPresenter from "./MyBagPresenter";

const MyBagContainer = ({ filterOption }) => {
  const dispatch = useDispatch();

  const [buyProductName, setBuyProductName] = useState("");
  const [selectedId, setSelectedId] = useState(-1);
  const [isOpenModal, setIsOpenModal] = useState(false);

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
        const res = dispatch(deleteWishProduct(productId));
        if (res.payload.success) {
          alert("삭제가 완료되었습니다.");
        }
      }
    },
    [dispatch]
  );

  return (
    <MyBagPresenter
      list={SampleList}
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
