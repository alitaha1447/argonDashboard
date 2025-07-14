import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Card,
  Form,
  FormGroup,
  CardBody,
  Row,
  Col,
  Label,
  Input,
} from "reactstrap";
import Select from "react-select";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import useBranchList from "customHookApi/EnquiryDashboardApi/useBranchList";
import InputField from "components/FormFields/InputField";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

const VillageModal = ({
  modal,
  toggle,
  studentID,
  refreshList = () => {},
  resetSelected = () => {},
}) => {
  console.log(studentID);
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
      // console.log(res);
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
    console.log(assignBatchData);
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
      console.log(assignBatch);
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
        // style={{ position: "sticky", top: 0, zIndex: 10 }}
      >
        <h1>Village</h1>
      </ModalHeader>
      <ModalBody>
        <Form>
          <Row>
            <Col md={6}>
              <InputField
                label="State"
                id="state"
                type="text"
                //   value={batchName}
                //   onChange={(e) => {
                //     setBatchName(e.target.value);
                //     setFormErrors((prev) => ({ ...prev, batchName: "" }));
                //   }}
                //   error={formErrors.batchName}
                //   required
              />
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>District</Label>
                <Select
                // options={qualificationOptions}
                // value={selectedQualification}
                // onChange={(selected) => {
                //   setSelectedOptionsQualification(selected);
                //   setFormErrors((prev) => ({
                //     ...prev,
                //     selectedQualification: "",
                //   }));
                // }}
                // onMenuOpen={fetchQualificationLists}
                // menuPortalTarget={document.body}
                // menuPosition="fixed"
                // styles={{
                //   menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                // }}
                // menuShouldScrollIntoView={false}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label>Block</Label>
                <Select
                // options={qualificationOptions}
                // value={selectedQualification}
                // onChange={(selected) => {
                //   setSelectedOptionsQualification(selected);
                //   setFormErrors((prev) => ({
                //     ...prev,
                //     selectedQualification: "",
                //   }));
                // }}
                // onMenuOpen={fetchQualificationLists}
                // menuPortalTarget={document.body}
                // menuPosition="fixed"
                // styles={{
                //   menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                // }}
                // menuShouldScrollIntoView={false}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>GramPanchayat</Label>
                <Select
                // options={qualificationOptions}
                // value={selectedQualification}
                // onChange={(selected) => {
                //   setSelectedOptionsQualification(selected);
                //   setFormErrors((prev) => ({
                //     ...prev,
                //     selectedQualification: "",
                //   }));
                // }}
                // onMenuOpen={fetchQualificationLists}
                // menuPortalTarget={document.body}
                // menuPosition="fixed"
                // styles={{
                //   menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                // }}
                // menuShouldScrollIntoView={false}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label>Village</Label>
                <Select
                // options={qualificationOptions}
                // value={selectedQualification}
                // onChange={(selected) => {
                //   setSelectedOptionsQualification(selected);
                //   setFormErrors((prev) => ({
                //     ...prev,
                //     selectedQualification: "",
                //   }));
                // }}
                // onMenuOpen={fetchQualificationLists}
                // menuPortalTarget={document.body}
                // menuPosition="fixed"
                // styles={{
                //   menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                // }}
                // menuShouldScrollIntoView={false}
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </ModalBody>
      <ModalFooter
        className="bg-white border-top d-flex justify-content-start"
        // style={{ position: "sticky", bottom: 0, zIndex: 10, gap: "1rem" }}
      >
        <Button color="primary" onClick={handleAssignBatch}>
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Saving...
            </>
          ) : (
            " Save"
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

export default VillageModal;
