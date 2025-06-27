import { useState, useEffect, useCallback } from "react";

import Chart from "chart.js";
// reactstrap components
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

import EnquiryModal from "components/EnquiryModal/EnquiryModal";
import BatchModal from "components/BatchModal/BatchModal";
import StatusUpdate from "components/CustomModals/statusUpdateModal/StatusUpdate";
import PieChart from "components/Charts/PieChart";
import BarChart from "components/Charts/BarChart";
import Action from "components/ActionDropDown/Action";
import CustomPagination from "components/CustomPagination/CustomPagination";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchFinancialYearRangeByDate } from "utils/financialYearRange/FinancialYearRange";
import useBranchList from "customHookApi/EnquiryDashboardApi/useBranchList";
import axios from "axios";
import { enquiry } from "DummyData";
import { FaPlus } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import useStatusEnquiry from "customHookApi/EnquiryDashboardApi/useStatusEnquiry";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

// const status = [
//   { value: "all", label: "All" },
//   { value: "enquiredRecieved", label: "Enquired Recieved" },
//   { value: "consultancyGiven", label: "Consultancy Given" },
//   { value: "convertToStudent", label: "Convert To Student" },
//   { value: "followUp", label: "Follow Up" },
//   { value: "rejected", label: "Rejected" },
// ];

const pageNum = [
  { value: 10, label: "10" },
  { value: 25, label: " 25" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
  { value: 5, label: "5" },
];

const EnquiryDashboard = (props) => {
  const [statsData, setStatsData] = useState({});
  //   const [activeNav, setActiveNav] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [batchModalOpen, setBatchModalOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);

  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [selectedEnquiryType, setSelectedEnquiryType] = useState(enquiry[0]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [searchText, setSearchText] = useState("");
  // Branch
  const [selectedBranch, setSelectedBranch] = useState(null);

  const [showGraph, setShowGraph] = useState(false);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageStart, setPageStart] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [listData, setListData] = useState([]);
  const [isTableLoading, setIsTableLoading] = useState(false);

  const [pageNumDropDown, setPageNumDropDown] = useState(pageNum[0]);
  const pageSize = pageNumDropDown?.value;

  const [studentID, setStudentID] = useState([]);
  const [statusID, setStatusID] = useState(null);
  // Enquiry
  // const [statusOptions, setstatusOptions] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);

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
  // PieChart
  const [pieData, setPieData] = useState({
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
  // BarChart
  const [barData, setBarData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ["#f5365c", "#2dce89"],
        hoverBackgroundColor: ["#d92e4a", "#24b97d"],
        borderColor: "#fff",
        borderWidth: 0,
      },
    ],
  });

  const fetchPaginatedData = async (page = 1, filters = {}) => {
    setIsTableLoading(true); // show loader
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
    } finally {
      setIsTableLoading(false); // hide loader
    }
  };

  useEffect(() => {
    setPageStart(1);
    setPageNumber(1);
    fetchPaginatedData(1);
  }, [pageSize]);

  // const fetchData = async () => {
  //   setIsLoading(true);
  //   try {
  //     const res = await axios.get(`${API_PATH}/api/branches`, {
  //       params: {
  //         APIKEY: API_KEY,
  //         searchtext: branchSearchText,
  //       },
  //       // headers: {
  //       //   APIKEY: API_KEY,
  //       // },
  //     });

  //     const options =
  //       res.data?.map((branch) => ({
  //         label: branch?.BranchName || `Branch ${branch?.BranchId}`,
  //         value: branch?.BranchId,
  //       })) || [];

  //     setBranchOptions(options);
  //   } catch (err) {
  //     console.error("Branch fetch error:", err);
  //     setBranchOptions([]);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  useEffect(() => {
    if (branchSearchText.length < 3) {
      setBranchOptions([]);
      return;
    }

    fetchBranch();
  }, [branchSearchText]);

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleModal = useCallback(() => {
    setModalOpen((prev) => !prev);
  }, []);

  const batchModal = useCallback(() => {
    setBatchModalOpen((prev) => !prev);
  }, []);

  const toggleStatusModal = useCallback((id) => {
    setStatusID(id);
    setStatusModalOpen((prev) => !prev);
  }, []);

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

  // const fetchEnquiry = async () => {
  //   try {
  //     const res = await axios.get(`${API_PATH}/api/Getstatus`, {
  //       params: {
  //         APIKEY: API_KEY,
  //         statusfor: "ENQUIRY",
  //       },
  //     });
  //     console.log(res.data);

  //     const formattedEnquiry = res.data.map((item) => ({
  //       value: item.id,
  //       label: item.name,
  //     }));
  //     console.log(formattedEnquiry);
  //     setstatusOptions(formattedEnquiry);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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

  const handleSearch = () => {
    const filters = {
      searchText: searchText.trim(),
      status: selectedEnquiryType?.value || "",
    };
    fetchPaginatedData(1, filters);
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    handleSearch(); // ✅ Reuse search logic
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
    // const fetchPieData = async () => {
    //   try {
    //     const res = await axios.get(`${API_PATH}/api/Get_Typewise_Enquiry`, {
    //       params: {
    //         APIKEY: API_KEY,
    //         fromdate: startDate1,
    //         todate: endDate1,
    //       },
    //     });
    //     const labels = res.data.map((item) => item.enquiry_type_name);
    //     const values = res.data.map((item) => item.enquiries);

    //     setPieData((prev) => ({
    //       ...prev,
    //       labels: labels,
    //       datasets: [
    //         {
    //           ...prev.datasets[0],
    //           data: values,
    //         },
    //       ],
    //     }));
    //     // ✅ Now Fetch Bar Chart Data (replace with your actual endpoint)
    //     const barChartRes = await axios.get(
    //       `${API_PATH}/api/Get_Coursewise_Enquiry`,
    //       {
    //         params: {
    //           APIKEY: API_KEY,
    //           fromdate: startDate1,
    //           todate: endDate1,
    //         },
    //       }
    //     );
    //     const barLabels = barChartRes.data.map((item) => item.topic_title);
    //     const barValues = barChartRes.data.map((item) => item.enquires);
    //     setBarData((prev) => ({
    //       ...prev,
    //       labels: barLabels,
    //       datasets: [
    //         {
    //           ...prev.datasets[0],
    //           data: barValues,
    //         },
    //       ],
    //     }));
    //   } catch (err) {
    //     console.error("Error loading pie chart data:", err);
    //   }
    // };

    fetchAllDashboardData();
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleSearch();
    }, 300); // Optional: debounce for better performance

    return () => clearTimeout(debounceTimer);
  }, [selectedEnquiryType]);

  const handleCheckId = (id) => {
    // console.log(id);
    setStudentID((prev) => {
      // Check if ID already exists
      const exists = prev.some((item) => item.id === id);

      if (exists) {
        // Remove ID if already present (uncheck)
        return prev.filter((item) => item.id !== id);
      } else {
        // Add new ID object if not present (check)
        return [...prev, { studentid: id }];
      }
    });
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
          {/* <div
            className={`d-flex justify-content-end d-md-none px-2 ${
              showFilters ? "mb-0" : "mb-2"
            }`}
          >
            <Button
              color="primary"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div> */}
          <Col
            className={` pb-4`}
            // className={`${
            //   showFilters ? "d-block d-md-flex" : "d-none d-md-flex"
            // } pb-4`}
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
              {/* Filter Inputs */}
              <div
                className="d-flex flex-wrap justify-content-center align-items-center"
                style={{ gap: "1rem" }}
              >
                <div style={{ width: "170px" }}>
                  <Select
                    id="status"
                    options={statusOptions}
                    value={selectedStatus}
                    onChange={setSelectedStatus}
                    onMenuOpen={fetchEnquiry}
                  />
                </div>
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

              {/* Search Icon */}
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
                        // onClick={batchModal}
                      >
                        Assign Batch
                      </Button>
                      <Button
                        color="primary"
                        block
                        size="md"
                        onClick={toggleModal}
                      >
                        Add
                      </Button>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
              </CardHeader>

              {/* ✅ Table View for Large Screens */}
              <div className="d-none d-lg-block">
                {/* <List
                  listData={listData}
                  isTableLoading={isTableLoading}
                  selectedEnquiryType={selectedEnquiryType}
                /> */}
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
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  {/* tbody will be dynamically rendered */}
                  <></>
                  <tbody>
                    {isTableLoading ? (
                      <tr>
                        <td colSpan="10" className="text-center py-4">
                          <i className="fas fa-spinner fa-spin fa-2x text-primary" />
                          <p className="mt-2 mb-0">Loading data...</p>
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
                                onClick={() => handleCheckId(item.Id)}
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
                          <td>{formatDate(item.CreatedOn)}</td>
                          <td>{item.status_txt}</td>
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
                                <DropdownItem
                                  key={index}
                                  onClick={() => toggleStatusModal(item.Id)}
                                >
                                  Update
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                            {/* <Action
                              options={[
                                // {
                                //   label: "✏️ Edit",
                                //   onClick: () => console.log("Edit clicked"),
                                // },
                                // {
                                //   label: "🗑️ Delete",
                                //   onClick: () => console.log("Delete clicked"),
                                // },
                                {
                                  label: "✏️ Update",
                                  onClick: (id) => toggleStatusModal(id), // ✅ Will receive the ID
                                },
                              ]}
                            /> */}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="10"
                          className="text-center py-4 text-muted"
                        >
                          No data found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>

              {/* ✅ Card View for Mobile & Tablets */}
              <div className="d-block d-lg-none px-3 pb-3">
                {/* Example of one card item */}
                {listData.map((item, index) => (
                  <Card key={index} className="mb-3 shadow-sm">
                    <div className="d-flex p-4 justify-content-between">
                      <div className="d-flex">
                        <div className="mx-2">
                          <Input
                            type="checkbox"
                            onClick={() => handleCheckId(item.Id)}
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
                            Update
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                  </Card>
                ))}

                {/* You can map more cards dynamically here */}
              </div>
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
                />

                {/* </nav> */}
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
      <EnquiryModal modal={modalOpen} toggle={toggleModal} />
      <BatchModal
        modal={batchModalOpen}
        toggle={batchModal}
        // studentID={studentID}
      />
      <StatusUpdate
        modal={statusModalOpen}
        toggle={toggleStatusModal}
        selectedId={statusID}
        refreshList={fetchPaginatedData} // ✅ pass the function
      />
    </>
  );
};

export default EnquiryDashboard;
