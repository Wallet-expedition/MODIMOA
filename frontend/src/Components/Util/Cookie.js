export const getCookie = (key) => {
  let value = "";
  const cookies = document.cookie.split(";");

  for (let i in cookies) {
    if (cookies[i].search(key) !== -1) {
      value = cookies[i].split("=")[1];
    }
  }
  return value;
};
