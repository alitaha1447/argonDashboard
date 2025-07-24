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
import TextAreaField from "components/FormFields/TextAreaField";

const leaveOptions = [
  { value: 1, label: "Approved" },
  { value: 2, label: "Rejected" },
];

const LeaveStatus = ({ modal, toggle }) => {
  const [loading, setLoading] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Modal isOpen={modal} toggle={toggle} size="sm" centered backdrop="static">
      <ModalHeader
        toggle={toggle}
        className="bg-white border-bottom"
        style={{ position: "sticky", top: 0, zIndex: 10 }}
      >
        <div className="h2 mb-0">Leave Status</div>
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label>Status</Label>
            <Select
              id="leave-select"
              options={leaveOptions}
              value={selectedLeave}
              onChange={(selected) => setSelectedLeave(selected)}
              //   placeholder="Select Branch"
              menuPortalTarget={document.body} // ✅ renders dropdown outside modal
              menuPosition="fixed" // ✅ fixes position to avoid overflow
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
              }}
              isClearable
            />
          </FormGroup>
          <TextAreaField label="Remark" id="remark" />
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
    </Modal>
  );
};

export default LeaveStatus;
