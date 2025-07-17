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
} from "reactstrap";
import Header from "components/Headers/Header";
import { FaPlus } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import useBranchList from "customHookApi/EnquiryDashboardApi/useBranchList";
import useStatusEnquiry from "customHookApi/EnquiryDashboardApi/useStatusEnquiry";
import FilterBar from "components/CustomFilter/FilterBar";
import Select from "react-select";
import { Input } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { enquiry } from "DummyData";
import { MdFilterAlt } from "react-icons/md";
import { MdFilterAltOff } from "react-icons/md";
import Loader from "components/CustomLoader/Loader";
import CustomPagination from "components/CustomPagination/CustomPagination";
import { exportToExcel } from "utils/printFile/exportToExcel";
import { printTableData } from "utils/printFile/printFile";
import { useSelector } from "react-redux";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

const pageNum = [
  { value: 10, label: "10" },
  { value: 25, label: " 25" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
  { value: 5, label: "5" },
];

const DailyCollection = () => {
  const defaultBranch = useSelector((state) => state.auth.selectedBranch);

  const [showFilters, setShowFilters] = useState(false);
  // const [selectedEnquiryType, setSelectedEnquiryType] = useState(enquiry[0]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [searchText, setSearchText] = useState("");
  // Branch
  const [batches, setBatches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);

  // Enquiry
  // const [statusOptions, setstatusOptions] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const [dailyLists, setDailyLists] = useState([]);
  const [isTableLoading, setIsTableLoading] = useState(false);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageStart, setPageStart] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumDropDown, setPageNumDropDown] = useState(pageNum[0]);
  const pageSize = pageNumDropDown?.value;
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

  const fetchBatch = async () => {
    const branchIDToUse = selectedBranch?.value || defaultBranch?.value;

    if (!branchIDToUse) return; // ✅ exit if nothing to use
    // setLoadingBatches(true); // Start loader
    try {
      const res = await axios.get(`${API_PATH}/api/GetBatch`, {
        params: {
          APIKEY: API_KEY,
          branchid: branchIDToUse,
          // branchid: selectedBranch?.value,
        },
      });

      const formattedBatch = res?.data.map((item) => ({
        value: item.BatchID,
        label: item.BatchName,
      }));
      // const formattedBatch = res?.data?.length
      //   ? res.data.map((item) => ({
      //       value: item.BatchID,
      //       label: item.BatchName,
      //     }))
      //   : [];

      setBatches(formattedBatch);
    } catch (error) {
      console.log(error);
      // setBatches([]);
    } finally {
      // setLoadingBatches(false); // Stop loader
    }
  };

  const fetchDailyCollection = async (page = 1) => {
    setIsTableLoading(true);
    try {
      const res = await axios.get(`${API_PATH}/api/Get_Daily_Fee_Collection`, {
        params: {
          fromdate: "2025-02-02",
          todate: "2026-01-01",
          pageno: page,
          pagesize: pageSize,
        },
      });
      setDailyLists(res?.data?.Data);
      setPageNumber(res.data.PageNumber);
      setTotalPages(res.data.TotalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setIsTableLoading(false);
    }
  };

  useEffect(() => {
    fetchDailyCollection(1);
  }, [pageSize]);

  const handleExport = () => {
    const exportData = dailyLists.map((item, index) => {
      const getDateOnly = (datetimeString) => {
        if (!datetimeString) return "";
        const datePart = datetimeString.split(" ")[0]; // "10/07/2025"
        return datePart.replace(/\//g, "-"); // "10-07-2025"
      };

      return {
        "S.No	": index + 1,
        "Student Name	": item.name,
        Batch: item.batchname,
        Branch: item.branch_name,
        "Total Amount": item.totalAmount,
        "Amount Recieved": item.amount_received,
        Date: getDateOnly(item.received_date),
      };
    });
    exportToExcel(exportData, "DailyCollection", "Sheet1");
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
                    selectedStatus={selectedStatus}
                    setSelectedStatus={setSelectedStatus}
                    fetchEnquiry={fetchEnquiry}
                    searchText={searchText}
                    // handleUnifiedSearchChange={handleUnifiedSearchChange}
                    enquiry={enquiry}
                    // selectedEnquiryType={selectedEnquiryType}
                    // handleEnquiryTypeChange={handleEnquiryTypeChange}
                    fetchBatch={fetchBatch}
                    batches={batches}
                    branch={defaultBranch} // 👈 pass it here
                    selectedBatch={selectedBatch}
                    setSelectedBatch={setSelectedBatch}
                    selectedBranch={selectedBranch}
                    setSelectedBranch={setSelectedBranch}
                    startDate={startDate}
                    endDate={endDate}
                    setDateRange={setDateRange}
                    // handleSearchClick={handleSearchClick}
                    showDatePicker={true}
                    showBatch={true}
                    showStatus={false}
                    showSearchByName={false}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </Col>
          <Col className="pb-4 d-none d-sm-block">
            <FilterBar
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              fetchEnquiry={fetchEnquiry}
              searchText={searchText}
              // handleUnifiedSearchChange={handleUnifiedSearchChange}
              enquiry={enquiry}
              // selectedEnquiryType={selectedEnquiryType}
              // handleEnquiryTypeChange={handleEnquiryTypeChange}
              fetchBatch={fetchBatch}
              batches={batches}
              branch={defaultBranch} // 👈 pass it here
              selectedBatch={selectedBatch}
              setSelectedBatch={setSelectedBatch}
              selectedBranch={selectedBranch}
              setSelectedBranch={setSelectedBranch}
              startDate={startDate}
              endDate={endDate}
              setDateRange={setDateRange}
              // handleSearchClick={handleSearchClick}
              showDatePicker={true}
              showBatch={true}
              showStatus={false}
              showSearchByName={false}
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
                  <h3 className="mb-0">Daily Collections</h3>
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
                        onClick={() =>
                          printTableData("Daily Fee Collection Lists")
                        }
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
                <Table
                  id="printable-table"
                  className="align-items-center table-flush"
                  responsive
                >
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col">Student Name</th>
                      <th scope="col">Batch</th>
                      <th scope="col">Branch</th>
                      <th scope="col">Total Amount</th>
                      <th scope="col">Amount Recieved</th>
                      <th scope="col">Date</th>
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
                    ) : dailyLists.length > 0 ? (
                      dailyLists.map((item, index) => {
                        const getDateOnly = (datetimeString) => {
                          if (!datetimeString) return "";
                          const datePart = datetimeString.split(" ")[0]; // "10/07/2025"
                          return datePart.replace(/\//g, "-"); // "10-07-2025"
                        };

                        return (
                          <tr key={index}>
                            <td>{(pageNumber - 1) * pageSize + index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.batchname}</td>
                            <td>{item.branch_name}</td>
                            <td>{item.totalAmount}</td>
                            <td>{item.amount_received}</td>
                            <td>{getDateOnly(item.received_date)}</td>
                          </tr>
                        );
                      })
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
                  <Loader />
                ) : dailyLists.length > 0 ? (
                  dailyLists.map((item, index) => (
                    <Card key={index} className="mb-3 shadow-sm">
                      <div className="d-flex p-4 justify-content-between">
                        <div className="d-flex">
                          <div>
                            <p className="fs-6 fw-semibold mb-1">
                              <strong>S.No. :</strong> {index + 1}
                            </p>
                            <p className="fs-6 fw-semibold mb-1">
                              <strong>Student Name:</strong> {item.name}
                            </p>
                            <p className="fs-6 fw-semibold mb-1">
                              <strong>Batch :</strong> {item.batchname}
                            </p>
                            <p className="fs-6 fw-semibold mb-1">
                              <strong>Branch :</strong> {item.branch_name}
                            </p>
                            <p className="fs-6 fw-semibold mb-1">
                              <strong>Total Amount :</strong> {item.totalAmount}
                            </p>
                            <p className="fs-6 fw-semibold mb-1">
                              <strong>Amount Received :</strong>{" "}
                              {item.amount_received}
                            </p>
                            <p className="fs-6 fw-semibold mb-1">
                              <strong>Date :</strong> {item.received_date}
                            </p>
                          </div>
                        </div>
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
                  fetchPaginatedData={fetchDailyCollection}
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
      <ToastContainer />
    </>
  );
};

export default DailyCollection;
