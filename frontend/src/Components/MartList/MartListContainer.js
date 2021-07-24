import React, { useState } from "react";
import MartListPresenter from "./MartListPresenter";

const MartListContainer = () => {
  const [showMartList, setShowMartList] = useState(false);
  const [martList, setMartList] = useState({
    CU: false,
    SEVEN_ELEVEN: false,
    GS25: false,
    EMART24: false,
  });

  return (
    <MartListPresenter
      showMartList={showMartList}
      setShowMartList={setShowMartList}
      martList={martList}
      setMartList={setMartList}
    />
  );
};

export default MartListContainer;
