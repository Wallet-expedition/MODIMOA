import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectMart } from "../../Store/Actions/martAction";
import detectMobile from "../../Util/DetectMobile";
import MartListPresenter from "./MartListPresenter";

const MartListContainer = ({ martList }) => {
  const dispatch = useDispatch();
  const [showMartList, setShowMartList] = useState(false);
  const [tempMartList, setTempMartList] = useState(martList);
  const openedSideMenu = useSelector(
    (state) => state.sideMenuReducer.openedSideMenu
  );

  const setSelectMartList = useCallback(() => {
    dispatch(selectMart(tempMartList));
  }, [dispatch, tempMartList]);

  useEffect(() => {
    if (!detectMobile()) {
      setSelectMartList();
    }
  }, [setSelectMartList, tempMartList]);

  useEffect(() => {
    if (!detectMobile()) {
      setShowMartList(true);
    }
  }, []);

  return (
    <MartListPresenter
      showMartList={showMartList}
      setShowMartList={setShowMartList}
      martList={martList}
      tempMartList={tempMartList}
      setTempMartList={setTempMartList}
      setSelectMartList={setSelectMartList}
      openedSideMenu={openedSideMenu}
    />
  );
};

export default MartListContainer;
