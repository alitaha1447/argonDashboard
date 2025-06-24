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

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Select, { components } from "react-select";

import InputField from "components/FormFields/InputField";
import TextAreaField from "components/FormFields/TextAreaField";

import useQualificationList from "customHookApi/EnquiryDashboardApi/useQualificationList";
import useBranchList from "customHookApi/EnquiryDashboardApi/useBranchList";
import usePreferredCourse from "customHookApi/EnquiryDashboardApi/usePreferredCourse";
import axios from "axios";
import { FaPlus, FaMinus } from "react-icons/fa";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

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
  { value: 1, label: "Individual" },
  { value: 2, label: "Paid Organization" },
];

const organizationOptions = [
  { value: 1, label: "Truba" },
  { value: 2, label: "LNCT" },
  { value: 3, label: "NGO" },
];

const modeOptions = [
  { value: 0, label: "Offline" },
  { value: 1, label: "Online" },
  { value: 2, label: "Hybrid" },
];
const durationOptions = [
  // { value: 0, label: "Hours" },
  { value: 1, label: "Day" },
  { value: 2, label: "Week" },
  { value: 3, label: "Month" },
  { value: 4, label: "Year" },
];

const CheckboxOption = (props) => (
  <components.Option {...props}>
    <input
      type="checkbox"
      checked={props.isSelected}
      onChange={() => null}
      style={{ marginRight: 10 }}
    />
    <label>{props.label}</label>
  </components.Option>
);

const BatchModal = ({ modal, toggle }) => {
  const [batchName, setBatchName] = useState("");
  const [description, setDescription] = useState("");

  // Qualifications
  const [selectedQualification, setSelectedOptionsQualification] =
    useState(null);
  // Prefered Courses
  const [selectedCoursesOptions, setSelectedCoursesOptions] = useState(null);
  // Durations
  const [durationCount, setDurationCount] = useState(null);
  const [selectedDurations, setSelectedDurations] = useState(null);
  const [startDate, setStartDate] = useState(new Date());

  const [typeMode, setTypeMode] = useState(typeModeClass[0]);

  const [facultyOptions, setFacultyOptions] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [batchCapacity, setBatchCapacity] = useState(null);
  const [batchOptions, setBatchOptions] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);

  const [selectPayment, setSelectPayment] = useState(paymentOptions[0]);
  const [selectedOrganization, setSelectedOrganization] = useState(
    organizationOptions[0]
  );

  const [selectMode, setSelectMode] = useState(modeOptions[0]);
  // Branch / Batch Locations
  const [selectedBranch, setSelectedBranch] = useState([]);

  // Fees Structure
  const [showFeeFields, setShowFeeFields] = useState(false);
  // const [feeStructures, setFeeStructures] = useState([]);

  const [courseFeesOptions, setCourseFeesOptions] = useState([]);
  const [selectedFees, setSelectedFees] = useState(null);
  const [feesAmount, setFeesAmount] = useState(null);

  // const [feeRows, setFeeRows] = useState([
  //   { selectedFees: null, feesAmount: null },
  // ]);

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
  const { courseOptions, fetchCourseDetails } = usePreferredCourse();

  // Custom Option component with checkbox
  useEffect(() => {
    if (branchSearchText.length < 3) {
      setBranchOptions([]);
      return;
    }
    fetchBranch();
  }, [branchSearchText]);

  const handleFaculty = async () => {
    try {
      const res = await axios.get(
        "https://hotelapi.shriyanshnath.com/api/Get_Faculties",
        {
          params: {
            APIKEY: "12345678@",
          },
          // headers: {
          //   APIKEY: "12345678@",
          // },
        }
      );
      const formattedFaculty = res.data.map((item) => ({
        value: item.Id,
        label: item.Name,
      }));
      setFacultyOptions(formattedFaculty);
      // console.log("Faculty Data:", res.data);
    } catch (error) {
      console.error("Error fetching faculty data:", error);
    }
  };

  const handleBatchLevel = async () => {
    try {
      const res = await axios.get(
        "https://hotelapi.shriyanshnath.com/api/Get_Batch_Level",
        {
          params: {
            APIKEY: "12345678@",
          },
          // headers: {
          //   APIKEY: "12345678@", // Passing API key in headers as well
          // },
        }
      );
      const formattedBatch = res.data.map((item) => ({
        value: item.id,
        label: item.level_name,
      }));
      setBatchOptions(formattedBatch);
      // console.log(res?.data);
    } catch (error) {
      console.log(`Batch level error --> ${error}`);
    }
  };

  const handleCourseFees = async () => {
    const res = await axios.get(
      "https://hotelapi.shriyanshnath.com/api/Get_Ledger_Heads",
      {
        params: {
          APIKEY: "12345678@",
        },
      }
    );
    const formattedBatch = res?.data?.map((item) => ({
      value: item.HeadID,
      label: item.HeadName,
    }));
    setCourseFeesOptions(formattedBatch);
    // console.log(res?.data);
  };
  // console.log(selectedFees?.value, "---", selectedFees?.label);
  // console.log(feesAmount);
  // const handleFeesStructure = () => {
  //   console.log("first");
  // };

  // const handleAddFee = () => {
  //   setFeeStructures((prev) => [...prev, {}]);
  // };

  // const handleRemoveFee = (indexToRemove) => {
  //   setFeeStructures((prev) =>
  //     prev.filter((_, index) => index !== indexToRemove)
  //   );
  // };

  // const handleFeeChange = (index, key, value) => {
  //   const updated = [...feeStructures];
  //   updated[index][key] = value;
  //   setFeeStructures(updated);
  // };
  // console.log("StartDate --> ", startDate);

  // const durationType = selectedDurations?.value;
  // const duration = parseInt(durationCount);

  // const endDate = new Date(startDate);

  // console.log(durationType, "----------", duration);

  // switch (durationType) {
  //   // case 0: // Hours
  //   //   endDate.setHours(endDate.getHours() + duration1);
  //   //   break;
  //   case 1: // Days
  //     endDate.setDate(endDate.getDate() + duration);
  //     break;
  //   case 2: // Weeks
  //     endDate.setDate(endDate.getDate() + duration * 7);
  //     break;
  //   case 3: // Months
  //     endDate.setMonth(endDate.getMonth() + duration);
  //     break;
  //   case 4: // Years
  //     endDate.setFullYear(endDate.getFullYear() + duration);
  //     break;
  //   default:
  //     throw new Error("Invalid duration type");
  // }
  // // Output result with full datetime
  // console.log("End Date (raw):", endDate);
  // console.log("End Date (formatted):", endDate.toISOString()); // "2025-06-25T10:39:08.000Z"

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isOrganization = selectPayment?.label === "Paid Organization";
    const formattedStartDate = startDate?.toISOString(); // 💡 move it here

    const duration = parseInt(durationCount);
    const durationType = selectedDurations?.value;

    const endDate = new Date(startDate);
    switch (durationType) {
      case 1:
        endDate.setDate(endDate.getDate() + duration);
        break;
      case 2:
        endDate.setDate(endDate.getDate() + duration * 7);
        break;
      case 3:
        endDate.setMonth(endDate.getMonth() + duration);
        break;
      case 4:
        endDate.setFullYear(endDate.getFullYear() + duration);
        break;
      default:
        break;
    }

    const formattedEndDate = endDate.toISOString();

    const batchFormData = {
      BatchName: batchName,
      Description: description,
      courseid: selectedCoursesOptions?.map((c) => c.value).join(","),
      duration_type: selectedDurations?.value,
      duration: parseInt(durationCount),
      StartDate: formattedStartDate,
      EndDate: formattedEndDate,
      BatchCapacity: parseInt(batchCapacity),
      // BatchStatus,
      ModeOfStudy: selectMode?.value,
      FacultyID: selectedFaculty?.map((item) => item.value),
      batch_level: selectedBatch?.value,
      Payment_type: selectPayment?.value,
      sponsorid: isOrganization ? selectedOrganization?.value : null,
      min_qualification: selectedQualification?.value,
      CreatedBy: "Developer",
      batch_locations: selectedBranch?.map((item) => item.value),
      // batch_fees,
      // batch_students,
      // installments_details,
    };
    console.log(batchFormData);
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} size="xl" centered>
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
              <Form>
                <Row>
                  <Col md={6}>
                    <InputField
                      label="Batch Title"
                      id="batchTitle"
                      type="text"
                      value={batchName}
                      onChange={(e) => {
                        setBatchName(e.target.value);
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label>Minimum Qualification</Label>
                      <Select
                        options={qualificationOptions}
                        value={selectedQualification}
                        onChange={(selected) => {
                          setSelectedOptionsQualification(selected);
                        }}
                        onMenuOpen={fetchQualificationLists}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <TextAreaField
                      label="Description"
                      id="description"
                      // type="text"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label>Preferred Courses</Label>
                      <Select
                        isMulti
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        components={{ Option: CheckboxOption }}
                        options={courseOptions}
                        value={selectedCoursesOptions}
                        onChange={(selected) => {
                          setSelectedCoursesOptions(selected);
                        }}
                        onMenuOpen={fetchCourseDetails}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="duration" className="form-label">
                        Duration
                      </Label>
                      <Row className="">
                        <Col xs={4}>
                          <Input
                            type="number"
                            placeholder="Duration"
                            min={1}
                            value={durationCount}
                            onChange={(e) => setDurationCount(e.target.value)}
                            style={{
                              height: "38px", // match react-select default height
                              borderRadius: "4px",
                            }}
                          />
                        </Col>
                        <Col xs={8}>
                          <div style={{ height: "38px" }}>
                            <Select
                              id="durationUnit"
                              options={durationOptions}
                              // placeholder={selectedDurations}
                              value={selectedDurations}
                              onChange={(selected) =>
                                setSelectedDurations(selected)
                              }
                              isClearable
                            />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="startDate">Start Date</Label>
                      <div style={{ width: "100%" }}>
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          dateFormat="dd/MM/yyyy"
                          placeholderText="Select start date"
                          isClearable
                          scrollableYearDropdown
                          yearDropdownItemNumber={50}
                          minDate={new Date(1900, 0, 1)}
                          maxDate={new Date(2025, 11, 31)}
                          popperPlacement="bottom-start"
                          className="form-control w-100"
                          id="startDate"
                        />
                      </div>
                    </FormGroup>
                  </Col>

                  <Col md={6}>
                    <InputField
                      label="Batch Capacity"
                      id="capacity"
                      type="number"
                      value={batchCapacity}
                      onChange={(e) => setBatchCapacity(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row>
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
                  <Col md={6}>
                    <FormGroup>
                      <Label>Faculty</Label>
                      <Select
                        isMulti
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        components={{ Option: CheckboxOption }}
                        options={facultyOptions}
                        value={selectedFaculty}
                        onChange={(selected) => {
                          setSelectedFaculty(selected);
                        }}
                        onMenuOpen={handleFaculty}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="batchLevel" className="form-label">
                        Batch Level
                      </Label>
                      <Select
                        id="batchLevel"
                        options={batchOptions}
                        value={selectedBatch}
                        onChange={(selected) => setSelectedBatch(selected)}
                        placeholder="Select Batch Level"
                        isClearable
                        onMenuOpen={handleBatchLevel}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="payment" className="form-label">
                        Payment
                      </Label>
                      <Row>
                        <Col xs={6}>
                          <Select
                            id="payment"
                            options={paymentOptions}
                            value={selectPayment}
                            onChange={(selected) => setSelectPayment(selected)}
                            placeholder="Select Payment"
                            // isClearable
                          />
                        </Col>
                        {selectPayment?.label === "Paid Organization" && (
                          <Col xs={6}>
                            <Select
                              id="organization"
                              options={organizationOptions}
                              value={selectedOrganization}
                              onChange={(selected) =>
                                setSelectedOrganization(selected)
                              }
                              placeholder="Select Organization"
                            />
                          </Col>
                        )}
                      </Row>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="branch" className="form-label">
                        Batch Locations
                      </Label>
                      <Select
                        isMulti
                        options={branchOptions}
                        value={selectedBranch}
                        onChange={setSelectedBranch}
                        onInputChange={(e) => setBranchSearchText(e)} // ✅ correct usage                        placeholder="Type at least 3 letters..."
                        isClearable
                        isLoading={isLoading}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <div className="d-flex justify-content-between align-items-center">
                        <Label for="branch" className="form-label mb-0">
                          Fee Structure
                        </Label>
                        <div
                          onClick={() => {
                            setShowFeeFields(!showFeeFields);
                          }}
                          style={{
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "18px",
                            height: "18px",
                            backgroundColor: "#5e72e4",
                            color: "#fff",
                            borderRadius: "9px",
                            flexShrink: 0, // prevent icon from shrinking on small screens
                          }}
                        >
                          <FaPlus size={12} />
                        </div>
                      </div>
                      {showFeeFields && (
                        <Row className="mt-2">
                          <Col xs={5}>
                            <Select
                              // id={`durationUnit-${index}`}
                              options={courseFeesOptions}
                              value={selectedFees}
                              onChange={(selected) => setSelectedFees(selected)}
                              onMenuOpen={handleCourseFees}
                              isClearable
                            />
                          </Col>

                          <Col xs={7}>
                            <div
                              className="d-flex align-items-center"
                              style={{ height: "38px" }}
                            >
                              <div style={{ flex: 1 }}>
                                <Input
                                  type="text"
                                  placeholder="Enter Amount"
                                  value={feesAmount}
                                  onChange={(e) => {
                                    setFeesAmount(e.target.value);
                                  }}
                                  style={{
                                    height: "38px",
                                    borderRadius: "4px",
                                  }}
                                />
                              </div>

                              {/* ➕ */}
                              <div
                                // onClick={handleAddFee}
                                style={{
                                  marginLeft: "8px",
                                  width: "28px",
                                  height: "28px",
                                  backgroundColor: "#5e72e4",
                                  color: "#fff",
                                  borderRadius: "50%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  cursor: "pointer",
                                }}
                              >
                                <FaPlus size={12} />
                              </div>

                              {/* ➖ */}

                              <div
                                // onClick={() => handleRemoveFee(index)}
                                style={{
                                  marginLeft: "8px",
                                  width: "28px",
                                  height: "28px",
                                  backgroundColor: "#f5365c",
                                  color: "#fff",
                                  borderRadius: "50%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  cursor: "pointer",
                                }}
                              >
                                <FaMinus size={12} />
                              </div>
                            </div>
                          </Col>
                        </Row>
                      )}
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
