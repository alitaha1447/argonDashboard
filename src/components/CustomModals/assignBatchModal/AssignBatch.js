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
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import useBranchList from "customHookApi/EnquiryDashboardApi/useBranchList";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

const AssignBatch = ({
  modal,
  toggle,
  studentID,
  refreshList = () => {},
  resetSelected = () => {},
}) => {
  // console.log(studentID);
  // const stdId = studentID.map((item) => ({
  //   enrollmentid: item.enrollmentid.toString(),
  // }));
  const [loading, setLoading] = useState(false);
  const [batch, setBatch] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  // const [batchStudent, setBatchStudent] = useState([
  //   { BatchID: "", enrollmentid: "" },
  // ]);

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

  useEffect(() => {
    const fetchBatches = async () => {
      const res = await axios.get(`${API_PATH}/api/GetBatch`, {
        params: {
          APIKEY: API_KEY,
        },
      });
      console.log(res);
      const formattedEnquiry = res.data.map((item) => ({
        value: item.BatchID,
        label: item.BatchName,
      }));
      setBatch(formattedEnquiry);
    };
    fetchBatches();
  }, []);

  const handleAssignBatch = async () => {
    setLoading(true);
    const assignBatchData = {
      batchid: selectedBatch?.value.toString(),
      batch_student: studentID.map((item) => ({
        BatchID: selectedBatch?.value.toString(),
        enrollmentid: item?.enrollmentid.toString(),
      })),
    };

    try {
      // const assignBatch = await axios.post(
      //   `${API_PATH}/api/Assign_Batch`,
      //   assignBatchData,
      //   {
      //     params: {
      //       APIKEY: API_KEY,
      //     },
      //   }
      // );
      // console.log(assignBatch.data);
      // toast.success("Batch Assigned Successfully!!");
      // refreshList(1);
      // toggle();
      // resetSelected(); // ✅ Reset checkbox selection
    } catch (error) {
      console.log(error);
      toast.error("Request failed with status code 404");
    } finally {
      setLoading(false);
      refreshList(1);
      toggle();
      resetSelected();
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
        <h1>Assign Batch</h1>
      </ModalHeader>
      <ModalBody>
        <div className="d-flex flex-column gap-3 mb-3" style={{ gap: "1rem" }}>
          <Row>
            <Col md={4}>
              <div style={{}}>
                <Input
                  placeholder="Search by Faculty Name or Course"
                  type="text"
                  // value={searchText}
                  // onChange={handleUnifiedSearchChange}
                />
              </div>
            </Col>
            <Col md={4}>
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
                />
              </div>
            </Col>
            <Col md={4}>
              <div style={{}}>
                <Select
                  id="batch-select"
                  options={batch}
                  value={selectedBatch}
                  onChange={setSelectedBatch}
                  placeholder="Select Batch"
                  menuPortalTarget={document.body} // ✅ renders dropdown outside modal
                  menuPosition="fixed" // ✅ fixes position to avoid overflow
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  }}
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
        <Button color="primary" onClick={handleAssignBatch}>
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Assigning...
            </>
          ) : (
            " Assign"
          )}
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
      <ToastContainer />
    </Modal>
  );
};

export default AssignBatch;
