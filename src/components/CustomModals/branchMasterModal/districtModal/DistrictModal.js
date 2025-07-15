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
import InputField from "components/FormFields/InputField";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import useBranchList from "customHookApi/EnquiryDashboardApi/useBranchList";
import { useBranchQuery } from "reducer/admin/branch/branchSliceApi";
import { skipToken } from "@reduxjs/toolkit/query";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

const DistrictModal = ({ modal, toggle }) => {
  const [loading, setLoading] = useState(false);
  const [branchSearchText, setBranchSearchText] = useState("");
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [districtMenuOpen, setDistrictMenuOpen] = useState(false);

  // const {
  //   branchOptions,
  //   setBranchOptions,
  //   isLoading,
  //   fetchBranch,
  //   setBranchSearchText,
  //   branchSearchText,
  // } = useBranchList();

  const { data: stateOptionsRaw = [], isLoading } = useBranchQuery(
    branchSearchText.length >= 3
      ? { branchtype: "1", parent_branch_id: "", searchtext: branchSearchText }
      : skipToken,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const { data: districtOptionsRaw = [], isLoading: isLoadingDistrict } =
    useBranchQuery(
      selectedBranch?.value
        ? {
            branchtype: "2",
            parent_branch_id: selectedBranch?.value,
            searchtext: "",
          }
        : skipToken,
      {
        refetchOnMountOrArgChange: true,
      }
    );

  // Convert to react-select format
  const branchOptions =
    stateOptionsRaw?.map((branch) => ({
      label: branch?.BranchName,
      value: branch?.BranchId,
    })) || [];

  const districtOptions =
    districtOptionsRaw?.map((branch) => ({
      label: branch?.BranchName,
      value: branch?.BranchId,
    })) || [];

  const resetAll = () => {
    setSelectedBranch(null);
    setBranchSearchText("");
    setSelectedDistrict(null);
    // setDistrictMenuOpen(false); // 👈 Reset trigger
  };

  // useEffect(() => {
  //   if (branchSearchText.length < 3) {
  //     setBranchOptions([]);
  //     return;
  //   }

  //   fetchBranch("1");
  // }, [branchSearchText]);

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
    // const districtOptions = await fetchBranch("2", selectedBranch?.value);
    // console.log(districtOptions);
    // setDistrict(districtOptions); // ✅ This will work
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
                  }}
                  onInputChange={(e) => setBranchSearchText(e)}
                  isClearable
                  isLoading={isLoading}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              {/* <FormGroup>
                <Label>District</Label>
                <Select
                  options={districtOptions}
                  value={selectedDistrict}
                  onChange={(selected) => {
                    setSelectedDistrict(selected);
                  }}
                  // onMenuOpen={() => setDistrictMenuOpen(true)} // 👈 Trigger API call                  isClearable
                  isLoading={isLoading}
                />
              </FormGroup> */}
              <InputField
                label="District"
                id="district"
                type="text"
                // value={batchCapacity}
                // onChange={(e) => setBatchCapacity(e.target.value)}
              />
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
