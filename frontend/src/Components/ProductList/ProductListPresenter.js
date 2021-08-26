import React from "react";
import Product from "../Product";

const ProductListPresenter = ({ list, listComponent }) => {
  return (
    <article className="product-list-container" ref={listComponent}>
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
    </article>
  );
};

export default ProductListPresenter;
