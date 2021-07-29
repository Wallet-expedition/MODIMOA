import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import ProductListPresenter from "./ProductListPresenter";
// import { getProductList } from "../../Store/Actions/productAction";

/* sample data*/
const Samplelist = [
  {
    productId: 1,
    martName: "SEVEN11",
    productName: "르구르망)오레오밀크스낵30g",
    productImage:
      "https://www.7-eleven.co.kr/upload/product/0000090/426278.1.jpg",
    originalPrice: 2000,
    salePrice: 1000,
    sale_start_day: "2021-7-1",
    sale_end_day: "2021-7-31",
    sale_category: "OnePlusOne",
    gift_name: "",
    gift_image: "",
    gift_price: "",
    created_day: "2021-7-5",
  },
  {
    productId: 2,
    martName: "CU",
    productName: "제니코)스모크스트링치즈24g",
    productImage:
      "https://www.7-eleven.co.kr/upload/product/8809136/850150.1.jpg",
    originalPrice: 1400,
    salePrice: 700,
    sale_start_day: "2021-7-1",
    sale_end_day: "2021-7-31",
    sale_category: "OnePlusOne",
    gift_name: "",
    gift_image: "",
    gift_price: "",
    created_day: "2021-7-5",
  },
  {
    productId: 3,
    martName: "EMART24",
    productName: "롯데푸드)요구하이145ml",
    productImage:
      "https://www.7-eleven.co.kr/upload/product/8801207/141228.1.jpg",
    originalPrice: 1000,
    salePrice: 500,
    sale_start_day: "2021-7-1",
    sale_end_day: "2021-7-31",
    sale_category: "OnePlusOne",
    gift_name: "",
    gift_image: "",
    gift_price: "",
    created_day: "2021-7-5",
  },
  {
    productId: 4,
    martName: "GS25",
    productName: "빙그레)닥터캡슐플레인130ml",
    productImage:
      "https://www.7-eleven.co.kr/upload/product/8801104/302739.1.jpg",
    originalPrice: 1800,
    salePrice: 900,
    sale_start_day: "2021-7-1",
    sale_end_day: "2021-7-31",
    sale_category: "OnePlusOne",
    gift_name: "",
    gift_image: "",
    gift_price: "",
    created_day: "2021-7-5",
  },
  {
    productId: 5,
    martName: "SEVEN11",
    productName: "프룻프룻)자몽에이드300ml",
    productImage:
      "https://www.7-eleven.co.kr/upload/product/8809350/885884.1.jpg",
    originalPrice: 2000,
    salePrice: 1000,
    sale_start_day: "2021-7-1",
    sale_end_day: "2021-7-31",
    sale_category: "OnePlusOne",
    gift_name: "",
    gift_image: "",
    gift_price: "",
    created_day: "2021-7-5",
  },
  {
    productId: 6,
    martName: "SEVEN11",
    productName: "프룻프룻)망고에이드300ml",
    productImage:
      "https://www.7-eleven.co.kr/upload/product/8809350/885877.1.jpg",
    originalPrice: 2000,
    salePrice: 1000,
    sale_start_day: "2021-7-1",
    sale_end_day: "2021-7-31",
    sale_category: "OnePlusOne",
    gift_name: "",
    gift_image: "",
    gift_price: "",
    created_day: "2021-7-5",
  },
  {
    productId: 7,
    martName: "SEVEN11",
    productName: "커피그루브)아메리카노오리지널2",
    productImage:
      "https://www.7-eleven.co.kr/upload/product/8809350/888342.1.jpg",
    originalPrice: 2200,
    salePrice: 1100,
    sale_start_day: "2021-7-1",
    sale_end_day: "2021-7-31",
    sale_category: "OnePlusOne",
    gift_name: "",
    gift_image: "",
    gift_price: "",
    created_day: "2021-7-5",
  },
  {
    productId: 8,
    martName: "SEVEN11",
    productName: "커피그루브)아메리카노마일드280",
    productImage:
      "https://www.7-eleven.co.kr/upload/product/8809350/888359.1.jpg",
    originalPrice: 2200,
    salePrice: 1100,
    sale_start_day: "2021-7-1",
    sale_end_day: "2021-7-31",
    sale_category: "OnePlusOne",
    gift_name: "",
    gift_image: "",
    gift_price: "",
    created_day: "2021-7-5",
  },
  {
    productId: 9,
    martName: "SEVEN11",
    productName: "빙그레)닥터캡슐사과130ml",
    productImage:
      "https://www.7-eleven.co.kr/upload/product/8801104/665421.1.jpg",
    originalPrice: 1800,
    salePrice: 900,
    sale_start_day: "2021-7-1",
    sale_end_day: "2021-7-31",
    sale_category: "OnePlusOne",
    gift_name: "",
    gift_image: "",
    gift_price: "",
    created_day: "2021-7-5",
  },
  {
    productId: 10,
    martName: "SEVEN11",
    productName: "남양)채움오렌지210ml",
    productImage:
      "https://www.7-eleven.co.kr/upload/product/8801069/412283.1.jpg",
    originalPrice: 1900,
    salePrice: 950,
    sale_start_day: "2021-7-1",
    sale_end_day: "2021-7-31",
    sale_category: "OnePlusOne",
    gift_name: "",
    gift_image: "",
    gift_price: "",
    created_day: "2021-7-5",
  },
];

const ProductListContainer = ({ martList, searchKeyword, sortOption }) => {
  const [list, setList] = useState([]);
  const [isLoadFinish, setIsLoadFinish] = useState(false);
  const currentPage = useRef(0);
  const dispatch = useDispatch();

  const getProductList = async () => {
    if (isLoadFinish) return;
    const filter = sortOption === 0 ? "salePrice" : "productName";
    const res = await dispatch(
      getProductList(martList, searchKeyword, currentPage.current, filter)
    );
    console.log(res.data);
    currentPage.current++;
    if (res.data.last === true) {
      setIsLoadFinish(true);
    }
    setList([...list, res.data.content]);
  };

  // useEffect(() => {
  //   getProductList();
  // }, []);

  return <ProductListPresenter list={Samplelist} />;
};

export default ProductListContainer;

/*
{
    "content": [
        {
            "createdDate": "2021-07-05T00:00:00",
            "productId": 60,
            "martName": "GS25",
            "productName": "고품격)안창살구이300G(냉동)",
            "productImage": "http://gs25appimg.gsretail.com/imgsvr/item/GD_8809152412547_002.jpg",
            "originalPrice": 9900,
            "salePrice": 6600,
            "saleStartDay": "2021-07-01",
            "saleEndDay": "2021-07-31",
            "saleCategory": "TwoPlusOne",
            "giftName": "",
            "giftImage": "",
            "giftPrice": 0
        },
        {
            "createdDate": "2021-07-05T00:00:00",
            "productId": 61,
            "martName": "GS25",
            "productName": "고품격)토시살구이300G(냉동)",
            "productImage": "http://gs25appimg.gsretail.com/imgsvr/item/GD_8809152412578_002.jpg",
            "originalPrice": 9900,
            "salePrice": 6600,
            "saleStartDay": "2021-07-01",
            "saleEndDay": "2021-07-31",
            "saleCategory": "TwoPlusOne",
            "giftName": "",
            "giftImage": "",
            "giftPrice": 0
        }
    ],
    "pageable": {
        "sort": {
            "sorted": true,
            "unsorted": false,
            "empty": false
        },
        "pageSize": 20,
        "pageNumber": 0,
        "offset": 0,
        "paged": true,
        "unpaged": false
    },
    "totalElements": 2,
    "last": true,
    "totalPages": 1,
    "sort": {
        "sorted": true,
        "unsorted": false,
        "empty": false
    },
    "numberOfElements": 2,
    "first": true,
    "number": 0,
    "size": 20,
    "empty": false
}
*/
