import SettingsIcon from "@material-ui/icons/Settings";

import { PURCHASE_OPTION } from "../Util/Constant";

const WISH_DESCRIPTION =
  "각 톱니바퀴를 누르면 상품의 수량을 변경하실 수 있습니다.";

const PURCHASED_DESCRIPTION =
  "각 아이템을 누르면 상품의 구매를 취소하실 수 있습니다.";

const BagDescription = ({ filterOption }) => {
  return (
    <div className="bag-description">
      <SettingsIcon className="gear" color="disabled" />
      <span>
        {filterOption === PURCHASE_OPTION.BEFORE_PURCHASE
          ? WISH_DESCRIPTION
          : PURCHASED_DESCRIPTION}
      </span>
    </div>
  );
};

export default BagDescription;
