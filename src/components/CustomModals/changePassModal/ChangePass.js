// import React from "react";
// import { Modal, ModalHeader, ModalBody, Table } from "reactstrap";
// import axios from "axios";

// const API_PATH = process.env.REACT_APP_API_PATH;
// const API_KEY = process.env.REACT_APP_API_KEY;

// const ChangePass = ({ modal, toggle }) => {
//   return (
//     <Modal
//       isOpen={modal}
//       toggle={toggle}
//       size="sm"
//       centered
//       backdrop="static"
//       keyboard={false}
//     >
//       <ModalHeader toggle={toggle} className="bg-white border-bottom">
//         <h1>Change Password</h1>
//       </ModalHeader>

//       <ModalBody style={{ overflowY: "auto", maxHeight: "50vh" }}>
//         <h1>TAHA</h1>
//       </ModalBody>
//     </Modal>
//   );
// };

// export default ChangePass;

import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import axios from "axios";
import { toast } from "react-toastify";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

const ChangePass = ({ modal, toggle }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.warning("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    // setLoading(true);
    // try {
    //   const userId = localStorage.getItem("userId"); // or fetch from Redux
    //   const response = await axios.post(
    //     `${process.env.REACT_APP_API_PATH}/api/ChangePassword`,
    //     {
    //       userId,
    //       oldPassword,
    //       newPassword,
    //     }
    //   );

    //   toast.success("Password changed successfully!");
    //   toggle();
    // } catch (error) {
    //   toast.error("Failed to change password.");
    //   console.error(error);
    // } finally {
    //   setLoading(false);
    //   setOldPassword("");
    //   setNewPassword("");
    //   setConfirmPassword("");
    // }
  };

  return (
    <Modal isOpen={modal} toggle={toggle} size="sm" centered backdrop="static">
      <ModalHeader toggle={toggle}>
        <h1 className="">Change Password</h1>
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="oldPassword">Old Password</Label>
            <Input
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="newPassword">New Password</Label>
            <Input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="confirmPassword">Confirm Password</Label>
            <Input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={handlePasswordChange}
          disabled={loading}
        >
          {loading ? "Saving..." : "Change Password"}
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ChangePass;
