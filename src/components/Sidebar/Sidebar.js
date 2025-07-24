import { useEffect, useState } from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";

// reactstrap components
import {
  // Button,
  // Card,
  // CardHeader,
  // CardBody,
  // CardTitle,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  // FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  // Progress,
  // Table,
  Container,
  Row,
  Col,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "reducer/auth/authSlice";
import { persistor } from "app/store";
import axios from "axios";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;
// var ps;

const Sidebar = (props) => {
  // console.log(props.routes);
  const { routes, logo } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const user = JSON.parse(localStorage.getItem("user"));
  const user = useSelector((state) => state.auth);
  const userId = useSelector((state) => state.auth.id);
  // console.log(userId);

  const [collapseOpen, setCollapseOpen] = useState();
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [permissionsId, setPermissionsId] = useState([]);

  const alwaysVisibleRoutes = ["User List", "Leave Request", "Leave Dashboard"];

  // verifies if routeName is the one active (in browser input)
  // const activeRoute = (routeName) => {
  //   return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  // };
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const res = await axios.get(`${API_PATH}/api/Get_user_permission`, {
          params: {
            APIKEY: API_KEY,
            userid: userId,
          },
        });
        // console.log(res?.data);
        const permissionID = res.data.map((p) => p.PermissionID) || [];
        // console.log(permissionID);
        setPermissionsId(permissionID);
      } catch (error) {
        console.log(error);
      }
    };
    if (userId) fetchPermissions();
  }, [userId]);

  // creates the links that appear in the left menu / Sidebar
  // const createLinks = (routes) => {
  //   console.log(routes)
  //   return routes.map((prop, key) => {
  //     return (
  //       <NavItem key={key}>
  //         <NavLink
  //           to={prop.layout + prop.path}
  //           tag={NavLinkRRD}
  //           onClick={closeCollapse}
  //         >
  //           <i className={prop.icon} />
  //           {prop.name}
  //         </NavLink>
  //       </NavItem>
  //     );
  //   });
  // };
  // -----------2nd createLinks
  // const createLinks = (routes) => {
  //   const toggleDropdown = (name) => {
  //     setOpenDropdowns((prev) => ({
  //       ...prev,
  //       [name]: !prev[name],
  //     }));
  //   };

  //   return routes.map((route, index) => {
  //     // Label (like "Master")
  //     if (route.isLabel) {
  //       return (
  //         <li
  //           key={index}
  //           className="nav-heading text-uppercase font-weight-bold text-muted mt-3 mb-2 px-3 small"
  //         >
  //           {route.name}
  //         </li>
  //       );
  //     }

  //     // Dropdown (has children)
  //     if (route.children && route.children.length > 0) {
  //       return (
  //         <div key={index}>
  //           <NavItem className="pl-2">
  //             <div
  //               className="nav-link d-flex align-items-center cursor-pointer"
  //               onClick={() => toggleDropdown(route.name)}
  //               style={{ cursor: "pointer" }}
  //             >
  //               <i className={route.icon} />
  //               <span className="ml-0">{route.name}</span>
  //               <i
  //                 className={`ml-auto fas fa-chevron-${
  //                   openDropdowns[route.name] ? "up" : "down"
  //                 }`}
  //               />
  //             </div>
  //             <Collapse isOpen={openDropdowns[route.name]}>
  //               <Nav className="nav-sm flex-column ml-0">
  //                 {route.children.map((child, idx) => (
  //                   <NavItem key={idx}>
  //                     <NavLink
  //                       to={child.layout + child.path}
  //                       tag={NavLinkRRD}
  //                       onClick={closeCollapse}
  //                       // activeClassName="active"
  //                     >
  //                       <i className={child.icon} />
  //                       <span className="ml-0">{child.name}</span>
  //                     </NavLink>
  //                   </NavItem>
  //                 ))}
  //               </Nav>
  //             </Collapse>
  //           </NavItem>
  //         </div>
  //       );
  //     }

  //     // Normal nav item
  //     return (
  //       <NavItem key={index} className="pl-2">
  //         <NavLink
  //           to={route.layout + route.path}
  //           tag={NavLinkRRD}
  //           onClick={closeCollapse}
  //           // activeClassName="active"
  //         >
  //           <i className={route.icon} />
  //           <span className="ml-2">{route.name}</span>
  //         </NavLink>
  //       </NavItem>
  //     );
  //   });
  // };
  const createLinks = (routes, permissionsId) => {
    // console.log(permissionsId);
    // const toggleDropdown = (name) => {
    //   setOpenDropdowns((prev) => ({
    //     ...prev,
    //     [name]: !prev[name],
    //   }));
    // };

    const toggleDropdown = (id) => {
      setOpenDropdowns((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));
    };

    const hasPermission = (route) => {
      // console.log("hasPermission");
      // console.log(route);
      // console.log("hasPermission");
      // console.log(route.isLabel);
      // if (route.isLabel || route.name === "Login" || route.name === "Register")
      //   return true;
      if (route.children && route.children.length > 0) {
        // console.log("children");
        // console.log(route.children);
        // console.log(route.children.some((child) => hasPermission(child)));
        return route.children.some((child) => hasPermission(child));
      }
      return permissionsId.includes(route.id);
    };
    const renderRoutes = (routesList, level = 0) => {
      // console.log("renderRoutes");
      // console.log(routesList);
      return routesList
        .filter(
          (route) =>
            route.name !== "Login" &&
            route.name !== "Register" &&
            route.showInSidebar !== false
        ) // 👈 Exclude these
        .filter(
          (route) =>
            alwaysVisibleRoutes.includes(route.name) || hasPermission?.(route)
        )
        .map((route, index) => {
          // Label
          if (route.isLabel) {
            return (
              <li
                key={index}
                className="nav-heading text-uppercase font-weight-bold text-muted mt-3 mb-2 px-3 small"
              >
                {route.name}
              </li>
            );
          }

          // Dropdown with children
          if (route.children && route.children.length > 0) {
            return (
              <div key={index}>
                <NavItem className={`pl-${level + 2}`}>
                  <div
                    className="nav-link d-flex align-items-center cursor-pointer"
                    // onClick={() => toggleDropdown(route.name)}
                    onClick={() => toggleDropdown(route.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <i className={route.icon} />
                    <span className="ml-0">{route.name}</span>
                    <i
                      className={`ml-auto fas fa-chevron-${
                        openDropdowns[route.id] ? "up" : "down"
                      }`}
                    />
                  </div>
                  <Collapse isOpen={openDropdowns[route.id]}>
                    <Nav className="nav-sm flex-column ml-0">
                      {renderRoutes(route.children, level + 1)}
                    </Nav>
                  </Collapse>
                </NavItem>
              </div>
            );
          }

          // Simple link
          return (
            // <NavItem key={index} className={`pl-${level + 2}`}>
            <NavItem key={index}>
              <NavLink
                to={route.layout + route.path}
                tag={NavLinkRRD}
                onClick={closeCollapse}
              >
                <i className={route.icon} />
                <span className="ml-2">{route.name}</span>
              </NavLink>
            </NavItem>
          );
        });
    };

    return renderRoutes(routes);
  };

  // const { bgColor, routes, logo } = props;

  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }

  const handleLogout = () => {
    // localStorage.clear(); // 🔥 Clears everything in localStorage
    dispatch(logout());
    persistor.purge(); // ✅ clear persisted storage (safe here)
    navigate("/auth/login"); // Redirect to login
  };

  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>
        {/* Brand */}
        {logo ? (
          <NavbarBrand
            className="pt-0 pb-0"
            {...navbarBrandProps}
            style={{ textAlign: "left" }}
          >
            <img
              alt={logo.imgAlt}
              className="navbar-brand-img"
              src={require("../../assets/img/brand/miracleLogo.png")}
            />
          </NavbarBrand>
        ) : null}
        {/* User */}
        <Nav className="align-items-center d-md-none">
          <UncontrolledDropdown nav>
            <DropdownToggle nav className="nav-link-icon">
              <i className="ni ni-bell-55" />
            </DropdownToggle>
            <DropdownMenu
              aria-labelledby="navbar-default_dropdown_1"
              className="dropdown-menu-arrow"
              right
            >
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Something else here</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img
                    alt="..."
                    src={require("../../assets/img/brand/profilePic.png")}
                  />
                </span>

                <Media className="ml-2 d-sm-block">
                  <span className="mb-0 text-sm font-weight-bold">
                    {user.name}
                  </span>
                </Media>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">Welcome!</h6>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-single-02" />
                <span>My profile</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-settings-gear-65" />
                <span>Settings</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-calendar-grid-58" />
                <span>Activity</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-support-16" />
                <span>Support</span>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="#pablo" onClick={handleLogout}>
                <i className="ni ni-user-run" />
                <span>Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {logo ? (
                <Col className="collapse-brand" xs="6">
                  {logo.innerLink ? (
                    <Link to={logo.innerLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </Link>
                  ) : (
                    <a href={logo.outterLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </a>
                  )}
                </Col>
              ) : null}
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          {/* Form */}
          <Form className="mt-4 mb-3 d-md-none">
            <InputGroup className="input-group-rounded input-group-merge">
              <Input
                aria-label="Search"
                className="form-control-rounded form-control-prepended"
                placeholder="Search"
                type="search"
              />
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <span className="fa fa-search" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Form>
          {/* Navigation */}
          <Nav navbar>{createLinks(routes, permissionsId)}</Nav>
          {/* Divider */}
          {/* <hr className="my-3" /> */}
          {/* <Nav className="mb-md-3" navbar>
            <NavItem>
              <NavLink>
                <i className="ni ni-spaceship" />
                Support
              </NavLink>
            </NavItem>
          </Nav> */}
          {/* <Nav className="mb-md-3" navbar>
            <NavItem className="active-pro active">
              <NavLink>
                <i className="ni ni-spaceship" />
                Support
              </NavLink>
            </NavItem>
          </Nav> */}
          {/* Heading */}
          {/* <h6 className="navbar-heading text-muted">Documentation</h6> */}
          {/* Navigation */}
          {/* Additional Routes */}

          {/* <Nav navbar>
            {routes.slice(22).map((route, index) => {
              if (route.isLabel) {
                return (
                  <li
                    key={`extra-${index}`}
                    className="nav-heading text-uppercase font-weight-bold text-muted mt-3 mb-2 px-3 small"
                  >
                    {route.name}
                  </li>
                );
              }

              return (
                <NavItem key={`extra-${index}`}>
                  <NavLink
                  // to={route.layout + route.path}
                  // tag={NavLinkRRD}
                  // onClick={closeCollapse}
                  >
                    <i className={route.icon} />
                    <span className="ml-2">{route.name}</span>
                  </NavLink>
                </NavItem>
              );
            })}
          </Nav> */}
          {/* <Nav className="mb-md-3" navbar>
            <NavItem>
              <NavLink>
                <i className="ni ni-spaceship" />
                Support
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/overview?ref=adr-admin-sidebar">
                <i className="ni ni-spaceship" />
                Getting started
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/colors?ref=adr-admin-sidebar">
                <i className="ni ni-palette" />
                Foundation
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/alerts?ref=adr-admin-sidebar">
                <i className="ni ni-ui-04" />
                Components
              </NavLink>
            </NavItem>
          </Nav> */}
          {/* <Nav className="mb-md-3" navbar>
            <NavItem className="active-pro active">
              <NavLink href="https://www.creative-tim.com/product/argon-dashboard-pro-react?ref=adr-admin-sidebar">
                <i className="ni ni-spaceship" />
                Upgrade to PRO
              </NavLink>
            </NavItem>
          </Nav> */}
        </Collapse>
      </Container>
    </Navbar>
  );
};

Sidebar.defaultProps = {
  routes: [{}],
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
};

export default Sidebar;
