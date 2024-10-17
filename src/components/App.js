import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Home from "./Dashboard/Home";
import EditDrawing from "./Map/EditDrawing";

const App = () => {
  return (
    <Router>
      <h1>Geo-Data App</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/edit/:id" element={<EditDrawing />} />
      </Routes>
    </Router>
  );
};

export default App;
