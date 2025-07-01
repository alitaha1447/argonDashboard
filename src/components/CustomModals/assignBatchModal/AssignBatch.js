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

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

const AssignBatch = ({ modal, toggle, studentID }) => {
  // console.log(studentID);
  // const stdId = studentID.map((item) => ({
  //   enrollmentid: item.enrollmentid.toString(),
  // }));
  const [batch, setBatch] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  // const [batchStudent, setBatchStudent] = useState([
  //   { BatchID: "", enrollmentid: "" },
  // ]);

  useEffect(() => {
    const fetchBatches = async () => {
      const res = await axios.get(`${API_PATH}/api/GetBatch`, {
        params: {
          APIKEY: API_KEY,
        },
      });
      const formattedEnquiry = res.data.map((item) => ({
        value: item.BatchID,
        label: item.BatchName,
      }));
      setBatch(formattedEnquiry);
    };
    fetchBatches();
  }, []);

  const handleAssignBatch = async () => {
    const assignBatchData = {
      batchid: selectedBatch?.value.toString(),
      batch_student: studentID.map((item) => ({
        BatchID: selectedBatch?.value.toString(),
        enrollmentid: item?.enrollmentid.toString(),
      })),
    };

    try {
      const assignBatch = await axios.post(
        `${API_PATH}/api/Assign_Batch`,
        assignBatchData,
        {
          params: {
            APIKEY: API_KEY,
          },
        }
      );
      // console.log(assignBatch);
      toast.success("Batch Assigned Successfully!!");
      toggle();
    } catch (error) {
      console.log(error);
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
        <h1>Assign Batch</h1>
      </ModalHeader>
      <ModalBody>
        <div className="d-flex flex-column gap-3 mb-3" style={{ gap: "1rem" }}>
          <Row>
            <Col md={6}>
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
          Assign
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
