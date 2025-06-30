import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Input,
  Button,
  Label,
  FormGroup,
} from "reactstrap";

import InputField from "components/FormFields/InputField";
import TextAreaField from "components/FormFields/TextAreaField";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

const CourseMasterModal = ({ modal, toggle }) => {
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseSequence, setCourseSequence] = useState("");
  const [isActive, setIsActive] = useState(false);

  const handleSubmit = async () => {
    const courseData = {
      TopicTitle: courseName,
      TopicDescription: courseDescription,
      IsActive: isActive ? 1 : 0,
      DisplaySequence: courseSequence || null,
    };
    // console.log(courseData);
    try {
      const res = await axios.post(`${API_PATH}/api/Course`, courseData, {
        params: {
          APIKEY: API_KEY,
        },
      });
      // console.log("Course created:", res);
      toast.success("Course created Successfully!!");
      toggle();
    } catch (error) {
      console.log("Error creating course:", error);
      toast.error(error?.name);
    }
  };

  return (
    <Modal
      isOpen={modal}
      toggle={toggle}
      size="md"
      centered
      backdrop="static"
      keyboard={false}
    >
      <ModalHeader
        toggle={toggle}
        className="bg-white border-bottom"
        style={{ position: "sticky", top: 0, zIndex: 10 }}
      >
        <h1 className="mb-0 fs-4">Create Course</h1>
      </ModalHeader>

      <ModalBody>
        <Row className="mb-3">
          <Col md={6}>
            <InputField
              label="Course Name"
              id="courseName"
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={12}>
            <TextAreaField
              label="Description"
              id="courseDescription"
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <InputField
              label="Course Sequence"
              id="courseSequence"
              type="number"
              value={courseSequence}
              onChange={(e) => setCourseSequence(e.target.value)}
            />
          </Col>

          <Col md={6} className="d-flex align-items-center mt-4">
            <FormGroup check className="d-flex align-items-center">
              <Input
                id="active"
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="me-2"
              />
              <Label for="active" className="mb-0">
                Is Active
              </Label>
            </FormGroup>
          </Col>
        </Row>
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
    </Modal>
  );
};

export default CourseMasterModal;
