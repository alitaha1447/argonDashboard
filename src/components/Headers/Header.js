import { useLocation } from "react-router-dom";
// reactstrap components
import {
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
  Input,
} from "reactstrap";
import Select from "react-select";
import { useState } from "react";

const status = [
  { value: "all", label: "All" },
  { value: "enquiredRecieved", label: "Enquired Recieved" },
  { value: "consultancyGiven", label: "Consultancy Given" },
  { value: "convertToStudent", label: "Convert To Student" },
  { value: "followUp", label: "Follow Up" },
  { value: "rejected", label: "Rejected" },
];

const Header = ({
  cardTitle1,
  cardTitle2,
  cardTitle3,
  cardTitle4,
  handleChange,
  handleContactChange,
  handleSearchClick, // Add this prop
}) => {
  const location = useLocation();
  const allowedPaths = ["/admin/index", "/admin/enquiryDashboard"];
  const allowedSearch = ["/admin/enquiryDashboard"];
  const showStats = allowedPaths.includes(location.pathname);
  const showSearchbar = allowedSearch.includes(location.pathname);

  const [selectedEnquiry, setSelectedEnquiry] = useState(status[0]);

  const handleEnquiry = (selected) => {
    setSelectedEnquiry(selected);
  };

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        {showStats && (
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            {cardTitle1}
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            350,897
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-chart-bar" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fa fa-arrow-up" /> 3.48%
                        </span>{" "}
                        <span className="text-nowrap">Since last month</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            {cardTitle2}
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            2,356
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className="fas fa-chart-pie" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-danger mr-2">
                          <i className="fas fa-arrow-down" /> 3.48%
                        </span>{" "}
                        <span className="text-nowrap">Since last week</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            {cardTitle3}
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">924</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                            <i className="fas fa-users" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-warning mr-2">
                          <i className="fas fa-arrow-down" /> 1.10%
                        </span>{" "}
                        <span className="text-nowrap">Since yesterday</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            {cardTitle4}
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            49,65%
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i className="fas fa-percent" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fas fa-arrow-up" /> 12%
                        </span>{" "}
                        <span className="text-nowrap">Since last month</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        )}

        {showSearchbar && (
          <>
            <Container fluid className="">
              <div
                className="d-flex flex-row justify-content-between align-items-center mt-4 p-2"
                style={{
                  background: "#f7fafc",
                  maxWidth: "100%",
                  borderRadius: "5px",
                }}
              >
                <div
                  className="d-flex flex-column flex-md-row align-items-center w-100"
                  style={{ gap: "1rem" }}
                >
                  <div style={{}}>
                    <Select
                      options={status}
                      value={selectedEnquiry}
                      onChange={handleEnquiry}
                    />
                  </div>
                  <div style={{}}>
                    <Input
                      placeholder="Search By Name"
                      type="text"
                      name="nameSearch"
                      onChange={handleChange}
                    />
                  </div>
                  <div style={{}}>
                    <Input
                      placeholder="Search By Phone Number"
                      type="text"
                      onChange={handleContactChange}
                    />
                  </div>
                </div>
                <div
                  style={{
                    padding: "5px",
                    cursor: "pointer",
                  }}
                  onClick={handleSearchClick}
                >
                  <i className="fas fa-search" />
                </div>
              </div>
            </Container>
          </>
        )}
      </div>
    </>
  );
};

export default Header;
