// src/routes/PublicRoute.js
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const isLoggedIn = JSON.parse(localStorage.getItem("user"))?.name;
  // console.log("isLoggedIn --> ", isLoggedIn);

  return isLoggedIn ? <Navigate to="/admin/index" replace /> : children;
};

export default PublicRoute;
