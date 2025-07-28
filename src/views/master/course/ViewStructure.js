import React, { useState } from "react";
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Input,
  Label,
  FormGroup,
} from "reactstrap";
import Header from "components/Headers/Header";
import Select from "react-select";

// 🔹 Faculty Dropdown Component
const FacultySelect = ({ value, onChange }) => {
  const facultyOptions = [
    { label: "Prof. A.K. Sharma", value: "sharma" },
    { label: "Dr. Neha Verma", value: "verma" },
    { label: "Mr. Rajeev Mishra", value: "mishra" },
  ];

  return (
    <FormGroup>
      <Label for="faculty">Select Faculty</Label>
      <Select
        id="faculty"
        options={facultyOptions}
        value={value}
        onChange={onChange}
        placeholder="-- Select Faculty --"
        isClearable
      />
    </FormGroup>
  );
};

const ViewStructure = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [expandModule, setExpandModule] = useState(true);
  const [expandContent, setExpandContent] = useState(true);

  return (
    <>
      <Header />
      <Container fluid className="mt--7">
        <Card className="shadow">
          <CardHeader className="bg-white border-0">
            <h2 className="mb-0 text-dark">View Course Structure</h2>
          </CardHeader>

          <CardBody>
            {/* 🔹 Module + Content Section Combined */}
            <Row>
              <Col xs="12">
                <Card className="mb-4 border">
                  <CardHeader
                    className="bg-light d-flex justify-content-between align-items-center"
                    style={{ cursor: "pointer" }}
                    onClick={() => setExpandModule(!expandModule)}
                  >
                    <h5 className="mb-0 text-primary">
                      <i
                        className={`fa me-2 ${
                          expandModule ? "fa-caret-down" : "fa-caret-right"
                        }`}
                      ></i>
                      Module
                    </h5>
                  </CardHeader>

                  {expandModule && (
                    <CardBody>
                      {/* 🔹 Content Section inside Module */}
                      <Card className="border mt-1">
                        <CardHeader
                          className="bg-light d-flex justify-content-between align-items-center"
                          style={{ cursor: "pointer" }}
                          onClick={() => setExpandContent(!expandContent)}
                        >
                          <h5 className="mb-0 text-primary">
                            <i
                              className={`fa me-2 ${
                                expandContent
                                  ? "fa-caret-right"
                                  : "fa-caret-down"
                              }`}
                            ></i>
                            Content
                          </h5>
                        </CardHeader>

                        {!expandContent && (
                          <CardBody>
                            {/* 🔹 Date & Time Input */}
                            <Row>
                              <Col md="12">
                                <FormGroup>
                                  <Label for="datetime">
                                    Select Date & Time
                                  </Label>
                                  <Input
                                    id="datetime"
                                    type="datetime-local"
                                    value={selectedDate}
                                    onChange={(e) =>
                                      setSelectedDate(e.target.value)
                                    }
                                  />
                                </FormGroup>
                              </Col>
                            </Row>

                            {/* 🔹 Faculty Dropdown */}
                            <Row>
                              <Col md="12">
                                <FacultySelect
                                  value={selectedFaculty}
                                  onChange={setSelectedFaculty}
                                />
                              </Col>
                            </Row>

                            {/* 🔹 Additional content info */}
                            <p>
                              This is where content details (titles, videos,
                              etc.) will be shown.
                            </p>
                          </CardBody>
                        )}
                      </Card>
                    </CardBody>
                  )}
                </Card>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default ViewStructure;
