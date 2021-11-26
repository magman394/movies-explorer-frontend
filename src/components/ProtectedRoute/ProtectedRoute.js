import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ loggedIn, children, redirect }) {
    return loggedIn ? children : <Redirect to="/signin" />;
  }
export default ProtectedRoute;