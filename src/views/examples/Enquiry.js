import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  Button,
  Label,
  FormGroup,
} from "reactstrap";
import Header from "components/Headers/Header";
import InputField from "components/FormFields/InputField";
import RadioGroup from "components/FormFields/RadioGroup";
// import SelectField from "components/FormFields/SelectField";
// import CheckboxGroup from "components/FormFields/CheckboxGroup";
import TextAreaField from "components/FormFields/TextAreaField";
import FileUploadField from "components/FormFields/FileUploadField";
import React, { useState } from "react";
import Select from "react-select";

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
];
const branch = [
  { value: "bhopal", label: "Bhopal" },
  { value: "indore", label: "Indore" },
  { value: "jabalpur", label: "Jabalpur" },
  { value: "vidisha", label: "Vidisha" },
];
const Enquiry = () => {
  const [selectedQualification, setSelectedOptionsQualification] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState(enquiry[0]);
  const [selectedProduct, setSelectedProduct] = useState();
  const [selectedBranch, setSelectedBranch] = useState([]);

  // const [isConfirmed, setIsConfirmed] = useState(false);

  // const handleCheckboxChange = () => {
  //   setIsConfirmed(!isConfirmed);
  // };
  const handleSubmit = (e) => {
    e.preventDefault();

    // if (!isConfirmed) {
    //   console.log("Please confirm the details before submitting.");
    //   return;
    // }

    // console.log("Form submitted successfully.");
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
    <>
      <Header />
      <Container className="mt--9" fluid>
        <Row className="justify-content-center">
          <Col lg={12}>
            <Card className="shadow">
              <CardHeader className="bg-white">
                <div className="d-flex justify-content-between align-items-center w-100 pb-2">
                  <h1 className="mb-0">Enquiry Form</h1>
                  <div style={{ width: "200px" }}>
                    <Select
                      options={enquiry}
                      value={selectedEnquiry}
                      onChange={handleEnquiry}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardBody>
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
                      <InputField
                        label="Contact Number"
                        id="contact"
                        type="tel"
                      />
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
                    <Col md={6}>
                      {selectedEnquiry.value === "course" ? (
                        <FormGroup>
                          <Label for="Courses">Preferred Courses</Label>
                          <Select
                            options={options}
                            isMulti
                            value={selectedOptions}
                            onChange={handleChange}
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
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Enquiry;
