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
import { Pie } from "react-chartjs-2";
// import {
//   chartOptions,
//   parseOptions,
//   chartExample1,
//   chartExample2,
// } from "variables/charts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  // handleChange,
  // handleContactChange,
  handleSearchClick, // Add this prop
  handleUnifiedSearchChange,
  handleDateChange,
  selectedEnquiry,
  handleEnquiry,
  selectedDate,
  // setSelectedDate,
}) => {
  const location = useLocation();
  const allowedPaths = ["/admin/index", "/admin/enquiryDashboard"];
  const allowedSearch = ["/admin/enquiryDashboard"];
  const allowedChart = ["/admin/enquiryDashboard"];
  const showStats = allowedPaths.includes(location.pathname);
  const showSearchbar = allowedSearch.includes(location.pathname);
  const showChart = allowedChart.includes(location.pathname);
  const showChartButton = allowedChart.includes(location.pathname);

  // const [selectedEnquiry, setSelectedEnquiry] = useState(status[0]);
  const [showPie, setShowPie] = useState(false); // pie toggle state
  // const [startDate, setStartDate] = useState(new Date());

  // const handleEnquiry = (selected) => {
  //   setSelectedEnquiry(selected);
  // };

  const data = {
    labels: ["Total Enquiry", "Student", "Not Interest", "Follow Up"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100, 55],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(247, 215, 16)",
        ],
        // hoverOffset: 4,
      },
    ],
  };

  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: "bottom",
  //     },
  //     tooltip: {
  //       enabled: true,
  //     },
  //   },
  // };
  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  //   if (date === null) {
  //     handleSearchClick({ preventDefault: () => {} }); // Mock event object
  //   }
  // };
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        {showStats && (
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col lg="6" xl="3">
                  <Card
                    className="card-stats mb-4 mb-xl-0"
                    style={{ width: "auto" }}
                  >
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
                            tag="h6"
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
                            tag="h6"
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
                            tag="h6"
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
            {showChart && showPie && (
              <div className="mt-4">
                <div
                  className="chart"
                  style={{
                    backgroundColor: "white",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    height: "auto",
                    zIndex: 99999,
                    position: "relative",
                    width: "100%",
                    margin: "0 auto",
                  }}
                >
                  <Pie data={data} />
                </div>
              </div>
            )}
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
                  <div style={{ width: "200px" }}>
                    <Select
                      options={status}
                      value={selectedEnquiry}
                      onChange={handleEnquiry}
                    />
                  </div>
                  {/* <div style={{}}>
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
                  </div> */}
                  <div style={{ maxWidth: "200px" }}>
                    <Input
                      placeholder="Search by Name or Phone"
                      type="text"
                      onChange={handleUnifiedSearchChange}
                    />
                  </div>
                  <div style={{ maxWidth: "200px" }}>
                    <DatePicker
                      selected={selectedDate}
                      onChange={handleDateChange}
                      className="form-control"
                      placeholderText="Select Date"
                      dateFormat="dd/MM/yyyy"
                      showMonthDropdown
                      showYearDropdown
                      // dropdownMode="select"
                      minDate={new Date(1900, 0, 1)} // Optional: set minimum year
                      maxDate={new Date(2025, 11, 31)} // Sets maximum year to 2025
                      scrollableYearDropdown
                      yearDropdownItemNumber={50} // Shows enough years to reach 2025
                      isClearable
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
      {showChartButton && (
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
      )}
    </>
  );
};

export default Header;
