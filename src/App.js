import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CreateDiary } from "./component/page/createDiary";
import { Register } from "./component/page/auth/register";
import { Login } from "./component/page/auth/login";
import { EditDiary } from "./component/page/editDiary";
import { Home } from "./component/page/home";
import { AppProvider } from "./context/AppContext";
import { SubmitDiary } from "./component/page/submitDiary";
import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "./context/AppContext";
import styled from "styled-components";

const ProtectedRoute = ({ children }) => {
  const { user } = useAppContext();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }

  return children;
};

function App() {
  return (
    <AppWrapper>
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/submit-diary"
              element={
                <ProtectedRoute>
                  <SubmitDiary />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-diary"
              element={
                <ProtectedRoute>
                  <CreateDiary />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-diary"
              element={
                <ProtectedRoute>
                  <EditDiary />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AppProvider>
    </AppWrapper>
  );
}

export default App;
const AppWrapper = styled.div`
  background: rgb(248, 249, 250);
  min-height: 100vh;
`;
