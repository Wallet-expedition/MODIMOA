import { SELECT_MART } from "./type";

export const selectMart = (mart_list) => {
  return {
    type: SELECT_MART,
    payload: mart_list,
  };
};
