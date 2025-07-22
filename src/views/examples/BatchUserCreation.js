import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "components/Headers/Header";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  Form,
  CardBody,
  Label,
  FormGroup,
  Input,
  Button,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import Select, { components } from "react-select";
import { useSelector } from "react-redux";
import InputField from "components/FormFields/InputField";
import RadioGroupField from "components/FormFields/RadioGroup";

import axios from "axios";
import useBranchList from "customHookApi/EnquiryDashboardApi/useBranchList";
import { genderOptions } from "DummyData";
import { getValidationErrors } from "utils/validations/userFormvalidation";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

const BatchUserCreation = () => {
  const userId = useSelector((state) => state.auth.id);
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedBranch, selectedBatch } = location.state || {};

  // console.log("Branch:", selectedBranch);
  // console.log("Batch:", selectedBatch);

  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [gender, setGender] = useState(null);
  const [isOrganisational, setIsOrganisational] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [roleOptions, setRoleOptions] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [isAll, setIsAll] = useState(false);
  const [isBranchActive, setIsBranchActive] = useState(false);

  const {
    branchOptions,
    setBranchOptions,
    isLoading,
    fetchBranch,
    setBranchSearchText,
    branchSearchText,
  } = useBranchList();

  useEffect(() => {
    if (branchSearchText.length < 3) {
      setBranchOptions([]);
      return;
    }

    fetchBranch();
  }, [branchSearchText]);

  useEffect(() => {
    const fetchRole = async () => {
      const res = await axios.get(`${API_PATH}/api/Get_Role`, {
        params: {
          APIKEY: API_KEY,
        },
      });
      const roles = res?.data.map((item) => ({
        value: item?.RoleID,
        label: item?.RoleName,
      }));
      setRoleOptions(roles);
    };
    fetchRole();
  }, []);

  const branches = selectedBranches.map((branch) => ({
    // userid: "string", // Replace with actual user ID if needed
    branchid: branch.value.toString(), // ✅ convert to string safely (if needed)
    isactive: isBranchActive ? "1" : "0",
  }));

  const userroles =
    selectedRole && selectedRole.value
      ? [
          {
            // userroleid: 0,
            // userid: 0, // replace with actual user ID if available
            roleid: selectedRole.value.toString(),
          },
        ]
      : [];

  const resetForm = () => {
    setFullName("");
    setAddress("");
    setContactNumber("");
    setEmail("");
    setPass("");
    setConfirmPass("");
    setGender(null);
    setSelectedBranches([]);
    setSelectedRole([]);
    setIsOrganisational(false);
    setIsActive(true);
    setIsAll(false);
    setIsBranchActive(false);
    setStartDate(new Date());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const errors = getValidationErrors({
      fullName,
      email,
      pass,
      confirmPass,
      gender,
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const userFormData = {
      isorganisational: isOrganisational ? 1 : 0,
      name: fullName,
      email: email,
      mobileno: contactNumber,
      address: address,
      Gender: gender?.value,
      username: email.split("@")[0],
      password: pass,
      isactive: isActive ? 1 : 0,
      isallbranches: isAll ? 1 : 0,
      userbranches: branches,
      userroles: userroles,
    };

    try {
      const res = await axios.post(
        `${API_PATH}/api/ADD_BATCH_STUDENT`,
        userFormData,
        {
          params: {
            APIKEY: API_KEY,
            createdby: userId.toString(),
            batchid: selectedBatch?.value,
            branchid: selectedBranch?.value,
          },
        }
      );
      toast.error("Batch assigned Successfully");
      resetForm();
      navigate("/admin/batchStudent");
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
    navigate("/admin/batchStudent");
    resetForm();
  };

  return (
    <>
      <Header />
      <Container className="mt--9" fluid>
        <Row className="justify-content-center">
          <Col lg={12}>
            <Card className="shadow">
              <CardHeader className="bg-white">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center w-100 pb-2 gap-2">
                  <h1 className="mb-2 mb-md-0">User Creation Form</h1>
                </div>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col md={6}>
                      <InputField
                        label="Full Name"
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          setFormErrors((prev) => ({ ...prev, fullName: "" }));
                        }}
                        error={formErrors.fullName}
                        required
                      />
                    </Col>
                    <Col md={6}>
                      <InputField
                        label="Email"
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setFormErrors((prev) => ({
                            ...prev,
                            email: "",
                          }));
                        }}
                        error={formErrors.email}
                        required
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <InputField
                        label="Contact Number"
                        id="contact"
                        type="number"
                        value={contactNumber}
                        onChange={(e) => {
                          setContactNumber(e.target.value);
                        }}
                      />
                    </Col>
                    <Col md={6}>
                      <InputField
                        label="Address"
                        id="address"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <InputField
                        label="Password"
                        id="pass"
                        type="password"
                        value={pass}
                        onChange={(e) => {
                          setPass(e.target.value);
                          setFormErrors((prev) => ({ ...prev, pass: "" }));
                        }}
                        error={formErrors.pass}
                        required
                        eyeIcon
                      />
                    </Col>
                    <Col md={6}>
                      <InputField
                        label="Confirm Password"
                        id="confirmPass"
                        type="password"
                        value={confirmPass}
                        onChange={(e) => {
                          setConfirmPass(e.target.value);
                          setFormErrors((prev) => ({
                            ...prev,
                            confirmPass: "",
                          }));
                        }}
                        error={formErrors.confirmPass}
                        required
                        eyeIcon
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <RadioGroupField
                        label="Gender"
                        name="gender"
                        options={genderOptions}
                        selected={gender}
                        onChange={setGender}
                        error={formErrors.gender}
                        setFormErrors={setFormErrors} // ✅ only this is passed
                        required
                      />
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label>Role</Label>
                        <Select
                          options={roleOptions}
                          value={selectedRole}
                          onChange={setSelectedRole}
                          placeholder="Select Role"
                          isClearable
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6} className="d-flex align-items-center mt-4">
                      <FormGroup check className="d-flex align-items-center">
                        <Input
                          id="isOrganisational"
                          type="checkbox"
                          checked={isOrganisational}
                          onChange={(e) =>
                            setIsOrganisational(e.target.checked)
                          }
                          className="me-2"
                        />
                        <Label for="isOrganisational" className="mb-0">
                          Is Organizational / Staff
                        </Label>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6} className="d-flex align-items-center mt-4">
                      <FormGroup check className="d-flex align-items-center">
                        <Input
                          id="isActive"
                          type="checkbox"
                          checked={isActive}
                          onChange={(e) => setIsActive(e.target.checked)}
                          className="me-2"
                        />
                        <Label for="isActive" className="mb-0">
                          Is Active
                        </Label>
                      </FormGroup>
                    </Col>
                  </Row>
                  <div className="text-end">
                    <Button
                      type="submit"
                      color="primary"
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Saving ...
                        </>
                      ) : (
                        "Save"
                      )}
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </>
  );
};

export default BatchUserCreation;
