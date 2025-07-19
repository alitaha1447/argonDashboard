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
  FormGroup,
  Label,
} from "reactstrap";
import Select from "react-select";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import useBranchList from "customHookApi/EnquiryDashboardApi/useBranchList";
import { useSelector } from "react-redux";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

const AssignBatch = ({
  modal,
  toggle,
  studentID,
  refreshList = () => {},
  resetSelected = () => {},
}) => {
  const { id } = useSelector((state) => state.auth);
  // console.log(studentID);
  // const stdId = studentID.map((item) => ({
  //   enrollmentid: item.enrollmentid.toString(),
  // }));
  const defaultBranch = useSelector((state) => state.auth.selectedBranch);

  const [loading, setLoading] = useState(false);
  const [batch, setBatch] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [facultyNameOptions, setFacultyNameOptions] = useState([]);
  const [selectedFacultyName, setSelectedFacultyName] = useState(null);

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

  // useEffect(() => {
  //   if (branchSearchText.length < 3) {
  //     setBranchOptions([]);
  //     return;
  //   }
  //   fetchBranch();
  // }, [branchSearchText]);

  useEffect(() => {
    fetchBranch("", "", id); // sends id to third param
  }, []);

  const fetchFaculties = async () => {
    try {
      const res = await axios.get(`${API_PATH}/api/Get_Faculties`, {
        params: {
          APIKEY: API_KEY,
          branchid: null,
        },
      });
      // console.log(res.data);
      const formatted = res?.data.map((item, index) => ({
        value: item?.Id,
        label: item?.Name,
      }));
      setFacultyNameOptions(formatted);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBatches = async () => {
    const res = await axios.get(`${API_PATH}/api/GetBatch`, {
      params: {
        APIKEY: API_KEY,
      },
    });
    // console.log(res);
    const formattedEnquiry = res.data.map((item) => ({
      value: item.BatchID,
      label: item.BatchName,
    }));
    setBatch(formattedEnquiry);
  };

  const handleAssignBatch = async () => {
    setLoading(true);
    const assignBatchData = {
      batchid: selectedBatch?.value.toString(),
      batch_student: studentID.map((item) => ({
        BatchID: selectedBatch?.value.toString(),
        enrollmentid: item?.enrollmentid.toString(),
      })),
    };
    // console.log(assignBatchData);
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
      refreshList(1);
      // toggle();
      resetSelected(); // ✅ Reset checkbox selection
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

  // useEffect(() => {
  //   if (!defaultBranch || selectedBranch) return;

  //   const existsInOptions = branchOptions.some(
  //     (opt) => opt.value === defaultBranch.value
  //   );
  //   if (!existsInOptions) {
  //     setBranchOptions((prev) => [...prev, defaultBranch]);
  //     setSelectedBranch(defaultBranch);
  //   }
  //   // else {
  //   //   const matched = branchOptions.find(
  //   //     (opt) => opt.value === defaultBranch.value
  //   //   );
  //   //   if (matched) setSelectedBranch(matched);
  //   // }
  // }, [defaultBranch, branchOptions, selectedBranch]);

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
            <Col lg={4}>
              <FormGroup>
                <Label>Branch</Label>
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
              </FormGroup>
            </Col>
            <Col lg={4}>
              <FormGroup>
                <Label>Faculty Name</Label>

                <Select
                  id="selectedFacultyName"
                  options={facultyNameOptions}
                  value={selectedFacultyName}
                  onChange={(selected) => setSelectedFacultyName(selected)}
                  onMenuOpen={fetchFaculties}
                  placeholder="Select Faculty Name"
                  menuPortalTarget={document.body} // ✅ renders dropdown outside modal
                  menuPosition="fixed" // ✅ fixes position to avoid overflow
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  }}
                  // isClearable
                />
              </FormGroup>
            </Col>

            <Col lg={4}>
              <FormGroup>
                <Label>Batch</Label>

                <Select
                  id="batch-select"
                  options={batch}
                  value={selectedBatch}
                  onChange={setSelectedBatch}
                  onMenuOpen={fetchBatches}
                  placeholder="Select Batch"
                  menuPortalTarget={document.body} // ✅ renders dropdown outside modal
                  menuPosition="fixed" // ✅ fixes position to avoid overflow
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  }}
                />
              </FormGroup>
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
