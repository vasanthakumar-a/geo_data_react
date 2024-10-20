import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Home from "./Dashboard/Home";
import EditShape from "./Shapes/EditShape";
import ProtectedRoute from "../lib/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <h1>Geo-Data App</h1>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new"
          element={
            <ProtectedRoute>
              <EditShape action='new' />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditShape action='edit' />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
