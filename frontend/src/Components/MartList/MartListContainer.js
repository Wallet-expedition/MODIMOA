import React, { useEffect, useState } from "react";
import detectMobile from "../Util/DetectMobile";
import MartListPresenter from "./MartListPresenter";

const MartListContainer = ({ martList }) => {
  const [showMartList, setShowMartList] = useState(false);
  const [tempMartList, setTempMartList] = useState(martList);

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
    />
  );
};

export default MartListContainer;
