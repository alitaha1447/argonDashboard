import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
// import { setSelectedEnquiryId } from "reducer/admin/enquiry/selectedEnquirySlice";
import Chart from "chart.js";
import {
  Button,
  Card,
  CardHeader,
  CardFooter,
  Table,
  Container,
  Row,
  Col,
  Input,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Spinner,
} from "reactstrap";

import Header from "components/Headers/Header.js";
import FilterBar from "components/CustomFilter/FilterBar";

import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample3,
} from "variables/charts.js";

import EnquiryModal from "components/EnquiryModal/EnquiryModal";
import BatchModal from "components/BatchModal/BatchModal";
import StatusUpdate from "components/CustomModals/statusUpdateModal/StatusUpdate";
import AssignBatch from "components/CustomModals/assignBatchModal/AssignBatch";
import { formatDateToDMY } from "utils/formattedDate/formatDateToDMY";
import { pageNum } from "DummyData";
import PieChart from "components/Charts/PieChart";
import BarChart from "components/Charts/BarChart";
import CustomPagination from "components/CustomPagination/CustomPagination";
import "react-datepicker/dist/react-datepicker.css";
import { fetchFinancialYearRangeByDate } from "utils/financialYearRange/FinancialYearRange";
import axios from "axios";

import { enquiry } from "DummyData";
import { FaPlus } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdFilterAlt } from "react-icons/md";
import { MdFilterAltOff } from "react-icons/md";

import { generateHexColors } from "utils/dynamicColorGenerator/generateHexColors ";
import { exportToExcel } from "utils/printFile/exportToExcel";
import { printTableData } from "utils/printFile/printFile";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

const EnquiryDashboard = (props) => {
  const dispatch = useDispatch();
  const storedBranches = useSelector((state) => state.auth.selectedBranch);
  const branchValue = storedBranches?.value;

  const [activeFilters, setActiveFilters] = useState({});

  const [statsData, setStatsData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [batchModalOpen, setBatchModalOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [assignBatchModal, setAssignBatchModal] = useState(false);

  const [selectedEnquiryType, setSelectedEnquiryType] = useState(enquiry[0]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const [searchText, setSearchText] = useState("");
  // Branch
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [showGraph, setShowGraph] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageStart, setPageStart] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [listData, setListData] = useState([]);
  const [isTableLoading, setIsTableLoading] = useState(false);

  const [pageNumDropDown, setPageNumDropDown] = useState(pageNum[0]);
  const pageSize = pageNumDropDown?.value;
  const [studentID, setStudentID] = useState([]);
  const [statusID, setStatusID] = useState(null);
  const [selectedEnquiryId, setSelectedEnquiryId] = useState(null);

  const [selectedStatus, setSelectedStatus] = useState(null);
  const firstRenderRef = useRef(true);
  // PieChart
  const [pieData, setPieData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  });
  // BarChart
  const [barData, setBarData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        borderColor: "#fff",
        borderWidth: 0,
      },
    ],
  });

  const fetchPaginatedData = async (
    page = 1,
    size = pageSize,
    filters = {}
  ) => {
    const selectedBranch = filters?.branch || branchValue;
    setIsTableLoading(true);
    try {
      const { startDate1, endDate1 } = fetchFinancialYearRangeByDate();

      const fromDate = filters?.fromdate ? filters.fromdate : startDate1;
      const toDate = filters?.todate ? filters.todate : endDate1;

      const res = await axios.get(
        `${API_PATH}/api/Get_Enquiry_Dashboard_Data`,
        {
          params: {
            fromdate: fromDate,
            todate: toDate,
            enquirytype: filters?.enquirytype || 1,
            searchtext: filters?.searchText || "",
            status: filters?.status || null,
            branch: selectedBranch,
            pageno: page,
            pagesize: size,
          },
        }
      );

      if (size === null) {
        return res?.data?.Data;
      } else {
        setListData(res?.data?.Data);
        setPageNumber(res?.data?.PageNumber);
        setTotalPages(res?.data?.TotalPages);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        if (size !== null) {
          toast.warning("No data found.");
          setListData([]);
          setPageNumber(1);
          setTotalPages(1);
        }
      } else {
        toast.error(error?.message || "Something went wrong.");
      }
    } finally {
      setIsTableLoading(false);
    }
  };

  useEffect(() => {
    setPageStart(1);
    setPageNumber(1);
    fetchPaginatedData(1, pageSize);
  }, [pageSize]);

  // useEffect(() => {
  //   if (branchSearchText.length < 3) {
  //     setBranchOptions([]);
  //     return;
  //   }
  //   fetchBranch();
  // }, [branchSearchText]);

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleModal = useCallback((id = null) => {
    setSelectedEnquiryId(id);
    // dispatch(setSelectedEnquiryId(id));
    setModalOpen((prev) => !prev);
  }, []);

  const batchModal = useCallback(() => {
    setBatchModalOpen((prev) => !prev);
  }, []);

  const toggleStatusModal = useCallback((id) => {
    setStatusID(id);
    setStatusModalOpen((prev) => {
      if (!prev && id === null) {
        setStatusID(null);
      }
      return !prev;
    });
  }, []);

  const toggleAssignBatch = () => {
    setAssignBatchModal((prev) => !prev);
  };

  // const handleEnquiry = (selected) => {
  //   setSelectedEnquiry(selected);
  // };

  const handleUnifiedSearchChange = (e) => {
    const { value } = e.target;
    setSearchText(value);
    // if (value.trim() === "") {
    // setIsFilterActive(false);
    // setFilteredData([]);
    // }
  };
  const handleEnquiryTypeChange = (selectedOption) => {
    setSelectedEnquiryType(selectedOption); // only update state
  };

  const formatDate1 = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0"); // months are 0-based
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const filters = {
    searchText: searchText.trim(),
    enquirytype: selectedEnquiryType?.value || "",
    status: selectedStatus?.value,
    branch: selectedBranch?.value,
    fromdate: startDate ? formatDate1(startDate) : null,
    todate: endDate ? formatDate1(endDate) : null,
  };

  const handleSearch = () => {
    setActiveFilters(filters); // ⬅️ Store current filters
    fetchPaginatedData(1, pageSize, filters); // ⬅️ Pass them for page 1
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    handleSearch(); // ✅ Reuse search logic
  };

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    const debounceTimer = setTimeout(() => {
      handleSearch();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [selectedStatus, selectedEnquiryType, selectedBranch]);

  const fetchAllDashboardData = async () => {
    const { startDate1, endDate1 } = fetchFinancialYearRangeByDate();
    try {
      // 1. Enquiry Analytics (for header stats)
      const analyticsRes = await axios.get(
        `${API_PATH}/api/Get_Enquiry_Analytics`,
        {
          params: {
            APIKEY: "12345678@",
            fromdate: startDate1,
            todate: endDate1,
            branchid: branchValue,
          },
        }
      );
      setStatsData(analyticsRes?.data);
      // 2. Pie Chart Data
      const pieRes = await axios.get(`${API_PATH}/api/Get_Typewise_Enquiry`, {
        params: {
          APIKEY: API_KEY,
          fromdate: startDate1,
          todate: endDate1,
        },
      });
      const labels = pieRes.data.map((item) => item.enquiry_type_name);
      const values = pieRes.data.map((item) => item.enquiries);
      const dynamicPieColors = generateHexColors(values.length);

      setPieData((prev) => ({
        ...prev,
        labels: labels,
        datasets: [
          {
            ...prev.datasets[0],
            data: values,
            backgroundColor: dynamicPieColors,
          },
        ],
      }));
      // 3. Bar Chart Data
      const barChartRes = await axios.get(
        `${API_PATH}/api/Get_Coursewise_Enquiry`,
        {
          params: {
            APIKEY: API_KEY,
            fromdate: startDate1,
            todate: endDate1,
          },
        }
      );
      const barLabels = barChartRes.data.map((item) => item.topic_title);
      const barValues = barChartRes.data.map((item) => item.enquires);
      const dynamicBarColors = generateHexColors(barValues.length);

      setBarData((prev) => ({
        ...prev,
        labels: barLabels,
        datasets: [
          {
            ...prev.datasets[0],
            data: barValues,
            backgroundColor: dynamicBarColors,
          },
        ],
      }));
    } catch (error) {
      toast(error);
      console.error("Error loading dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchAllDashboardData();
  }, []);

  const handleCheckId = (id) => {
    setStudentID((prev) => {
      // Check if ID already exists
      const exists = prev.some((item) => item.enrollmentid === id);

      if (exists) {
        // Remove ID if already present (uncheck)
        return prev.filter((item) => item.enrollmentid !== id);
      } else {
        // Add new ID object if not present (check)
        return [...prev, { enrollmentid: id }];
      }
    });
  };

  const handlePrint = async () => {
    const data = await fetchPaginatedData(1, null, filters); // ⬅️ Pass them for page 1
    const columns = [
      { label: "ID", accessor: "Id" },
      { label: "Name", accessor: "Name" },
      { label: "Mobile", accessor: "Mobileno" },
      {
        label: "Qualification",
        accessor: "QualificationCode",
      },
      { label: "Course", accessor: "TopicTitle" },
      { label: "Branch", accessor: "BranchName" },
      { label: "Enquiry Date", accessor: "CreatedOn" },
      { label: "Status", accessor: "status_txt" },
    ];
    printTableData("Enquiry List", columns, data);
  };
  const handleExport = async () => {
    const data = await fetchPaginatedData(1, null, filters); // ⬅️ Pass them for page 1
    const exportData = listData.map((item) => {
      const isCourseOrInternship =
        selectedEnquiryType.label === "Course Enquiry" ||
        selectedEnquiryType.label === "Internship Enquiry";
      return {
        Id: item.Id,
        Name: item.Name,
        "Contact Number": item.Mobileno,
        ...(isCourseOrInternship && {
          "Highest Qualification": item.QualificationCode,
          Course: item.TopicTitle,
        }),
        ...(!isCourseOrInternship && {
          Product: item.product_name,
        }),
        Branch: item.BranchName,
        "Enquiry Date": formatDateToDMY(item.CreatedOn),
        Status: item.status_txt,
      };
    });
    exportToExcel(exportData, "EnquiryList", "Sheet1");
  };

  const statsCard1 = {
    title: "Enquiry",
    value: statsData?.total_enquiry,
    description: "Total enquiry received",
    icon: "fas fa-chart-bar",
    color: "danger",
  };
  const statsCard2 = {
    title: "Student",
    value: statsData?.joined,
    description: "Convertes to Student",
    icon: "fas fa-chart-pie",
    color: "warning",
  };
  const statsCard3 = {
    title: "Not Interest",
    value: statsData?.not_interested,
    description: "Student not interested",
    icon: "fas fa-users",
    color: "yellow",
  };
  const statsCard4 = {
    title: "Follow Up",
    value: statsData?.follow_up,
    description: "Need to follow up",
    icon: "fas fa-percent",
    color: "info",
  };

  return (
    <>
      <Header
        cardTitle1={statsCard1}
        cardTitle2={statsCard2}
        cardTitle3={statsCard3}
        cardTitle4={statsCard4}
      />

      {/* Page content */}

      <Container className="mt--8" fluid>
        <div className={`d-flex justify-content-end px-2 mb-2 mt-2`}>
          <Button
            color="primary"
            size="sm"
            style={{ zIndex: 1, backgroundColor: "#191d4d" }}
            onClick={() => setShowGraph((prev) => !prev)}
          >
            {showGraph ? "Hide Chart" : "Show Chart"}
          </Button>
        </div>
        <Row className={`pb-5 ${showGraph ? "d-flex" : "d-none"}`}>
          <BarChart data={barData} options={chartExample1.options} />
          <PieChart data={pieData} options={chartExample3.options} />
        </Row>

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
                    selectedStatus={selectedStatus}
                    setSelectedStatus={setSelectedStatus}
                    // fetchEnquiry={fetchEnquiry}
                    searchText={searchText}
                    handleUnifiedSearchChange={handleUnifiedSearchChange}
                    enquiry={enquiry}
                    selectedEnquiryType={selectedEnquiryType}
                    handleEnquiryTypeChange={handleEnquiryTypeChange}
                    // branch={storedBranches}
                    selectedBranch={selectedBranch}
                    setSelectedBranch={setSelectedBranch}
                    startDate={startDate}
                    endDate={endDate}
                    setDateRange={setDateRange}
                    handleSearchClick={handleSearchClick}
                    showStatus={true}
                    showBatch={false}
                    showSearchByFacultyName={false}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </Col>
          <Col className="pb-4 d-none d-sm-block">
            <FilterBar
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              // fetchEnquiry={fetchEnquiry}
              searchText={searchText}
              handleUnifiedSearchChange={handleUnifiedSearchChange}
              enquiry={enquiry}
              selectedEnquiryType={selectedEnquiryType}
              handleEnquiryTypeChange={handleEnquiryTypeChange}
              // branch={storedBranches}
              selectedBranch={selectedBranch}
              setSelectedBranch={setSelectedBranch}
              startDate={startDate}
              endDate={endDate}
              setDateRange={setDateRange}
              handleSearchClick={handleSearchClick}
              showStatus={true}
              showBatch={false}
            />
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
                  <UncontrolledDropdown direction="down">
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
                      right
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
                        onClick={batchModal}
                      >
                        Create Batch
                      </Button>
                      <Button
                        color="primary"
                        block
                        size="md"
                        onClick={toggleAssignBatch}
                      >
                        Assign Batch
                      </Button>
                      <Button
                        color="primary"
                        block
                        size="md"
                        onClick={() => toggleModal(null)} // ✅ Explicitly passing `null`
                      >
                        Add Enquiry
                      </Button>

                      <Button
                        color="primary"
                        block
                        size="md"
                        onClick={handlePrint}
                      >
                        Print All
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

              {/* ✅ Table View for Large Screens */}
              <div className="d-none d-lg-block">
                <Table
                  id="printable-table"
                  className="align-items-center table-flush"
                  responsive
                >
                  <thead className="thead-light">
                    <tr>
                      <th scope="col" className="text-center"></th>
                      <th scope="col">Id</th>
                      <th scope="col">Name</th>
                      <th scope="col">Contact Number</th>
                      {(selectedEnquiryType.label === "Course Enquiry" ||
                        selectedEnquiryType.label === "Internship Enquiry") && (
                        <th scope="col">Qualification</th>
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
                      <th scope="col">Remark</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  {/* tbody will be dynamically rendered */}
                  <></>
                  <tbody>
                    {isTableLoading ? (
                      <tr>
                        <td colSpan="10" className="text-center py-4">
                          <Spinner color="primary" />
                          {/* <i className="fas fa-spinner fa-spin fa-2x text-primary" />
                          <p className="mt-2 mb-0">Loading data...</p> */}
                        </td>
                      </tr>
                    ) : listData.length > 0 ? (
                      listData.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <div className="d-flex justify-content-center align-items-center">
                              <Input
                                type="checkbox"
                                style={{ margin: 0 }}
                                checked={studentID.some(
                                  (s) => s.enrollmentid === item.Id
                                )} // ✅ controlled state
                                onChange={() => handleCheckId(item.Id)}
                                disabled={item.status_txt === "Admission Done"} // ✅ disable if condition matches
                              />
                            </div>
                          </td>
                          <td>{item.Id}</td>
                          <td>{item.Name}</td>
                          <td>{item.Mobileno}</td>
                          {(selectedEnquiryType.label === "Course Enquiry" ||
                            selectedEnquiryType.label ===
                              "Internship Enquiry") && (
                            <td>{item.QualificationCode}</td>
                          )}
                          {selectedEnquiryType.label === "Course Enquiry" ||
                          selectedEnquiryType.label === "Internship Enquiry" ? (
                            <td>{item.TopicTitle}</td>
                          ) : (
                            <td>{item.product_name}</td>
                          )}
                          <td>{item.BranchName}</td>
                          <td>{formatDateToDMY(item.CreatedOn)}</td>
                          <td>{item.status_txt}</td>
                          <td>{item.LatestRemark}</td>
                          <td>
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
                                  key={`${index}--status`}
                                  onClick={() => toggleStatusModal(item.Id)}
                                >
                                  Change Status
                                </DropdownItem>
                                <DropdownItem
                                  key={`${index}--update`}
                                  onClick={() => toggleModal(item.Id)}
                                >
                                  Update
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>{" "}
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

              {/* ✅ Card View for Mobile & Tablets */}
              <div className="d-block d-lg-none px-3 pb-3">
                {isTableLoading ? (
                  <div className="text-center py-4 text-muted">
                    <Spinner color="primary" />
                  </div>
                ) : listData.length === 0 ? (
                  <div className="text-center py-4 text-muted">
                    {/* <Spinner /> */}
                    <i className="fas fa-info-circle mr-2" />
                    No data found.
                  </div>
                ) : (
                  listData.map((item, index) => (
                    <Card key={index} className="mb-3 shadow-sm">
                      <div className="d-flex p-4 justify-content-between">
                        <div className="d-flex">
                          <div className="mx-2">
                            <Input
                              type="checkbox"
                              style={{ margin: 0 }}
                              checked={studentID.some(
                                (s) => s.enrollmentid === item.Id
                              )} // ✅ controlled state
                              onChange={() => handleCheckId(item.Id)}
                              disabled={item.status_txt === "Admission Done"} // ✅ disable if condition matches
                            />
                          </div>
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
                                {selectedEnquiryType.label ===
                                  "Course Enquiry" ||
                                selectedEnquiryType.label ===
                                  "Internship Enquiry"
                                  ? "Course:"
                                  : "Product"}
                              </strong>{" "}
                              {selectedEnquiryType.label === "Course Enquiry" ||
                              selectedEnquiryType.label === "Internship Enquiry"
                                ? item.TopicTitle
                                : item.product_name}
                            </p>

                            <p className="fs-6 fw-semibold mb-1">
                              <strong>Branch:</strong> {item.BranchName}
                            </p>
                            <p className="fs-6 fw-semibold mb-1">
                              <strong>Enquiry Date:</strong>{" "}
                              {formatDateToDMY(item.CreatedOn)}
                            </p>
                            <p className="fs-6 fw-semibold mb-1">
                              <strong>Status:</strong> {item.status_txt}
                            </p>
                            <p className="fs-6 fw-semibold mb-1">
                              <strong>Remark:</strong> {}
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
                              key={index}
                              onClick={() => toggleStatusModal(item.Id)}
                            >
                              Change Status
                            </DropdownItem>
                            <DropdownItem
                              key={`${index}--update`}
                              onClick={() => toggleModal(item.Id)}
                            >
                              Update
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                    </Card>
                  ))
                )}

                {/* You can map more cards dynamically here */}
              </div>
              <CardFooter className="py-4">
                <CustomPagination
                  pageStart={pageStart}
                  setPageStart={setPageStart}
                  totalPages={totalPages}
                  setPageNumber={setPageNumber}
                  fetchPaginatedData={fetchPaginatedData}
                  pageNumber={pageNumber}
                  pageNumDropDown={pageNumDropDown}
                  setPageNumDropDown={setPageNumDropDown}
                  pageNum={pageNum}
                  pageSize={pageSize}
                  activeFilters={activeFilters}
                />
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
      <EnquiryModal
        modal={modalOpen}
        // toggle={toggleModal} // ✅ close modal safely
        toggle={() => toggleModal(null)}
        selectedEnquiryId={selectedEnquiryId}
        refreshList={fetchPaginatedData}
        refreshStats={fetchAllDashboardData}
      />
      <BatchModal
        modal={batchModalOpen}
        toggle={batchModal}
        studentID={studentID}
        // refreshList={fetchPaginatedData}
        refreshList={() => fetchPaginatedData(1, pageSize, activeFilters)}
        resetSelected={() => setStudentID([])}
      />
      <StatusUpdate
        modal={statusModalOpen}
        toggle={toggleStatusModal}
        selectedId={statusID}
        refreshList={fetchPaginatedData}
        refreshStats={fetchAllDashboardData}
      />
      <AssignBatch
        modal={assignBatchModal}
        toggle={toggleAssignBatch}
        studentID={studentID}
        refreshList={fetchPaginatedData}
        resetSelected={() => setStudentID([])}
      />
    </>
  );
};

export default EnquiryDashboard;
