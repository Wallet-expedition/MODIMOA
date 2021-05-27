import { BrowserRouter } from "react-router-dom";

import Router from "./Routes/Router";

import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

export default App;
