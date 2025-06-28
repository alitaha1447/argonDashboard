import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Col,
  Container,
  Row,
  Input,
  Button,
  Card,
  CardHeader,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table,
} from "reactstrap";
// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample3,
} from "variables/charts.js";
import BarChart from "components/Charts/BarChart";
import Header from "components/Headers/Header";
import PieChart from "components/Charts/PieChart";
import PaymentDetail from "components/CustomModals/paymentDetailModal/PaymentDetail";
import FeeDetail from "components/CustomModals/feeDetailModal/FeeDetail";

import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { enquiry } from "DummyData";
import { FaPlus } from "react-icons/fa";
import { FaFilter } from "react-icons/fa6";
import { MdFilterAlt } from "react-icons/md";
import { MdFilterAltOff } from "react-icons/md";

import { BsThreeDotsVertical } from "react-icons/bs";

import useBranchList from "customHookApi/EnquiryDashboardApi/useBranchList";
import axios from "axios";
import Action from "components/ActionDropDown/Action";
import { studentFeeData } from "DummyData";
import { fetchFinancialYearRangeByDate } from "utils/financialYearRange/FinancialYearRange";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

const FeesDashboard = () => {
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
  // PieChart
  const [pieData, setPieData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ["#f5365c", "#2dce89", "#11cdef"],
        hoverBackgroundColor: ["#d92e4a", "#24b97d", "#0ebad6"],
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
        backgroundColor: ["#f5365c", "#2dce89", "#11cdef"],
        hoverBackgroundColor: ["#d92e4a", "#24b97d", "#0ebad6"],
        borderColor: "#fff",
        borderWidth: 0,
      },
    ],
  });

  // customHookAPI
  const {
    branchOptions,
    setBranchOptions,
    isLoading,
    fetchBranch,
    setBranchSearchText,
    branchSearchText,
  } = useBranchList();

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
    // if (value.trim() === "") {
    // setIsFilterActive(false);
    // setFilteredData([]);
    // }
  };
  const handleEnquiryTypeChange = (selectedOption) => {
    setSelectedEnquiryType(selectedOption); // only update state
  };
  const handleSearch = () => {
    const filters = {
      searchText: searchText.trim(),
      status: selectedEnquiryType?.value || "",
    };
    // fetchPaginatedData(1, filters);
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    handleSearch(); // ✅ Reuse search logic
  };

  const togglePaymentDetail = () => {
    setShowPaymentDetail((prev) => !prev);
  };
  const toggleFeeDetail = () => {
    setShowFeeDetail((prev) => !prev);
  };

  useEffect(() => {
    const { startDate1, endDate1 } = fetchFinancialYearRangeByDate();

    const fetchAllDashboardData = async () => {
      try {
        // 1. Enquiry Analytics (for header stats)
        const analyticsRes = await axios.get(
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

        setPieData((prev) => ({
          ...prev,
          labels: labels,
          datasets: [
            {
              ...prev.datasets[0],
              data: values,
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
        setBarData((prev) => ({
          ...prev,
          labels: barLabels,
          datasets: [
            {
              ...prev.datasets[0],
              data: barValues,
            },
          ],
        }));
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      }
    };

    fetchAllDashboardData();
  }, []);

  const statsCard1 = {
    title: "Total fees received",
    value: statsData?.total_enquiry,
    description: "Total fees received",
    icon: "fas fa-chart-bar",
    color: "danger",
  };
  const statsCard2 = {
    title: "Pending Collection",
    value: statsData?.joined,
    description: "Pending Collection",
    icon: "fas fa-chart-pie",
    color: "warning",
  };
  const statsCard3 = {
    title: "Due fees",
    value: statsData?.not_interested,
    description: "Due Fees",
    icon: "fas fa-users",
    color: "yellow",
  };
  //   const statsCard4 = {
  //     title: "Follow Up",
  //     value: statsData?.follow_up,
  //     description: "Need to follow up",
  //     icon: "fas fa-percent",
  //     color: "info",
  //   };

  return (
    <>
      <Header
        cardTitle1={statsCard1}
        cardTitle2={statsCard2}
        cardTitle3={statsCard3}
        // cardTitle4={statsCard4}
      />
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
                  {/** ⬇️ FILTER CONTENT GOES HERE ⬇️ */}
                  <div
                    className="d-flex flex-column flex-md-row align-items-center justify-content-between p-2 w-100 mb-2"
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
                        <Input
                          placeholder="Search by Name or Phone"
                          type="text"
                          onChange={handleUnifiedSearchChange}
                        />
                      </div>
                      <div style={{ width: "170px" }}>
                        <Select
                          options={enquiry}
                          value={selectedEnquiryType}
                          onChange={handleEnquiryTypeChange}
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
                      onClick={handleSearchClick}
                    >
                      <i className="fas fa-search" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Col>
          {/* ✅ Filter box for large screens (always visible) */}
          <Col className="pb-4 d-none d-sm-block">
            <div
              className="d-flex flex-column flex-md-row align-items-center justify-content-between p-2 w-100 mb-2"
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
                  <Input
                    placeholder="Search by Name or Phone"
                    type="text"
                    onChange={handleUnifiedSearchChange}
                  />
                </div>
                <div style={{ width: "170px" }}>
                  <Select
                    options={enquiry}
                    value={selectedEnquiryType}
                    onChange={handleEnquiryTypeChange}
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
                onClick={handleSearchClick}
              >
                <i className="fas fa-search" />
              </div>
            </div>
          </Col>
          {/* <Col
            className={`pb-4 ${
              showFilters ? "d-block d-md-block" : "d-none d-sm-block"
            }`}
          >
            <div
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
                  <Input
                    placeholder="Search by Name or Phone"
                    type="text"
                    onChange={handleUnifiedSearchChange}
                  />
                </div>
                <div style={{ width: "170px" }}>
                  <Select
                    options={enquiry}
                    value={selectedEnquiryType}
                    onChange={handleEnquiryTypeChange}
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
                onClick={handleSearchClick}
              >
                <i className="fas fa-search" />
              </div>
            </div>
          </Col> */}
          <Col>
            {/* 🔘 Filter Button - Only on small screens */}
            {/* <div
              className="rounded-3 d-md-none mb-2 d-flex justify-content-between align-items-center px-2 py-2 w-100"
              onClick={() => setShowFilters((prev) => !prev)}
              style={{ cursor: "pointer", backgroundColor: "#191d4d" }}
            >
              <h3 className="mb-0" style={{ color: "white" }}>
                Filter
              </h3>
              <FaFilter color="white" />
            </div> */}

            {/* 📦 Filter Container for Small Screens - Animate */}
            {/* <AnimatePresence initial={false}>
              {showFilters && (
                <motion.div
                  key="mobile-filters"
                  initial={{ height: 0, opacity: 1 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 1 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden d-md-block"
                >
                  <YourFilterContent />
                </motion.div>
              )}
            </AnimatePresence> */}

            {/* 🖥️ Filter Container for Desktop - Always Visible */}
            {/* <div className="d-none d-md-block pb-4">
              <YourFilterContent />
            </div> */}
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
                  <h3 className="mb-0">Student Fee Lists</h3>
                  <div>
                    <Button
                      color="primary"
                      block
                      size="md"
                      onClick={togglePaymentDetail}
                    >
                      Recieve Amount
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {/* ✅ Table View for Large Screens */}
              <div className="d-none d-lg-block">
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Student Name</th>
                      <th scope="col">Contact Number</th>
                      <th scope="col">Total Fee Amount</th>
                      <th scope="col">Fee Recieved</th>
                      <th scope="col">Due Fees</th>
                      <th scope="col">Collection Date</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentFeeData.map((student, index) => (
                      <tr key={index}>
                        <td>{student.name}</td>
                        <td>{student.phone}</td>
                        <td>
                          <Button
                            onClick={toggleFeeDetail}
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
                        <td>{student.feeReceived}</td>
                        <td>{student.dueFee}</td>
                        <td>{student.collectionDate}</td>
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
                              <DropdownItem>Mail</DropdownItem>
                              <DropdownItem>Refund</DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              {/* ✅ Card View for Mobile & Tablets */}
              <div className="d-block d-lg-none px-3 pb-3">
                {/* Example of one card item */}
                {studentFeeData.map((item, index) => (
                  <Card key={index} className="mb-3 shadow-sm">
                    <div className="d-flex p-4 justify-content-between">
                      <div className="d-flex">
                        <div>
                          <p className="fs-6 fw-semibold mb-1">
                            <strong>Student Name:</strong> {item.name}
                          </p>
                          <p className="fs-6 fw-semibold mb-1">
                            <strong>Contact Number:</strong> {item.phone}
                          </p>
                          <p className="fs-6 fw-semibold mb-1">
                            <strong>Total Fee Amount:</strong>{" "}
                            <Button
                              onClick={toggleFeeDetail}
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
                            <strong>Fee Recieved:</strong> {item.feeReceived}
                          </p>
                          <p className="fs-6 fw-semibold mb-1">
                            <strong>Due Fees:</strong> {item.dueFee}
                          </p>
                          <p className="fs-6 fw-semibold mb-1">
                            <strong>Collection Date:</strong>{" "}
                            {item.collectionDate}
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
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                  </Card>
                ))}

                {/* You can map more cards dynamically here */}
              </div>
            </Card>
          </Col>
        </Row>
        <PaymentDetail modal={showPaymentDetail} toggle={togglePaymentDetail} />
        <FeeDetail modal={showFeeDetail} toggle={toggleFeeDetail} />
      </Container>
    </>
  );
};

export default FeesDashboard;
