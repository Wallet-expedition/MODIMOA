import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import { useDispatch } from "react-redux";
import ProductListPresenter from "./ProductListPresenter";
import { SampleList } from "../Util/SampleList";
import { getProductList } from "../../Store/Actions/productAction";
import { throttle } from "../Util/Throttle";

const ProductListContainer = ({ martList, searchKeyword, sortOption }) => {
  const [list, setList] = useState([]);
  const [isLoadFinish, setIsLoadFinish] = useState(false);
  const currentPage = useRef(0);
  const listComponent = useRef(0);
  const martCode = useRef("");
  const dispatch = useDispatch();

  const getList = async () => {
    if (isLoadFinish) return; // 상품 마지막 페이지에 도착했을 경우
    const filter = sortOption === 1 ? "salePrice" : "productName";
    const res = await dispatch(
      getProductList(
        martCode.current,
        searchKeyword,
        currentPage.current,
        filter
      )
    );
    setList([...list, res.a]);
    currentPage.current++;

    // 페이지의 끝에 도달했을 경우 더이상 물품을 받을 수 없다.
    if (res.payload.last) {
      setIsLoadFinish(true);
    }
  };

  const checkScroll = () => {
    const scrollHeight = listComponent.current.scrollHeight;
    const scrollTop = listComponent.current.scrollTop;
    const clientHeight = listComponent.current.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      console.log("more data");
      getList();
    }
  };

  const handleScroll = throttle(checkScroll, 500);

  useEffect(() => {
    listComponent.current.addEventListener("scroll", handleScroll);
    return () => {
      listComponent?.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // setMartCode before render
  useEffect(() => {
    const tempMartCode = Object.values(martList)
      .map((flag) => {
        return flag === true ? "1" : "0";
      })
      .join("");
    martCode.current = tempMartCode;
    currentPage.current = 0;
  }, [martCode, martList]);

  return (
    <ProductListPresenter list={SampleList} listComponent={listComponent} />
  );
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
