import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import Page from "./Components/Dashboard/Page";

const App = () => {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Page />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
