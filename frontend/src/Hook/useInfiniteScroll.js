import { useEffect, useRef } from "react";

import { throttle } from "../Util/Throttle";

/**
 * scroll이벤트를 다룹니다.
 * listRef의 최하단에 스크롤이 갔을 경우, 새로운 리스트를 불러옵니다.
 * @returns [listRef] listRef: 리스트 컴포넌트에 붙일 ref
 */
const useInfiniteScroll = ({ isLoadFinish, getList }) => {
  const listRef = useRef();

  const checkScroll = () => {
    if (!listRef.current) return;
    const scrollHeight = listRef?.current.scrollHeight;
    const scrollTop = listRef?.current.scrollTop;
    const clientHeight = listRef?.current.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      if (!isLoadFinish) {
        getList();
      }
    }
  };

  const handleScroll = throttle(checkScroll, 500);

  useEffect(() => {
    listRef?.current?.addEventListener("scroll", handleScroll);

    return () => {
      if (listRef.current)
        // eslint-disable-next-line react-hooks/exhaustive-deps
        listRef?.current.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return [listRef];
};

export default useInfiniteScroll;
