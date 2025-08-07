import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { useSelector } from "react-redux";
import { MdFilterAlt } from "react-icons/md";
import { MdFilterAltOff } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";

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
  const defaultBranch = useSelector((state) => state?.auth?.selectedBranch);
  const branchValue = defaultBranch?.value;
  const [showFilters, setShowFilters] = useState(false);

  const [courses, setCourses] = useState([]);

  const { startDate1, endDate1 } = fetchFinancialYearRangeByDate();

  const [selectedStatus, setSelectedStatus] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [facultyNameOptions, setFacultyNameOptions] = useState([]);
  const [selectedFacultyName, setSelectedFacultyName] = useState(null);
  const [facultyBatch, setFacultyBatch] = useState([]);
  const [isTableLoading, setIsTableLoading] = useState(false);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageStart, setPageStart] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumDropDown, setPageNumDropDown] = useState(pageNum[0]);
  const pageSize = pageNumDropDown?.value;

  const [activeFilters, setActiveFilters] = useState({});

  // customHookAPI
  // const {
  //   branchOptions,
  //   setBranchOptions,
  //   isLoading,
  //   fetchBranch,
  //   setBranchSearchText,
  //   branchSearchText,
  // } = useBranchList();
  // const { statusOptions, fetchEnquiry } = useStatusEnquiry();

  // useEffect(() => {
  //   if (branchSearchText.length < 3) {
  //     setBranchOptions([]);
  //     return;
  //   }
  //   fetchBranch();
  // }, [branchSearchText]);

  const fetchFaculties = async () => {
    try {
      const res = await axios.get(`${API_PATH}/api/Get_Faculties`, {
        params: {
          APIKEY: API_KEY,
          branchid: null,
        },
      });
      // console.log(res.data);
      const formatted = res?.data.map((item, index) => ({
        value: item?.Id,
        label: item?.Name,
      }));
      setFacultyNameOptions(formatted);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await axios.get(`${API_PATH}/api/GetCourse`, {
        params: {
          APIKEY: API_KEY,
        },
      });
      setCourses(res.data); // ✅ Save in state
    };
    fetchCourse();
  }, []);

  const fetchFacultyBatch = async (page = 1, size = pageSize, filters = {}) => {
    const selectedBranch = filters?.branch || branchValue;

    setIsTableLoading(true);
    // console.log(filters);
    try {
      const { startDate1, endDate1 } = fetchFinancialYearRangeByDate();

      const fromDate = filters?.fromdate ? filters.fromdate : startDate1;
      const toDate = filters?.todate ? filters.todate : endDate1;

      const res = await axios.get(`${API_PATH}/api/Get_Faculty_Batch_Report`, {
        params: {
          APIKEY: API_KEY,
          fromdate: fromDate,
          todate: toDate,
          branch: selectedBranch,
          facultyid: filters?.facultyid,
          pageno: page,
          pagesize: size,
        },
      });

      if (size === null) {
        return res?.data?.Data;
      }

      setFacultyBatch(res.data.Data);
      setPageNumber(res.data.PageNumber);
      setTotalPages(res.data.TotalPages);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.warning("No Data" || error?.message);
        setFacultyBatch([]);
        setPageNumber(1);
        setTotalPages(1);
      } else {
        toast.error(error?.message);
      }
    } finally {
      setIsTableLoading(false);
    }
  };

  useEffect(() => {
    fetchFacultyBatch(1, pageSize);
  }, [pageSize]);

  const formatDate1 = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0"); // months are 0-based
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const filters = {
    fromdate: startDate ? formatDate1(startDate) : null,
    todate: endDate ? formatDate1(endDate) : null,
    branch: selectedBranch?.value,
    facultyid: selectedFacultyName?.value,
  };

  const handleSearch = () => {
    setActiveFilters(filters); // ⬅️ Store current filters
    fetchFacultyBatch(1, pageSize, filters); // ⬅️ Pass them for page 1
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

  const handlePrint = async () => {
    const data = await fetchFacultyBatch(1, null, filters); // ⬅️ Pass them for page 1
    const columns = [
      { label: "Faculty Name", accessor: "facultyname" },
      { label: "Batch Title", accessor: "batchname" },
      { label: "Course", accessor: "courseid" }, // ✅ Corrected accessor,
      { label: "Start date", accessor: "startdate" },
      { label: "End date", accessor: "enddate" },
      { label: "Capacity", accessor: "batchcapacity" },
    ];
    // Map course name before printing
    const transformedData = data.map((item) => ({
      ...item,
      courseid: getCourseNameById(item.courseid),
    }));
    printTableData("Enquiry List", columns, transformedData);
  };

  const handleExport = async () => {
    const data = await fetchFacultyBatch(1, null, filters); // ⬅️ Pass them for page 1
    const exportData = data.map((item, index) => {
      return {
        "S.No	": index + 1,
        "Faculty Name": item.facultyname,
        "Batch Title": item.batchname,
        Course: getCourseNameById(item.courseid),
        "Start date": formatDate(item.startdate),
        "End date": formatDate(item.enddate),
        Capacity: item.batchcapacity,
      };
    });
    exportToExcel(exportData, "FacultyBatch", "Sheet1");
  };

  return (
    <>
      <Header />
      <Container className="mt--9" fluid>
        <Row className="d-flex flex-column">
          <Col>
            <div
              className="rounded-3  mb-2 d-flex d-sm-none justify-content-between align-items-center px-2 py-2 w-100"
              onClick={() => setShowFilters((prev) => !prev)}
              style={{ cursor: "pointer", backgroundColor: "#191d4d" }}
            >
              <h3 className="mb-0" style={{ color: "white" }}>
                Filter
              </h3>
              {showFilters ? (
                <MdFilterAltOff color="white" />
              ) : (
                <MdFilterAlt color="white" />
              )}
            </div>
          </Col>
          <Col>
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  key="mobile-filter"
                  initial={{ height: 0, opacity: 1 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 1 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="pb-4 d-sm-none d-md-none"
                >
                  <FilterBar
                    branch={defaultBranch}
                    selectedBranch={selectedBranch}
                    setSelectedBranch={setSelectedBranch}
                    fetchFaculties={fetchFaculties}
                    facultyNameOptions={facultyNameOptions}
                    selectedFacultyName={selectedFacultyName}
                    startDate={startDate}
                    endDate={endDate}
                    setDateRange={setDateRange}
                    setSelectedFacultyName={setSelectedFacultyName}
                    handleSearchClick={handleSearchClick}
                    showSearchByFacultyName={true}
                    showSearchByName={false}
                    showBatch={false}
                    showCourseEnquiry={false}
                    showStatus={false}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </Col>
          <Col className="pb-4 d-none d-sm-block">
            <FilterBar
              branch={defaultBranch}
              selectedBranch={selectedBranch}
              setSelectedBranch={setSelectedBranch}
              fetchFaculties={fetchFaculties}
              facultyNameOptions={facultyNameOptions}
              selectedFacultyName={selectedFacultyName}
              setSelectedFacultyName={setSelectedFacultyName}
              startDate={startDate}
              endDate={endDate}
              setDateRange={setDateRange}
              handleSearchClick={handleSearchClick}
              showSearchByFacultyName={true}
              showSearchByName={false}
              showBatch={false}
              showCourseEnquiry={false}
              showStatus={false}
            />
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
                        onClick={handlePrint}
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
                    </DropdownMenu>
                  </UncontrolledDropdown>
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
                          <td>{index + 1}</td>
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
                  activeFilters={activeFilters}
                />
              </CardFooter>
            </Card>
          </div>
        </Row>
        <ToastContainer />
      </Container>
    </>
  );
};

export default FacultyCourses;
