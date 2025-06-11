import React from "react";
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
} from "reactstrap";
import CheckboxGroup from "components/FormFields/CheckboxGroup";
import FileUploadField from "components/FormFields/FileUploadField";
import InputField from "components/FormFields/InputField";
import RadioGroup from "components/FormFields/RadioGroup";
import SelectField from "components/FormFields/SelectField";
import TextAreaField from "components/FormFields/TextAreaField";

const qualificationOptions = [
  "10th",
  "12th",
  "Diploma",
  "Graduate",
  "Post Graduate",
];
const genderOptions = ["Male", "Female", "Prefer not to say"];
const refOptions = ["Social Media", "Friends / Relatives", "Website", "Other"];
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

const EnquiryModal = ({ modal, toggle, handleSubmit }) => {
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} size="lg" centered>
        <Card className="shadow border-0 mb-0" style={{ maxHeight: "90vh" }}>
          <ModalHeader
            toggle={toggle}
            className="bg-white border-bottom"
            style={{ position: "sticky", top: 0, zIndex: 10 }}
          >
            <h2 className="mb-0">Enquiry Form</h2>
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
