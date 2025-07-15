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
import InputField from "components/FormFields/InputField";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import useBranchList from "customHookApi/EnquiryDashboardApi/useBranchList";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

const BlockModal = ({ modal, toggle }) => {
  const [loading, setLoading] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [district, setDistrict] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [block, setBlock] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(null);

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

    setSelectedBlock(null);
    setBlock([]);
  };

  useEffect(() => {
    if (branchSearchText.length < 3) {
      setBranchOptions([]);
      return;
    }

    fetchBranch();
  }, [branchSearchText]);

  const fetchDistrict = async () => {
    if (!selectedBranch?.value) return; // ✅ Exit if no state selected
    const res = await axios.get(`${API_PATH}/api/Branches`, {
      params: {
        APIKEY: API_KEY,
        branchtype: "2",
        parent_branch_id: selectedBranch?.value,
      },
    });
    const options =
      res.data?.map((branch) => ({
        label: branch?.BranchName,
        value: branch?.BranchId,
      })) || [];
    setDistrict(options);
  };

  const fetchBlock = async () => {
    if (!selectedDistrict?.value) return; // ✅ Exit if no state selected
    const res = await axios.get(`${API_PATH}/api/Branches`, {
      params: {
        APIKEY: API_KEY,
        branchtype: "3",
        parent_branch_id: selectedDistrict?.value,
      },
    });
    const options =
      res.data?.map((branch) => ({
        label: branch?.BranchName,
        value: branch?.BranchId,
      })) || [];
    setBlock(options);
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
        toggle={() => {
          resetAll(); // ✅ Clear State, District, Block
          toggle(); // ✅ Close Modal
        }}
        className="bg-white border-bottom"
        // style={{ position: "sticky", top: 0, zIndex: 10 }}
      >
        <h1>Block</h1>
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
                    setSelectedDistrict(null); // Reset District
                    setDistrict([]); // Clear District Options
                    setSelectedBlock(null); // Reset Block
                    setBlock([]); // Clear Block Options
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
                    setSelectedBlock(null); // Reset Block
                    setBlock([]); // Clear Block Options
                  }}
                  onMenuOpen={fetchDistrict}
                  isClearable
                  isLoading={isLoading}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              {/* <FormGroup>
                <Label>Block</Label>
                <Select
                  options={block}
                  value={selectedBlock}
                  onChange={(selected) => {
                    setSelectedBlock(selected);
                  }}
                  onMenuOpen={fetchBlock}
                  isClearable
                  isLoading={isLoading}
                />
              </FormGroup> */}
              <InputField
                label="Block"
                id="block"
                type="text"
                // value={batchCapacity}
                // onChange={(e) => setBatchCapacity(e.target.value)}
              />
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

export default BlockModal;
