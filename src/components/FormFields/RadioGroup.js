import React from "react";
import { Row, Col, FormGroup, Input, Label } from "reactstrap";

const RadioGroupField = ({
  label,
  name,
  options,
  selected,
  onChange,
  required = false,
}) => (
  <FormGroup tag="fieldset" className="mb-3">
    <div className="d-flex">
      <Label className="d-block mb-2">{label}</Label>
      {required && <span className="text-danger ms-1">*</span>}
    </div>

    <Row>
      {options.map((option) => (
        <Col xs="12" sm="6" md="auto" key={option.value}>
          <FormGroup check className="d-flex align-items-center">
            <Input
              type="radio"
              name={name}
              value={option.value}
              id={`${name}-${option.value}`}
              checked={selected?.value === option.value}
              onChange={() => onChange(option)}
              className="me-2"
            />
            <Label check for={`${name}-${option.value}`} className="mb-0">
              {option.label}
            </Label>
          </FormGroup>
        </Col>
      ))}
    </Row>
  </FormGroup>
);

export default RadioGroupField;
