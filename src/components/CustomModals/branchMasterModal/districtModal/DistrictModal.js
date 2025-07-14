import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Row,
  Col,
  Label,
  Input,
} from "reactstrap";
import Select from "react-select";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import useBranchList from "customHookApi/EnquiryDashboardApi/useBranchList";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

const DistrictModal = ({ modal, toggle }) => {
  const [loading, setLoading] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [district, setDistrict] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

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

    setSelectedDistrict(null);
    setDistrict([]);
  };

  useEffect(() => {
    if (branchSearchText.length < 3) {
      setBranchOptions([]);
      return;
    }

    fetchBranch("1");
  }, [branchSearchText]);

  const fetchDistrict = async () => {
    // console.log(selectedBranch?.value);
    if (!selectedBranch?.value) return; // ✅ Exit if no state selected
    // const res = await axios.get(`${API_PATH}/api/Branches`, {
    //   params: {
    //     APIKEY: API_KEY,
    //     branchtype: "2",
    //     parent_branch_id: selectedBranch?.value,
    //   },
    // });
    // const options =
    //   res.data?.map((branch) => ({
    //     label: branch?.BranchName,
    //     value: branch?.BranchId,
    //   })) || [];
    // setDistrict(options);
    const districtOptions = await fetchBranch("2", selectedBranch?.value);
    // console.log(districtOptions);
    setDistrict(districtOptions); // ✅ This will work
  };
  // console.log(district);
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
          resetAll();
          toggle();
        }}
        className="bg-white border-bottom"
      >
        <h1>District</h1>
      </ModalHeader>
      <ModalBody>
        <Form>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="branchSearch">Search State</Label>
                <Select
                  options={branchOptions}
                  value={selectedBranch}
                  onChange={(selected) => {
                    setSelectedBranch(selected);
                    setSelectedDistrict(null);
                    setDistrict([]);
                  }}
                  onInputChange={(e) => setBranchSearchText(e)}
                  isClearable
                  isLoading={isLoading}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>District</Label>
                <Select
                  options={district}
                  value={selectedDistrict}
                  onChange={(selected) => {
                    setSelectedDistrict(selected);
                  }}
                  onMenuOpen={fetchDistrict}
                  isClearable
                  isLoading={isLoading}
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </ModalBody>
      <ModalFooter className="bg-white border-top d-flex justify-content-start">
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
            resetAll();
            toggle();
          }}
        >
          Cancel
        </Button>
      </ModalFooter>
      <ToastContainer />
    </Modal>
  );
};

export default DistrictModal;
