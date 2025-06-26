import React from "react";
import { useLocation } from "react-router-dom";
// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";

const Header = ({ cardTitle1, cardTitle2, cardTitle3, cardTitle4 }) => {
  const location = useLocation();
  const allowedPaths = [
    "/admin/index",
    "/admin/enquiryDashboard",
    "/admin/feesDashboard",
  ];
  const showStats = allowedPaths.includes(location.pathname);
  const cards = [cardTitle1, cardTitle2, cardTitle3, cardTitle4].filter(
    Boolean
  );
  const colSize = cards.length > 0 ? Math.floor(12 / cards.length) : 12;

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        {showStats && (
          <Container fluid>
            <div className="header-body">
              <Row>
                {cards.map((card, i) => (
                  <Col key={i} lg="6" xl={colSize}>
                    <Card className="card-stats mb-4 mb-xl-0">
                      <CardBody>
                        <Row>
                          <div className="col">
                            <CardTitle
                              tag="h6"
                              className="text-uppercase text-muted mb-0"
                            >
                              {card.title}
                            </CardTitle>
                            <span className="h2 font-weight-bold mb-0">
                              {card.value ?? 0}
                            </span>
                          </div>
                          <Col className="col-auto">
                            <div
                              className={`icon icon-shape bg-${card.color} text-white rounded-circle shadow`}
                            >
                              <i className={card.icon} />
                            </div>
                          </Col>
                        </Row>
                        <p className="mt-3 mb-0 text-muted text-sm">
                          <span className="text-nowrap">
                            {card.description}
                          </span>
                        </p>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
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
