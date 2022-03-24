import ProductListPresenter from "./ProductListPresenter";
import useInfiniteScroll from "../../Hook/useInfiniteScroll";
import useLoadData from "../../Hook/useLoadData";

const ProductListContainer = ({ martList, searchKeyword, sortOption }) => {
  const [list, getList, isSpinnerActive, isLoadFinish] = useLoadData({
    searchKeyword,
    martList,
    sortOption,
  });
  const [listRef] = useInfiniteScroll({ isLoadFinish, getList });

  return (
    <ProductListPresenter
      list={list}
      listComponent={listRef}
      isSpinnerActive={isSpinnerActive}
    />
  );
};

export default ProductListContainer;
