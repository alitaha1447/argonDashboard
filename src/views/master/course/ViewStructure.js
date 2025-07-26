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

// 🔹 Sub-component: Date Input
const DateInput = ({ value, onChange }) => (
  <FormGroup>
    <Label for="date">Select Date</Label>
    <Input
      id="date"
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </FormGroup>
);

// 🔹 Sub-component: Time Input
const TimeInput = ({ value, onChange }) => (
  <FormGroup>
    <Label for="time">Select Time</Label>
    <Input
      id="time"
      type="time"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </FormGroup>
);

// 🔹 Sub-component: Faculty Dropdown
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
  const [selectedTime, setSelectedTime] = useState("");
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
            {/* 🔹 Date, Time, and Faculty Inputs */}
            <Row>
              <Col md="6">
                <DateInput value={selectedDate} onChange={setSelectedDate} />
              </Col>
              <Col md="6">
                <TimeInput value={selectedTime} onChange={setSelectedTime} />
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <FacultySelect
                  value={selectedFaculty}
                  onChange={setSelectedFaculty}
                />
              </Col>
            </Row>

            {/* 🔹 Module Section */}
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
                      <p>This is where module data will be displayed.</p>
                    </CardBody>
                  )}
                </Card>
              </Col>
            </Row>

            {/* 🔹 Content Section */}
            <Row>
              <Col xs="12">
                <Card className="mb-4 border">
                  <CardHeader
                    className="bg-light d-flex justify-content-between align-items-center"
                    style={{ cursor: "pointer" }}
                    onClick={() => setExpandContent(!expandContent)}
                  >
                    <h5 className="mb-0 text-primary">
                      <i
                        className={`fa me-2 ${
                          expandContent ? "fa-caret-down" : "fa-caret-right"
                        }`}
                      ></i>
                      Content
                    </h5>
                  </CardHeader>
                  {expandContent && (
                    <CardBody>
                      <p>
                        This is where content details (titles, videos, etc.)
                        will be shown.
                      </p>
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
