import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

const TextAreaField = ({ label, id, value, onChange, error }) => {
  return (
    <FormGroup>
      <Label for={id}>{label}</Label>
      <Input
        type="textarea"
        name={id}
        id={id}
        placeholder={`Write something about your ${label.toLowerCase()}...`}
        rows="1"
        value={value}
        onChange={onChange}
      />
      {error && <div className="text-danger mt-1">{error}</div>}
    </FormGroup>
  );
};

export default TextAreaField;
