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
import BatchModal from "components/BatchModal/BatchModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchFinancialYearRangeByDate } from "utils/financialYearRange/FinancialYearRange";
import axios from "axios";
import { enquiry } from "DummyData";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

// const data = [
//   {
//     name: "Taha",
//     contactNumber: "+91-9981341447",
//     highestQualification: "12th",
//     course: "DSA",
//     branch: "Male",
//     enquiryDate: "27/06/2025",
//     status: "Enquired Recieved",
//     testStatus: "Failed",
//     qualified: "Not",
//   },
//   {
//     name: "John",
//     contactNumber: "+91-9123456789",
//     highestQualification: "Graduate",
//     course: "Python",
//     branch: "Male",
//     enquiryDate: "27/03/1996",
//     status: "Rejected",
//     testStatus: "Failed",
//     qualified: "Not",
//   },
//   {
//     name: "Jane",
//     contactNumber: "+91-9876543210",
//     highestQualification: "10th",
//     course: "Java",
//     branch: "Female",
//     enquiryDate: "27/03/1996",
//     status: "Enquired Recieved",
//     testStatus: "Failed",
//     qualified: "Not",
//   },
// ];
const status = [
  { value: "all", label: "All" },
  { value: "enquiredRecieved", label: "Enquired Recieved" },
  { value: "consultancyGiven", label: "Consultancy Given" },
  { value: "convertToStudent", label: "Convert To Student" },
  { value: "followUp", label: "Follow Up" },
  { value: "rejected", label: "Rejected" },
];

const pageNum = [
  { value: 1, label: "1" },
  { value: 2, label: " 2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
];

const EnquiryDashboard = (props) => {
  //   const [activeNav, setActiveNav] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [batchModalOpen, setBatchModalOpen] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [selectedEnquiry, setSelectedEnquiry] = useState(status[0]);
  const [selectedEnquiryType, setSelectedEnquiryType] = useState(enquiry[0]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [searchText, setSearchText] = useState("");
  // Branch
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [branchOptions, setBranchOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [branchSearchText, setBranchSearchText] = useState("");
  // const [filteredData, setFilteredData] = useState([]);
  // const [isFilterActive, setIsFilterActive] = useState(false);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageStart, setPageStart] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [listData, setListData] = useState([]);

  const [pageNumDropDown, setPageNumDropDown] = useState(pageNum[0]);
  const pageSize = pageNumDropDown?.value;

  const fetchPaginatedData = async (page = 1, filters = {}) => {
    try {
      const { startDate1, endDate1 } = fetchFinancialYearRangeByDate();
      const params = {
        fromdate: filters.fromDate || startDate1,
        todate: filters.toDate || endDate1,
        enquirytype: filters.status || 1,
        searchtext: filters.searchText || "",
        pageno: page,
        pagesize: pageSize,
      };

      const res = await axios.get(
        "https://hotelapi.shriyanshnath.com/api/Get_Enquiry_Dashboard_Data",
        { params }
      );

      if (!res.data) {
        throw new Error("No data received from API");
      }

      const result = res.data;
      setListData(result?.Data || []);
      setPageNumber(result?.PageNumber || page);
      setTotalPages(result?.TotalPages || 1);
    } catch (error) {
      console.error("Error fetching paginated data:", error);
    }
  };

  useEffect(() => {
    setPageStart(1);
    setPageNumber(1);
    fetchPaginatedData(1);
  }, [pageNumDropDown]);

  useEffect(() => {
    if (branchSearchText.length < 3) {
      setBranchOptions([]);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${API_PATH}/api/branches`, {
          params: {
            APIKEY: API_KEY,
            searchtext: branchSearchText,
          },
          // headers: {
          //   APIKEY: API_KEY,
          // },
        });

        const options =
          res.data?.map((branch) => ({
            label: branch?.BranchName || `Branch ${branch?.BranchId}`,
            value: branch?.BranchId,
          })) || [];

        setBranchOptions(options);
      } catch (err) {
        console.error("Branch fetch error:", err);
        setBranchOptions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [branchSearchText]);

  const handlePageChange = (page) => {
    setPageNumber(page);
    fetchPaginatedData(page);

    // if (page > pageStart + 2) {
    //   setPageStart(page - 2);
    // } else if (page < pageStart) {
    //   setPageStart(page);
    // }
  };

  const handleNext = () => {
    if (pageStart + 2 < totalPages) {
      setPageStart((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (pageStart > 1) {
      setPageStart((prev) => prev - 1);
    }
  };

  const visiblePages = [];
  for (let i = pageStart; i <= Math.min(pageStart + 2, totalPages); i++) {
    visiblePages.push(i);
  }

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleModal = () => setModalOpen(!modalOpen);
  const batchModal = () => setBatchModalOpen(!batchModalOpen);

  // const handleEnquiry = (selected) => {
  //   setSelectedEnquiry(selected);
  // };

  const handleUnifiedSearchChange = (e) => {
    const { value } = e.target;
    setSearchText(value);
    if (value.trim() === "") {
      // setIsFilterActive(false);
      // setFilteredData([]);
    }
  };

  // const handleDateChange = (date) => {
  //   setDateRange(date);
  //   if (dateRange === null) {
  //     setIsFilterActive(false);
  //     setFilteredData([]);
  //   }
  // };

  // const parseDDMMYYYY = (dateStr) => {
  //   const [day, month, year] = dateStr.split("/");
  //   return new Date(`${year}-${month}-${day}`);
  // };

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0"); // months are 0-based
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

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

  // const handleSearchClick = (e) => {
  //   e.preventDefault();
  //   const filtered = data.filter((item) => {
  //     // Text search
  //     const lowerSearch = searchText.toLowerCase();
  //     const matchesText =
  //       item.name.toLowerCase().includes(lowerSearch) ||
  //       item.contactNumber.includes(lowerSearch);
  //     // Date filter
  //     const itemDate = parseDDMMYYYY(item.enquiryDate);
  //     const isAfterStart = !startDate || itemDate >= startDate;
  //     const isBeforeEnd = !endDate || itemDate <= endDate;
  //     const inRange = isAfterStart && isBeforeEnd;
  //     // Status filter
  //     let matchesStatus = true;
  //     if (selectedEnquiry?.value !== "all") {
  //       matchesStatus =
  //         item.status.toLowerCase().replace(/\s/g, "") ===
  //         selectedEnquiry.value.toLowerCase().replace(/\s/g, "");
  //     }

  //     return matchesText && inRange && matchesStatus;
  //   });
  //   setFilteredData(filtered);
  //   setIsFilterActive(true);
  // };

  // Use filteredData if search was clicked and there are any filters, otherwise use all data
  // const displayData = isFilterActive ? filteredData : data;
  const handleSearchClick = (e) => {
    e.preventDefault();

    // const fromDate = startDate ? startDate.toISOString().split("T")[0] : null;
    // const toDate = endDate ? endDate.toISOString().split("T")[0] : null;
    // console.log(fromDate);
    // console.log(toDate);
    const filters = {
      searchText: searchText.trim(),
      status: selectedEnquiryType.value,
    };

    fetchPaginatedData(1, filters);
  };
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
                className="d-flex  flex-md-row flex-sm-row flex-wrap flex-column  align-items-center w-100"
                style={{ gap: "1rem" }}
              >
                <div style={{ width: "150px" }}>
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
                <div style={{ width: "150px" }}>
                  <Input
                    placeholder="Search by Name or Phone"
                    type="text"
                    onChange={handleUnifiedSearchChange}
                  />
                </div>

                <div style={{ width: "150px" }}>
                  <Select
                    options={enquiry}
                    value={selectedEnquiryType}
                    onChange={(prev) => setSelectedEnquiryType(prev)}
                  />
                </div>
                <div style={{ width: "150px" }}>
                  <Select
                    id="branch-select"
                    options={branchOptions}
                    value={selectedBranch}
                    onChange={(selected) => setSelectedBranch(selected)}
                    onInputChange={(text) => setBranchSearchText(text)}
                    placeholder="branch"
                    isClearable
                    isLoading={isLoading}
                    noOptionsMessage={({ inputValue }) =>
                      inputValue.length < 3
                        ? "Type at least 3 characters to search"
                        : "No branches found"
                    }
                  />
                </div>
                <div className="">
                  <DatePicker
                    selectsRange
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(date) => setDateRange(date)}
                    monthsShown={2} // ✅ Show two calendars
                    dateFormat="dd/MM/yyyy"
                    className="react-datepicker__input-container form-control"
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
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <h3 className="mb-0">Lists</h3>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Button color="primary" onClick={batchModal}>
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
                      <th scope="col">Id</th>
                      <th scope="col">Name</th>
                      <th scope="col">Contact Number</th>
                      {(selectedEnquiryType.label === "Course Enquiry" ||
                        selectedEnquiryType.label === "Internship Enquiry") && (
                        <th scope="col">Highest Qualification</th>
                      )}

                      {selectedEnquiryType.label === "Course Enquiry" ||
                      selectedEnquiryType.label === "Internship Enquiry" ? (
                        <th scope="col">Course</th>
                      ) : (
                        <th scope="col">Product</th>
                      )}
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
                    {listData.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <div className="d-flex justify-content-center align-items-center">
                            <Input type="checkbox" style={{ margin: 0 }} />
                          </div>
                        </td>

                        <td>{item.Id}</td>
                        <td>{item.Name}</td>
                        <td>{item.Mobileno}</td>
                        {/* <td>{item.QualificationCode}</td> */}
                        {(selectedEnquiryType.label === "Course Enquiry" ||
                          selectedEnquiryType.label ===
                            "Internship Enquiry") && (
                          <td scope="col">{item.QualificationCode}</td>
                        )}
                        {selectedEnquiryType.label === "Course Enquiry" ||
                        selectedEnquiryType.label === "Internship Enquiry" ? (
                          <td>{item.TopicTitle}</td>
                        ) : (
                          <td>{item.product_name}</td>
                        )}
                        <td>{item.BranchName}</td>
                        <td>{formatDate(item.CreatedOn)}</td>
                        <td>{item.status_txt}</td>
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
                {listData.map((item, index) => (
                  <Card key={index} className="mb-3 shadow-sm">
                    <div className="p-3 d-flex justify-content-between">
                      <div>
                        <p className="fs-6 fw-semibold mb-1">
                          <strong>Name:</strong> {item.Name}
                        </p>
                        <p className="fs-6 fw-semibold mb-1">
                          <strong>Contact Number:</strong> {item.Mobileno}
                        </p>
                        <p className="fs-6 fw-semibold mb-1">
                          <strong>Qualification:</strong>{" "}
                          {item.QualificationCode}
                        </p>

                        <p className="fs-6 fw-semibold mb-1">
                          <strong>
                            {selectedEnquiryType.label === "Course Enquiry" ||
                            selectedEnquiryType.label === "Internship Enquiry"
                              ? "Course:"
                              : "Product"}
                          </strong>{" "}
                          {selectedEnquiryType.label === "Course Enquiry" ||
                          selectedEnquiryType.label === "Internship Enquiry"
                            ? item.TopicTitle
                            : item.product_name}
                        </p>

                        {/* {selectedEnquiryType.label === "Course Enquiry" ||
                        selectedEnquiryType.label === "Internship Enquiry" ? (
                          <p className="fs-6 fw-semibold mb-1">
                            <strong>Course:</strong> {item.TopicTitle}
                          </p>
                        ) : (
                          <p className="fs-6 fw-semibold mb-1">
                            <strong>Course:</strong> {item.product_name}
                          </p>
                        )} */}

                        <p className="fs-6 fw-semibold mb-1">
                          <strong>Branch:</strong> {item.BranchName}
                        </p>
                        <p className="fs-6 fw-semibold mb-1">
                          <strong>Enquiry Date:</strong>{" "}
                          {formatDate(item.CreatedOn)}
                        </p>
                        <p className="fs-6 fw-semibold mb-1">
                          <strong>Status:</strong> {item.status_txt}
                        </p>
                        {/* <p className="fs-6 fw-semibold mb-1">
                          <strong>Test Status:</strong> {item.testStatus}
                        </p>
                        <p className="fs-6 fw-semibold mb-1">
                          <strong>Qualified/Not:</strong> {item.qualified}
                        </p> */}
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
                    <div style={{ width: "80px", marginLeft: "10px" }}>
                      <Select
                        options={pageNum}
                        value={pageNumDropDown}
                        onChange={(prev) => setPageNumDropDown(prev)}
                      />
                    </div>
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
      <BatchModal modal={batchModalOpen} toggle={batchModal} />
    </>
  );
};

export default EnquiryDashboard;
