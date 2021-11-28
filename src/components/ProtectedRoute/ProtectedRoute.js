import React from "react";
import { Redirect } from "react-router-dom";
function ProtectedRoute({ children }) {
    return localStorage.getItem('login') ? children : <Redirect to="/" />;
  }
export default ProtectedRoute;