import { v4 as uuidv4 } from "uuid";
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
import { useSelector } from "react-redux";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

const UserCreation = () => {
  const userId = useSelector((state) => state.auth.id);

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
  const [selectedFile, setSelectedFile] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [roleOptions, setRoleOptions] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
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
    branchid: branch.value.toString(),
    isactive: isBranchActive ? "1" : "0",
  }));

  const userroles =
    selectedRole && selectedRole.value
      ? [
          {
            roleid: selectedRole.value.toString(),
          },
        ]
      : [];

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const inputId = event.target.id; // 'resume' or 'image

    // if (!file) return;

    const fileName = file.name;
    let parts = fileName.split(".");
    let name = parts[0];
    setSelectedFile(fileName);

    if (!file) return;
    const uuid = uuidv4();
    const newFileName = `${uuid}-${name}`;

    const formData = new FormData();
    formData.append("file", file, newFileName);

    try {
      const res = await axios.post(
        `${API_PATH}/api/FileAPI/UploadFiles`,
        formData,
        {
          params: {
            APIKEY: API_KEY,
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

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
    setSelectedFile(null);
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
      Img_path: selectedFile,
    };

    try {
      const res = await axios.post(`${API_PATH}/api/Save_Users`, userFormData, {
        params: {
          APIKEY: API_KEY,
          createdby: userId.toString(),
        },
      });
      toast.success("User created Successfully!");
      resetForm();
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
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
                        setFormErrors={setFormErrors}
                        required
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
                              isDisabled={isAll}
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
                    <Col md={6}>
                      <FormGroup>
                        <Label>Upload Image</Label>
                        <Input
                          type="file"
                          name="image"
                          id="image"
                          accept=".jpg,.jpeg,.png"
                          onChange={handleFileChange}
                        />
                        <p style={{ fontSize: "0.875rem", color: "#6c757d" }}>
                          Supported files: JPEG (or JPG) / PNG. Max 10 MB.
                        </p>
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

export default UserCreation;
