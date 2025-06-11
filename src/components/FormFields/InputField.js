import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

const InputField = ({ label, id, type }) => {
  return (
    <FormGroup>
      <Label for={id}>{label}</Label>
      <Input
        id={id}
        name={id}
        placeholder={`Enter ${label.toLowerCase()}`}
        type={type}
      />
    </FormGroup>
  );
};

export default InputField;
