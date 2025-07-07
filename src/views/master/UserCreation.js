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

import Header from "components/Headers/Header";
import InputField from "components/FormFields/InputField";
import RadioGroupField from "components/FormFields/RadioGroup";

import useBranchList from "customHookApi/EnquiryDashboardApi/useBranchList";

const UserCreation = () => {
  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState(null);
  const [isActive, setIsActive] = useState(false);
  // branches
  const [selectedBranches, setSelectedBranches] = useState([]); // Changed from selectedBranch

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
                        }}
                      />
                    </Col>
                    <Col md={6}>
                      <InputField
                        label="Email"
                        id="email"
                        type="email"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
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
                        // value={contactNumber}
                        // onChange={(e) => {
                        //   setContactNumber(e.target.value);
                        // }}
                      />
                    </Col>
                    <Col md={6}>
                      <InputField
                        label="Confirm Password"
                        id="confirmPass"
                        type="password"
                        // value={address}
                        // onChange={(e) => setAddress(e.target.value)}
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
                        <Label>Branch</Label>
                        <Select
                          options={branchOptions}
                          value={selectedBranches}
                          onChange={setSelectedBranches}
                          onInputChange={setBranchSearchText}
                          placeholder="Type at least 3 letters..."
                          isClearable
                          isLoading={isLoading}
                          isMulti // This enables multi-select
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row></Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label>Role</Label>
                        <Select
                          //   options={branchOptions}
                          //   value={selectedBranches}
                          //   onChange={setSelectedBranches}
                          placeholder="Select Role"
                          //   isClearable
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label>Permission</Label>
                        <Select
                          //   options={branchOptions}
                          //   value={selectedBranches}
                          //   onChange={setSelectedBranches}
                          placeholder="Permission"
                          //   isClearable
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row></Row>
                  <Row>
                    <Col md={6} className="d-flex align-items-center mt-4">
                      <FormGroup check className="d-flex align-items-center">
                        <Input
                          id="active"
                          type="checkbox"
                          checked={isActive}
                          onChange={(e) => setIsActive(e.target.checked)}
                          className="me-2"
                        />
                        <Label for="active" className="mb-0">
                          Is Organizational / Staff
                        </Label>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6} className="d-flex align-items-center mt-4">
                      <FormGroup check className="d-flex align-items-center">
                        <Input
                          id="active"
                          type="checkbox"
                          checked={isActive}
                          onChange={(e) => setIsActive(e.target.checked)}
                          className="me-2"
                        />
                        <Label for="active" className="mb-0">
                          Is Active
                        </Label>
                      </FormGroup>
                    </Col>
                  </Row>
                  <div className="text-end">
                    <Button
                      type="submit"
                      color="primary"
                      //   onClick={handleSubmit}
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
    </>
  );
};

export default UserCreation;
