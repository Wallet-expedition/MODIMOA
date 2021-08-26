import React from "react";

const BuyModalPresenter = ({
  handleCancelClick,
  handleUpClick,
  handleDownClick,
  handleConfirmClick,
  productName,
  number,
}) => {
  const BuyModal = ({ productName }) => {
    return (
      <article className="buy-modal-container">
        <div className="buy-modal-product-name">{productName}</div>
        <div className="buy-modal-title"> 수량 변경 및 삭제 </div>
        <div className="buy-modal-state">
          <div className="buy-modal-down" onClick={handleDownClick}>
            ↓
          </div>
          <div className="buy-modal-num">{number}</div>
          <div className="buy-modal-up" onClick={handleUpClick}>
            ↑
          </div>
        </div>
        <p className="buy-modal-description">
          * 수량을 0으로 하면 물품을 삭제할 수 있습니다.
        </p>
        <div className="buy-modal-btn">
          <div className="buy-modal-cancel" onClick={handleCancelClick}>
            취소
          </div>
          <div className="buy-modal-confirm" onClick={handleConfirmClick}>
            확인 
          </div>
        </div>
      </article>
    );
  };
  return <BuyModal productName={productName} />;
};

export default BuyModalPresenter;
