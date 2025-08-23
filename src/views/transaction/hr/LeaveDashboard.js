import React, { useEffect, useState } from "react";
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

import Header from "components/Headers/Header";
import FilterBar from "components/CustomFilter/FilterBar";

import { MdFilterAlt } from "react-icons/md";
import { MdFilterAltOff } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";

import LeaveStatus from "components/CustomModals/leaveStatusModal/LeaveStatus";
const leaveList = [
  {
    empName: "Taha",
    leaveType: "Full",
    reason: "Wedding",
    totalDays: "5",
    startdate: "02-02-2025",
    enddate: "10-02-2025",
    status: "Rejected",
  },
];

const leaveTypeOptions = [
  { value: 1, label: "sick" },
  { value: 2, label: "paid" },
  { value: 3, label: "unpaid" },
  { value: 4, label: "maturnity" },
  { value: 5, label: "paturnity" },
];

const LeaveDashboard = () => {
  const [leaveStatusModal, setLeaveStatusModal] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const toggleLeaveStatus = () => {
    setLeaveStatusModal((prev) => !prev);
  };

  return (
    <>
      <Header />
      <Container className="mt--8" fluid>
        <Row className="d-flex flex-column">
          <Col>
            <div
              className="rounded-3 mb-2 d-flex d-sm-none justify-content-between align-items-center px-2 py-2 w-100"
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
                    //   handleUnifiedSearchChange={handleUnifiedSearchChange}
                    //   handleEnquiryTypeChange={handleEnquiryTypeChange}
                    startDate={startDate}
                    endDate={endDate}
                    setDateRange={setDateRange}
                    //   handleSearchClick={handleSearchClick}

                    leaveTypeOptions={leaveTypeOptions}
                    showLeaveType={true}
                    showDatePicker={true}
                    showStatus={false}
                    showCourseEnquiry={false}
                    showBatch={false}
                    showBranch={false}
                  //   activeFilters={activeFilters}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </Col>
          {/* ✅ Filter box for large screens (always visible) */}
          <Col className="pb-4 d-none d-sm-block">
            <FilterBar
              searchText={searchText}
              //   handleUnifiedSearchChange={handleUnifiedSearchChange}
              //   handleEnquiryTypeChange={handleEnquiryTypeChange}
              startDate={startDate}
              endDate={endDate}
              setDateRange={setDateRange}
              //   handleSearchClick={handleSearchClick}
              leaveTypeOptions={leaveTypeOptions}
              showLeaveType={true}
              showDatePicker={true}
              showStatus={false}
              showCourseEnquiry={false}
              showBatch={false}
              showBranch={false}
            //   activeFilters={activeFilters}
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
                  <h3 className="mb-0">Leave Request Lists</h3>
                  <div className="d-flex align-item-center">
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
                        //   onClick={handlePrint}
                        >
                          Print
                        </Button>
                        <Button
                          color="primary"
                          block
                          size="md"
                        //   onClick={handleExport}
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
                      <th scope="col">Employee Name</th>
                      <th scope="col">Leave Type</th>
                      <th scope="col">Reason</th>
                      <th scope="col">Total Days</th>
                      <th scope="col">Start Date</th>
                      <th scope="col">End Date</th>
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
                    ) : leaveList.length > 0 ? (
                      leaveList.map((student, index) => (
                        <tr key={index}>
                          <td>{student.empName}</td>
                          <td>{student.leaveType}</td>
                          <td>{student.reason}</td>
                          <td>{student.totalDays}</td>
                          <td>{student.startdate}</td>
                          <td>{student.enddate}</td>
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
                                <DropdownItem onClick={toggleLeaveStatus}>
                                  Status
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
                ) : leaveList.length === 0 ? (
                  <div className="text-center py-4 text-muted">
                    <i className="fas fa-info-circle mr-2" />
                    No data found.
                  </div>
                ) : (
                  leaveList.map((item, index) => (
                    <Card key={index} className="mb-3 shadow-sm">
                      <div className="d-flex p-4 justify-content-between">
                        <div className="d-flex">
                          <div>
                            <p className="fs-6 fw-semibold mb-1">
                              <strong>Employee Name :</strong> {item.empName}
                            </p>
                            <p className="fs-6 fw-semibold mb-1">
                              <strong>Leave Type :</strong> {item.leaveType}
                            </p>
                            <p className="fs-6 fw-semibold mb-1">
                              <strong>Reason :</strong> {item.reason}
                            </p>
                            <p className="fs-6 fw-semibold mb-1">
                              <strong>Total Days :</strong> {item.totalDays}
                            </p>
                            <p className="fs-6 fw-semibold mb-1">
                              <strong>Start Date :</strong> {item.startdate}
                            </p>
                            <p className="fs-6 fw-semibold mb-1">
                              <strong>End Date :</strong> {item.enddate}
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
                            <DropdownItem onClick={toggleLeaveStatus}>
                              Status
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </Card>
            {/* <CardFooter className="py-4">
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
                  </CardFooter> */}
          </Col>
        </Row>
      </Container>
      <LeaveStatus modal={leaveStatusModal} toggle={toggleLeaveStatus} />
    </>
  );
};

export default LeaveDashboard;
