import { useState, useRef, useCallback, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";

import { getProductList } from "../../Store/Actions/productAction";
import { SORT_OPTION } from "../Util/Constant";

const getMartCode = (martList) => {
  const tempMartCode = Object.values(martList)
    .map((flag) => {
      return flag === true ? "1" : "0";
    })
    .join("");
  return tempMartCode;
};

/**
 * @param searchKeyword 유저가 입력한 검색어
 * @param sortOption 이름순인지, 가격순인지 정렬
 * @param martList 유저가 선택한 mart
 * @returns [list, getList, isLoadFinish, isSpinnerActive]
 *
 * list: 아이템을 담은 배열입니다. <br />
 *
 * getList: 아이템을 받는 함수입니다. (useInfiniteScroll에서 사용됩니다.)
 *
 * isLoadFinish: 아이템을 더 받을 수 있는지 알려줍니다. (useInfiniteScroll에서 사용됩니다.)
 *
 * isSpinnerActive: getList를 하는 중인지 알려줍니다. (loading이 되고 있는지)
 */
const useLoadData = ({ searchKeyword, sortOption, martList }) => {
  const [list, setList] = useState([]); // 반환될 리스트
  const [isLoadFinish, setIsLoadFinish] = useState(false); // 전체 리스트를 모두 가져왔는지
  const [isSpinnerActive, setIsSpinnerActive] = useState(false); // 스피너
  const [isFirstRender, setIsFirstRender] = useState(true); //
  const [lastPage, setLastPage] = useState(100);
  const [finalKeyword, setFinalKeyword] = useState(searchKeyword) || "";
  const [finalOption, setFinalOption] = useState(sortOption);
  const [finalMartCode, setFinalMartCode] = useState("");
  const [isOptionChanged, setIsOptionChaged] = useState(false);
  const currentPage = useRef(0);
  const martCode = useRef(getMartCode(martList));
  const dispatch = useDispatch();

  const getList = useCallback(async () => {
    // 로딩이 끝난 경우
    if (isLoadFinish || currentPage.current >= lastPage) return;
    setIsSpinnerActive(true); // 스피너 On
    // 리스트 받아오기
    const filter =
      finalOption === SORT_OPTION.SALE_PRICE ? "salePrice" : "productName";
    const res = await dispatch(
      getProductList(
        martCode.current,
        finalKeyword,
        currentPage.current,
        filter
      )
    );
    const { data, status } = res.payload;
    // success
    if (status === 200) {
      setList((prev) => [...prev, ...data.content]);
      currentPage.current++;
      if (currentPage.current > lastPage) {
        setIsLoadFinish(true);
      }
      setLastPage(data.totalPages > 0 ? data.totalPages : 100);
    }
    setIsSpinnerActive(false); // 스피너 Off
  }, [dispatch, finalKeyword, finalOption, isLoadFinish, lastPage]);

  const setInitialValue = useCallback(() => {
    setFinalKeyword(() => searchKeyword);
    setFinalOption(() => sortOption);
    currentPage.current = 0;
    setList(() => []);
    setIsFirstRender(true);
    setIsLoadFinish(false);
    martCode.current = getMartCode(martList);
    setFinalMartCode(martCode.current);
  }, [martList, searchKeyword, setFinalKeyword, sortOption]);

  const getIsOptionChanged = useCallback(() => {
    return (
      searchKeyword !== finalKeyword ||
      finalOption !== sortOption ||
      martCode.current !== finalMartCode
    );
  }, [finalKeyword, finalMartCode, finalOption, searchKeyword, sortOption]);

  // Infinite Scroll
  useLayoutEffect(() => {
    // 마트코드/검색어/필터가 달라졌다면 스크롤과 상관없이 상품을 가져온다.
    // 처음으로 리스트에 접근했다면 스크롤과 상관없이 상품을 가져온다.
    if (isOptionChanged || isFirstRender) {
      setInitialValue();
      setIsFirstRender(false);
      getList();
    }
  }, [
    searchKeyword,
    finalOption,
    martCode,
    getList,
    isFirstRender,
    isOptionChanged,
    setInitialValue,
  ]);

  // setMartCode before render
  useLayoutEffect(() => {
    martCode.current = getMartCode(martList);
    currentPage.current = 0;
    setFinalMartCode(martCode.current);
    setIsOptionChaged(() => getIsOptionChanged());
  }, [getIsOptionChanged, martCode, martList]);

  return [list, getList, isSpinnerActive, isLoadFinish];
};

export default useLoadData;
