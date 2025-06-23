import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Card,
  Form,
  FormGroup,
  CardBody,
  Row,
  Col,
  Label,
  Input,
} from "reactstrap";

import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import axios from "axios";

import InputField from "components/FormFields/InputField";
import useQualificationList from "customHookApi/EnquiryDashboardApi/useQualificationList";
import useBranchList from "customHookApi/EnquiryDashboardApi/useBranchList";
// import SelectField from "components/FormFields/SelectField";
// import EnquiryForm from "components/Organisms/EnquiryForm";
// DATA
// import { enquiry, qualificationOptions, options } from "../../DummyData";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

// const enquiryType = [
//   { value: "internShip", label: "Internship" },
//   { value: "fullTime", label: "Full Time" },
// ];

const typeModeClass = [
  { value: "online", label: "Online" },
  { value: "offline", label: "Offline" },
];
const facultyOptions = [
  { value: "test", label: "Test" },
  { value: "abc", label: "ABC" },
  { value: "xyz", label: "XYZ" },
];
const paymentOptions = [
  { value: "individual", label: "Individual" },
  { value: "paidOrganization", label: "Paid Organization" },
];

const modeOptions = [
  { value: "offline", label: "Offline" },
  { value: "online", label: "Online" },
  { value: "hybrid", label: "Hybrid" },
];

const BatchModal = ({ modal, toggle, handleSubmit }) => {
  // console.log("BatchModal");
  const [fullName, setFullName] = useState("");

  // Qualifications
  // const [qualificationOptions, setQualificationOptions] = useState([]);
  const [selectedQualification, setSelectedOptionsQualification] =
    useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [typeMode, setTypeMode] = useState(typeModeClass[0]);
  const [selectFaculty, setSelectFaculty] = useState(facultyOptions[0]);
  const [selectPayment, setSelectPayment] = useState(paymentOptions[0]);
  const [selectMode, setSelectMode] = useState(modeOptions[0]);
  const [selectedBranch, setSelectedBranch] = useState(null);

  // customHook
  const { qualificationOptions, fetchQualificationLists, error } =
    useQualificationList();
  const {
    branchOptions,
    setBranchOptions,
    isLoading,
    fetchBranch,
    setBranchSearchText,
    branchSearchText,
  } = useBranchList();
  // Qualifications
  // const fetchQualificationLists = async () => {
  //   try {
  //     const res = await axios.get(`${API_PATH}/api/GetQualification`, {
  //       params: {
  //         APIKEY: API_KEY,
  //         // searchtext: branchSearchText,
  //       },
  //     });

  //     const formattedQualification = res.data.map((item) => ({
  //       label: item.QualificationName,
  //       value: item.QualificationId,
  //     }));
  //     setQualificationOptions(formattedQualification);
  //   } catch (error) {
  //     console.log(`qualification_Error ---> ${error}`);
  //   }
  // };

  // Custom Option component with checkbox
  useEffect(() => {
    if (branchSearchText.length < 3) {
      setBranchOptions([]);
      return;
    }

    // fetchData();
    fetchBranch();
  }, [branchSearchText]);

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} size="lg" centered>
        <Card className="shadow border-0 mb-0" style={{ maxHeight: "90vh" }}>
          <ModalHeader
            toggle={toggle}
            className="bg-white border-bottom"
            style={{ position: "sticky", top: 0, zIndex: 10 }}
          >
            <div className="d-flex flex-column g-5">
              <h1 className="">Create Batch</h1>
            </div>
          </ModalHeader>

          <ModalBody style={{ overflowY: "auto" }}>
            <CardBody>
              {/* <EnquiryFormCardBody /> */}
              <Form onSubmit={handleSubmit}>
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
                    <FormGroup>
                      <Label for="Courses"> Minimum Qualification</Label>
                      <Select
                        options={qualificationOptions}
                        value={selectedQualification}
                        onChange={(selected) => {
                          setSelectedOptionsQualification(selected);
                        }}
                        // onMenuOpen={async () => await fetchQualificationLists()}
                        onMenuOpen={fetchQualificationLists}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="duration" className="form-label">
                        Duration
                      </Label>
                      <Row>
                        <Col sm={3}>
                          <Input type="number" />
                        </Col>
                        <Col sm={9}>
                          <Select
                            id="mode"
                            options={modeOptions}
                            value={selectMode}
                            onChange={(selected) => setSelectMode(selected)}
                            placeholder="Select Mode"
                            isClearable
                          />
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="startDate" className="form-label">
                        Start Date
                      </Label>
                      <div className="">
                        <DatePicker
                          id="startDate"
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          dateFormat="dd/MM/yyyy"
                          className="form-control"
                          placeholderText="Select date"
                        />
                      </div>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputField
                      label="Batch Capacity"
                      id="capacity"
                      type="text"
                      //   value={fullName}
                      //   onChange={(e) => {
                      //     setFullName(e.target.value);
                      //   }}
                    />
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="mode" className="form-label">
                        Mode
                      </Label>
                      <Select
                        id="mode"
                        options={modeOptions}
                        value={selectMode}
                        onChange={(selected) => setSelectMode(selected)}
                        placeholder="Select Mode"
                        isClearable
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="faculty" className="form-label">
                        Faculty
                      </Label>
                      <Select
                        id="faculty"
                        options={facultyOptions}
                        value={selectFaculty}
                        onChange={(selected) => setSelectFaculty(selected)}
                        placeholder="Select Faculty"
                        isClearable
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="payment" className="form-label">
                        Payment
                      </Label>
                      <Select
                        id="payment"
                        options={paymentOptions}
                        value={selectPayment}
                        onChange={(selected) => setSelectPayment(selected)}
                        placeholder="Select Payment"
                        isClearable
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="batchLabel " className="form-label">
                        Batch Label
                      </Label>
                      <Select
                        id="batchLabel"
                        // options={facultyOptions}
                        // value={selectFaculty}
                        // onChange={(selected) => setSelectFaculty(selected)}
                        placeholder="Select Batch label"
                        isClearable
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="branch" className="form-label">
                        Branch Applicable
                      </Label>
                      <Select
                        options={branchOptions}
                        value={selectedBranch}
                        onChange={setSelectedBranch}
                        onInputChange={setBranchSearchText}
                        placeholder="Type at least 3 letters..."
                        isClearable
                        isLoading={isLoading}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="branch" className="form-label">
                        Fee Structure
                      </Label>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </ModalBody>

          <ModalFooter
            className="bg-white border-top"
            style={{ position: "sticky", bottom: 0, zIndex: 10 }}
          >
            <Button color="primary" onClick={handleSubmit}>
              Submit
            </Button>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Card>
      </Modal>
    </div>
  );
};

export default React.memo(BatchModal);
