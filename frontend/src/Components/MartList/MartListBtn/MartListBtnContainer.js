import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { selectMart } from "../../../Store/Actions/martAction";

import MartListBtnPresenter from "./MartListBtnPresenter";

const MartListBtnContainer = ({
  showMartList,
  setShowMartList,
  tempMartList,
}) => {
  const dispatch = useDispatch();
  const [isAllDeactivation, setIsAllDeActivation] = useState(false);

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

  const handleMartListBtnClick = useCallback(
    (event) => {
      event.preventDefault();
      setShowMartList(!showMartList);
      if (showMartList) {
        // 모두 active : false이면 버튼이 눌리지 않게 하자.
        if (isAllDeactivation) {
          alert("적어도 한 개의 마트를 선택해주세요.");
          setShowMartList(true); // 마트리스트가 꺼지지 않게
        } else {
          dispatch(selectMart(tempMartList));
        }
      }
    },
    [dispatch, isAllDeactivation, setShowMartList, showMartList, tempMartList]
  );
  /**
   *  if User uses mobile, side menu is toggle with default no showing.
   */
  useEffect(() => {
    const isMobile = detectMobile();

    if (isMobile) {
      setShowMartList(false);
    }
  }, [setShowMartList]);

  useEffect(() => {
    const activate_list = Object.values(tempMartList);
    if (activate_list.indexOf(true) !== -1) {
      setIsAllDeActivation(false);
    } else {
      setIsAllDeActivation(true);
    }
  }, [tempMartList]);

  return (
    <MartListBtnPresenter
      handleMartListBtnClick={handleMartListBtnClick}
      showMartList={showMartList}
    />
  );
};

export default MartListBtnContainer;
