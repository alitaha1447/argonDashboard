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
  Table,
} from "reactstrap";
import Select from "react-select";

const AssignBatch = ({ modal, toggle }) => {
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
        <h1>Assign Batch</h1>
      </ModalHeader>
      <ModalBody>
        <div className="d-flex flex-column gap-3 mb-3" style={{ gap: "1rem" }}>
          <Row>
            <Col md={6}>
              <div style={{}}>
                <Select
                  id="branch-select"
                  //   options={branchOptions}
                  //   value={selectedBranch}
                  //   onChange={(selected) => setSelectedBranch(selected)}
                  //   onInputChange={(text) => setBranchSearchText(text)}
                  placeholder="Select Batch"
                  //   isLoading={isLoading}
                  //   noOptionsMessage={({ inputValue }) =>
                  //     inputValue.length < 3
                  //       ? "Type at least 3 characters to search"
                  //       : "No branches found"
                  //   }
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
        <Button color="primary">Assign</Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AssignBatch;
