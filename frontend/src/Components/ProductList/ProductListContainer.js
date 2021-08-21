import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import ProductListPresenter from "./ProductListPresenter";
import { SampleList } from "../Util/SampleList";
import { getProductList } from "../../Store/Actions/productAction";
import { throttle } from "../Util/Throttle";

const ProductListContainer = ({ martList, searchKeyword, sortOption }) => {
  const [list, setList] = useState([]);
  const [isLoadFinish, setIsLoadFinish] = useState(false);
  const [lastPage, setLastPage] = useState(100);
  const currentPage = useRef(0);
  const listComponent = useRef(0);
  const martCode = useRef("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getList = async () => {
      if (currentPage.current >= lastPage) return;
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
      const data = res.payload.data;
      if (res.payload.status === 200) {
        setList([...list, ...data.content]);
        currentPage.current++;

        if (currentPage.current >= lastPage) {
          setIsLoadFinish(true);
        }
        setLastPage(data.totalPages);
      }
    };

    const checkScroll = () => {
      const scrollHeight = listComponent.current.scrollHeight;
      const scrollTop = listComponent.current.scrollTop;
      const clientHeight = listComponent.current.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight) {
        if (!isLoadFinish) {
          getList();
        }
      }
    };

    const handleScroll = throttle(checkScroll, 500);

    listComponent.current.addEventListener("scroll", handleScroll);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      listComponent.current.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch, isLoadFinish, lastPage, list, searchKeyword, sortOption]);

  // setMartCode before render
  useLayoutEffect(() => {
    const tempMartCode = Object.values(martList)
      .map((flag) => {
        return flag === true ? "1" : "0";
      })
      .join("");
    martCode.current = tempMartCode;
    currentPage.current = 0;
  }, [martCode, martList]);

  useLayoutEffect(() => {
    setList(SampleList);
  }, []);

  return <ProductListPresenter list={list} listComponent={listComponent} />;
};

export default ProductListContainer;
