import { BrowserRouter } from "react-router-dom";
import Router from "./Routes/Router";

const App = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  window.addEventListener("resize", () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

export default App;
