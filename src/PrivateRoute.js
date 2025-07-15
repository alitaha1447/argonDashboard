// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// const PrivateRoute = ({ children }) => {
//   // const userData = localStorage.getItem("user");

//   // Parse and check if userData exists and has required properties
//   let isAuthenticated = false;

//   if (userData) {
//     try {
//       const parsedUser = JSON.parse(userData);
//       isAuthenticated = Boolean(parsedUser?.name && parsedUser?.id);

//       // console.log("isAuthenticated --> ", isAuthenticated);
//     } catch (err) {
//       console.error("Invalid user data in localStorage", err);
//       isAuthenticated = false;
//     }
//   }

//   return isAuthenticated ? children : <Navigate to="/auth/login" replace />;
// };

// export default PrivateRoute;

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const userData = useSelector((state) => state?.auth);
  const isAuthenticated = Boolean(userData?.name && userData?.id);

  return isAuthenticated ? children : <Navigate to="/auth/login" replace />;
};

export default PrivateRoute;
