import React from "react";
import { Button } from "@material-ui/core";

import MartListBtn from "./MartListBtn";
import { CU, SEVEN_ELEVEN, GS25, EMART24 } from "../Util/Constant";

const LogoIcon = ({ name, martList, setMartList }) => {
  var martClass = "martlist-mart-icon";
  var active;
  switch (name) {
    case CU:
      active = martList.CU;
      break;
    case SEVEN_ELEVEN:
      active = martList.SEVEN_ELEVEN;
      break;
    case GS25:
      active = martList.GS25;
      break;
    case EMART24:
      active = martList.EMART24;
      break;
    default:
      break;
  }
  switch (active) {
    case true:
      martClass = "martlist-mart-icon";
      break;
    case false:
      martClass = `${martClass} martlist-mart-icon-disabled`;
      break;
    default:
      martClass = "martlist-mart-icon";
      break;
  }
  const onClick = () => {
    switch (name) {
      case CU:
        setMartList({ ...martList, CU: !active });
        break;
      case SEVEN_ELEVEN:
        setMartList({ ...martList, SEVEN_ELEVEN: !active });
        break;
      case GS25:
        setMartList({ ...martList, GS25: !active });
        break;
      case EMART24:
        setMartList({ ...martList, EMART24: !active });
        break;
      default:
        break;
    }
  };
  return (
    <Button className={martClass} onClick={onClick}>
      <img
        className={`mart-${name}`}
        src={`/img/mart_${name}.jpg`}
        alt="mart"
        width="70"
        height="70"
      />
    </Button>
  );
};

const MartListModal = ({ martList, setMartList }) => {
  return (
    <div className="martlist-container">
      <span> 보고 싶은 편의점의 제품만 골라서 보실 수 있습니다. </span>
      <div className="martlist-mart-container">
        <LogoIcon name={CU} martList={martList} setMartList={setMartList} />
        <LogoIcon
          name={SEVEN_ELEVEN}
          martList={martList}
          setMartList={setMartList}
        />
        <LogoIcon name={GS25} martList={martList} setMartList={setMartList} />
        <LogoIcon
          name={EMART24}
          martList={martList}
          setMartList={setMartList}
        />
      </div>
    </div>
  );
};

const MartListPresenter = ({
  showMartList,
  setShowMartList,
  martList,
  setMartList,
}) => {
  return (
    <>
      <MartListBtn
        martList={martList}
        showMartList={showMartList}
        setShowMartList={setShowMartList}
      />
      {showMartList ? (
        <MartListModal martList={martList} setMartList={setMartList} />
      ) : null}
    </>
  );
};

export default MartListPresenter;
