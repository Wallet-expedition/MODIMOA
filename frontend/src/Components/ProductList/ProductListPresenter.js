import React from "react";

import Product from "../Product";
import Loading from "../Loading";

const ProductListPresenter = ({ list, listComponent, isLoading }) => {
  return (
    <main className="product-list-container-container">
      <div className="product-list-container" ref={listComponent}>
        {list.map((item) => {
          return (
            <Product
              key={item.productId}
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
      {isLoading && <Loading />}
    </main>
  );
};

export default ProductListPresenter;
