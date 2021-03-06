import { Helmet } from "react-helmet-async";

const HelmetPresenter = ({ subTitle }) => {
  return (
    <Helmet prioritizeSeoTags>
      <title>모디모아 | {subTitle}</title>
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://modimoa.ga" />
      <meta property="og:title" content={`모디모아 | ${subTitle}`} />
      <meta
        property="og:image"
        content="https://user-images.githubusercontent.com/43488305/159152859-10567fdd-e455-4654-857a-43d03dcb95b1.png"
      />
      <meta property="og:description" content="편의점 할인 정보 모아보기" />
      <meta property="og:site_name" content="모디모아" />
      <meta property="og:locale" content="ko_KR" />
    </Helmet>
  );
};

export default HelmetPresenter;
