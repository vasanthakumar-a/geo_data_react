import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import EditShape from "./Shapes/EditShape";
import ProtectedRoute from "../lib/ProtectedRoute";
import UserProfile from "./Dashboard/UserProfile";
import ListShapes from "./Shapes/ListShapes";

const App = () => {
  return (
    <Router>
      <UserProfile />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ListShapes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new"
          element={
            <ProtectedRoute>
              <EditShape action="new" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditShape action="edit" />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
