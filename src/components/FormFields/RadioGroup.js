import React from "react";
import { FormGroup, Label, Input, Row, Col } from "reactstrap";

const RadioGroup = ({ label, name, options }) => {
  return (
    <FormGroup tag="fieldset" className="mb-3">
      <Label className="d-block mb-2">{label}</Label>
      <Row className="gy-2">
        {options.map((opt, idx) => {
          const value = opt.toLowerCase().replace(/\s+/g, "");
          return (
            <Col xs="12" sm="6" md="auto" key={idx}>
              <FormGroup check className="d-flex align-items-center">
                <Input
                  type="radio"
                  name={name}
                  id={`${name}-${value}`}
                  value={opt}
                  className="me-2"
                />
                <Label check for={`${name}-${value}`} className="mb-0">
                  {opt}
                </Label>
              </FormGroup>
            </Col>
          );
        })}
      </Row>
    </FormGroup>
  );
};

export default RadioGroup;
