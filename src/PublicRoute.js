// // src/routes/PublicRoute.js
// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";

// const PublicRoute = ({ children }) => {
//   // const isLoggedIn = JSON.parse(localStorage.getItem("user"))?.name;
//   const isLoggedIn = useSelector((state) => state?.auth?.name);
//   console.log("isLoggedIn --> PublicRoute", isLoggedIn);

//   return isLoggedIn ? <Navigate to="/admin/index" replace /> : children;
// };

// export default PublicRoute;
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const auth = useSelector((state) => state?.auth);
  const isLoggedIn = auth?.isLoggedIn;
  const isBranchSelected = auth?.branchSelected;

  // console.log("isLoggedIn --> PublicRoute", isLoggedIn);
  // console.log("isBranchSelected --> PublicRoute", isBranchSelected);

  // Only redirect if branch is selected (i.e., everything is done)
  if (isLoggedIn && isBranchSelected) {
    return <Navigate to="/admin/index" replace />;
  }

  return children;
};

export default PublicRoute;
