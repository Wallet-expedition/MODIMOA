import React from "react";
import Product from "../Product";

const ProductListPresenter = ({ list }) => {
  return (
    <div className="product-list-container">
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
  );
};

export default ProductListPresenter;
