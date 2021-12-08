import React from "react";
import { Button } from "@material-ui/core";
import MartListBtn from "./MartListBtn";
import { CU, SEVEN_ELEVEN, GS25, EMART24 } from "../Util/Constant";

const LogoIcon = ({ name, martList, setTempMartList }) => {
  let martClass = "martlist-mart-icon";
  let active;
  if (martList === undefined) return "1";
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
        setTempMartList({ ...martList, CU: !active });
        break;
      case SEVEN_ELEVEN:
        setTempMartList({ ...martList, SEVEN_ELEVEN: !active });
        break;
      case GS25:
        setTempMartList({ ...martList, GS25: !active });
        break;
      case EMART24:
        setTempMartList({ ...martList, EMART24: !active });
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

const MartListModal = ({ martList, setTempMartList }) => {
  return (
    <div className="martlist-container">
      <span> 보고 싶은 편의점의 제품만 골라서 보실 수 있습니다. </span>
      <div className="martlist-mart-container">
        <LogoIcon
          name={CU}
          martList={martList}
          setTempMartList={setTempMartList}
        />
        <LogoIcon
          name={SEVEN_ELEVEN}
          martList={martList}
          setTempMartList={setTempMartList}
        />
        <LogoIcon
          name={GS25}
          martList={martList}
          setTempMartList={setTempMartList}
        />
        <LogoIcon
          name={EMART24}
          martList={martList}
          setTempMartList={setTempMartList}
        />
      </div>
    </div>
  );
};

const MartListPresenter = ({
  showMartList,
  setShowMartList,
  tempMartList,
  setTempMartList,
}) => {
  return (
    <>
      <MartListBtn
        tempMartList={tempMartList}
        showMartList={showMartList}
        setShowMartList={setShowMartList}
        setTempMartList={setTempMartList}
      />
      {showMartList ? (
        <MartListModal
          martList={tempMartList}
          setTempMartList={setTempMartList}
        />
      ) : null}
    </>
  );
};

export default MartListPresenter;
