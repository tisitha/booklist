import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./Home";
import Edit from "./Edit";
import Register from "./Register";
import Login from "./Login";

export default function App() {

    const isAuthenticated = !!localStorage.getItem('token');

    return (
    <div>
    <Routes>
    <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
    <Route
    path="/edit/:id"
    element={<Edit />}
    />
    <Route path="/register" element={isAuthenticated ? <Navigate to="/" />:<Register />} />
    <Route path="/login" element={isAuthenticated? <Navigate to="/" />:<Login />} />
    <Route path="*" element={ <Navigate to="/" />} />
    </Routes>
    </div>
    );
    }
    