import React from "react";
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
} from "reactstrap";

import InputField from "components/FormFields/InputField";

const CourseMasterModal = ({ modal, toggle }) => {
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
        <h1>Course</h1>
      </ModalHeader>
      <ModalBody>
        <div className="d-flex flex-column gap-3 mb-3" style={{ gap: "1rem" }}>
          <Row>
            <Col md={6}>
              <InputField label="Course Name" id="courseName" type="text" />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div className=" d-flex align-items-center">
                <Label htmlFor="active" className=" mb-0 me-2">
                  Active
                </Label>
                <input
                  id="active"
                  type="checkbox"
                  //   className="form-check-input"
                />
              </div>
            </Col>
          </Row>
        </div>
      </ModalBody>
      <ModalFooter
        className="bg-white border-top d-flex justify-content-start"
        style={{ position: "sticky", bottom: 0, zIndex: 10, gap: "1rem" }}
      >
        <Button color="primary">Submit</Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CourseMasterModal;
