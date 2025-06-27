import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Button,
} from "reactstrap";
import Select from "react-select";
import TextAreaField from "components/FormFields/TextAreaField";
import useStatusEnquiry from "customHookApi/EnquiryDashboardApi/useStatusEnquiry";
import axios from "axios";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

const StatusUpdate = ({ modal, toggle, selectedId, refreshList }) => {
  const [selectedStatus, setSelectedStatus] = useState(null);
  const { statusOptions, fetchEnquiry } = useStatusEnquiry();
  const [description, setDescription] = useState("");

  const handleUpdateClick = async () => {
    try {
      const updateStatus = await axios.post(
        `${API_PATH}/api/status`,
        {},
        {
          params: {
            APIKEY: API_KEY,
            id: `${selectedId}`,
            status: selectedStatus?.value,
            remark: description,
            createdby: "Developer",
          },
        }
      );
      refreshList(1);
    } catch (error) {
      console.log(`status upload error ---> ${error}`);
    } finally {
      toggle();
    }
  };
  return (
    <Modal
      isOpen={modal}
      toggle={toggle}
      size="lg"
      centered
      backdrop="static"
      keyboard={false}
    >
      <ModalHeader
        toggle={toggle}
        className="bg-white border-bottom"
        style={{ position: "sticky", top: 0, zIndex: 10 }}
      >
        <h1>Status Update</h1>
      </ModalHeader>
      <ModalBody
        style={{
          overflowY: "auto",
          maxHeight: "50vh",
        }}
      >
        <Form>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="status" className="form-label">
                  Status
                </Label>
                <Select
                  id="status"
                  options={statusOptions}
                  value={selectedStatus}
                  onChange={setSelectedStatus}
                  placeholder="Select Batch Level"
                  onMenuOpen={fetchEnquiry}
                  isClearable
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <TextAreaField
                label="Description"
                id="description"
                type="text"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </Col>
          </Row>
        </Form>
      </ModalBody>
      <ModalFooter
        className="bg-white border-top"
        style={{ position: "sticky", bottom: 0, zIndex: 10 }}
      >
        <Button color="primary" onClick={handleUpdateClick}>
          Update
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default React.memo(StatusUpdate);
