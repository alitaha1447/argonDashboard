import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import useBranchList from "customHookApi/EnquiryDashboardApi/useBranchList";

const BrachModal = ({ show, toggle, onConfirm }) => {
  const navigate = useNavigate();
  const [selectedBranch, setSelectedBranch] = useState(null);

  const {
    branchOptions,
    setBranchOptions,
    isLoading,
    fetchBranch,
    setBranchSearchText,
    branchSearchText,
  } = useBranchList();

  // Custom Option component with checkbox
  useEffect(() => {
    if (branchSearchText.length < 3) {
      setBranchOptions([]);
      return;
    }
    fetchBranch();
  }, [branchSearchText]);

  const handleConfirm = () => {
    localStorage.setItem("branches", JSON.stringify(selectedBranch));
    toggle();
    navigate("/admin/enquiryDashboard");
  };
  const handleCancel = () => {
    // Reset selected branches here (inside modal)
    setSelectedBranch([]); // or null
    toggle(); // Close modal
  };
  return (
    <Modal
      isOpen={show}
      toggle={toggle}
      size="sm"
      centered
      backdrop="static"
      keyboard={false}
    >
      <ModalHeader
        toggle={toggle}
        className="bg-white border-bottom"
        // style={{ position: "sticky", top: 0, zIndex: 10 }}
      >
        <h1>Select Branch</h1>
      </ModalHeader>{" "}
      <ModalBody>
        <div className="d-flex flex-column gap-3 mb-3" style={{ gap: "1rem" }}>
          <Row>
            <Col md={12}>
              <div style={{}}>
                <Select
                  id="branch-select"
                  options={branchOptions}
                  value={selectedBranch}
                  onChange={(selected) => setSelectedBranch(selected)}
                  onInputChange={(text) => setBranchSearchText(text)}
                  placeholder="Select Branch"
                  menuPortalTarget={document.body} // ✅ renders dropdown outside modal
                  menuPosition="fixed" // ✅ fixes position to avoid overflow
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  }}
                  isClearable
                  isLoading={isLoading}
                  noOptionsMessage={({ inputValue }) =>
                    inputValue.length < 3
                      ? "Type at least 3 characters to search"
                      : "No branches found"
                  }
                  isMulti
                />
              </div>
            </Col>
          </Row>
        </div>
      </ModalBody>
      <ModalFooter style={{ alignItems: "center", justifyContent: "center" }}>
        <Button color="primary" onClick={handleConfirm}>
          Confirm
        </Button>
        <Button color="secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default BrachModal;
