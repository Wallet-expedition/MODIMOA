import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { selectMart } from "../../../Store/Actions/martAction";

import MartListBtnPresenter from "./MartListBtnPresenter";

const MartListBtnContainer = ({ showMartList, setShowMartList, martList }) => {
  const dispatch = useDispatch();
  const detectMobile = () => {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i,
    ];

    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    });
  };

  const handleMartListBtnClick = (event) => {
    event.preventDefault();
    setShowMartList(!showMartList);
    if (showMartList) {
      dispatch(selectMart(martList));
    }
  };
  /**
   *  if User uses mobile, side menu is toggle with default no showing.
   */
  useEffect(() => {
    const isMobile = detectMobile();

    if (isMobile) {
      setShowMartList(false);
    }
  }, [setShowMartList]);

  return (
    <MartListBtnPresenter
      handleMartListBtnClick={handleMartListBtnClick}
      showMartList={showMartList}
    />
  );
};

export default MartListBtnContainer;
