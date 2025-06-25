import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const Header = ({ cardTitle1, cardTitle2, cardTitle3, cardTitle4 }) => {
  const location = useLocation();
  const allowedPaths = ["/admin/index", "/admin/enquiryDashboard"];
  const showStats = allowedPaths.includes(location.pathname);

  const [statsData, setStatsData] = useState({});

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          "https://hotelapi.shriyanshnath.com/api/Get_Enquiry_Analytics",
          {
            // headers: { APIKEY: "12345678@" },
            params: {
              APIKEY: "12345678@",
              fromdate: "2025-04-01",
              todate: "2026-03-01",
            },
          }
        );
        // console.log(res.data);
        setStatsData(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);
  // console.log(statsData.total_enquiry);
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
                            tag="h6"
                            className="text-uppercase text-muted mb-0"
                          >
                            {cardTitle1}
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {statsData.total_enquiry}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-chart-bar" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        {/* <span className="text-success mr-2">
                          <i className="fa fa-arrow-up" /> 3.48%
                        </span>{" "} */}
                        <span className="text-nowrap">
                          Total enquiry recieved
                        </span>
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
                            tag="h6"
                            className="text-uppercase text-muted mb-0"
                          >
                            {cardTitle2}
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {statsData.joined}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className="fas fa-chart-pie" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        {/* <span className="text-danger mr-2">
                          <i className="fas fa-arrow-down" /> 3.48%
                        </span>{" "} */}
                        <span className="text-nowrap">
                          {" "}
                          Convertes to Student
                        </span>
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
                            tag="h6"
                            className="text-uppercase text-muted mb-0"
                          >
                            {cardTitle3}
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {" "}
                            {statsData.not_interested}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                            <i className="fas fa-users" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        {/* <span className="text-warning mr-2">
                          <i className="fas fa-arrow-down" /> 1.10%
                        </span>{" "} */}
                        <span className="text-nowrap">
                          Student not interested
                        </span>
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
                            tag="h6"
                            className="text-uppercase text-muted mb-0"
                          >
                            {cardTitle4}
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {statsData.follow_up}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i className="fas fa-percent" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        {/* <span className="text-success mr-2">
                          <i className="fas fa-arrow-up" /> 12%
                        </span>{" "} */}
                        <span className="text-nowrap">Need to follow up</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        )}
      </div>
      {/* {showChartButton && (
        <button
          style={{
            position: "fixed",
            top: "42%",
            right: 0,
            transform: "translateY(-42%)",
            backgroundColor: "#18224d",
            color: "#fff",
            border: "none",
            borderRadius: "5px 0 0 5px",
            padding: "10px 16px",
            cursor: "pointer",
            zIndex: 10000,
          }}
          onClick={() => setShowPie((prev) => !prev)}
        >
          {showPie ? "Hide Chart" : "Show Chart"}
        </button>
      )} */}
    </>
  );
};

export default Header;
