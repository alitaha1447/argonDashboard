import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Col,
  Input,
  Spinner,
} from "reactstrap";
import { FaPlus } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import Header from "components/Headers/Header";
import FilterBar from "components/CustomFilter/FilterBar";
import CustomPagination from "components/CustomPagination/CustomPagination";
import { exportToExcel } from "utils/printFile/exportToExcel";
import { printTableData } from "utils/printFile/printFile";
import DatePicker from "react-datepicker";
import { fetchFinancialYearRangeByDate } from "utils/financialYearRange/FinancialYearRange";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { enquiry } from "DummyData";
import useBranchList from "customHookApi/EnquiryDashboardApi/useBranchList";
import useStatusEnquiry from "customHookApi/EnquiryDashboardApi/useStatusEnquiry";
import axios from "axios";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

const pageNum = [
  { value: 10, label: "10" },
  { value: 25, label: " 25" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
  { value: 5, label: "5" },
];

const FacultyCourses = () => {
  const [courses, setCourses] = useState([]);

  const { startDate1, endDate1 } = fetchFinancialYearRangeByDate();

  const [selectedStatus, setSelectedStatus] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [facultyBatch, setFacultyBatch] = useState([]);
  const [isTableLoading, setIsTableLoading] = useState(false);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageStart, setPageStart] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumDropDown, setPageNumDropDown] = useState(pageNum[0]);
  const pageSize = pageNumDropDown?.value;

  const [activeFilters, setActiveFilters] = useState({});

  // customHookAPI
  const {
    branchOptions,
    setBranchOptions,
    isLoading,
    fetchBranch,
    setBranchSearchText,
    branchSearchText,
  } = useBranchList();
  const { statusOptions, fetchEnquiry } = useStatusEnquiry();

  // useEffect(() => {
  //   if (branchSearchText.length < 3) {
  //     setBranchOptions([]);
  //     return;
  //   }
  //   fetchBranch();
  // }, [branchSearchText]);

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await axios.get(`${API_PATH}/api/GetCourse`, {
        params: {
          APIKEY: API_KEY,
        },
      });
      console.log(res.data);
      setCourses(res.data); // ✅ Save in state
    };
    fetchCourse();
  }, []);

  const fetchFacultyBatch = async (page = 1, filters = {}) => {
    setIsTableLoading(true);
    try {
      const res = await axios.get(`${API_PATH}/api/Get_Faculty_Batch_Report`, {
        params: {
          APIKEY: API_KEY,
          fromdate: startDate1,
          todate: endDate1,
          branch: filters?.branch,
          facultyid: filters?.facultyid,
          pageno: page,
          pagesize: pageSize,
        },
      });
      setFacultyBatch(res.data.Data);
      setPageNumber(res.data.PageNumber);
      setTotalPages(res.data.TotalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setIsTableLoading(false);
    }
  };

  useEffect(() => {
    fetchFacultyBatch(1);
  }, [pageSize]);

  const handleSearch = () => {
    const filters = {
      // fromdate: startDate ? formatDate1(startDate) : null,
      // todate: endDate ? formatDate1(endDate) : null,
      branch: null,
      facultyid: null,
    };

    setActiveFilters(filters); // ⬅️ Store current filters
    fetchFacultyBatch(1, filters); // ⬅️ Pass them for page 1
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    handleSearch(); // ✅ Reuse search logic
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0"); // months are 0-based
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const getCourseNameById = (id) => {
    const course = courses.find((course) => course.Id === id);
    return course ? course.TopicTitle : "-";
  };

  const handleExport = () => {
    const exportData = facultyBatch.map((item, index) => {
      return {
        "S.No	": index + 1,
        "Enrollment No.": item.admission_no,
        Name: item.name,
        Mobile: item.mobileno,
      };
    });
    exportToExcel(exportData, "FacultyBatch", "Sheet1");
  };

  return (
    <>
      <Header />
      <Container className="mt--9" fluid>
        <Row>
          <Col className="pb-4 d-block d-sm-block">
            <FilterBar
              selectedBranch={selectedBranch}
              setSelectedBranch={setSelectedBranch}
              handleSearchClick={handleSearchClick}
              showSearchByFacultyName={true}
              showSearchByName={false}
              showBatch={false}
              showCourseEnquiry={false}
              showStatus={false}
            />
            {/* <div
              className="d-flex flex-column flex-lg-row align-items-center justify-content-between p-2 w-100"
              style={{
                background: "#f7fafc",
                borderRadius: "5px",
                border: "1px solid #d3d3d3",
                gap: "1rem",
              }}
            >
              <div
                className="d-flex flex-wrap justify-content-center align-items-center"
                style={{ gap: "1rem" }}
              >
                <div style={{ width: "170px" }}>
                  <Select
                    // options={enquiry}
                    // value={selectedEnquiryType}
                    // onChange={handleEnquiryTypeChange}
                    placeholder="faculty name"
                  />
                </div>
                <div style={{ width: "170px" }}>
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
                <div className="" style={{ width: "170px" }}>
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
                  padding: "6px 12px",
                  cursor: "pointer",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  backgroundColor: "#5e72e4",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "38px",
                  minWidth: "38px",
                  // marginLeft: "10px",
                }}
                // onClick={handleUnifiedSearchChange}
                // onClick={handleSearchClick}
              >
                <i className="fas fa-search" />
              </div>
            </div> */}
          </Col>
        </Row>
        <Row>
          <div className="col">
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
                  <UncontrolledDropdown direction="left">
                    <DropdownToggle
                      tag="span"
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "38px",
                        height: "38px",
                        backgroundColor: "#5e72e4",
                        color: "#fff",
                        borderRadius: "4px",
                      }}
                    >
                      <FaPlus />
                    </DropdownToggle>

                    <DropdownMenu
                      style={{
                        padding: "10px",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
                        minWidth: "160px",
                      }}
                    >
                      <Button
                        color="primary"
                        block
                        size="md"
                        onClick={() => printTableData("Faculty Batch Lists")}
                      >
                        Print
                      </Button>
                      <Button
                        color="primary"
                        block
                        size="md"
                        onClick={handleExport}
                      >
                        Save as Excel
                      </Button>
                      <Button
                        color="primary"
                        block
                        size="md"
                        // onClick={() => printAndExportExcel(data)}
                      >
                        Add Student
                      </Button>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  {/* <div
                    // onClick={toggleMaster}
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "38px",
                      height: "38px",
                      backgroundColor: "#5e72e4",
                      color: "#fff",
                      borderRadius: "4px",
                    }}
                  >
                    <FaPlus />
                  </div> */}
                </div>
              </CardHeader>
              {/* ✅ Table View for Desktop (Large screens only) */}
              <div className="d-none d-lg-block">
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col">Faculty Name</th>
                      <th scope="col">Batch Title</th>
                      <th scope="col">Course</th>
                      <th scope="col">Start date</th>
                      <th scope="col">End date</th>
                      <th scope="col">Capacity</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isTableLoading ? (
                      <tr>
                        <td colSpan="10" className="text-center py-4">
                          <Spinner color="primary">Loading...</Spinner>
                          {/* <i className="fas fa-spinner fa-spin fa-2x text-primary" />
                                                <p className="mt-2 mb-0">Loading data...</p> */}
                        </td>
                      </tr>
                    ) : facultyBatch.length > 0 ? (
                      facultyBatch.map((item, index) => (
                        <tr key={index}>
                          <td>{item.batchid}</td>
                          <td>{item.facultyname}</td>
                          <td>{item.batchname}</td>
                          <td>{getCourseNameById(item.courseid)}</td>{" "}
                          <td>{formatDate(item.startdate)}</td>
                          <td>{formatDate(item.enddate)}</td>
                          <td>{item.batchcapacity}</td>
                          <td style={{}}>
                            <UncontrolledDropdown direction="">
                              <DropdownToggle
                                tag="span"
                                style={{ cursor: "pointer" }}
                                data-toggle="dropdown"
                                aria-expanded={false}
                              >
                                <BsThreeDotsVertical size={20} />
                              </DropdownToggle>

                              <DropdownMenu
                                left
                                style={{
                                  minWidth: "120px",
                                  border: "1px solid #ddd",
                                  borderRadius: "4px",
                                  boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
                                }}
                              >
                                <DropdownItem
                                  key={`${index}-edit`}
                                  // onClick={() => toggleStatusModal(item.Id)}
                                >
                                  Edit
                                </DropdownItem>
                                <DropdownItem
                                  key={`${index}-delete`}
                                  // onClick={() => toggleStatusModal(item.Id)}
                                >
                                  Delete
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="10"
                          className="text-center py-4 text-muted"
                        >
                          <i className="fas fa-info-circle mr-2" />
                          No data found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
              {/* ✅ Card View for Mobile & Tablet */}
              <div className="d-block d-lg-none p-3">
                {isTableLoading ? (
                  <Spinner color="primary">Loading...</Spinner>
                ) : facultyBatch.length > 0 ? (
                  facultyBatch.map((item, index) => (
                    <Card className="mb-3 shadow-sm">
                      <div className="d-flex p-4 justify-content-between">
                        <div className="d-flex">
                          <div>
                            <p className="fs-6 fw-semibold mb-1">
                              <strong>S.No. :</strong> {item.batchid}
                            </p>
                            <p className="fs-6 fw-semibold mb-1">
                              <strong>Faculty Name:</strong> {item.facultyname}
                            </p>
                            <p className="fs-6 fw-semibold mb-1">
                              <strong>Batch Title :</strong>
                              {item.batchname}
                            </p>
                            <p className="fs-6 fw-semibold mb-1">
                              <strong>Course :</strong>
                              {getCourseNameById(item.courseid)}
                            </p>
                            <p className="fs-6 fw-semibold mb-1">
                              <strong>Start date :</strong>
                              {formatDate(item.startdate)}
                            </p>
                            <p className="fs-6 fw-semibold mb-1">
                              <strong>End date :</strong>
                              {formatDate(item.enddate)}
                            </p>
                            <p className="fs-6 fw-semibold mb-1">
                              <strong>Capacity :</strong>
                              {item.batchcapacity}
                            </p>
                          </div>
                        </div>

                        <UncontrolledDropdown direction="left">
                          <DropdownToggle
                            tag="span"
                            style={{ cursor: "pointer" }}
                            data-toggle="dropdown"
                            aria-expanded={false}
                          >
                            <BsThreeDotsVertical size={20} />
                          </DropdownToggle>

                          <DropdownMenu
                            right
                            style={{
                              minWidth: "120px",
                              border: "1px solid #ddd",
                              borderRadius: "4px",
                              boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
                            }}
                          >
                            <DropdownItem
                              key={`${index}-edit`}
                              // onClick={() => toggleStatusModal(item.Id)}
                            >
                              Edit
                            </DropdownItem>
                            <DropdownItem
                              key={`${index}-delete`}
                              // onClick={() => toggleStatusModal(item.Id)}
                            >
                              Delete
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-4 text-muted">
                    <i className="fas fa-info-circle mr-2" />
                    No data found.
                  </div>
                )}
              </div>
              <CardFooter className="py-4">
                <CustomPagination
                  pageStart={pageStart}
                  setPageStart={setPageStart}
                  totalPages={totalPages}
                  setPageNumber={setPageNumber}
                  fetchPaginatedData={fetchFacultyBatch}
                  pageNumber={pageNumber}
                  pageNumDropDown={pageNumDropDown}
                  setPageNumDropDown={setPageNumDropDown}
                  pageNum={pageNum}
                />
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default FacultyCourses;
