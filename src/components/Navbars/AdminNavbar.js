import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "reducer/auth/authSlice";
import { persistor } from "app/store";
import ChangePass from "components/CustomModals/changePassModal/ChangePass";
import Select from "react-select";

// import { googleLogout } from "@react-oauth/google";

const AdminNavbar = (props) => {
  const [financialYearOptions, setFinancialYearOptions] = useState([]);
  const [selectedFY, setSelectedFY] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [changePassModal, setChangePassModal] = useState(false);
  // const userName = useSelector((state) => state?.auth?.name); // Assuming 'user' is your slice name
  // const user = JSON.parse(localStorage.getItem("user"));
  const user = useSelector((state) => state?.auth);

  useEffect(() => {
    const generateFinancialYearOptions = () => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth(); // April is 3 (0-indexed)
      const currentYear = currentDate.getFullYear();

      const fyStart = currentMonth >= 3 ? currentYear : currentYear - 1;
      const years = [];

      for (let i = 0; i < 5; i++) {
        const from = fyStart - i;
        const to = from + 1;
        const label = `${from}-${to}`;
        years.push({ label, value: label });
        // years.push({ label });
      }

      setFinancialYearOptions(years);
    };

    generateFinancialYearOptions();
  }, []);
  console.log(selectedFY);
  const handleChangePassword = (e) => {
    e.preventDefault();
    setChangePassModal((prev) => !prev);
  };

  const handleLogout = () => {
    // googleLogout(); // revoke Google session
    // localStorage.clear(); // 🔥 Clears everything in localStorage
    dispatch(logout());
    persistor.purge(); // ✅ clear persisted storage (safe here)
    navigate("/auth/login"); // Redirect to login
  };

  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            <img
              alt="Logo"
              src={require("../../assets/img/brand/miracleLogo.png")}
              style={{ height: "3rem" }}
            />
          </Link>
          <div className="d-none d-md-flex ml-lg-auto">
            <Select
              options={financialYearOptions}
              value={selectedFY}
              onChange={setSelectedFY}
              placeholder="Select Financial Year"
              isClearable
            />
          </div>
          {/* <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <FormGroup className="mb-0">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search" type="text" />
              </InputGroup>
            </FormGroup>
          </Form> */}
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={require("../../assets/img/brand/profilePic.png")}
                    />
                  </span>
                  <Media className="ml-2 d-none d-md-block">
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
                <DropdownItem
                  to="/admin/user-profile"
                  tag={Link}
                  onClick={handleChangePassword}
                >
                  <i className="ni ni-calendar-grid-58" />
                  <span>Change Password</span>
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
        </Container>
      </Navbar>
      <ChangePass modal={changePassModal} toggle={handleChangePassword} />
    </>
  );
};

export default AdminNavbar;
