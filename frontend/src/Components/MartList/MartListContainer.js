import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import detectMobile from "../Util/DetectMobile";
import MartListPresenter from "./MartListPresenter";

const MartListContainer = ({ martList }) => {
  const [showMartList, setShowMartList] = useState(false);
  const [tempMartList, setTempMartList] = useState(martList);
  const openedSideMenu = useSelector(
    (state) => state.sideMenuReducer.openedSideMenu
  );

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
      openedSideMenu={openedSideMenu}
    />
  );
};

export default MartListContainer;
