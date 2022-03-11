import React from "react";

import ProductDetail from "../Components/ProductDetail";
import Layout from "../Components/Layout";
import Header from "../Components/Header";
import "../scss/ProductDetail.scss";
import HelmetComponent from "../Components/HelmetComponent";

const ProductDetailPage = () => {
  return (
    <Layout>
      <HelmetComponent subTitle="상품 상세" />
      <Header />
      <ProductDetail />
    </Layout>
  );
};

export default ProductDetailPage;
