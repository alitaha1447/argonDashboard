import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Button,
  Row,
  Col,
  Card,
  Label,
  FormGroup,
} from "reactstrap";
// import CheckboxGroup from "components/FormFields/CheckboxGroup";
import FileUploadField from "components/FormFields/FileUploadField";
import InputField from "components/FormFields/InputField";
import RadioGroup from "components/FormFields/RadioGroup";
// import SelectField from "components/FormFields/SelectField";
import TextAreaField from "components/FormFields/TextAreaField";
import Select, { components } from "react-select";

const products = [
  { value: "erp", label: "ERP" },
  { value: "onlineTest", label: "Online Test" },
  { value: "lms", label: "LMS" },
  { value: "e-commerce", label: "E-Commerce" },
];
const enquiry = [
  { value: "course", label: "Course Enquiry" },
  { value: "product", label: "Product Enquiry" },
];
const qualificationOptions = [
  { value: "10th", label: "10th" },
  { value: "12th", label: "12th" },
  { value: "Diploma", label: "Diploma" },
  { value: "Graduate", label: "Graduate" },
  { value: "Post Graduate", label: "Post Graduate" },
];
const genderOptions = ["Male", "Female", "Prefer not to say"];
const refOptions = ["Social Media", "Friends / Relatives", "Website", "Other"];
const options = [
  { value: "MERN", label: "MERN" },
  { value: "MEAN", label: "BaMEANnana" },
  { value: "Full Stack Web Development", label: "Full Stack Web Development" },
  { value: "C/C++/Data Structures", label: "C/C++/Data Structures" },
  { value: "Java Full Stack", label: "Java Full Stack" },
  { value: "Python ", label: "Python" },
  { value: "PHP ", label: "PHP" },
  { value: "Artificial Intelligence ", label: "Artificial Intelligence" },
  { value: "Machine Learning ", label: "Machine Learning" },
  { value: "Big Data ", label: "Big Data" },
  { value: "Data Science ", label: "Data Science" },
  { value: "Data Analytics ", label: "Data Analytics" },
  {
    value: "IT Security & Ethical Hacking ",
    label: "IT Security & Ethical Hacking",
  },
  { value: "Cloud Computing ", label: "Cloud Computing" },
  { value: "Devops ", label: "Devops" },
  { value: "AWS ", label: "AWS" },
  { value: "Other ", label: "Other" },
  { value: "MERN", label: "MERN" },
  { value: "MEAN", label: "BaMEANnana" },
  { value: "Full Stack Web Development", label: "Full Stack Web Development" },
  { value: "C/C++/Data Structures", label: "C/C++/Data Structures" },
  { value: "Java Full Stack", label: "Java Full Stack" },
  { value: "Python ", label: "Python" },
  { value: "PHP ", label: "PHP" },
  { value: "Artificial Intelligence ", label: "Artificial Intelligence" },
  { value: "Machine Learning ", label: "Machine Learning" },
  { value: "Big Data ", label: "Big Data" },
  { value: "Data Science ", label: "Data Science" },
  { value: "Data Analytics ", label: "Data Analytics" },
  {
    value: "IT Security & Ethical Hacking ",
    label: "IT Security & Ethical Hacking",
  },
  { value: "Cloud Computing ", label: "Cloud Computing" },
  { value: "Devops ", label: "Devops" },
  { value: "AWS ", label: "AWS" },
  { value: "Other ", label: "Other" },
];

const branch = [
  { value: "bhopal", label: "Bhopal" },
  { value: "indore", label: "Indore" },
  { value: "jabalpur", label: "Jabalpur" },
  { value: "vidisha", label: "Vidisha" },
];

const EnquiryModal = ({ modal, toggle, handleSubmit }) => {
  const [selectedQualification, setSelectedOptionsQualification] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState(enquiry[0]);
  const [selectedProduct, setSelectedProduct] = useState();
  const [selectedBranch, setSelectedBranch] = useState([]);

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

  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };
  const handleChangeQualification = (selected) => {
    setSelectedOptionsQualification(selected);
  };
  const handleEnquiry = (selected) => {
    setSelectedEnquiry(selected);
  };
  const handleProduct = (selected) => {
    setSelectedProduct(selected);
  };
  const handleChangeBranch = (selected) => {
    setSelectedBranch(selected);
  };
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
              <h1 className="">Enquiry Form</h1>
              <div style={{ width: "200px" }}>
                <Select
                  options={enquiry}
                  value={selectedEnquiry}
                  onChange={handleEnquiry}
                />
              </div>
            </div>
          </ModalHeader>

          <ModalBody style={{ overflowY: "auto" }}>
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
              <RadioGroup
                label="Gender"
                name="gender"
                options={genderOptions}
              />
              <Row>
                {selectedEnquiry.value === "course" && (
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
                )}

                <Col md={6}>
                  {selectedEnquiry.value === "course" ? (
                    <FormGroup>
                      <Label for="Courses">Preferred Courses</Label>
                      <Select
                        options={options}
                        isMulti
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        components={{ Option: CheckboxOption }}
                        value={selectedOptions}
                        onChange={handleChange}
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
                        options={branch}
                        value={selectedBranch}
                        onChange={handleChangeBranch}
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
              )}{" "}
              <div className="text-end">
                <Button type="submit" color="primary">
                  Submit
                </Button>
              </div>
            </Form>
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

export default EnquiryModal;
