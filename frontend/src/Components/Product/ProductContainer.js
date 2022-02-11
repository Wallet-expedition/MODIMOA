import React, { useCallback } from "react";
import ProductPresenter from "./ProductPresenter";

const ProductContainer = ({
  id,
  mart_name,
  product_name,
  product_image,
  original_price,
  sale_price,
}) => {
  const handleImageError = useCallback((e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "/img/logo_beer_256.png";
  }, []);

  return (
    <ProductPresenter
      id={id}
      mart_name={mart_name}
      product_name={product_name}
      product_image={product_image}
      original_price={original_price}
      sale_price={sale_price}
      handleImageError={handleImageError}
    />
  );
};

export default ProductContainer;
