import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CreateDiary } from "./component/page/createDiary";
import { Register } from "./component/page/auth/register";
import { Login } from "./component/page/auth/login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/create-diary" element={<CreateDiary />} />
      </Routes>
    </Router>
  );
}

export default App;
