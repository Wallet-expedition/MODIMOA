import { BrowserRouter } from "react-router-dom";
import Router from "./Routes/Router";
import dotenv from "dotenv";

const App = () => {
  dotenv.config();
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

export default App;
