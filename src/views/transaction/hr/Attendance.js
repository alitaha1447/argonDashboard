import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Col,
  Container,
  Row,
  Button,
} from "reactstrap";
import { useSelector } from "react-redux";

const Attendance = () => {
  const { name, email, mobileno, selectedBranch, isorganisational } =
    useSelector((state) => state?.auth);
  const st = isorganisational ? "TAHA" : "Student";

  return (
    <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
      <Container fluid>
        <div className="header-body">
          <Row>
            {isorganisational === 1 ? (
              <Col lg={4} md={6} className="mb-4">
                <Card className="h-100">
                  <CardBody>
                    <CardTitle tag="h2" className="text-primary fs-4">
                      Employee
                    </CardTitle>

                    <CardText className="mb-2">
                      <strong>Name:</strong>{" "}
                      <span className="text-break">{name}</span>
                    </CardText>
                    <CardText className="mb-2">
                      <strong className="me-1">Email:</strong>
                      <span className="text-break">{email}</span>
                    </CardText>

                    <CardText className="mb-2">
                      <strong>Contact No.:</strong>{" "}
                      <span className="text-break">{mobileno}</span>
                    </CardText>
                    <CardText className="mb-3">
                      <strong>Branch:</strong> {selectedBranch?.label}
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
            ) : (
              <Col lg={4}>
                <Card className="card-stats md-4 mb-xl-0">
                  <CardBody>
                    <CardTitle tag="h2" className="text-primary">
                      Batch 1
                    </CardTitle>

                    <CardText className="mb-xl-0">
                      <strong>Name:</strong> Taha
                    </CardText>
                    <CardText className="">
                      <strong>Age:</strong> 25
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
            )}
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Attendance;
