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
import CustomPagination from "components/CustomPagination/CustomPagination";
import Select from "react-select";
import { Input } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { enquiry } from "DummyData";
import { fetchFinancialYearRangeByDate } from "utils/financialYearRange/FinancialYearRange";
import { useSelector } from "react-redux";
import { MdFilterAlt } from "react-icons/md";
import { MdFilterAltOff } from "react-icons/md";
import Loader from "components/CustomLoader/Loader";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

const pageNum = [
  { value: 10, label: "10" },
  { value: 25, label: " 25" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
];

const DueBalance = () => {
  const defaultBranch = useSelector((state) => state.auth.selectedBranch);

  const [showFilters, setShowFilters] = useState(false);
  // const [selectedEnquiryType, setSelectedEnquiryType] = useState(enquiry[0]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [searchText, setSearchText] = useState("");
  // Branch
  const [selectedBranch, setSelectedBranch] = useState(null);

  // Enquiry
  // const [statusOptions, setstatusOptions] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const { startDate1, endDate1 } = fetchFinancialYearRangeByDate();
  const [dueLists, setDueLists] = useState([]);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageStart, setPageStart] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumDropDown, setPageNumDropDown] = useState(pageNum[0]);
  const pagesize = pageNumDropDown?.value;

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

  const fetchDueCollection = async (page = 1) => {
    setIsTableLoading(true);
    try {
      const res = await axios.get(`${API_PATH}/api/Get_due_balance_report`, {
        params: {
          APIKEY: API_KEY,
          fromdate: startDate1,
          todate: endDate1,
          branchid: null,
          batchid: null,
          searchtext: "",
          pageno: page,
          pagesize: pagesize,
        },
      });
      setDueLists(res?.data?.Data);
      setPageNumber(res?.data?.PageNumber);
      setTotalPages(res?.data?.TotalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setIsTableLoading(false);
    }
  };

  useEffect(() => {
    fetchDueCollection(1);
  }, [pagesize]);

  const formattedDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = String(d.getFullYear());

    return `${day}-${month}-${year}`;
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
                    branch={defaultBranch}
                    selectedBranch={selectedBranch}
                    setSelectedBranch={setSelectedBranch}
                    startDate={startDate}
                    endDate={endDate}
                    setDateRange={setDateRange}
                    showDatePicker={false}
                    // handleSearchClick={handleSearchClick}
                    showStatus={true}
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
              branch={defaultBranch}
              selectedBranch={selectedBranch}
              setSelectedBranch={setSelectedBranch}
              startDate={startDate}
              endDate={endDate}
              setDateRange={setDateRange}
              showDatePicker={false}
              // handleSearchClick={handleSearchClick}
              showStatus={true}
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
                      <Button color="primary" block size="md">
                        Print
                      </Button>
                      <Button
                        color="primary"
                        block
                        size="md"
                        // onClick={handleExport}
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
                      <th scope="col">Student Name</th>
                      <th scope="col">Due Detail</th>
                      <th scope="col">Due Amount</th>
                      <th scope="col">Due Date</th>
                      <th scope="col">Late Fees</th>
                      <th scope="col">Total Amount</th>
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
                    ) : dueLists.length > 0 ? (
                      dueLists.map((item, index) => (
                        <tr key={index}>
                          <td>{item.batch_student_id}</td>
                          <td>{item.name}</td>
                          <td>{item.installment_title}</td>
                          <td>{item.part_amount}</td>
                          <td>{formattedDate(item.due_date)}</td>
                          <td>{item.late_fees}</td>
                          <td>{item.part_amount + item.late_fees}</td>
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
                  <Loader />
                ) : dueLists.length > 0 ? (
                  dueLists.map((item, index) => (
                    <Card key={index} className="mb-3 shadow-sm">
                      <div className="d-flex p-4 justify-content-between">
                        <div className="d-flex">
                          <div>
                            <p className="fs-6 fw-semibold mb-1">
                              <strong>S.No. :</strong> {item.batch_student_id}
                            </p>
                            <p className="fs-6 fw-semibold mb-1">
                              {" "}
                              <strong>Student Name:</strong> {item.name}
                            </p>
                            <p className="fs-6 fw-semibold mb-1">
                              <strong>Due Detail :</strong>
                              {item.installment_title}
                            </p>
                            <p className="fs-6 fw-semibold mb-1">
                              <strong>Due Amount :</strong>
                              {item.part_amount}
                            </p>
                            <p className="fs-6 fw-semibold mb-1">
                              <strong>Due Date :</strong>
                              {formattedDate(item.due_date)}
                            </p>
                            <p className="fs-6 fw-semibold mb-1">
                              <strong>Late Fees :</strong>
                              {item.late_fees}
                            </p>
                            <p className="fs-6 fw-semibold mb-1">
                              <strong>Total Amount :</strong>
                              {item.part_amount + item.late_fees}
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
                  fetchPaginatedData={fetchDueCollection}
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

export default DueBalance;
