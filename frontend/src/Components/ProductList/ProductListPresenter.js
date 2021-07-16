import React from "react";
import Product from "../Product";

const ProductListPresenter = ({ list }) => {
  return (
    <div className="product-list-container">
      {list.map((item) => {
        return (
          <Product
            id={item.product_id}
            mart_name={item.mart_name}
            product_name={item.product_name}
            product_image={item.product_image}
            original_price={item.original_price}
            sale_price={item.sale_price}
          />
        );
      })}
    </div>
  );
};

export default ProductListPresenter;
