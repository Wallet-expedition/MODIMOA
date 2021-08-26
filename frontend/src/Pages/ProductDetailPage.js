import React from "react";

import ProductDetail from "../Components/ProductDetail";
import Layout from "../Components/Layout";

import "../scss/ProductDetail.scss";
import HelmetComponent from "../Components/HelmetComponent";

const ProductDetailPage = () => {
  return (
    <Layout>
      <HelmetComponent subTitle={"상품 상세"} />
      <ProductDetail />
    </Layout>
  );
};

export default ProductDetailPage;
