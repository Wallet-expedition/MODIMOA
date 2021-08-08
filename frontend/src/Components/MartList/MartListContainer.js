import React, { useState } from "react";
import MartListPresenter from "./MartListPresenter";

const MartListContainer = ({ martList, setMartList }) => {
  const [showMartList, setShowMartList] = useState(false);

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
