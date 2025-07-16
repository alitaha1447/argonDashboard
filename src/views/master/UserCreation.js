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
import Select, { components } from "react-select";

import React, { useState, useEffect } from "react";
import { genderOptions } from "DummyData";
import { getValidationErrors } from "utils/validations/userFormvalidation";

import Header from "components/Headers/Header";
import InputField from "components/FormFields/InputField";
import RadioGroupField from "components/FormFields/RadioGroup";

import useBranchList from "customHookApi/EnquiryDashboardApi/useBranchList";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

const UserCreation = () => {
  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [gender, setGender] = useState(null);
  const [isOrganisational, setIsOrganisational] = useState(false);
  const [isActive, setIsActive] = useState(false);
  // branches
  const [selectedBranches, setSelectedBranches] = useState([]); // Changed from selectedBranch
  const [formErrors, setFormErrors] = useState({});
  const [roleOptions, setRoleOptions] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isAll, setIsAll] = useState(true); // 0 = unchecked, 1 = checked
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

  const userName = email.split("@")[0];

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
    setIsActive(false);
    setIsAll(true);
    setIsBranchActive(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = getValidationErrors({ fullName, email, pass, confirmPass });

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
      isactive: isAll ? 1 : 0,
      userbranches: branches,
      userroles: userroles,
    };

    console.log(userFormData);

    try {
      const res = await axios.post(`${API_PATH}/api/Save_Users`, userFormData, {
        params: {
          APIKEY: API_KEY,
          createdby: "Admin",
        },
      });
      console.log(res);
      toast.success("User created Successfully!");
      resetForm();
    } catch (error) {
      console.log(error);
    }
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
                        // required
                      />
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="d-block">Branch Selection</Label>
                        <div className="d-flex align-items-center gap-3">
                          <FormGroup
                            check
                            className="mb-0 d-flex align-items-center"
                          >
                            <Input
                              id="selectAllBranches"
                              type="checkbox"
                              checked={isAll}
                              onChange={(e) => setIsAll(e.target.checked)}
                              className="me-2"
                            />
                            <Label for="selectAllBranches" className="mb-0">
                              All
                            </Label>
                          </FormGroup>

                          <div style={{ flexGrow: 1 }}>
                            <Select
                              options={branchOptions}
                              value={selectedBranches}
                              onChange={(selected) => {
                                setSelectedBranches(selected);
                                setIsBranchActive(
                                  !!selected && selected.length > 0
                                ); // true if selected branches exist
                              }}
                              onInputChange={setBranchSearchText}
                              placeholder="Type at least 3 letters..."
                              isClearable
                              isLoading={isLoading}
                              isMulti
                              // isDisabled={isAll} // ✅ disables dropdown if checkbox is selected
                            />
                          </div>
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
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
                  <Row></Row>
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

export default UserCreation;
