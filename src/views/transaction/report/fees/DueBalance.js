import React, { useState, useEffect } from "react";
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

const DueBalance = () => {
  // const [selectedEnquiryType, setSelectedEnquiryType] = useState(enquiry[0]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [searchText, setSearchText] = useState("");
  // Branch
  const [selectedBranch, setSelectedBranch] = useState(null);

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

  return (
    <>
      <Header />

      <Container className="mt--9" fluid>
        <Row>
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
              selectedBranch={selectedBranch}
              setSelectedBranch={setSelectedBranch}
              startDate={startDate}
              endDate={endDate}
              setDateRange={setDateRange}
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
                  <div
                    // onClick={toggleMaster}
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
                  </div>
                </div>
              </CardHeader>
              {/* ✅ Table View for Desktop (Large screens only) */}
              <div className="d-none d-lg-block">
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col">Student Name</th>
                      <th scope="col">Total Amount</th>
                      <th scope="col">Amount Paid</th>
                      <th scope="col">Amount Due</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {daily.map((item, index) => (
                      <tr key={index}>
                        <td>{item.Id}</td>
                        <td>{item.TopicTitle}</td>
                        <td>{item.IsActive === 1 ? "Yes" : "No"}</td>
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
                                key={index}
                                // onClick={() => toggleStatusModal(item.Id)}
                              >
                                Edit
                              </DropdownItem>
                              <DropdownItem
                                key={index}
                                // onClick={() => toggleStatusModal(item.Id)}
                              >
                                Delete
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    ))} */}
                  </tbody>
                </Table>
              </div>
              {/* ✅ Card View for Mobile & Tablet */}
              <div className="d-block d-lg-none p-3">
                {/* {courses.map((item, index) => ( */}
                <Card className="mb-3 shadow-sm">
                  <div className="d-flex p-4 justify-content-between">
                    <div className="d-flex">
                      <div>
                        <p className="fs-6 fw-semibold mb-1">
                          <strong>S.No. :</strong> {"1"}
                        </p>
                        <p className="fs-6 fw-semibold mb-1">
                          <strong>Student Name:</strong> {"Taha"}
                        </p>
                        <p className="fs-6 fw-semibold mb-1">
                          <strong>Batch :</strong>
                          {"React Js"}
                        </p>
                        <p className="fs-6 fw-semibold mb-1">
                          <strong>Bracnh :</strong>
                          {"Bhopal"}
                        </p>
                        <p className="fs-6 fw-semibold mb-1">
                          <strong>Total Amount :</strong>
                          {"75500"}
                        </p>
                        <p className="fs-6 fw-semibold mb-1">
                          <strong>Amount Recieved :</strong>
                          {"12500"}
                        </p>
                        <p className="fs-6 fw-semibold mb-1">
                          <strong>Date :</strong>
                          {"20-02-2025"}
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
                        // key={index}
                        // onClick={() => toggleStatusModal(item.Id)}
                        >
                          Edit
                        </DropdownItem>
                        <DropdownItem
                        // key={index}
                        // onClick={() => toggleStatusModal(item.Id)}
                        >
                          Delete
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                </Card>
                {/* ))} */}
              </div>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
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
