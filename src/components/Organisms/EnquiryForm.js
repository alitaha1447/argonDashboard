import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Form,
  Button,
  Label,
  FormGroup,
  // Input,
  // CardHeader,
  CardBody,
} from "reactstrap";
import InputField from "components/FormFields/InputField";
// import RadioGroup from "components/FormFields/RadioGroup";
import TextAreaField from "components/FormFields/TextAreaField";
import FileUploadField from "components/FormFields/FileUploadField";
import RadioGroupField from "components/FormFields/RadioGroup";
import EnquiryFormCardHeader from "components/Molecules/EnquiryFormCardHeader";
// import EnquiryFormCardBody from "components/Molecules/EnquiryFormCardBody";
import Select, { components } from "react-select";
import axios from "axios";
// import { mandatoryFields } from "utils/validations/enquiryValidation";
import { ToastContainer, toast } from "react-toastify";
import { getValidationErrors } from "utils/validations/enquiryValidation";

// DATA
import { genderOptions, refOptions, enquiry } from "DummyData";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

const EnquiryForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState(null);
  const [referedBy, setReferedBy] = useState(null);
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [additionalQuery, setAdditionalQuery] = useState("");
  // Qualifications
  const [qualificationOptions, setQualificationOptions] = useState([]);
  const [selectedQualification, setSelectedOptionsQualification] =
    useState(null);
  // Prefered Courses
  const [courseOptions, setCourseOptions] = useState([]);
  const [selectedCoursesOptions, setSelectedCoursesOptions] = useState(null);
  // Branch
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [branchOptions, setBranchOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [branchSearchText, setBranchSearchText] = useState("");
  //  Products
  const [productOptions, setProductOptions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedEnquiry, setSelectedEnquiry] = useState(enquiry[0]);
  const [formErrors, setFormErrors] = useState({});

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setContactNumber("");
    setAddress("");
    setGender(null);
    setReferedBy(null);
    setWhatsappNumber("");
    setAdditionalQuery("");
    setSelectedOptionsQualification(null);
    setSelectedCoursesOptions("");
    setSelectedProduct(null);
    setSelectedBranch(null);
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isCourseEnquiry =
      selectedEnquiry?.label === "Course Enquiry" ||
      selectedEnquiry?.label === "Internship Enquiry";
    // const isValid = mandatoryFields({
    //   fullName,
    //   contactNumber,
    //   email,
    //   isCourseEnquiry,
    //   selectedQualification,
    //   selectedCoursesOptions,
    // });

    // if (!isValid) return;

    const errors = getValidationErrors({
      fullName,
      contactNumber,
      email,
      isCourseEnquiry,
      selectedQualification,
      selectedCoursesOptions,
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors); // show error messages under fields
      return;
    }
    const enquiryFormdata = {
      EnquiryType: selectedEnquiry?.value,
      Name: fullName,
      Email: email,
      Mobileno: contactNumber,
      Address: address,
      Gender: gender?.value,
      Qualification: !isCourseEnquiry ? null : selectedQualification?.value,
      Course:
        isCourseEnquiry &&
        selectedCoursesOptions?.map((c) => c.value).join(","),
      Product: !isCourseEnquiry ? selectedProduct?.value : null,
      Branch: !isCourseEnquiry ? null : selectedBranch?.value,
      ReferedBy: referedBy?.value,
      WhatsappNo: whatsappNumber,
      AdditionalQuery: additionalQuery,
      CreatedBy: "Developer",
    };

    try {
      const res = await axios.post(
        `${API_PATH}/api/SaveEnquiry`,
        enquiryFormdata,
        {
          params: {
            APIKEY: "12345678@",
          },
        }
      );
      toast.success("Enquiry submitted successfully!");
      console.log("DATA --> ", enquiryFormdata);
      console.log("✅ Enquiry submitted successfully:", res.data);
    } catch (error) {
      console.error("❌ Failed to submit enquiry:", error);
    }
    resetForm();
  };
  // Qualifications
  const fetchQualificationLists = async () => {
    try {
      const res = await axios.get(`${API_PATH}/api/GetQualification`, {
        params: {
          APIKEY: API_KEY,
          // searchtext: branchSearchText,
        },
      });

      const formattedQualification = res.data.map((item) => ({
        label: item.QualificationName,
        value: item.QualificationId,
      }));
      setQualificationOptions(formattedQualification);
    } catch (error) {
      console.log(`qualification_Error ---> ${error}`);
    }
  };
  // Prefered Courses
  const fetchCourseDetails = async () => {
    try {
      const res = await axios.get(`${API_PATH}/api/GetCourse`, {
        params: {
          APIKEY: API_KEY,
          // searchtext: branchSearchText,
        },
      });
      const formattedCourses = res.data.map((item) => ({
        value: item.Id,
        label: item.TopicTitle,
      }));
      setCourseOptions(formattedCourses);
    } catch (error) {
      console.log(`course_Error ---> ${error}`);
    }
  };
  // branches
  useEffect(() => {
    if (branchSearchText.length < 3) {
      setBranchOptions([]);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${API_PATH}/api/branches`, {
          params: {
            APIKEY: API_KEY,
            searchtext: branchSearchText,
          },
        });

        const options =
          res.data?.map((branch) => ({
            label: branch?.BranchName || `Branch ${branch?.BranchId}`,
            value: branch?.BranchId,
          })) || [];

        setBranchOptions(options);
      } catch (err) {
        console.error("Branch fetch error:", err);
        setBranchOptions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [branchSearchText]);

  // Custom Option component with checkbox
  const CheckboxOption = (props) => {
    return (
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
  };
  // ProductLists
  const fetchProductLists = async () => {
    try {
      const res = await axios.get(`${API_PATH}/api/GetProduct`, {
        params: {
          APIKEY: API_KEY,
          // searchtext: branchSearchText,
        },
      });

      const formattedProduct = res.data.map((item) => ({
        value: item.Id,
        label: item.Name,
      }));
      setProductOptions(formattedProduct);
    } catch (error) {
      console.log(`product_Error ---> ${error}`);
    }
  };
  // const handleEnquiry = (selected) => {
  //   setSelectedEnquiry(selected);
  // };

  return (
    <>
      <EnquiryFormCardHeader
        enquiry={enquiry}
        selectedEnquiry={selectedEnquiry}
        handleEnquiry={(selected) => {
          setSelectedEnquiry(selected);
        }}
      />
      {/* <CardHeader className="bg-white">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center w-100 pb-2 gap-2">
          <h1 className="mb-2 mb-md-0">Enquiry Form</h1>
          <div style={{ width: "200px" }}>
            <Select
              options={enquiry}
              value={selectedEnquiry}
              onChange={handleEnquiry}
            />
          </div>
        </div>
      </CardHeader> */}
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
                  setFormErrors((prev) => ({ ...prev, fullName: "" }));
                }}
                error={formErrors.fullName}
                required={true}
              />
            </Col>
            <Col md={6}>
              <InputField
                label="Email"
                id="email"
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setFormErrors((prev) => ({ ...prev, email: "" }));
                }}
                error={formErrors.email}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <InputField
                label="Contact Number"
                id="contact"
                type="tel"
                value={contactNumber}
                onChange={(e) => {
                  setContactNumber(e.target.value);
                  setFormErrors((prev) => ({ ...prev, contactNumber: "" }));
                }}
                error={formErrors.contactNumber}
                required={true}
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
          {/* 
          <FormGroup tag="fieldset" className="mb-3">
            <Label className="d-block mb-2">{"Gender"}</Label>
            <Row>
              {genderOptions.map((option) => (
                <Col xs="12" sm="6" md="auto" key={option.value}>
                  <FormGroup check className="d-flex align-items-center">
                    <Input
                      type="radio"
                      name="gender"
                      value={option.value}
                      id={`gender-${option.value}`}
                      checked={gender?.value === option.value}
                      onChange={() => setGender(option)}
                      className="me-2"
                    />
                    <Label
                      check
                      for={`gender-${option.value}`}
                      className="mb-0"
                    >
                      {option.label}
                    </Label>
                  </FormGroup>
                </Col>
              ))}
            </Row>
          </FormGroup> */}
          <RadioGroupField
            label="Gender"
            name="gender"
            options={genderOptions}
            selected={gender}
            onChange={setGender}
            required={true}
          />

          <Row>
            {(selectedEnquiry?.label === "Course Enquiry" ||
              selectedEnquiry?.label === "Internship Enquiry") && (
              <Col md={6}>
                <FormGroup>
                  <Label for="Courses">
                    {" "}
                    Highest Qualification
                    <span className="text-danger ms-1">*</span>
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
                    onMenuOpen={async () => await fetchQualificationLists()}
                  />
                  {formErrors.selectedQualification && (
                    <div className="text-danger mt-1">
                      {formErrors.selectedQualification}
                    </div>
                  )}
                </FormGroup>
              </Col>
            )}

            <Col md={6}>
              {selectedEnquiry?.label === "Course Enquiry" ||
              selectedEnquiry?.label === "Internship Enquiry" ? (
                <FormGroup>
                  <Label for="Courses">
                    Preferred Courses{" "}
                    <span className="text-danger ms-1">*</span>
                  </Label>
                  <Select
                    inputId="Courses"
                    isMulti
                    closeMenuOnSelect={false}
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
                    onMenuOpen={async () => await fetchCourseDetails()}
                    styles={{
                      option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isSelected
                          ? "#f8f9fa"
                          : state.isFocused
                          ? "#f1f1f1"
                          : "white",
                        color: "black",
                      }),
                    }}
                  />
                  {formErrors.selectedCoursesOptions && (
                    <div className="text-danger mt-1">
                      {formErrors.selectedCoursesOptions}
                    </div>
                  )}
                </FormGroup>
              ) : (
                <FormGroup>
                  <Label for="Courses">Products</Label>
                  <Select
                    options={productOptions}
                    value={selectedProduct}
                    onChange={(selected) => setSelectedProduct(selected)}
                    onMenuOpen={async () => await fetchProductLists()}
                  />
                </FormGroup>
              )}
            </Col>
            {(selectedEnquiry?.label === "Course Enquiry" ||
              selectedEnquiry?.label === "Internship Enquiry") && (
              <Col md={6}>
                <FormGroup>
                  <Label for="Courses">Branch</Label>
                  <Select
                    id="branch-select"
                    options={branchOptions}
                    value={selectedBranch}
                    onChange={(selected) => setSelectedBranch(selected)}
                    onInputChange={(text) => setBranchSearchText(text)}
                    placeholder="Type at least 3 letters..."
                    isClearable
                    isLoading={isLoading}
                    noOptionsMessage={({ inputValue }) =>
                      inputValue.length < 3
                        ? "Type at least 3 characters to search"
                        : "No branches found"
                    }
                  />
                </FormGroup>
              </Col>
            )}
          </Row>
          {/* <RadioGroup
          label="How did you hear about us?"
          name="refSource"
          options={refOptions}
        /> */}
          {/* <FormGroup tag="fieldset" className="mb-3">
            <Label className="d-block mb-2">
              {"How did you hear about us?"}
            </Label>
            <Row>
              {refOptions.map((option) => (
                <Col xs="12" sm="6" md="auto" key={option.value}>
                  <FormGroup check className="d-flex align-items-center">
                    <Input
                      type="radio"
                      name="referedBy"
                      value={option.value}
                      id={`referedBy-${option.value}`}
                      checked={referedBy?.value === option.value}
                      onChange={() => setReferedBy(option)}
                      className="me-2"
                    />
                    <Label
                      check
                      for={`referedBy-${option.value}`}
                      className="mb-0"
                    >
                      {option.label}
                    </Label>
                  </FormGroup>
                </Col>
              ))}
            </Row>
          </FormGroup> */}
          <RadioGroupField
            label="How did you hear about us?"
            name="referedBy"
            options={refOptions}
            selected={referedBy}
            onChange={setReferedBy}
          />
          <Row>
            <Col md={6}>
              <InputField
                label="WhatsApp Number for Updates"
                id="whatsapp"
                type="tel"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
              />
            </Col>
            <Col md={6}>
              <TextAreaField
                label="Any Additional Query"
                id="about"
                value={additionalQuery}
                onChange={(e) => setAdditionalQuery(e.target.value)}
              />
            </Col>
          </Row>
          {selectedEnquiry.label === "Course Enquiry" && (
            <FileUploadField label="Upload Resume" id="resume" />
          )}
          <div className="text-end">
            <Button type="submit" color="primary">
              Submit
            </Button>
          </div>
        </Form>
      </CardBody>
      <ToastContainer />
    </>
  );
};

export default EnquiryForm;
