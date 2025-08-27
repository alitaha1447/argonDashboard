import React, { useState, useEffect } from "react";
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

const CourseMasterModal = ({ modal, toggle, refreshList, course }) => {
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseSequence, setCourseSequence] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const isEdit = course && course.Id;

  useEffect(() => {
    if (modal && isEdit) {
      setCourseName(course.TopicTitle || "");
      setCourseDescription(course.TopicDescription || "");
      setCourseSequence(course.DisplaySequence || "");
      setIsActive(course.IsActive === 1);
    } else if (modal) {
      // Clear form when opening in create mode
      setCourseName("");
      setCourseDescription("");
      setCourseSequence("");
      setIsActive(false);
    }
  }, [modal, course]);

  const validate = () => {
    const name = courseName.trim();
    const desc = courseDescription.trim();
    const seq = String(courseSequence).trim();

    if (!name) {
      toast.error("Course Name is required");
      return false;
    }
    if (!desc) {
      toast.error("Description is required");
      return false;
    }
    if (seq) {
      const n = Number(seq);
      if (!Number.isInteger(n) || n <= 0) {
        toast.error("Course Sequence must be a positive integer");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);

    const courseData = {
      TopicTitle: courseName,
      TopicDescription: courseDescription,
      IsActive: isActive ? 1 : 0,
      DisplaySequence: courseSequence || null,
    };
    const courseDataEdit = {
      Id: course.Id,
      TopicTitle: courseName,
      TopicDescription: courseDescription,
      IsActive: isActive ? 1 : 0,
      DisplaySequence: courseSequence || null,
    };

    try {
      if (isEdit) {
        const res = await axios.post(`${API_PATH}/api/Course`, courseDataEdit, {
          params: {
            APIKEY: API_KEY,
          },
        });
        toast.success("Course edited Successfully!!");
      } else {
        const res = await axios.post(`${API_PATH}/api/Course`, courseData, {
          params: {
            APIKEY: API_KEY,
          },
        });
        toast.success("Course created Successfully!!");
      }
      // const res = await axios.post(`${API_PATH}/api/Course`, courseData, {
      //   params: {
      //     APIKEY: API_KEY,
      //   },
      // });
      // toast.success("Course created Successfully!!");
      refreshList();
      toggle();
    } catch (error) {
      console.log("Error creating course:", error);
      toast.error(error?.name);
    } finally {
      setLoading(false);
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
        <h1 className="mb-0 fs-4">
          {isEdit ? "Edit Course" : "Create Course"}
        </h1>
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
        <Button color="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
              />
              {isEdit ? "Updating..." : "Submitting..."}
            </>
          ) : isEdit ? (
            "Update"
          ) : (
            "Submit"
          )}
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CourseMasterModal;
