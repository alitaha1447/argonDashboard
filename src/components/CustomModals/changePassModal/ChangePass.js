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
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Button,
} from "reactstrap";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import InputField from "components/FormFields/InputField";
import { getValidationErrors } from "utils/validations/changePassValidation";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

const ChangePass = ({ modal, toggle }) => {
  const { id, email } = useSelector((state) => state?.auth);
  const userID = id.toString();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [oldPassError, setOldPassError] = useState("");
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const toggleVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const resetForm = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setOldPassError("");
  };

  const callLoginApi = async () => {
    try {
      const loginResponse = await axios.get(`${API_PATH}/api/user_validate`, {
        params: {
          APIKEY: API_KEY,
          username: email,
          pwd: oldPassword,
        },
      });
      console.log(loginResponse);
      if (loginResponse?.status === 200 && loginResponse.data?.id) {
        setOldPassError("");
        return true; // ✅ password is valid
      } else {
        setOldPassError("Invalid credentials.");
        return false;
      }
    } catch (error) {
      if (error?.response?.status === 404) {
        setOldPassError("Incorrect old password. Please try again.");
        return false;
      }
    }
  };

  const handlePasswordChange = async () => {
    const isValidOldPassword = await callLoginApi();
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.warning("All fields are required.");
      return;
    }

    if (!isValidOldPassword) return; // ❌ Exit if old password is wrong
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${API_PATH}/api/Update_User_Password`,
        {},
        {
          params: {
            APIKEY: API_KEY,
            userid: userID,
            password: confirmPassword,
          },
        }
      );
      toast.success("Password changed successfully!");
      toggle();
    } catch (error) {
      toast.error("Failed to change password.");
      console.error(error);
    } finally {
      resetForm();
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={modal} toggle={toggle} size="sm" centered backdrop="static">
      <ModalHeader toggle={toggle}>
        <h1 className="">Change Password</h1>
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="oldPassword">
              Old Password <span className="text-danger">*</span>
            </Label>
            <InputGroup>
              <Input
                type={showPassword.old ? "text" : "password"}
                id="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <InputGroupText
                onClick={() => toggleVisibility("old")}
                style={{ cursor: "pointer" }}
              >
                {showPassword.old ? <IoIosEyeOff /> : <IoIosEye />}
              </InputGroupText>
            </InputGroup>
            {oldPassError && (
              <div className="text-danger mt-1">{oldPassError}</div>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="newPassword">
              New Password <span className="text-danger">*</span>
            </Label>
            <InputGroup>
              <Input
                type={showPassword.new ? "text" : "password"}
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <InputGroupText
                onClick={() => toggleVisibility("new")}
                style={{ cursor: "pointer" }}
              >
                {showPassword.new ? <IoIosEyeOff /> : <IoIosEye />}
              </InputGroupText>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label for="confirmPassword">
              Confirm Password <span className="text-danger">*</span>
            </Label>
            <InputGroup>
              <Input
                type={showPassword.confirm ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <InputGroupText
                onClick={() => toggleVisibility("confirm")}
                style={{ cursor: "pointer" }}
              >
                {showPassword.confirm ? <IoIosEyeOff /> : <IoIosEye />}
              </InputGroupText>
            </InputGroup>
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
        <Button
          color="secondary"
          onClick={() => {
            toggle();
            resetForm();
          }}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ChangePass;
