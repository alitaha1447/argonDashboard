import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

const SelectField = ({ label, id, options }) => (
  <FormGroup>
    <Label for={id}>{label}</Label>
    <Input type="select" name={id} id={id}>
      <option value="">-- Select --</option>
      {options.map((opt, idx) => (
        <option key={idx}>{opt}</option>
      ))}
    </Input>
  </FormGroup>
);

export default SelectField;
