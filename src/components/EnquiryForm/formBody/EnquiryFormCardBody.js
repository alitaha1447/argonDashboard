import { v4 as uuidv4 } from "uuid";
import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Label, FormGroup, Input } from "reactstrap";
import Select, { components } from "react-select";
import InputField from "components/FormFields/InputField";
import TextAreaField from "components/FormFields/TextAreaField";
import RadioGroupField from "components/FormFields/RadioGroup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { refOptions, genderOptions } from "DummyData";
import { getValidationErrors } from "utils/validations/enquiryValidation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import useQualificationList from "customHookApi/EnquiryDashboardApi/useQualificationList";
import usePreferredCourse from "customHookApi/EnquiryDashboardApi/usePreferredCourse";
import useBranchList from "customHookApi/EnquiryDashboardApi/useBranchList";
import { useSelector, useDispatch } from "react-redux";
import { clearSelectedEnquiryId } from "reducer/admin/enquiry/selectedEnquirySlice";
import { formatDateToDMY } from "utils/formattedDate/formatDateToDMY";

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

const EnquiryFormCardBody = ({
  selectedEnquiry,
  selectedEnquiryId,
  toggle = () => {},
  refreshList = () => {},
  refreshStats = () => {},
}) => {
  const userId = useSelector((state) => state?.auth?.id);
  const storedBranches = useSelector((state) => state.auth.selectedBranch);

  const isCourseEnquiry =
    selectedEnquiry?.label === "Course Enquiry" ||
    selectedEnquiry?.label === "Internship Enquiry";

  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState(null);
  const [referedBy, setReferedBy] = useState(null);
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [additionalQuery, setAdditionalQuery] = useState("");
  const [selectedQualification, setSelectedOptionsQualification] =
    useState(null);

  const [selectedCoursesOptions, setSelectedCoursesOptions] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [productOptions, setProductOptions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [formErrors, setFormErrors] = useState({});
  const { qualificationOptions, fetchQualificationLists } =
    useQualificationList();
  const { courseOptions, fetchCourseDetails } = usePreferredCourse();
  const [startDate, setStartDate] = useState(new Date());

  const {
    branchOptions,
    setBranchOptions,
    isLoading,
    fetchBranch,
    setBranchSearchText,
    branchSearchText,
  } = useBranchList();

  useEffect(() => {
    if (storedBranches) {
      setSelectedBranch(storedBranches);
    }
  }, [storedBranches]);

  useEffect(() => {
    fetchBranch("", "", userId);
  }, []);

  useEffect(() => {
    const fetchEnquiryDetails = async () => {
      if (!selectedEnquiryId) return;

      try {
        const [qualificationData, courseData, productData] = await Promise.all([
          fetchQualificationLists(),
          fetchCourseDetails(),
        ]);

        const res = await axios.get(`${API_PATH}/api/Get_Enquiry_Detail`, {
          params: {
            APIKEY: API_KEY,
            enquiryid: selectedEnquiryId,
          },
        });

        setFullName(res.data.Name || "");
        setEmail(res.data.Email || "");
        setContactNumber(res.data.Mobileno || "");
        setAddress(res?.data?.Address || "");
        setWhatsappNumber(res?.data?.WhatsappNo || "");
        setAdditionalQuery(res?.data?.AdditionalQuery || "");

        const genderObj = genderOptions.find(
          (g) => g.value === res?.data?.Gender
        );
        setGender(genderObj || null);

        const referObj = refOptions.find(
          (r) => r.value === res?.data?.ReferedBy
        );
        setReferedBy(referObj || null);
        setSelectedOptionsQualification(
          qualificationData.find((q) => q.value === res?.data?.Qualification) ||
            null
        );
        setSelectedCoursesOptions(
          courseData.find((q) => q.value === res?.data?.Course) || null
        );

        if (res.data.Product && productOptions.length > 0) {
          const productObj = productOptions.find(
            (p) => p.value === res?.data?.Product
          );
          setSelectedProduct(productObj || null);
        }

        if (res.data.Branch && branchOptions.length > 0) {
          const branchObj = branchOptions.find(
            (b) => b.value === res?.data?.Branch
          );
          setSelectedBranch(branchObj || null);
        }
      } catch (error) {
        console.error("❌ Failed to fetch enquiry details:", error);
      }
    };

    fetchEnquiryDetails();
  }, [selectedEnquiryId]);

  // ProductLists
  const fetchProductLists = async () => {
    try {
      const res = await axios.get(`${API_PATH}/api/GetProduct`, {
        params: {
          APIKEY: API_KEY,
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
    const inputId = event.target.id; // 'resume' or 'image

    if (!file) return;

    const fileName = file.name;
    let parts = fileName.split(".");
    let name = parts[0];

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
      if (inputId === "resume") {
        setResumeFile(newFileName);
      } else if (inputId === "image") {
        setImageFile(newFileName);
      }
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
    setResumeFile(null);
    setImageFile(null);
  };
  const handleSubmit = async (e) => {
    setLoading(true);
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
      gender,
      selectedBranch,
    });
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setLoading(false);

      return;
    }
    const formattedDate = (date) => {
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = String(d.getFullYear());

      return `${year}-${month}-${day}`;
    };
    const enquiryFormdata = {
      ...(selectedEnquiryId && { Id: selectedEnquiryId }),
      EnquiryType: selectedEnquiry?.value,
      Name: fullName,
      Email: email,
      Mobileno: contactNumber,
      Address: address,
      Gender: gender?.value,
      Qualification: !isCourseEnquiry ? null : selectedQualification?.value,
      Course: isCourseEnquiry ? selectedCoursesOptions?.value : 0,
      // Course: isCourseEnquiry
      //   ? selectedCoursesOptions?.map((c) => c.value).join(",")
      //   : 0,
      Product: !isCourseEnquiry ? selectedProduct?.value : null,
      Branch: !isCourseEnquiry ? null : selectedBranch?.value,
      ReferedBy: referedBy?.value,
      WhatsappNo: whatsappNumber,
      AdditionalQuery: additionalQuery,
      ResumePath: resumeFile,
      Img_path: imageFile,
      CreatedBy: userId ? userId.toString() : "",
      CreatedOn: formattedDate(startDate),
    };
    console.log(enquiryFormdata);

    try {
      const res = await axios.post(
        `${API_PATH}/api/SaveEnquiry`,
        enquiryFormdata,
        {
          params: {
            APIKEY: API_KEY,
          },
        }
      );
      toast.success(
        selectedEnquiryId
          ? "Enquiry updated successfully!"
          : "Enquiry submitted successfully!"
      );
      console.log("✅ Enquiry submitted successfully:", res);
      refreshList(1);
      refreshStats();
    } catch (error) {
      console.error("❌ Failed to submit enquiry:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
      resetForm();
      toggle();
    }
  };
  return (
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
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              let errorMessage = "";
              if (!e.target.value.trim()) {
                errorMessage = "Email is a mandatory field!";
              } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)) {
                errorMessage = "Please enter a valid email address!";
              }
              setFormErrors((prev) => ({ ...prev, email: errorMessage }));
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
            type="text"
            inputMode="numeric"
            value={contactNumber}
            onChange={(e) => {
              const value = e.target.value;

              if (/^\d*$/.test(value)) {
                setContactNumber(value);

                let errorMessage = "";
                if (!value.trim()) {
                  errorMessage = "Contact number is a mandatory field!";
                } else if (!/^\d{10}$/.test(value)) {
                  errorMessage = "Contact number must be exactly 10 digits!";
                }

                setFormErrors((prev) => ({
                  ...prev,
                  contactNumber: errorMessage,
                }));
              }
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
      <Row>
        {isCourseEnquiry && (
          <Col md={6}>
            <FormGroup>
              <Label>
                Branch<span className="text-danger">*</span>
              </Label>
              <Select
                options={branchOptions}
                value={selectedBranch}
                onChange={setSelectedBranch}
                onInputChange={setBranchSearchText}
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
        )}
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
      </Row>

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
        )}

        <Col md={6}>
          {isCourseEnquiry ? (
            <FormGroup>
              <Label>
                Courses<span className="text-danger">*</span>
              </Label>
              <Select
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
          ) : (
            <FormGroup>
              <Label>Products</Label>
              <Select
                options={productOptions}
                value={selectedProduct}
                onChange={setSelectedProduct}
                onMenuOpen={fetchProductLists}
                menuPortalTarget={document.body}
                menuPosition="fixed"
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                }}
                menuShouldScrollIntoView={false}
              />
            </FormGroup>
          )}
        </Col>

        <Col md={6}>
          <FormGroup>
            <Label for="startDate">Enquiry Date</Label>
            <div>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd-MM-yyyy"
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
            label="WhatsApp Number for Updates"
            id="whatsapp"
            type="tel"
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
          />
        </Col>
      </Row>

      <RadioGroupField
        label="How did you hear about us?"
        name="referedBy"
        options={refOptions}
        selected={referedBy}
        onChange={setReferedBy}
      />

      <Row>
        <Col md={12}>
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
        <Row>
          <Col md={5}>
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
      )}

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
              {selectedEnquiryId ? "Updating ..." : "Submitting ..."}
            </>
          ) : selectedEnquiryId ? (
            "Update"
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    </Form>
  );
};

export default React.memo(EnquiryFormCardBody);
