import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

const FileUploadField = ({ label, id }) => (
  <FormGroup>
    <Label for={id}>{label}</Label>
    <Input type="file" name={id} id={id} accept=".pdf,.doc,.docx" />
    <p style={{ fontSize: "0.875rem", color: "#6c757d" }}>
      Supported files: PDF/DOC. Max 10 MB.
    </p>
  </FormGroup>
);

export default FileUploadField;
