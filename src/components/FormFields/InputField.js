import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

const InputField = ({
  label,
  id,
  type,
  value,
  onChange,
  error,
  required = false,
}) => {
  return (
    <FormGroup>
      <Label for={id}>{label}</Label>
      {required && <span className="text-danger ms-1">*</span>}
      <Input
        id={id}
        name={id}
        placeholder={`Enter ${label.toLowerCase()}`}
        type={type}
        value={value}
        onChange={onChange}
        invalid={!!error}
      />
      {error && <div className="text-danger mt-1">{error}</div>}{" "}
    </FormGroup>
  );
};

export default InputField;
