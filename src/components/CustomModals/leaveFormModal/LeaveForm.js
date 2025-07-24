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
  Table,
  FormGroup,
  Label,
  Form,
} from "reactstrap";
import Select from "react-select";
import InputField from "components/FormFields/InputField";
import TextAreaField from "components/FormFields/TextAreaField";
import { useSelector } from "react-redux";
import { getValidationErrors } from "utils/validations/createBatchValidation";

const leaveTypeOptions = [
  { value: 1, label: "sick" },
  { value: 2, label: "paid" },
  { value: 3, label: "unpaid" },
  { value: 4, label: "maturnity" },
  { value: 5, label: "paturnity" },
];

const LeaveForm = ({ modal, toggle }) => {
  const { name, email, mobileno } = useSelector((state) => state?.auth);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [descError, setDescError] = useState("");

  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description.trim()) {
      setDescError("Description is required.");
      return;
    } else if (description.length > 1000) {
      setDescError("Description must not exceed 1000 characters.");
      return;
    }
    setDescError("");
  };

  return (
    <Modal isOpen={modal} toggle={toggle} size="lg" centered backdrop="static">
      <ModalHeader
        toggle={toggle}
        className="bg-white border-bottom"
        style={{ position: "sticky", top: 0, zIndex: 10 }}
      >
        <div className="h1 mb-0">Leave Form</div>
      </ModalHeader>
      <ModalBody>
        <Form>
          <Row>
            <Col md={6}>
              <InputField
                label="Full Name"
                id="fullName"
                type="text"
                value={name}
              />
            </Col>
            <Col md={6}>
              <InputField label="Email" id="email" type="text" value={email} />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <InputField
                label="Contact Number"
                id="contact"
                type="number"
                value={mobileno}
              />
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>Leave Type</Label>
                <Select
                  options={leaveTypeOptions}
                  menuPortalTarget={document.body}
                  menuPosition="fixed"
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  }}
                  menuShouldScrollIntoView={false}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <TextAreaField
                label="Description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                error={descError}
              />
              {/* {descError && <div className="text-danger mt-1">{descError}</div>} */}
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>Upload Attachment</Label>
                <Input
                  type="file"
                  name="attachment"
                  id="attachment"
                  accept=".pdf,.doc,.docx"
                  //   onChange={handleFileChange}
                />
                <p style={{ fontSize: "0.875rem", color: "#6c757d" }}>
                  Supported files: PDF/DOC. Max 10 MB.
                </p>
              </FormGroup>
            </Col>
          </Row>
          <div className="text-end">
            <Button type="submit" color="primary" onClick={handleSubmit}>
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Submitting ...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </Form>
      </ModalBody>
      <ModalFooter></ModalFooter>
    </Modal>
  );
};

export default LeaveForm;
