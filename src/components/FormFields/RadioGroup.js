import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

const RadioGroup = ({ label, name, options }) => {
  return (
    <FormGroup tag="fieldset">
      <Label>{label}</Label>
      {/* <Col md={4}> */}
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        {options.map((opt, idx) => {
          const value = opt.toLowerCase().replace(/\s+/g, "");
          return (
            <FormGroup check key={idx}>
              <Input type="radio" name={name} id={`${name}-${value}`} />
              <Label check for={`${name}-${value}`}>
                {opt}
              </Label>
            </FormGroup>
          );
        })}
      </div>
      {/* </Col> */}
    </FormGroup>
  );
};

export default RadioGroup;
