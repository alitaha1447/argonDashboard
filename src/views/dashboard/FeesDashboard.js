import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Col,
  Container,
  Row,
  Button,
  Card,
  CardHeader,
  CardFooter,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table,
} from "reactstrap";
// core components
import { chartExample1, chartExample3 } from "variables/charts.js";
import BarChart from "components/Charts/BarChart";
import Header from "components/Headers/Header";
import PieChart from "components/Charts/PieChart";
import PaymentDetail from "components/CustomModals/paymentDetailModal/PaymentDetail";
import FeeDetail from "components/CustomModals/feeDetailModal/FeeDetail";
import FilterBar from "components/CustomFilter/FilterBar";
import CustomPagination from "components/CustomPagination/CustomPagination";
import { enquiry } from "DummyData";

import { MdFilterAlt } from "react-icons/md";
import { MdFilterAltOff } from "react-icons/md";

import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";

import useBranchList from "customHookApi/EnquiryDashboardApi/useBranchList";
import axios from "axios";
import { fetchFinancialYearRangeByDate } from "utils/financialYearRange/FinancialYearRange";
import { generateHexColors } from "utils/dynamicColorGenerator/generateHexColors ";
import { exportToExcel } from "utils/printFile/exportToExcel";
import { printTableData } from "utils/printFile/printFile";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

const pageNum = [
  { value: 10, label: "10" },
  { value: 25, label: " 25" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
  { value: 5, label: "5" },
];

const FeesDashboard = () => {
  const storedBranches = useSelector((state) => state.auth.selectedBranch);
  const branchValue = storedBranches?.value;

  const { startDate1, endDate1 } = fetchFinancialYearRangeByDate();

  const [selectedFeeDetail, setSelectedFeeDetail] = useState({
    batchid: null,
    batchstudentid: null,
  });

  const [activeFilters, setActiveFilters] = useState({});

  const [statsData, setStatsData] = useState({});

  const [searchText, setSearchText] = useState("");
  const [selectedEnquiryType, setSelectedEnquiryType] = useState(enquiry[0]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [showGraph, setShowGraph] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showPaymentDetail, setShowPaymentDetail] = useState(false);
  const [showFeeDetail, setShowFeeDetail] = useState(false);
  const [feeList, setFeeList] = useState([]);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);
  // pagination
  const [pageNumber, setPageNumber] = useState(1);
  const [pageStart, setPageStart] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumDropDown, setPageNumDropDown] = useState(pageNum[0]);
  const pageSize = pageNumDropDown?.value;

  const [batches, setBatches] = useState([]);

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

  // customHookAPI
  const { setBranchOptions, fetchBranch, branchSearchText } = useBranchList();

  useEffect(() => {
    if (branchSearchText.length < 3) {
      setBranchOptions([]);
      return;
    }

    fetchBranch();
  }, [branchSearchText]);

  const handleUnifiedSearchChange = (e) => {
    const { value } = e.target;
    setSearchText(value);
  };
  const handleEnquiryTypeChange = (selectedOption) => {
    setSelectedEnquiryType(selectedOption);
  };

  const togglePaymentDetail = useCallback(() => {
    setShowPaymentDetail((prev) => !prev);
  }, []);

  const toggleFeeDetail = (batchid, batchstudentid) => {
    setSelectedFeeDetail({ batchid, batchstudentid });
    setShowFeeDetail((prev) => !prev);
  };

  const fetchBatch = async () => {
    try {
      const res = await axios.get(`${API_PATH}/api/GetBatch`, {
        params: {
          APIKEY: API_KEY,
          branchid: selectedBranch?.value,
        },
      });

      const formattedBatch = res?.data.map((item) => ({
        value: item.BatchID,
        label: item.BatchName,
      }));

      setBatches(formattedBatch);
    } catch (error) {
      console.log(error);
    }
  };

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

      const params = {
        APIKEY: API_KEY,
        fromdate: fromDate,
        todate: toDate,
        searchtext: filters?.searchText,
        branch: selectedBranch,
        batchid: filters?.batchid,
        pageno: page,
        pagesize: size,
      };
      const res = await axios(`${API_PATH}/api/Collect_List`, {
        params,
      });

      if (size == null) {
        return res?.data?.Data;
      } else {
        setFeeList(res?.data?.Data);
        setPageNumber(res?.data?.PageNumber || page);
        setTotalPages(res?.data?.TotalPages || 1);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.warning("No Data" || error?.message);
        setFeeList([]);
        setPageNumber(1);
        setTotalPages(1);
      } else {
        console.error("Error fetching paginated data:", error);
      }
    } finally {
      setIsTableLoading(false);
    }
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
    branch: selectedBranch?.value,
    batchid: selectedBatch?.value,
    fromdate: startDate ? formatDate1(startDate) : null,
    todate: endDate ? formatDate1(endDate) : null,
  };

  const handleSearch = () => {
    setActiveFilters(filters); // ⬅️ Store current filters
    fetchPaginatedData(1, pageSize, filters); // ⬅️ Pass them for page 1
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    handleSearch();
  };

  useEffect(() => {
    setPageStart(1);
    setPageNumber(1);
    fetchPaginatedData(1);
  }, [pageSize]);

  const fetchAllDashboardData = async () => {
    try {
      // 1. Enquiry Analytics (for header stats)
      const analyticsRes = await axios.get(
        "https://hotelapi.shriyanshnath.com/api/Get_Fee_dashboard_analytics",
        {
          params: {
            APIKEY: API_KEY,
            fromdate: startDate1,
            todate: endDate1,
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
      const dynamicColors = generateHexColors(values.length);

      setPieData((prev) => ({
        ...prev,
        labels: labels,
        datasets: [
          {
            ...prev.datasets[0],
            data: values,
            backgroundColor: dynamicColors,
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
      console.error("Error loading dashboard data:", error);
    }
  };
  useEffect(() => {
    fetchAllDashboardData();
  }, []);

  const onPaymentSuccess = useCallback(() => {
    fetchPaginatedData(pageNumber, activeFilters);
  }, [pageNumber, activeFilters]);

  const handleExport = async () => {
    const data = await fetchPaginatedData(1, null);
    const exportData = data.map((item, index) => {
      return {
        Id: index,
        "Student Name": item.name,
        "Contact Number": item.mobileno,
        "Total Fee Amount": item.totalamount,
        "Fee Recieved": item.fees_received,
        "Due Fees": item.due_amount,
        Branch: item.branch,
        Batch: item.batch,
        batchstudentid: item.batchstudentid,
        branchid: item.branchid,
        total_records: item.total_records,
      };
    });
    exportToExcel(exportData, "EnquiryList", "Sheet1");
  };

  const handlePrint = async () => {
    const data = await fetchPaginatedData(1, null, filters);
    const columns = [
      { label: "Student Name", accessor: "name" },
      { label: "Contact Number", accessor: "mobileno" },
      { label: "Total Fee Amount", accessor: "totalamount" },
      { label: "Fee Recieved", accessor: "fees_received" },
      { label: "Due Fees", accessor: "due_amount" },
      { label: "Branch", accessor: "branch" },
      { label: "Batch", accessor: "batch" },
    ];
    printTableData("Student Fee List", columns, data);
  };

  const statsCard1 = {
    title: "Total Received Amount",
    value: statsData?.total_received_Amt,
    description: "Total Received Amount",
    icon: "fas fa-chart-bar",
    color: "danger",
  };
  const statsCard2 = {
    title: "Total Receipt Generated",
    value: statsData?.total_Receipt_generated,
    description: "Total Receipt Generated",
    icon: "fas fa-chart-pie",
    color: "warning",
  };
  const statsCard3 = {
    title: "Due Amount",
    value: statsData?.due_amount,
    description: "Due Amount",
    icon: "fas fa-users",
    color: "yellow",
  };

  const [selectedBranchId, setSelectedBranchId] = useState("");
  const [selectedBatchId, setSelectedBatchId] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState("");

  const toggleRecievePayment = (branchid, batchid, batchstudentid) => {
    setSelectedBranchId(branchid);
    setSelectedBatchId(batchid);
    setSelectedStudentId(batchstudentid);

    setShowPaymentDetail((prev) => !prev);
  };

  const columns = [
    { label: "Student Name", accessor: "student_name" },
    { label: "Contact Number", accessor: "contact_number" },
    { label: "Total Fee Amount", accessor: "total_fee" },
    { label: "Fee Recieved", accessor: "fee_received" },
    { label: "Due Fees", accessor: "due_fee" },
    { label: "Branch", accessor: "branch_name" },
    { label: "Batch", accessor: "batch_name" },
  ];

  return (
    <>
      <Header
      // cardTitle1={statsCard1}
      // cardTitle2={statsCard2}
      // cardTitle3={statsCard3}
      />
      <Container className="mt--8" fluid>
        {/* <div className={`d-flex justify-content-end px-2 mb-2 mt-2`}>
          <Button
            color="primary"
            size="sm"
            style={{ zIndex: 1, backgroundColor: "#191d4d" }}
            onClick={() => setShowGraph((prev) => !prev)}
          >
            {showGraph ? "Hide Chart" : "Show Chart"}
          </Button>
        </div> */}
        {/* <Row className={`pb-5 ${showGraph ? "d-flex" : "d-none"}`}>
          <BarChart data={barData} options={chartExample1.options} />
          <PieChart data={pieData} options={chartExample3.options} />
        </Row> */}

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
                    searchText={searchText}
                    handleUnifiedSearchChange={handleUnifiedSearchChange}
                    enquiry={enquiry}
                    selectedEnquiryType={selectedEnquiryType}
                    handleEnquiryTypeChange={handleEnquiryTypeChange}
                    // branch={Branch}
                    selectedBranch={selectedBranch}
                    setSelectedBranch={setSelectedBranch}
                    startDate={startDate}
                    endDate={endDate}
                    setDateRange={setDateRange}
                    handleSearchClick={handleSearchClick}
                    showStatus={false}
                    showCourseEnquiry={false}
                    showBatch={true}
                    fetchBatch={fetchBatch}
                    batches={batches}
                    selectedBatch={selectedBatch}
                    setSelectedBatch={setSelectedBatch}
                    // activeFilters={activeFilters}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </Col>
          {/* ✅ Filter box for large screens (always visible) */}
          <Col className="pb-4 d-none d-sm-block">
            <FilterBar
              searchText={searchText}
              handleUnifiedSearchChange={handleUnifiedSearchChange}
              enquiry={enquiry}
              selectedEnquiryType={selectedEnquiryType}
              handleEnquiryTypeChange={handleEnquiryTypeChange}
              // branch={Branch}
              selectedBranch={selectedBranch}
              setSelectedBranch={setSelectedBranch}
              startDate={startDate}
              endDate={endDate}
              setDateRange={setDateRange}
              handleSearchClick={handleSearchClick}
              showStatus={false}
              showCourseEnquiry={false}
              showBatch={true}
              fetchBatch={fetchBatch}
              batches={batches}
              selectedBatch={selectedBatch}
              setSelectedBatch={setSelectedBatch}
              // activeFilters={activeFilters}
            />
          </Col>

          <Col></Col>
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
                  <h3 className="mb-0">Student Fee Lists</h3>
                  <div className="d-flex align-item-center">
                    <Button
                      color="primary"
                      block
                      size="md"
                      onClick={togglePaymentDetail}
                    >
                      Recieve Amount
                    </Button>
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
                          // onClick={() => printTableData("Student Fee Lists")}
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
                      <th scope="col">Student Name</th>
                      <th scope="col">Contact Number</th>
                      <th scope="col">Total Fee Amount</th>
                      <th scope="col">Fee Recieved</th>
                      <th scope="col">Due Fees</th>
                      <th scope="col">Branch</th>
                      <th scope="col">Batch</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isTableLoading ? (
                      <tr>
                        <td colSpan="10" className="text-center py-4">
                          <i className="fas fa-spinner fa-spin fa-2x text-primary" />
                          <p className="mt-2 mb-0">Loading data...</p>
                        </td>
                      </tr>
                    ) : feeList.length > 0 ? (
                      feeList.map((student, index) => (
                        <tr key={index}>
                          <td>{student.name}</td>
                          <td>{student.mobileno}</td>
                          <td>
                            <span>{student.totalamount}</span>
                            <Button
                              onClick={() =>
                                toggleFeeDetail(
                                  student?.batchid,
                                  student?.batchstudentid
                                )
                              }
                              style={{
                                padding: "0 6px",
                                fontSize: "12px",
                                marginLeft: "8px",
                                backgroundColor: "#5e72e4",
                                color: "#ffffff",
                              }}
                            >
                              Fee Details
                            </Button>
                          </td>
                          <td>{student.fees_received}</td>
                          <td>{student.due_amount}</td>
                          <td>{student.branch}</td>
                          <td>{student.batch}</td>
                          <td style={{ textAlign: "center" }}>
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
                                {/* <DropdownItem>Mail</DropdownItem> */}
                                {/* <DropdownItem>Refund</DropdownItem> */}
                                <DropdownItem
                                  onClick={() =>
                                    toggleRecievePayment(
                                      student.branchid,
                                      student.batchid,
                                      student.batchstudentid
                                    )
                                  }
                                >
                                  {" "}
                                  Recieve Amount
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
              {/* ✅ Card View for Mobile & Tablets */}
              <div className="d-block d-lg-none px-3 pb-3">
                {isTableLoading ? (
                  <div className="text-center py-4">
                    <i className="fas fa-spinner fa-spin fa-2x text-primary" />
                    <p className="mt-2 mb-0">Loading data...</p>
                  </div>
                ) : feeList.length === 0 ? (
                  <div className="text-center py-4 text-muted">
                    <i className="fas fa-info-circle mr-2" />
                    No data found.
                  </div>
                ) : (
                  feeList.map((item, index) => (
                    <Card key={index} className="mb-3 shadow-sm">
                      <div className="d-flex p-4 justify-content-between">
                        <div className="d-flex">
                          <div>
                            <p className="fs-6 fw-semibold mb-1">
                              <strong>Student Name :</strong> {item.name}
                            </p>
                            <p className="fs-6 fw-semibold mb-1">
                              <strong>Contact Number:</strong> {item.mobileno}
                            </p>
                            <p className="fs-6 fw-semibold mb-1">
                              <strong>Total Fee Amount:</strong>{" "}
                              <span>{item.totalamount}</span>
                              <Button
                                onClick={() =>
                                  toggleFeeDetail(
                                    item?.batchid,
                                    item?.batchstudentid
                                  )
                                }
                                style={{
                                  padding: "0 6px",
                                  fontSize: "12px",
                                  marginLeft: "8px",
                                  backgroundColor: "#5e72e4",
                                  color: "#ffffff",
                                }}
                              >
                                Fee Details
                              </Button>
                            </p>

                            <p className="fs-6 fw-semibold mb-1">
                              <strong>Fee Recieved:</strong>{" "}
                              {item.fees_received}
                            </p>
                            <p className="fs-6 fw-semibold mb-1">
                              <strong>Due Fees:</strong> {item.due_amount}
                            </p>
                            <p className="fs-6 fw-semibold mb-1">
                              <strong>Branch:</strong> {item.branch}
                            </p>
                            <p className="fs-6 fw-semibold mb-1">
                              <strong>Batch:</strong> {item.batch}
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
                            <DropdownItem>Mail</DropdownItem>
                            <DropdownItem>Refund</DropdownItem>
                            <DropdownItem
                              onClick={() =>
                                toggleRecievePayment(
                                  item.branchid,
                                  item.batchid,
                                  item.batchstudentid
                                )
                              }
                            >
                              {" "}
                              Recieve Amount
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </Card>
            <CardFooter className="py-4">
              {/* <nav aria-label="..."> */}
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
                activeFilters={activeFilters} // ✅ pass it here
              />

              {/* </nav> */}
            </CardFooter>
          </Col>
        </Row>
        <PaymentDetail
          modal={showPaymentDetail}
          toggle={togglePaymentDetail}
          onPaymentSuccess={onPaymentSuccess}
          // branchId={selectedBranchId}
          batchId={selectedBatchId}
          studId={selectedStudentId}
          resetParentIds={() => {
            setSelectedBatchId("");
            setSelectedStudentId("");
          }}

          // onPaymentSuccess={() => fetchPaginatedData(pageNumber, activeFilters)}
        />
        <FeeDetail
          modal={showFeeDetail}
          toggle={toggleFeeDetail}
          batchid={selectedFeeDetail?.batchid}
          batchstudentid={selectedFeeDetail?.batchstudentid}
        />
      </Container>
      <ToastContainer />
    </>
  );
};

export default FeesDashboard;
