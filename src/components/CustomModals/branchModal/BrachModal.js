import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Button,
} from "reactstrap";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectBranch } from "reducer/auth/authSlice";
import axios from "axios";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

const BrachModal = ({ show, toggle, onConfirm }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [branchOptions, setBranchOptions] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);

  const userID = useSelector((state) => state?.auth?.id);
  const isorganisational = useSelector((state) => state?.auth.isorganisational);

  const defaultRoute =
    isorganisational === 0 ? "/admin/attendance" : "/admin/enquiryDashboard";


  const handleBranches = async () => {
    const res = await axios.get(`${API_PATH}/api/Get_user_branches`, {
      params: {
        APIKEY: API_KEY,
        userid: userID,
      },
    });
    // console.log(res?.data);
    const formattedData = res?.data.map((branch) => ({
      value: branch?.branchid,
      label: branch?.branchname,
    }));
    setBranchOptions(formattedData);
  };

  const handleConfirm = () => {
    if (selectedBranch) {
      dispatch(selectBranch(selectedBranch)); // ✅ Sets both selectedBranch and branchSelected = true
      toggle();
      navigate(defaultRoute);
    }
  };
  const handleCancel = () => {
    setSelectedBranch([]);
    toggle();
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
        <div className="h1 mb-0">Assign Batch</div>
      </ModalHeader>
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
                  placeholder="Select Branch"
                  menuPortalTarget={document.body} // ✅ renders dropdown outside modal
                  menuPosition="fixed" // ✅ fixes position to avoid overflow
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  }}
                  isClearable
                  onMenuOpen={handleBranches}
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
