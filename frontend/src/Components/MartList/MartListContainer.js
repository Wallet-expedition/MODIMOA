import React, { useState } from "react";
import MartListPresenter from "./MartListPresenter";

const MartListContainer = ({ martList }) => {
  const [showMartList, setShowMartList] = useState(false);
  const [tempMartList, setTempMartList] = useState(martList);

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
