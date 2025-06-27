import { v4 as uuidv4 } from "uuid";
import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Label, FormGroup, Input } from "reactstrap";
import Select, { components } from "react-select";
import InputField from "components/FormFields/InputField";
import TextAreaField from "components/FormFields/TextAreaField";
import RadioGroupField from "components/FormFields/RadioGroup";
import { refOptions, genderOptions } from "DummyData";
import { getValidationErrors } from "utils/validations/enquiryValidation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import useQualificationList from "customHookApi/EnquiryDashboardApi/useQualificationList";
import usePreferredCourse from "customHookApi/EnquiryDashboardApi/usePreferredCourse";
import useBranchList from "customHookApi/EnquiryDashboardApi/useBranchList";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;
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

const EnquiryFormCardBody = ({ selectedEnquiry }) => {
  const isCourseEnquiry =
    selectedEnquiry?.label === "Course Enquiry" ||
    selectedEnquiry?.label === "Internship Enquiry";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState(null);
  const [referedBy, setReferedBy] = useState(null);
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [additionalQuery, setAdditionalQuery] = useState("");
  // Qualifications
  const [selectedQualification, setSelectedOptionsQualification] =
    useState(null);
  // Prefered Courses

  const [selectedCoursesOptions, setSelectedCoursesOptions] = useState(null);
  // Branch
  const [selectedBranch, setSelectedBranch] = useState(null);

  //  Products
  const [productOptions, setProductOptions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  // Qualifications
  const { qualificationOptions, fetchQualificationLists } =
    useQualificationList();
  const { courseOptions, fetchCourseDetails } = usePreferredCourse();

  // branches
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
  // FileUpload
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
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
      // console.log("fileUpload --> ", response);
      // console.log("Upload success:", response.data);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };
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
    setSelectedFile(null);
  };
  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isCourseEnquiry =
      selectedEnquiry?.label === "Course Enquiry" ||
      selectedEnquiry?.label === "Internship Enquiry";

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
      ResumePath: selectedFile,
      CreatedBy: "Developer",
    };
    // console.log(enquiryFormdata);
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
      // console.log("DATA --> ", enquiryFormdata);
      // console.log("✅ Enquiry submitted successfully:", res.data);
    } catch (error) {
      console.error("❌ Failed to submit enquiry:", error);
    }
    resetForm();
  };
  return (
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
            required
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
            required
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
            required
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

      <RadioGroupField
        label="Gender"
        name="gender"
        options={genderOptions}
        selected={gender}
        onChange={setGender}
        required
      />

      <Row>
        {isCourseEnquiry && (
          <Col md={6}>
            <FormGroup>
              <Label>
                Highest Qualification<span className="text-danger">*</span>
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
          {isCourseEnquiry ? (
            <FormGroup>
              <Label>
                Preferred Courses<span className="text-danger">*</span>
              </Label>
              <Select
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
                onMenuOpen={fetchCourseDetails}
              />
              {formErrors.selectedCoursesOptions && (
                <div className="text-danger mt-1">
                  {formErrors.selectedCoursesOptions}
                </div>
              )}
            </FormGroup>
          ) : (
            <FormGroup>
              <Label>Products</Label>
              <Select
                options={productOptions}
                value={selectedProduct}
                onChange={setSelectedProduct}
                onMenuOpen={fetchProductLists}
              />
            </FormGroup>
          )}
        </Col>

        {isCourseEnquiry && (
          <Col md={6}>
            <FormGroup>
              <Label>Branch</Label>
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
        )}
      </Row>

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
            id="additionalQuery"
            value={additionalQuery}
            onChange={(e) => setAdditionalQuery(e.target.value)}
          />
        </Col>
      </Row>

      {(selectedEnquiry.label === "Course Enquiry" ||
        selectedEnquiry.label === "Internship Enquiry") && (
        <FormGroup>
          <Label>Upload Resume</Label>
          <Input
            type="file"
            name="resume"
            id="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />
          <p style={{ fontSize: "0.875rem", color: "#6c757d" }}>
            Supported files: PDF/DOC. Max 10 MB.
          </p>
        </FormGroup>
      )}

      <div className="text-end">
        <Button type="submit" color="primary">
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default React.memo(EnquiryFormCardBody);
