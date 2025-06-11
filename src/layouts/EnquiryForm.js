import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  Button,
} from "reactstrap";
// import Header from "components/Headers/Header";
import InputField from "components/FormFields/InputField";
import RadioGroup from "components/FormFields/RadioGroup";
import SelectField from "components/FormFields/SelectField";
import CheckboxGroup from "components/FormFields/CheckboxGroup";
import TextAreaField from "components/FormFields/TextAreaField";
import FileUploadField from "components/FormFields/FileUploadField";
import React from "react";

const qualificationOptions = [
  "10th",
  "12th",
  "Diploma",
  "Graduate",
  "Post Graduate",
];
const genderOptions = ["Male", "Female", "Prefer not to say"];
const refOptions = ["Social Media", "Friends / Relatives", "Website", "Other"];

const Enquiry = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const courseOptions = [
    "MERN",
    "MEAN",
    "Full Stack Web Development",
    "C/C++/Data Structures",
    "Java Full Stack",
    "Python",
    "PHP",
    "Artificial Intelligence",
    "Machine Learning",
    "Big Data",
    "Data Science",
    "Data Analytics",
    "IT Security & Ethical Hacking",
    "Cloud Computing",
    "Devops",
    "AWS/Azure",
    "Other",
  ];
  return (
    <>
      <Container className="container mt-5 mb-5" fluid>
        <Row className="justify-content-center">
          <Col lg={12}>
            <Card className="shadow">
              <CardHeader className="bg-white">
                <h1 className="mb-0" style={{ paddingBottom: "10px" }}>
                  Enquiry Form
                </h1>
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
                    <Col md={5}>
                      <SelectField
                        label="Highest Qualification"
                        id="qualification"
                        options={qualificationOptions}
                      />
                    </Col>
                    <Col md={7}>
                      <CheckboxGroup
                        label="Preferred Courses"
                        name="courses"
                        options={courseOptions}
                      />
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
                  <FileUploadField label="Upload Resume" id="resume" />
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
