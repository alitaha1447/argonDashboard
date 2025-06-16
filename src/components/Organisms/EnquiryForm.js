import React from "react";
import { Row, Col, Form, Button, Label, FormGroup } from "reactstrap";
import InputField from "components/FormFields/InputField";
import RadioGroup from "components/FormFields/RadioGroup";
import TextAreaField from "components/FormFields/TextAreaField";
import FileUploadField from "components/FormFields/FileUploadField";
import Select from "react-select";

const EnquiryForm = ({
  handleSubmit,
  selectedEnquiry,
  selectedQualification,
  handleChangeQualification,
  selectedOptions,
  handleChangeCourse,
  selectedProduct,
  handleProduct,
  selectedBranch,
  handleChangeBranch,
  handleBranchInputChange,
  isLoading,
  branchOptions,
  genderOptions,
  refOptions,
  qualificationOptions,
  options,
  products,
  CheckboxOption,
}) => {
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <InputField label="Full Name" id="fullName" type="text" />
          </Col>
          <Col md={6}>
            <InputField label="Email" id="email" type="email" />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <InputField label="Contact Number" id="contact" type="tel" />
          </Col>
          <Col md={6}>
            <InputField label="Address" id="contact" type="text" />
          </Col>
        </Row>
        <RadioGroup label="Gender" name="gender" options={genderOptions} />
        <Row>
          {selectedEnquiry.value === "course" && (
            <>
              <Col md={6}>
                <FormGroup>
                  <Label for="Courses">Highest Qualification</Label>
                  <Select
                    options={qualificationOptions}
                    value={selectedQualification}
                    onChange={handleChangeQualification}
                  />
                </FormGroup>
              </Col>
            </>
          )}

          <Col md={6}>
            {selectedEnquiry.value === "course" ? (
              <FormGroup>
                <Label for="Courses">Preferred Courses</Label>
                <Select
                  inputId="Courses"
                  isMulti
                  closeMenuOnSelect={false}
                  hideSelectedOptions={false}
                  components={{ Option: CheckboxOption }}
                  options={options}
                  value={selectedOptions}
                  onChange={handleChangeCourse}
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
                  options={products}
                  value={selectedProduct}
                  onChange={handleProduct}
                />
              </FormGroup>
            )}
          </Col>
          {selectedEnquiry.value === "course" && (
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
        <RadioGroup
          label="How did you hear about us?"
          name="refSource"
          options={refOptions}
        />
        <Row>
          <Col md={6}>
            <InputField
              label="WhatsApp Number for Updates"
              id="whatsapp"
              type="tel"
            />
          </Col>
          <Col md={6}>
            <TextAreaField label="Any Additional Query" id="about" />
          </Col>
        </Row>
        {selectedEnquiry.value === "course" && (
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
