import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Header from "components/Headers/Header";
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
  Spinner,
} from "reactstrap";
import { MdFilterAlt } from "react-icons/md";
import { MdFilterAltOff } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";
import axios from "axios";

import FilterBar from "components/CustomFilter/FilterBar";
import CustomPagination from "components/CustomPagination/CustomPagination";
import { paymentMode } from "DummyData";
import { exportToExcel } from "utils/printFile/exportToExcel";
import { printTableData } from "utils/printFile/printFile";
import { fetchFinancialYearRangeByDate } from "utils/financialYearRange/FinancialYearRange";
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

const ReceiptList = () => {
  const defaultBranch = useSelector((state) => state?.auth?.selectedBranch);

  const [showFilters, setShowFilters] = useState(false);

  const [batches, setBatches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [activeFilters, setActiveFilters] = useState({});

  const [receiptLists, setReceiptLists] = useState([]);
  const [isTableLoading, setIsTableLoading] = useState(false);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageStart, setPageStart] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumDropDown, setPageNumDropDown] = useState(pageNum[0]);
  const pageSize = pageNumDropDown?.value;

  const [receiptId, setReceiptId] = useState("");

  const fetchBatch = async () => {
    // setLoadingBatches(true); // Start loader
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

  const handleUnifiedSearchChange = (e) => {
    const { value } = e.target;
    setSearchText(value);
    // if (value.trim() === "") {
    // setIsFilterActive(false);
    // setFilteredData([]);
    // }
  };

  const fetchReceiptList = async (page = 1, size = pageSize, filters = {}) => {
    setIsTableLoading(true);

    try {
      const { startDate1, endDate1 } = fetchFinancialYearRangeByDate();

      const fromDate = filters?.fromdate ? filters.fromdate : startDate1;
      const toDate = filters?.todate ? filters.todate : endDate1;

      const res = await axios.get(`${API_PATH}/api/Get_Receipt_list`, {
        params: {
          fromdate: fromDate,
          todate: toDate,
          branchid: filters.branch,
          batchid: filters.batch,
          pageno: page,
          pagesize: size,
        },
      });
      if (size === null) {
        return res?.data?.Data;
      }
      // console.log(res.data);
      setReceiptLists(res?.data?.Data);
      setPageNumber(res.data.PageNumber);
      setTotalPages(res.data.TotalPages);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.warning("No Data" || error?.message);
        setReceiptLists([]);
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
    fetchReceiptList(1, pageSize);
  }, [pageSize]);

  const formatDate1 = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0"); // months are 0-based
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const filters = {
    searchText: searchText.trim(),
    // enquirytype: selectedEnquiryType?.value || "",
    // status: selectedStatus?.value,
    branch: selectedBranch?.value,
    batch: selectedBatch?.value,
    fromdate: startDate ? formatDate1(startDate) : null,
    todate: endDate ? formatDate1(endDate) : null,
  };

  const handleSearch = () => {
    setActiveFilters(filters); // ⬅️ Store current filters
    fetchReceiptList(1, pageSize, filters); // ⬅️ Pass them for page 1
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    handleSearch(); // ✅ Reuse search logic
  };

  const handleReceiptId = (id) => {
    window.open(`/receiptForm?receiptId=${id}`, "_blank");
  };

  const handlePrint = async () => {
    const data = await fetchReceiptList(1, null, filters);

    const columns = [
      { label: "Receipt.No", accessor: "receipt_no" },
      { label: "Receipt Date", accessor: "receipt_date" },
      { label: "Student Name", accessor: "name" },
      { label: "Receipt Amount", accessor: "receipt_amt" },
      { label: "Payment Mode", accessor: "payment_mode" },
    ];

    const transformedData = data.map((item) => {
      const paymentModeLabel =
        paymentMode.find((mode) => mode.value === item.payment_mode)?.label ||
        "="; // 👈 fallback to 'Cash' instead of 0
      return {
        ...item,
        payment_mode: paymentModeLabel,
      };
    });

    printTableData("Receipt List", columns, transformedData);
  };

  const handleExport = () => {
    const exportData = receiptLists.map((item, index) => {
      const getDateOnly = (datetimeString) => {
        if (!datetimeString) return "";
        const datePart = datetimeString.split(" ")[0]; // "10/07/2025"
        return datePart.replace(/\//g, "-"); // "10-07-2025"
      };
      const paymentModeLabel =
        paymentMode.find((mode) => mode.value === item.payment_mode)?.label ||
        "-";
      return {
        "Receipt.No": item.receipt_no,
        "Receipt Date	": getDateOnly(item.receipt_date),
        "Student Name	": item.name,
        "Receipt Amount	": item.receipt_amt,
        "Payment Mode	": paymentModeLabel,
      };
    });
    exportToExcel(exportData, "ReceiptList", "Sheet1");
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
                    searchText={searchText}
                    handleUnifiedSearchChange={handleUnifiedSearchChange}
                    fetchBatch={fetchBatch}
                    batches={batches}
                    selectedBatch={selectedBatch}
                    setSelectedBatch={setSelectedBatch}
                    branch={defaultBranch}
                    selectedBranch={selectedBranch}
                    setSelectedBranch={setSelectedBranch}
                    handleSearchClick={handleSearchClick}
                    showSearchByName={true}
                    showBatch={true}
                    showDatePicker={true}
                    showStatus={false}
                    showSearchByFacultyName={false}
                    startDate={startDate}
                    endDate={endDate}
                    setDateRange={setDateRange}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </Col>
          <Col className="pb-4 d-none d-sm-block">
            <FilterBar
              searchText={searchText}
              handleUnifiedSearchChange={handleUnifiedSearchChange}
              fetchBatch={fetchBatch}
              batches={batches}
              selectedBatch={selectedBatch}
              setSelectedBatch={setSelectedBatch}
              branch={defaultBranch}
              selectedBranch={selectedBranch}
              setSelectedBranch={setSelectedBranch}
              handleSearchClick={handleSearchClick}
              showSearchByName={true}
              showBatch={true}
              showDatePicker={true}
              showStatus={false}
              showSearchByFacultyName={false}
              startDate={startDate}
              endDate={endDate}
              setDateRange={setDateRange}
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
                  <h3 className="mb-0">Receipt Lists</h3>
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
                <Table
                  id="printable-table"
                  className="align-items-center table-flush"
                  responsive
                >
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Receipt.No</th>
                      <th scope="col">Receipt Date</th>
                      <th scope="col">Student Name</th>
                      <th scope="col">Receipt Amount</th>
                      <th scope="col">Payment Mode</th>
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
                    ) : receiptLists.length > 0 ? (
                      receiptLists.map((item, index) => {
                        const getDateOnly = (datetimeString) => {
                          if (!datetimeString) return "";
                          const datePart = datetimeString.split(" ")[0]; // "10/07/2025"
                          return datePart.replace(/\//g, "-"); // "10-07-2025"
                        };

                        const paymentModeLabel = paymentMode.find(
                          (mode) => mode.value === item.payment_mode
                        );
                        console.log(item);
                        const label = paymentModeLabel
                          ? paymentModeLabel.label
                          : "Cash";
                        return (
                          <tr key={index}>
                            <td>{item.receipt_no}</td>
                            <td>{getDateOnly(item.receipt_date)}</td>
                            <td>{item.name}</td>
                            <td>{item.receipt_amt}</td>
                            <td>{label}</td>
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
                                  style={{
                                    minWidth: "120px",
                                    border: "1px solid #ddd",
                                    borderRadius: "4px",
                                    boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
                                  }}
                                >
                                  <DropdownItem
                                    key={`${index}-print`}
                                    onClick={() =>
                                      handleReceiptId(item.receipt_id)
                                    }
                                  >
                                    Print Receipt
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </td>
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
                  <Spinner color="primary">Loading...</Spinner>
                ) : receiptLists.length > 0 ? (
                  receiptLists.map((item, index) => {
                    return (
                      <Card key={index} className="mb-3 shadow-sm">
                        <div className="d-flex p-4 justify-content-between">
                          <div className="d-flex">
                            <div>
                              <p className="fs-6 fw-semibold mb-1">
                                <strong>Receipt.No.:</strong> {item.receipt_no}
                              </p>
                              <p className="fs-6 fw-semibold mb-1">
                                <strong>Receipt Date :</strong>{" "}
                                {item.receipt_date}
                              </p>
                              <p className="fs-6 fw-semibold mb-1">
                                <strong>Student Name :</strong>
                                {item.name}
                              </p>
                              <p className="fs-6 fw-semibold mb-1">
                                <strong>Receipt Amount :</strong>
                                {item.receipt_amt}
                              </p>
                              <p className="fs-6 fw-semibold mb-1">
                                <strong>Payment Mode :</strong>
                                {item.payment_mode}
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
                              style={{
                                minWidth: "120px",
                                border: "1px solid #ddd",
                                borderRadius: "4px",
                                boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
                              }}
                            >
                              <DropdownItem
                                key={`${index}-print`}
                                onClick={() => handleReceiptId(item.receipt_id)}
                              >
                                Print Receipt
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </div>
                      </Card>
                    );
                  })
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
                  fetchPaginatedData={fetchReceiptList}
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

export default ReceiptList;
