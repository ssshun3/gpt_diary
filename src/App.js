import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CreateDiary } from "./component/page/createDiary";
import { Register } from "./component/page/auth/register";
import { Login } from "./component/page/auth/login";
import { EditDiary } from "./component/page/editDiary";
import { Home } from "./component/page/home";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/create-diary" element={<CreateDiary />} />
          <Route path="/edit-diary" element={<EditDiary />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
