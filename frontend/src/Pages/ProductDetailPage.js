import React from "react";

import ProductDetail from "../Components/ProductDetail";
import Layout from "../Components/Layout";
import Header from "../Components/Header";

import "../scss/ProductDetail.scss";

const ProductDetailPage = () => {
  return (
    <Layout>
      <Header />
      <ProductDetail />
    </Layout>
  );
};

export default ProductDetailPage;
