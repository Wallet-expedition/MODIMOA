import SettingsIcon from "@material-ui/icons/Settings";

const BagDescription = () => {
  return (
    <div className="bag-description">
      <SettingsIcon className="gear" color="disabled" />
      <span> 각 상품을 누르면 상품의 수량을 변경하실 수 있습니다. </span>
    </div>
  );
};

export default BagDescription;
