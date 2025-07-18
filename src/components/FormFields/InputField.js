import React, { useState } from "react";
import {
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";

const InputField = ({
  label,
  id,
  type,
  value,
  onChange,
  error,
  required = false,
  eyeIcon = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => setShowPassword((prev) => !prev);

  const isPassword = type === "password";
  return (
    <FormGroup>
      <Label for={id}>{label}</Label>
      {required && <span className="text-danger ms-1">*</span>}
      {eyeIcon && isPassword ? (
        <InputGroup>
          <Input
            id={id}
            name={id}
            placeholder={`Enter ${label.toLowerCase()}`}
            type={showPassword ? "text" : "password"}
            value={value}
            onChange={onChange}
            invalid={!!error}
          />
          <InputGroupText
            style={{ cursor: "pointer", fontSize: "20px" }}
            onClick={toggleVisibility}
          >
            {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
          </InputGroupText>
        </InputGroup>
      ) : (
        <Input
          id={id}
          name={id}
          placeholder={`Enter ${label.toLowerCase()}`}
          type={type}
          value={value}
          onChange={onChange}
          invalid={!!error}
        />
      )}
      {error && <div className="text-danger mt-1">{error}</div>}{" "}
    </FormGroup>
  );
};

export default InputField;
