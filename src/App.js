import React, { useEffect } from "react";
import HomePage from "./pages/Homepage";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "./redux/feature/authSlice";
import Login from "./pages/Login";
import PreviewPage from "./pages/Preview";
import MainLayout from "./layouts/MainLayout";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // Lấy token từ localStorage
    const token = localStorage.getItem("accessToken");
    if (token) {
      dispatch(setToken(token));
    }
  }, [dispatch]);
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/preview" element={<PreviewPage />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
