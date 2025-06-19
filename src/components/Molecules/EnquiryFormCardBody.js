import React from "react";
// import { Form, Row, Col, Button, Label } from "reactstrap";
// import InputField from "components/FormFields/InputField";
// import RadioGroupField from "components/FormFields/RadioGroup";
// import Select from "react-select";
// import TextAreaField from "components/FormFields/TextAreaField";
const EnquiryFormCardBody = ({}) => {
  return (
    <>
      {/* <Form onSubmit={handleSubmit}>
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

        <RadioGroupField
          label="Gender"
          name="gender"
          options={genderOptions}
          selected={gender}
          onChange={setGender}
        />

        <Row>
          {(selectedEnquiry?.label === "Course Enquiry" ||
            selectedEnquiry?.label === "Internship Enquiry") && (
            <Col md={6}>
              <FormGroup>
                <Label for="Courses">Highest Qualification</Label>
                <Select
                  options={qualificationOptions}
                  value={selectedQualification}
                  onChange={(selected) =>
                    setSelectedOptionsQualification(selected)
                  }
                  onMenuOpen={async () => await fetchQualificationLists()}
                />
              </FormGroup>
            </Col>
          )}

          <Col md={6}>
            {selectedEnquiry?.label === "Course Enquiry" ||
            selectedEnquiry?.label === "Internship Enquiry" ? (
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
                  onChange={(selected) => {
                    setSelectedCoursesOptions(selected);
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
      </Form> */}
    </>
  );
};

export default EnquiryFormCardBody;
