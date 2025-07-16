import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState, useRef, useMemo } from "react";
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
import InstallModal from "components/CustomModals/installmentModal/InstallModal";

import useQualificationList from "customHookApi/EnquiryDashboardApi/useQualificationList";
import useBranchList from "customHookApi/EnquiryDashboardApi/useBranchList";
import usePreferredCourse from "customHookApi/EnquiryDashboardApi/usePreferredCourse";

import axios from "axios";
import { getValidationErrors } from "utils/validations/createBatchValidation";
import { FaPlus, FaMinus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

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

const BatchModal = ({
  modal,
  toggle,
  studentID,
  refreshList = () => {},
  resetSelected = () => {},
}) => {
  // console.log("   ss  ", studentID);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  const stdId = studentID.map((item) => ({
    // id: "", // or generate unique id if needed
    // BatchID: batchId, // provide your BatchID variable here
    enrollmentid: item.enrollmentid.toString(),
    // createdon: new Date().toISOString(), // or your preferred date format
  }));
  // console.log(stdId);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

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
  const [feeStructures, setFeeStructures] = useState([
    { selectedFees: null, feesAmount: "" },
  ]);

  const [courseFeesOptions, setCourseFeesOptions] = useState([]);
  // Installment Modal
  const [installmentModalOpen, setinstallmentModalOpen] = useState(false);
  const [installmentsDetails, setInstallmentsDetails] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [totalFess, setTotalFess] = useState(0); // Initialize as 0 (number)

  const [formErrors, setFormErrors] = useState({});
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
            APIKEY: API_KEY,
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
            APIKEY: API_KEY,
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
    } catch (error) {
      console.log(`Batch level error --> ${error}`);
    }
  };

  const handleCourseFees = async () => {
    const res = await axios.get(
      "https://hotelapi.shriyanshnath.com/api/Get_Ledger_Heads",
      {
        params: {
          APIKEY: API_KEY,
        },
      }
    );
    const formattedBatch = res?.data?.map((item) => ({
      value: item.HeadID,
      label: item.HeadName,
    }));
    setCourseFeesOptions(formattedBatch);
  };

  const handleAddFee = () => {
    setFeeStructures((prev) => [
      ...prev,
      { selectedFees: null, feesAmount: "" },
    ]);
  };

  const handleRemoveFee = (indexToRemove) => {
    setFeeStructures((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const handleFeeChange = (index, key, value) => {
    const updated = [...feeStructures];
    updated[index][key] = value;
    setFeeStructures(updated);
  };

  const cleanedFees = feeStructures.map((fee) => ({
    amount: fee.feesAmount,
    headid: fee.selectedFees?.value,
  }));

  const handleInstallmentSubmit = (receivedInstallments) => {
    setInstallmentsDetails(receivedInstallments);
  };
  // console.log(installmentsDetails);
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // ✅ Allowed image types
    const allowedTypes = ["image/png", "image/jpeg"];
    if (!allowedTypes.includes(file.type)) {
      alert("Only PNG and JPEG files are allowed.");
      return;
    }

    const fileName = file.name;
    let parts = fileName.split(".");
    let name = parts[0];
    setSelectedFile(fileName);

    const uuid = uuidv4();
    const newFileName = `${uuid}-${name}`;

    const formData = new FormData();
    formData.append("file", file, newFileName);

    // for (let pair of formData.entries()) {
    //   console.log(`${pair[0]}:`, pair[1]);
    // }

    // 🔁 Uncomment when ready to upload
    try {
      const response = await axios.post(
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
    setBatchName("");
    setDescription("");
    setSelectedFaculty(null);
    setSelectMode(modeOptions[0]);
    setSelectPayment(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
    setSelectedFile("");
    setFeeStructures([{ selectedFees: null, feesAmount: "" }]);
    setSelectedOptionsQualification([]);
    setSelectedCoursesOptions(null); // setAdditionalQuery("");
    setSelectedOrganization(null);
    setInstallmentsDetails([]);
    setSelectedDurations(null);
    setDurationCount(null);
    setSelectedDurations(null);
    setSelectedBranch([]);
    setSelectedBatch(null);
    setLoading(false); // ✅ Reset loading state here
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const errors = getValidationErrors({
      batchName,
      selectedQualification,
      selectedCoursesOptions,
      selectedBatch,
      selectedBranch,
      durationCount,
      selectedDurations,
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors); // show error messages under fields
      setLoading(false); // 🔁 This is essential

      return;
    }

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
      // courseid: selectedCoursesOptions?.map((c) => c.value).join(","),
      courseid: selectedCoursesOptions?.value,
      batch_banner: selectedFile,
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
      batch_locations: selectedBranch.map((item) => ({
        branchid: item.value,
        venue: item.label,
      })),
      batch_fees: cleanedFees,
      batch_students: stdId,
      installments_details: installmentsDetails,
    };
    // console.log(batchFormData);

    try {
      const res = await axios.post(`${API_PATH}/api/Batch`, batchFormData, {
        params: {
          APIKEY: API_KEY,
        },
      });
      // console.log("✅ Batch created successfully:", res?.data);
      toast.success("Batch created successfully");
      // refreshList(1);
    } catch (error) {
      console.error("❌ Failed to create batch:", error);
      toast.error(error?.name);
    } finally {
      toggle(); // ⬅️ close modal
      refreshList(); // ⬅️ refresh list after modal closes
      resetForm();
      resetSelected();
      setLoading(false);
    }
    resetForm();
  };

  const toggleInstallment = () => {
    setinstallmentModalOpen((prev) => !prev);
  };

  // Inside the component
  const totalFees = useMemo(() => {
    return feeStructures.reduce((sum, item) => {
      const amount = parseFloat(item.feesAmount);
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);
  }, [feeStructures]);

  return (
    <div>
      <Modal
        isOpen={modal}
        toggle={toggle}
        size="xl"
        centered
        backdrop="static"
        keyboard={false}
      >
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

          <ModalBody
            style={{ overflowY: "auto", maxHeight: "calc(100vh - 210px)" }}
          >
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
                        setFormErrors((prev) => ({ ...prev, batchName: "" }));
                      }}
                      error={formErrors.batchName}
                      required
                    />
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label>
                        Minimum Qualification
                        <span className="text-danger">*</span>
                      </Label>
                      <Select
                        options={qualificationOptions}
                        value={selectedQualification}
                        onChange={(selected) => {
                          setSelectedOptionsQualification(selected);
                          setFormErrors((prev) => ({
                            ...prev,
                            selectedQualification: "",
                          }));
                        }}
                        onMenuOpen={fetchQualificationLists}
                        menuPortalTarget={document.body}
                        menuPosition="fixed"
                        styles={{
                          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                        }}
                        menuShouldScrollIntoView={false}
                      />
                      {formErrors.selectedQualification && (
                        <div className="text-danger mt-1">
                          {formErrors.selectedQualification}
                        </div>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
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
                  <Col md={6}>
                    <FormGroup>
                      <Label>Banner Image</Label>
                      <Input
                        type="file"
                        name="resume"
                        id="resume"
                        accept=".png,.jpeg,"
                        onChange={handleFileChange}
                        innerRef={fileInputRef}
                      />
                      <p style={{ fontSize: "0.875rem", color: "#6c757d" }}>
                        Supported files: PNG/JPEG. Max 10 MB.
                      </p>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label>
                        Courses<span className="text-danger">*</span>
                      </Label>
                      <Select
                        // isMulti
                        // closeMenuOnSelect={false}
                        closeMenuOnSelect={true}
                        hideSelectedOptions={false}
                        components={{ Option: CheckboxOption }}
                        options={courseOptions}
                        value={selectedCoursesOptions}
                        onChange={(selected) => {
                          setSelectedCoursesOptions(selected);
                          setFormErrors((prev) => ({
                            ...prev,
                            selectedCoursesOptions: "",
                          }));
                        }}
                        onMenuOpen={fetchCourseDetails}
                        menuPortalTarget={document.body}
                        menuPosition="fixed"
                        styles={{
                          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                        }}
                        menuShouldScrollIntoView={false}
                      />
                      {formErrors.selectedCoursesOptions && (
                        <div className="text-danger mt-1">
                          {formErrors.selectedCoursesOptions}
                        </div>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="duration" className="form-label">
                        Duration<span className="text-danger">*</span>
                      </Label>
                      <Row className="mb-2">
                        <Col xs={12} sm={5} className="mb-2 mb-sm-0">
                          <Input
                            type="number"
                            placeholder="Duration"
                            min={1}
                            value={durationCount}
                            onChange={(e) => {
                              setDurationCount(e.target.value);
                              setFormErrors((prev) => ({
                                ...prev,
                                durationCount: "",
                              }));
                            }}
                            style={{
                              height: "38px", // match react-select default height
                              borderRadius: "4px",
                            }}
                          />
                          {formErrors.durationCount && (
                            <div className="text-danger mt-1">
                              {formErrors.durationCount}
                            </div>
                          )}
                        </Col>
                        <Col xs={12} sm={7}>
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
                              menuPortalTarget={document.body}
                              menuPosition="fixed"
                              styles={{
                                menuPortal: (base) => ({
                                  ...base,
                                  zIndex: 9999,
                                }),
                              }}
                              menuShouldScrollIntoView={false}
                            />
                            {formErrors.selectedDurations && (
                              <div className="text-danger mt-1">
                                {formErrors.selectedDurations}
                              </div>
                            )}
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
                        menuPortalTarget={document.body}
                        menuPosition="fixed"
                        styles={{
                          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                        }}
                        menuShouldScrollIntoView={false}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label>Faculty</Label>
                      <Select
                        isMulti
                        // closeMenuOnSelect={false}
                        closeMenuOnSelect={true}
                        hideSelectedOptions={false}
                        components={{ Option: CheckboxOption }}
                        options={facultyOptions}
                        value={selectedFaculty}
                        onChange={(selected) => {
                          setSelectedFaculty(selected);
                        }}
                        onMenuOpen={handleFaculty}
                        menuPortalTarget={document.body}
                        menuPosition="fixed"
                        styles={{
                          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                        }}
                        menuShouldScrollIntoView={false}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="batchLevel" className="form-label">
                        Batch Level<span className="text-danger">*</span>
                      </Label>
                      <Select
                        id="batchLevel"
                        options={batchOptions}
                        value={selectedBatch}
                        onChange={(selected) => {
                          setSelectedBatch(selected);
                          setFormErrors((prev) => ({
                            ...prev,
                            selectedBatch: "",
                          }));
                        }}
                        placeholder="Select Batch Level"
                        isClearable
                        onMenuOpen={handleBatchLevel}
                      />
                      {formErrors.selectedBatch && (
                        <div className="text-danger mt-1">
                          {formErrors.selectedBatch}
                        </div>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="payment" className="form-label">
                        Payment
                      </Label>
                      <Row>
                        <Col md={6} sm={12} className="mb-2 mb-sm-2">
                          <Select
                            id="payment"
                            options={paymentOptions}
                            value={selectPayment}
                            onChange={(selected) => setSelectPayment(selected)}
                            placeholder="Select Payment"
                            // isClearable
                            menuPortalTarget={document.body}
                            menuPosition="fixed"
                            styles={{
                              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                            }}
                            menuShouldScrollIntoView={false}
                          />
                        </Col>
                        {selectPayment?.label === "Paid Organization" && (
                          <Col md={6} sm={12}>
                            <Select
                              id="organization"
                              options={organizationOptions}
                              value={selectedOrganization}
                              onChange={(selected) =>
                                setSelectedOrganization(selected)
                              }
                              placeholder="Select Organization"
                              menuPortalTarget={document.body}
                              menuPosition="fixed"
                              styles={{
                                menuPortal: (base) => ({
                                  ...base,
                                  zIndex: 9999,
                                }),
                              }}
                              menuShouldScrollIntoView={false}
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
                        Batch Locations<span className="text-danger">*</span>
                      </Label>
                      <Select
                        isMulti
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        components={{ Option: CheckboxOption }}
                        options={branchOptions}
                        value={selectedBranch}
                        onChange={(selected) => {
                          setSelectedBranch(selected);
                          setFormErrors((prev) => ({
                            ...prev,
                            selectedBranch: "",
                          }));
                        }}
                        onInputChange={(e) => setBranchSearchText(e)}
                        isClearable
                        isLoading={isLoading}
                        menuPortalTarget={document.body}
                        menuPosition="fixed"
                        styles={{
                          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                        }}
                        menuShouldScrollIntoView={false}
                      />
                      {formErrors.selectedBranch && (
                        <div className="text-danger mt-1">
                          {formErrors.selectedBranch}
                        </div>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={8}>
                    <FormGroup>
                      <div className="d-flex justify-content-between align-items-center">
                        <Label
                          for="branch"
                          className="form-label mb-0 d-inline-flex align-items-center"
                          style={{
                            fontWeight: "bold",
                            position: "relative",
                            paddingRight: "50px",
                          }}
                        >
                          Fee Structure
                          <Button
                            onClick={toggleInstallment}
                            style={{
                              // border: "1px solid #5e72e4",
                              // borderRadius: "4px",
                              padding: "0 6px",
                              fontSize: "12px",
                              marginLeft: "8px",
                              backgroundColor: "#5e72e4",
                              color: "#ffffff",
                              position: "absolute",
                              right: -40,
                              bottom: 10,
                            }}
                          >
                            installment
                          </Button>
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
                      {showFeeFields &&
                        feeStructures.map((fee, index) => (
                          <Row className="mt-2" key={index}>
                            <Col xs={5}>
                              <Select
                                options={courseFeesOptions}
                                value={fee.selectedFees}
                                onChange={(selected) =>
                                  handleFeeChange(
                                    index,
                                    "selectedFees",
                                    selected
                                  )
                                }
                                onMenuOpen={handleCourseFees}
                                isClearable
                                menuPortalTarget={document.body}
                                menuPosition="fixed"
                                styles={{
                                  menuPortal: (base) => ({
                                    ...base,
                                    zIndex: 9999,
                                  }),
                                }}
                                menuShouldScrollIntoView={false}
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
                                    value={fee.feesAmount}
                                    onChange={(e) =>
                                      handleFeeChange(
                                        index,
                                        "feesAmount",
                                        e.target.value
                                      )
                                    }
                                    style={{
                                      height: "38px",
                                      borderRadius: "4px",
                                    }}
                                  />
                                </div>

                                <div
                                  onClick={handleAddFee}
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

                                {feeStructures.length > 1 && (
                                  <div
                                    onClick={() => handleRemoveFee(index)}
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
                                )}
                              </div>
                            </Col>
                          </Row>
                        ))}
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
            <Button color="primary" onClick={handleSubmit} disabled={loading}>
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Submitting...
                </>
              ) : (
                " Submit"
              )}
            </Button>
            <Button
              color="secondary"
              onClick={() => {
                resetForm();
                setFormErrors({});
                resetSelected(); // ✅ Clear selected checkboxes
                toggle();
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Card>
      </Modal>
      <InstallModal
        modal={installmentModalOpen}
        toggle={toggleInstallment}
        onSubmitInstallment={handleInstallmentSubmit}
        totalFees={totalFees} // Add this line
      />
      <ToastContainer />
    </div>
  );
};

export default React.memo(BatchModal);
