import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

const TextAreaField = ({ label, id }) => (
  <FormGroup>
    <Label for={id}>{label}</Label>
    <Input
      type="textarea"
      name={id}
      id={id}
      placeholder={`Write something about your ${label.toLowerCase()}...`}
      rows="1"
    />
  </FormGroup>
);

export default TextAreaField;
