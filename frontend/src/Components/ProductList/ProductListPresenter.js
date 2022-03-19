import React from "react";

import Product from "../Product";
import Loading from "../Loading";

const ProductListPresenter = ({ list, listComponent, isSpinnerActive }) => {
  return (
    <main className="product-list-container-container">
      <div className="product-list-container" ref={listComponent}>
        <div className="product-list">
          {list.map((item, idx) => {
            return (
              <Product
                key={idx}
                id={item.productId}
                mart_name={item.martName}
                product_name={item.productName}
                product_image={item.productImage}
                original_price={item.originalPrice}
                sale_price={item.salePrice}
              />
            );
          })}
        </div>
      </div>
      {isSpinnerActive && <Loading />}
    </main>
  );
};

export default ProductListPresenter;
