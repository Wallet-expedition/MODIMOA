import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import ProductListPresenter from "./ProductListPresenter";
import { SampleList } from "../Util/SampleList";
// import { getProductList } from "../../Store/Actions/productAction";

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

  return <ProductListPresenter list={SampleList} />;
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
