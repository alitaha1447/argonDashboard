import { useState, useEffect } from "react";

import Chart from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Col,
  Input,
} from "reactstrap";

import Header from "components/Headers/Header.js";
import Select from "react-select";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample3,
} from "variables/charts.js";

import { BsThreeDotsVertical } from "react-icons/bs";
import EnquiryModal from "components/EnquiryModal/EnquiryModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import axios from "axios";

const data = [
  {
    name: "Taha",
    contactNumber: "+91-9981341447",
    highestQualification: "12th",
    course: "DSA",
    branch: "Male",
    enquiryDate: "27/06/2025",
    status: "Enquired Recieved",
    testStatus: "Failed",
    qualified: "Not",
  },
  {
    name: "John",
    contactNumber: "+91-9123456789",
    highestQualification: "Graduate",
    course: "Python",
    branch: "Male",
    enquiryDate: "27/03/1996",
    status: "Rejected",
    testStatus: "Failed",
    qualified: "Not",
  },
  {
    name: "Jane",
    contactNumber: "+91-9876543210",
    highestQualification: "10th",
    course: "Java",
    branch: "Female",
    enquiryDate: "27/03/1996",
    status: "Enquired Recieved",
    testStatus: "Failed",
    qualified: "Not",
  },
];
const status = [
  { value: "all", label: "All" },
  { value: "enquiredRecieved", label: "Enquired Recieved" },
  { value: "consultancyGiven", label: "Consultancy Given" },
  { value: "convertToStudent", label: "Convert To Student" },
  { value: "followUp", label: "Follow Up" },
  { value: "rejected", label: "Rejected" },
];

const EnquiryDashboard = (props) => {
  //   const [activeNav, setActiveNav] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [selectedEnquiry, setSelectedEnquiry] = useState(status[0]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isFilterActive, setIsFilterActive] = useState(false);
  // const [chartExample1Data, setChartExample1Data] = useState("data1");

  const fetchPaginatedData = async (page = 1) => {
    console.log(page);
    // try {
    //   const res = await axios.get(
    //     "https://hotelapi.shriyanshnath.com/api/Get_Enquiry_Dashboard_Data",
    //     {
    //       params: {
    //         fromdate: formattedStartDate,
    //         todate: formattedEndDate,
    //         enquirytype: 1,
    //         pageNumber: page,
    //         pageSize: 10,
    //         APIKEY: "12345678@",
    //       },
    //     }
    //   );
    //   setEnquiries(res.data.Data);
    //   setPageNumber(res.data.PageNumber);
    //   setTotalPages(res.data.TotalPages);
    // } catch (error) {
    //   console.error("❌ Pagination fetch failed:", error);
    // }
  };

  useEffect(() => {
    fetchPaginatedData(1); // load first page initially
  }, []);

  const [pageNumber, setPageNumber] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  const [pageStart, setPageStart] = useState(1); // starting number of visible pages
  const visiblePages = [pageStart, pageStart + 1, pageStart + 2];

  const handlePageChange = (page) => {
    setPageNumber(page);
    fetchPaginatedData(page);
  };

  const handleNext = () => {
    setPageStart((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setPageStart((prev) => (prev > 1 ? prev - 1 : 1));
  };

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleModal = () => setModalOpen(!modalOpen);

  // const handleEnquiry = (selected) => {
  //   setSelectedEnquiry(selected);
  // };

  const handleUnifiedSearchChange = (e) => {
    const { value } = e.target;
    setSearchText(value);
    if (value.trim() === "") {
      setIsFilterActive(false);
      setFilteredData([]);
    }
  };

  // const handleDateChange = (date) => {
  //   setDateRange(date);
  //   if (dateRange === null) {
  //     setIsFilterActive(false);
  //     setFilteredData([]);
  //   }
  // };

  const parseDDMMYYYY = (dateStr) => {
    const [day, month, year] = dateStr.split("/");
    return new Date(`${year}-${month}-${day}`);
  };

  // const formatDate = (date) => {
  //   return date ? new Date(date).toISOString().split("T")[0] : "N/A";
  // };

  // const formattedStartDate = formatDate(startDate);
  // const formattedEndDate = formatDate(endDate);

  // console.log(formattedStartDate);
  // console.log(formattedEndDate);

  // const filterData = data.filter((item) => {
  //   const itemDate = parseDDMMYYYY(item.enquiryDate);

  //   const isAfterStart = !startDate || itemDate >= startDate;
  //   const isBeforeEnd = !endDate || itemDate <= endDate;

  //   const inRange = isAfterStart && isBeforeEnd;

  //   return inRange;
  // });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axios.get(
  //         "https://hotelapi.shriyanshnath.com/api/Get_Enquiry_Dashboard_Data",
  //         {
  //           params: {
  //             fromdate: formattedStartDate, // 👈 dynamic value
  //             todate: formattedEndDate, // 👈 dynamic value
  //             enquirytype: 1,
  //           },
  //         }
  //       );
  //       console.log(res);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   if (startDate && endDate) {
  //     fetchData(); // 👈 Only fetch if both dates are selected
  //   }
  // }, [formattedStartDate, formattedEndDate]); // 👈 Add as dependencies

  const handleSearchClick = (e) => {
    e.preventDefault();
    const filtered = data.filter((item) => {
      // Text search
      const lowerSearch = searchText.toLowerCase();
      const matchesText =
        item.name.toLowerCase().includes(lowerSearch) ||
        item.contactNumber.includes(lowerSearch);
      // Date filter
      const itemDate = parseDDMMYYYY(item.enquiryDate);
      const isAfterStart = !startDate || itemDate >= startDate;
      const isBeforeEnd = !endDate || itemDate <= endDate;
      const inRange = isAfterStart && isBeforeEnd;
      // Status filter
      let matchesStatus = true;
      if (selectedEnquiry?.value !== "all") {
        matchesStatus =
          item.status.toLowerCase().replace(/\s/g, "") ===
          selectedEnquiry.value.toLowerCase().replace(/\s/g, "");
      }
      return matchesText && inRange && matchesStatus;
    });
    setFilteredData(filtered);
    setIsFilterActive(true);
  };

  // Use filteredData if search was clicked and there are any filters, otherwise use all data
  const displayData = isFilterActive ? filteredData : data;

  // OR, if you want to auto-grow when user clicks "Next"
  // const generatePages = () => {
  //   const pages = [];
  //   for (let i = 1; i <= Math.max(3, pageNumber); i++) {
  //     pages.push(i);
  //   }
  //   return pages;
  // };

  return (
    <>
      <Header
        cardTitle1={"Total Enquiry"}
        cardTitle2={"Student"}
        cardTitle3={"Not Interested"}
        cardTitle4={"Follow Up"}
      />

      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="pb-5 d-flex">
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className="text-white mb-0">Sales value</h2>
                  </div>
                  <div className="col"></div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Bar
                    data={chartExample3.data}
                    options={chartExample1.options}
                    // getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Performance
                    </h6>
                    <h2 className="mb-0">Total orders</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart" style={{}}>
                  <Pie
                    data={chartExample3.data}
                    options={chartExample3.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="d-flex flex-column">
          <Col className="pb-4">
            {/* <div className=""> */}
            <div
              className="d-flex flex-row justify-content-between align-items-center mt-4 p-2"
              style={{
                background: "#f7fafc",
                maxWidth: "100%",
                borderRadius: "5px",
                border: "1px solid #d3d3d3 ",
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
                    onChange={(prev) => setSelectedEnquiry(prev)}
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
                <div style={{ width: "auto" }}>
                  <DatePicker
                    selectsRange
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(date) => setDateRange(date)}
                    monthsShown={2} // ✅ Show two calendars
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                    placeholderText="Select date range"
                    isClearable
                    // showMonthDropdown
                    // showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={50}
                    minDate={new Date(1900, 0, 1)}
                    maxDate={new Date(2025, 11, 31)}
                    popperPlacement="bottom-start" // ✅ Opens dropdown below input
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
            {/* </div> */}
          </Col>

          <Col>
            <Card className="shadow">
              <CardHeader className="border-0">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <h3 className="mb-0">Lists</h3>
                  <div>
                    <Button color="primary" onClick={toggleModal}>
                      Create Batch
                    </Button>
                    <Button color="primary" onClick={toggleModal}>
                      Add
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* ✅ Table View for Large Screens */}
              <div className="d-none d-lg-block">
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col" className="text-center"></th>
                      <th scope="col">Name</th>
                      <th scope="col">Contact Number</th>
                      <th scope="col">Highest Qualification</th>
                      <th scope="col">Course</th>
                      <th scope="col">Branch</th>
                      <th scope="col">Enquiry Date</th>
                      <th scope="col">Status</th>
                      {/* <th scope="col">Test Status</th>
                      <th scope="col">Qualified/Not Qualified</th> */}
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  {/* tbody will be dynamically rendered */}
                  <tbody>
                    {displayData.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <div className="d-flex justify-content-center align-items-center">
                            <Input type="checkbox" style={{ margin: 0 }} />
                          </div>
                        </td>
                        <td>{item.name}</td>
                        <td>{item.contactNumber}</td>
                        <td>{item.highestQualification}</td>
                        <td>{item.course}</td>
                        <td>{item.branch}</td>
                        <td>{item.enquiryDate}</td>
                        <td>{item.status}</td>
                        {/* <td>{item.testStatus}</td>
                        <td>{item.qualified}</td> */}
                        <td
                          style={{ position: "relative", textAlign: "center" }}
                        >
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              setOpenDropdownIndex(
                                openDropdownIndex === index ? null : index
                              )
                            }
                          >
                            <BsThreeDotsVertical size={20} />
                          </div>

                          {openDropdownIndex === index && (
                            <div
                              style={{
                                position: "absolute",
                                top: "-30px",
                                right: "60px",
                                backgroundColor: "#fff",
                                border: "1px solid #ddd",
                                borderRadius: "4px",
                                boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
                                zIndex: 10,
                                minWidth: "100px",
                              }}
                            >
                              <div
                                style={{
                                  padding: "8px 12px",
                                  cursor: "pointer",
                                  borderBottom: "1px solid #eee",
                                }}
                                onClick={() => {
                                  console.log("Edit clicked for", item.name);
                                  setOpenDropdownIndex(null);
                                }}
                              >
                                ✏️ Edit
                              </div>
                              <div
                                style={{
                                  padding: "8px 12px",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  console.log("Delete clicked for", item.name);
                                  setOpenDropdownIndex(null);
                                }}
                              >
                                🗑️ Delete
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

              {/* ✅ Card View for Mobile & Tablets */}
              <div className="d-block d-lg-none px-3 pb-3">
                {/* Example of one card item */}
                {displayData.map((item, index) => (
                  <Card key={index} className="mb-3 shadow-sm">
                    <div className="p-3 d-flex justify-content-between">
                      <div>
                        <p className="fs-6 fw-semibold mb-1">
                          <strong>Name:</strong> {item.name}
                        </p>
                        <p className="fs-6 fw-semibold mb-1">
                          <strong>Contact Number:</strong> {item.contactNumber}
                        </p>
                        <p className="fs-6 fw-semibold mb-1">
                          <strong>Qualification:</strong>{" "}
                          {item.highestQualification}
                        </p>
                        <p className="fs-6 fw-semibold mb-1">
                          <strong>Course:</strong> {item.course}
                        </p>
                        <p className="fs-6 fw-semibold mb-1">
                          <strong>Branch:</strong> {item.branch}
                        </p>
                        <p className="fs-6 fw-semibold mb-1">
                          <strong>Enquiry Date:</strong> {item.enquiryDate}
                        </p>
                        <p className="fs-6 fw-semibold mb-1">
                          <strong>Status:</strong> {item.status}
                        </p>
                        <p className="fs-6 fw-semibold mb-1">
                          <strong>Test Status:</strong> {item.testStatus}
                        </p>
                        <p className="fs-6 fw-semibold mb-1">
                          <strong>Qualified/Not:</strong> {item.qualified}
                        </p>
                      </div>
                      <div>
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            setOpenDropdownIndex(
                              openDropdownIndex === index ? null : index
                            )
                          }
                        >
                          <BsThreeDotsVertical size={20} />
                        </div>
                        {openDropdownIndex === index && (
                          <div
                            style={{
                              position: "absolute",
                              top: "30px",
                              right: "10px",
                              backgroundColor: "#fff",
                              border: "1px solid #ddd",
                              borderRadius: "4px",
                              boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
                              zIndex: 10,
                              minWidth: "100px",
                            }}
                          >
                            <div
                              style={{
                                padding: "8px 12px",
                                cursor: "pointer",
                                borderBottom: "1px solid #eee",
                              }}
                              onClick={() => {
                                console.log("Edit clicked for", item.name);
                                setOpenDropdownIndex(null);
                              }}
                            >
                              ✏️ Edit
                            </div>
                            <div
                              style={{
                                padding: "8px 12px",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                console.log("Delete clicked for", item.name);
                                setOpenDropdownIndex(null);
                              }}
                            >
                              🗑️ Delete
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}

                {/* You can map more cards dynamically here */}
              </div>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination className="pagination justify-content-end mb-0">
                    <PaginationItem disabled={pageStart === 1}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePrevious();
                        }}
                      >
                        <i className="fas fa-angle-left" />
                      </PaginationLink>
                    </PaginationItem>

                    {visiblePages.map((page) => (
                      <PaginationItem key={page} active={page === pageNumber}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(page);
                          }}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNext();
                        }}
                      >
                        <i className="fas fa-angle-right" />
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
      <EnquiryModal
        modal={modalOpen}
        toggle={toggleModal}
        // handleSubmit={handleFormSubmit}
      />
    </>
  );
};

export default EnquiryDashboard;
