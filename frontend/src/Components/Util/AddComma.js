const AddComma = (number) => {
  if (!number) return "";
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default AddComma;
