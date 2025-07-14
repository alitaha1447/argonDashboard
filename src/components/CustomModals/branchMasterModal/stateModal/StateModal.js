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

const StateModal = ({ modal, toggle }) => {
  const [loading, setLoading] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  // console.log(selectedBranch);
  const {
    branchOptions,
    setBranchOptions,
    isLoading,
    fetchBranch,
    setBranchSearchText,
    branchSearchText,
  } = useBranchList();

  const resetAll = () => {
    setSelectedBranch(null);
    setBranchSearchText("");
    setBranchOptions([]);
  };

  useEffect(() => {
    if (branchSearchText.length < 3) {
      setBranchOptions([]);
      return;
    }

    fetchBranch("1");
  }, [branchSearchText]);

  //   const handleAssignBatch = async () => {
  //     setLoading(true);
  //     const assignBatchData = {
  //       batchid: selectedBatch?.value.toString(),
  //       batch_student: studentID.map((item) => ({
  //         BatchID: selectedBatch?.value.toString(),
  //         enrollmentid: item?.enrollmentid.toString(),
  //       })),
  //     };
  //     console.log(assignBatchData);
  //     try {
  //       const assignBatch = await axios.post(
  //         `${API_PATH}/api/Assign_Batch`,
  //         assignBatchData,
  //         {
  //           params: {
  //             APIKEY: API_KEY,
  //           },
  //         }
  //       );
  //       console.log(assignBatch);
  //       toast.success("Batch Assigned Successfully!!");
  //       refreshList(1);
  //       // toggle();
  //       resetSelected(); // ✅ Reset checkbox selection
  //     } catch (error) {
  //       console.log(error);
  //       toast.error("Request failed with status code 404");
  //     } finally {
  //       setLoading(false);
  //       refreshList(1);
  //       toggle();
  //       resetSelected();
  //     }
  //   };
  const fetchState = async () => {};
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
        toggle={() => {
          resetAll(); // ✅ Clear State, District, Block
          toggle(); // ✅ Close Modal
        }}
        className="bg-white border-bottom"
        // style={{ position: "sticky", top: 0, zIndex: 10 }}
      >
        <h1>State</h1>
      </ModalHeader>
      <ModalBody>
        <Form>
          <Row>
            <Col md={7}>
              <FormGroup>
                <Label for="branchSearch">Search Branch</Label>
                <Select
                  //   closeMenuOnSelect={false}
                  //   hideSelectedOptions={false}
                  options={branchOptions}
                  value={selectedBranch}
                  onChange={(selected) => {
                    setSelectedBranch(selected);
                  }}
                  onInputChange={(e) => setBranchSearchText(e)}
                  isClearable
                  isLoading={isLoading}
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
        <Button color="primary">
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
        <Button
          color="secondary"
          onClick={() => {
            resetAll(); // Reset everything
            toggle(); // Close modal
          }}
        >
          Cancel
        </Button>
      </ModalFooter>
      <ToastContainer />
    </Modal>
  );
};

export default StateModal;
