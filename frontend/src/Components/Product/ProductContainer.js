import React from "react";
import ProductPresenter from "./ProductPresenter";

const ProductContainer = ({
  id,
  mart_name,
  product_name,
  product_image,
  original_price,
  sale_price,
}) => {
  return (
    <ProductPresenter
      id={id}
      mart_name={mart_name}
      product_name={product_name}
      product_image={product_image}
      original_price={original_price}
      sale_price={sale_price}
    />
  );
};

export default ProductContainer;
