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

  const [receiptLists, setReceiptLists] = useState([]);
  const [isTableLoading, setIsTableLoading] = useState(false);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageStart, setPageStart] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumDropDown, setPageNumDropDown] = useState(pageNum[0]);
  const pageSize = pageNumDropDown?.value;

  const [receiptId, setReceiptId] = useState("");

  const fetchBatch = async () => {
    console.log(1);
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

  const fetchReceiptList = async (page = 1) => {
    setIsTableLoading(true);
    try {
      const res = await axios.get(`${API_PATH}/api/Get_Receipt_list`, {
        params: {
          fromdate: "2025-02-02",
          todate: "2026-01-01",
          pageno: page,
          pagesize: pageSize,
        },
      });
      // console.log(res.data.Data);
      setReceiptLists(res?.data?.Data);
      setPageNumber(res.data.PageNumber);
      setTotalPages(res.data.TotalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setIsTableLoading(false);
    }
  };

  useEffect(() => {
    fetchReceiptList(1);
  }, [pageSize]);

  const handleReceiptId = (id) => {
    window.open(`/receiptForm?receiptId=${id}`, "_blank");
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
                    showSearchByName={true}
                    showBatch={true}
                    showDatePicker={false}
                    showStatus={false}
                    showSearchByFacultyName={false}
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
              showSearchByName={true}
              showBatch={true}
              showDatePicker={false}
              showStatus={false}
              showSearchByFacultyName={false}
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
                        onClick={() => printTableData("Receipt Lists")}
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

                        const paymentModeLabel =
                          paymentMode.find(
                            (mode) => mode.value === item.payment_mode
                          )?.label || "-";

                        return (
                          <tr key={index}>
                            <td>{item.receipt_no}</td>
                            <td>{getDateOnly(item.receipt_date)}</td>
                            <td>{item.name}</td>
                            <td>{item.receipt_amt}</td>
                            <td>{paymentModeLabel}</td>
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
                />
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default ReceiptList;
