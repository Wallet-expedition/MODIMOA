import React from "react";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

import addComma from "../../../Util/AddComma";

const BuyModalPresenter = ({
  isBuyModalOpen,
  handleCancelClick,
  handleConfirmClick,
  handleUpClick,
  handleDownClick,
  item,
  isCntChange,
}) => {
  const profit = (item.originalPrice - item.salePrice) * item.productCnt;
  return (
    <Modal
      open={isBuyModalOpen}
      onClose={handleCancelClick}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="buy-modal-container">
        <header className="buy-modal-product-name">{item.productName}</header>
        <div className="buy-modal-info">
          <div className="buy-modal-info-left">
            <div className="buy-modal-label">원가</div>
            <del className="buy-modal-origin-price">
              {addComma(item.originalPrice)}원
            </del>
          </div>
          <div className="buy-modal-info-right">
            <div className="buy-modal-label">할인가</div>
            <div className="buy-modal-sale-price">
              {addComma(item.salePrice)}원
            </div>
          </div>
        </div>
        <div className="buy-modal-quantity">
          <div className="buy-modal-quantity-left">
            <div className="buy-modal-quantity-title">수량</div>
            <div className="buy-modal-quantity-box">
              <button className="buy-modal-plusminus" onClick={handleDownClick}>
                -
              </button>
              <span className="buy-modal-cnt">{item.productCnt}</span>
              <button className="buy-modal-plusminus" onClick={handleUpClick}>
                +
              </button>
            </div>
          </div>
          <div className="buy-modal-profit">{addComma(profit)}원 이득</div>
        </div>
        <div className="buy-modal-btns">
          <Button
            variant="outlined"
            className="buy-modal-cancel"
            color="secondary"
            onClick={handleCancelClick}
          >
            취소하기
          </Button>
          <Button
            variant="contained"
            className="buy-modal-confirm"
            color="primary"
            onClick={handleConfirmClick}
          >
            {isCntChange ? "수량변경" : "구매하기"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default BuyModalPresenter;
