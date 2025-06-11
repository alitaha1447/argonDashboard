import React from "react";
import { FormGroup, Label, Input, Row, Col } from "reactstrap";

const CheckboxGroup = ({ label, name, options }) => (
  <FormGroup>
    <Label>{label}</Label>
    <Row>
      {options.map((opt, idx) => (
        <Col md={6} key={idx}>
          <FormGroup check>
            <Input type="checkbox" id={`${name}-${idx}`} name={name} />
            <Label check for={`${name}-${idx}`}>
              {opt}
            </Label>
          </FormGroup>
        </Col>
      ))}
    </Row>
  </FormGroup>
);

export default CheckboxGroup;
