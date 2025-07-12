import React, { useState } from "react";
// reactstrap components
import axios from "axios";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "features/user/userSlice";
import { ToastContainer, toast } from "react-toastify";
import BrachModal from "components/CustomModals/branchModal/BrachModal";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      toast.error("Username and password are required!");
      return;
    }
    setIsLoading(true);
    try {
      const loginResponse = await axios.get(`${API_PATH}/api/user_validate`, {
        params: {
          APIKEY: API_KEY,
          username: username,
          pwd: password,
        },
      });
      // console.log(loginResponse?.data);
      const userData = loginResponse?.data;

      // Dispatch Redux action
      dispatch(
        login({
          id: userData.id,
          name: userData.name,
          email: userData.email,
          mobileno: userData.mobileno,
          isorganisational: userData.isorganisational,
        })
      );
      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      toast.success("Login Successful!");
      setShowConfirmModal(true); // open modal
      // navigate("/admin/enquiryDashboard");
      // setTimeout(() => {
      // }, [1000]);
    } catch (error) {
      console.log(error);
      toast.error("Invalid Credential!!");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleBranchModal = () => {
    setShowConfirmModal((prev) => !prev);
  };
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-1">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                height: "3rem",
              }}
            >
              {/* Left-aligned logo */}
              <div style={{ position: "absolute", left: 0 }}>
                <img
                  alt="Logo"
                  src={require("../../assets/img/brand/m.png")}
                  style={{ height: "3rem" }}
                />
              </div>

              {/* Centered text */}
              <h1 style={{ margin: 0 }}>Login</h1>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="UserName"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button
                  className="my-0"
                  color="primary"
                  type="button"
                  onClick={handleLogin}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Logging in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button>
                <Button className="my-0" color="primary" type="button">
                  Sign up
                </Button>
              </div>
            </Form>
            <div className="text-center text-muted mb-4 mt-4">
              <small>Or Sign Up Using</small>
            </div>
            <div className="btn-wrapper text-center">
              {/* <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/github.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Github</span>
              </Button> */}
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/google.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
      <ToastContainer />
      <BrachModal
        show={showConfirmModal}
        toggle={toggleBranchModal}
        // onConfirm={() => {
        //   setShowConfirmModal(false);
        //   navigate("/admin/enquiryDashboard");
        // }}
      />
    </>
  );
};

export default Login;
