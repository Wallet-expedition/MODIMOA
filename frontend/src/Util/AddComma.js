const addComma = (number) => {
  if (!number) return "0";
  return number.toLocaleString();
};

export default addComma;
