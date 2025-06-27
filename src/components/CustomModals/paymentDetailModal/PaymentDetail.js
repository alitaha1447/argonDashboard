import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Input,
  Button,
  Table,
} from "reactstrap";
import Select from "react-select";
import useBranchList from "customHookApi/EnquiryDashboardApi/useBranchList";

const PaymentDetail = ({ modal, toggle }) => {
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

  useEffect(() => {
    if (branchSearchText.length < 3) {
      setBranchOptions([]);
      return;
    }

    fetchBranch();
  }, [branchSearchText]);

  return (
    <Modal
      isOpen={modal}
      toggle={toggle}
      size="lg"
      centered
      backdrop="static"
      keyboard={false}
    >
      {/* <ModalHeader
        toggle={toggle}
        className="bg-white border-bottom"
        style={{ position: "sticky", top: 0, zIndex: 10 }}
      >
        <h1>Payment Details</h1>
      </ModalHeader> */}
      <ModalBody
        style={{
          overflowY: "auto",
          maxHeight: "auto",
        }}
      >
        {/* Dropdown Filters */}
        <div className="d-flex flex-column gap-3 mb-3" style={{ gap: "1rem" }}>
          <Row>
            <Col md={4}>
              <div style={{}}>
                <Select
                  id="branch-select"
                  options={branchOptions}
                  value={selectedBranch}
                  onChange={(selected) => setSelectedBranch(selected)}
                  onInputChange={(text) => setBranchSearchText(text)}
                  placeholder="Select Branch"
                  isLoading={isLoading}
                  noOptionsMessage={({ inputValue }) =>
                    inputValue.length < 3
                      ? "Type at least 3 characters to search"
                      : "No branches found"
                  }
                />
              </div>
            </Col>
            <Col md={4}>
              <div style={{}}>
                <Select
                  // options={enquiry}
                  // value={selectedEnquiry}
                  // onChange={handleEnquiry}
                  placeholder="Select Batch"
                />
              </div>
            </Col>
            <Col md={4}>
              {" "}
              <div style={{}}>
                <Select
                  // options={enquiry}
                  // value={selectedEnquiry}
                  // onChange={handleEnquiry}
                  placeholder="Select Student"
                />
              </div>
            </Col>
          </Row>
        </div>
        {/* Separator */}
        <div
          style={{
            borderBottom: "1px solid #dee2e6",
            marginBottom: "1rem",
          }}
        />
        <h1>Payment Details</h1>
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
            <tr>
              <th scope="col" className="text-center"></th>
              <th scope="col">Title</th>
              <th scope="col">Amount</th>
              <th scope="col">Due Date</th>
              <th scope="col">Late Fee</th>
              <th scope="col">Fine</th>
              <th scope="col">Input</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="d-flex justify-content-center align-items-center">
                  <Input
                    type="checkbox"
                    style={{ margin: 0 }}
                    // onClick={() => handleCheckId(item.Id)}
                  />
                </div>
              </td>
              <td>{"TAHA"}</td>
              <td>{"55000"}</td>
              <td>{"02-02-2025"}</td>
              <td>{"25000"}</td>
              <td>{"30000"}</td>
              <td>
                <Input
                  // id={id}
                  // name={id}
                  placeholder={`Enter Fees`}
                  type={"text"}
                  style={{ width: "100%", minWidth: "120px" }}
                  // value={value}
                  // onChange={onChange}
                />
              </td>
            </tr>
          </tbody>
        </Table>
      </ModalBody>
      <ModalFooter
        className="bg-white border-top"
        style={{ position: "sticky", bottom: 0, zIndex: 10 }}
      >
        <Button color="primary" onClick={() => navigate("/receiptForm")}>
          Payment
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default PaymentDetail;
