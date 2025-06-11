import React from "react";
import { FormGroup, Label, Input, Col } from "reactstrap";

const RadioGroup = ({ label, name, options }) => {
  return (
    <FormGroup tag="fieldset">
      <Label>{label}</Label>
      <Col md={4}>
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
      </Col>
    </FormGroup>
  );
};

export default RadioGroup;
