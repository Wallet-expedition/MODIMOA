import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";

import ProductListPresenter from "./ProductListPresenter";
import { getProductList } from "../../Store/Actions/productAction";
import { throttle } from "../Util/Throttle";

const getMartCode = (martList) => {
  const tempMartCode = Object.values(martList)
    .map((flag) => {
      return flag === true ? "1" : "0";
    })
    .join("");
  return tempMartCode;
};

const ProductListContainer = ({ martList, searchKeyword, sortOption }) => {
  const [list, setList] = useState([]);
  const [isLoadFinish, setIsLoadFinish] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [lastPage, setLastPage] = useState(100);
  const [finalKeyword, setFinalKeyword] = useState(searchKeyword) || "";
  const [finalOption, setFinalOption] = useState(sortOption);
  const [finalMartCode, setFinalMartCode] = useState("");
  const currentPage = useRef(0);
  const listComponent = useRef(0);
  const martCode = useRef("");
  const dispatch = useDispatch();

  // Infinite Scroll
  useEffect(() => {
    const getList = async () => {
      // 상품 마지막 페이지에 도착했을 경우
      if (currentPage.current >= lastPage) return;
      if (isLoadFinish) return;
      const filter = finalOption === 1 ? "salePrice" : "productName";
      setIsLoading(true); // 스피너 On
      const res = await dispatch(
        getProductList(
          martCode.current,
          finalKeyword,
          currentPage.current,
          filter
        )
      );
      const data = res.payload.data;
      if (res.payload.status === 200) {
        setList((prev) => [...prev, ...data.content]);
        currentPage.current++;

        if (currentPage.current > lastPage) {
          setIsLoadFinish(true);
        }
        setLastPage(data.totalPages > 0 ? data.totalPages : 100);
      }
      setIsLoading(false); // 스피너 Off
    };

    const checkScroll = () => {
      const scrollHeight = listComponent?.current.scrollHeight;
      const scrollTop = listComponent?.current.scrollTop;
      const clientHeight = listComponent?.current.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight) {
        if (!isLoadFinish) {
          getList();
        }
      }
    };

    const handleScroll = throttle(checkScroll, 500);
    listComponent.current.addEventListener("scroll", handleScroll);

    // 마트코드/검색어/ 필터가 달라졌다면 스크롤과 상관 없이 상품을 가져온다.
    if (
      searchKeyword !== finalKeyword ||
      finalOption !== sortOption ||
      martCode.current !== finalMartCode
    ) {
      setFinalKeyword(() => searchKeyword);
      setFinalOption(() => sortOption);
      currentPage.current = 0;
      setList(() => []);
      setIsFirstRender(true);
      setIsLoadFinish(false);
      setFinalMartCode(martCode.current);
    }

    // 처음 렌더가 되는 거라면 스크롤과 상관 없이 상품을 가져온다.
    if (isFirstRender) {
      getList();
      setIsFirstRender(false);
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      listComponent?.current?.removeEventListener("scroll", handleScroll);
    };
  }, [
    dispatch,
    isFirstRender,
    isLoadFinish,
    lastPage,
    list,
    finalKeyword,
    sortOption,
    searchKeyword,
    setFinalKeyword,
    finalOption,
    finalMartCode,
    martList,
  ]);

  // setMartCode before render
  useLayoutEffect(() => {
    martCode.current = getMartCode(martList);
    setFinalMartCode(martCode.current);
    currentPage.current = 0;
  }, [martCode, martList]);

  return (
    <ProductListPresenter
      list={list}
      listComponent={listComponent}
      isLoading={isLoading}
    />
  );
};

export default ProductListContainer;
