import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
import PropTypes from "prop-types";

const FileUploadFieldK = ({ label, id, onChange }) => (
  <FormGroup>
    <Label for={id}>{label}</Label>
    <Input
      type="file"
      name={id}
      id={id}
      accept=".csv,.xlsx"
      onChange={onChange}
    />
    <p style={{ fontSize: "0.875rem", color: "#6c757d" }}>
      Supported files: CSV/XLSX. Max 10 MB.
    </p>
  </FormGroup>
);
FileUploadFieldK.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
export default FileUploadFieldK;
