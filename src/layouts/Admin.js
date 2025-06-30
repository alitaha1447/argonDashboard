import React from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  // const getRoutes = (routes) => {
  //   return routes.map((prop, key) => {
  //     // if (prop.children) {
  //     //   return prop.children.map((child, i) => (
  //     //     <Route
  //     //       path={child.path}
  //     //       element={child.component}
  //     //       key={`${key}-${i}`}
  //     //     />
  //     //   ));
  //     // }
  //     if (prop.layout === "/admin") {
  //       return (
  //         <Route path={prop.path} element={prop.component} key={key} exact />
  //       );
  //     } else {
  //       return null;
  //     }
  //   });
  // };

  // const getRoutes = (routes) => {
  //   // console.log(routes);
  //   return routes.flatMap((route, key) => {
  //     // Render child routes if present
  //     if (route.children && route.children.length) {
  //       return route.children.map((child, idx) => (
  //         <Route
  //           path={child.path}
  //           element={child.component}
  //           key={`${key}-${idx}`}
  //         />
  //       ));
  //     }

  //     // Render normal route
  //     if (route.layout === "/admin") {
  //       return <Route path={route.path} element={route.component} key={key} />;
  //     }

  //     return [];
  //   });
  // };

  const getRoutes = (routesList) => {
    const result = [];

    const traverseRoutes = (routesArray) => {
      routesArray.forEach((route) => {
        if (route.layout === "/admin" && route.path && route.component) {
          result.push(
            <Route
              key={route.path}
              path={route.path}
              element={route.component}
            />
          );
        }

        if (route.children && route.children.length > 0) {
          traverseRoutes(route.children);
        }
      });
    };

    traverseRoutes(routesList);

    return result;
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props?.location?.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("../assets/img/brand/miracleLogo.png"),
          imgAlt: "...",
        }}
      />
      <div
        className="main-content d-flex flex-column min-vh-100"
        ref={mainContent}
      >
        <AdminNavbar
          {...props}
          brandText={getBrandText(props?.location?.pathname)}
        />
        <div className="flex-grow-1">
          <Routes>
            {getRoutes(routes)}
            <Route path="*" element={<Navigate to="/admin/index" replace />} />
          </Routes>
        </div>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Admin;
