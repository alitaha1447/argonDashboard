import React from "react";
import { Row, Col, Form, Button, Label, FormGroup, Input } from "reactstrap";
import InputField from "components/FormFields/InputField";
import RadioGroup from "components/FormFields/RadioGroup";
import TextAreaField from "components/FormFields/TextAreaField";
import FileUploadField from "components/FormFields/FileUploadField";
import Select from "react-select";

const EnquiryForm = ({
  handleSubmit,
  fullName,
  setFullName,
  email,
  setEmail,
  contactNumber,
  setContactNumber,
  address,
  setAddress,
  // selectedGender,
  // setSelectedGender,
  gender,
  setGender,
  genderOptions,
  referedBy,
  setReferedBy,
  refOptions,
  whatsappNumber,
  setWhatsappNumber,
  additionalQuery,
  setAdditionalQuery,
  selectedEnquiry,
  // qualifications
  qualificationOptions,
  selectedQualification,
  handleChangeQualification,
  handleQualificationOpen,
  // courses
  courseOptions,
  selectedCoursesOptions,
  handleChangeCourse,
  handleCourseOpen,
  // products
  productOptions,
  selectedProduct,
  handleProduct,
  handleProductOpen,
  // branches
  branchOptions,
  selectedBranch,
  handleChangeBranch,
  handleBranchInputChange,
  isLoading,

  CheckboxOption,
}) => {
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <InputField
              label="Full Name"
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </Col>
          <Col md={6}>
            <InputField
              label="Email"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setContactNumber(e.target.value)}
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
                  <Label check for={`gender-${option.value}`} className="mb-0">
                    {option.label}
                  </Label>
                </FormGroup>
              </Col>
            ))}
          </Row>
        </FormGroup>

        {/* <RadioGroup label="Gender" name="gender" options={genderOptions} /> */}
        <Row>
          {selectedEnquiry.label === "Course Enquiry" && (
            <>
              <Col md={6}>
                <FormGroup>
                  <Label for="Courses">Highest Qualification</Label>
                  <Select
                    options={qualificationOptions}
                    value={selectedQualification}
                    onChange={handleChangeQualification}
                    onMenuOpen={handleQualificationOpen}
                  />
                </FormGroup>
              </Col>
            </>
          )}

          <Col md={6}>
            {selectedEnquiry.label === "Course Enquiry" ? (
              <FormGroup>
                <Label for="Courses">Preferred Courses</Label>
                <Select
                  inputId="Courses"
                  isMulti
                  closeMenuOnSelect={false}
                  hideSelectedOptions={false}
                  components={{ Option: CheckboxOption }}
                  options={courseOptions}
                  value={selectedCoursesOptions}
                  onChange={handleChangeCourse}
                  onMenuOpen={handleCourseOpen}
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
              </FormGroup>
            ) : (
              <FormGroup>
                <Label for="Courses">Products</Label>
                <Select
                  options={productOptions}
                  value={selectedProduct}
                  onChange={handleProduct}
                  onMenuOpen={handleProductOpen}
                />
              </FormGroup>
            )}
          </Col>
          {selectedEnquiry.label === "Course Enquiry" && (
            <Col md={6}>
              <FormGroup>
                <Label for="Courses">Branch</Label>
                <Select
                  id="branch-select"
                  options={branchOptions}
                  value={selectedBranch}
                  onChange={handleChangeBranch}
                  onInputChange={handleBranchInputChange}
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
        <FormGroup tag="fieldset" className="mb-3">
          <Label className="d-block mb-2">{"How did you hear about us?"}</Label>
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
        </FormGroup>
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
    </>
  );
};

export default EnquiryForm;
