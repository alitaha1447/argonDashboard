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
  Input,
} from "reactstrap";
import { FaPlus } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import Header from "components/Headers/Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { enquiry } from "DummyData";
import useBranchList from "customHookApi/EnquiryDashboardApi/useBranchList";
import useStatusEnquiry from "customHookApi/EnquiryDashboardApi/useStatusEnquiry";
const FacultyCourses = () => {
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [selectedBranch, setSelectedBranch] = useState(null);

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

  useEffect(() => {
    if (branchSearchText.length < 3) {
      setBranchOptions([]);
      return;
    }

    fetchBranch();
  }, [branchSearchText]);

  return (
    <>
      <Header />
      <Container className="mt--9" fluid>
        <Row>
          <Col className="pb-4 d-block d-sm-block">
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
                  <Select
                    // options={enquiry}
                    // value={selectedEnquiryType}
                    // onChange={handleEnquiryTypeChange}
                    placeholder="faculty name"
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
                // onClick={handleSearchClick}
              >
                <i className="fas fa-search" />
              </div>
            </div>
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
                      <th scope="col">Faculty Name</th>
                      <th scope="col">Course</th>
                      <th scope="col">Start date</th>
                      <th scope="col">End date</th>
                      <th scope="col">Capacity</th>
                      {/* <th scope="col">Date</th> */}
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
                          <strong>Faculty Name:</strong> {"Taha"}
                        </p>
                        <p className="fs-6 fw-semibold mb-1">
                          <strong>Course :</strong>
                          {"React Js"}
                        </p>
                        <p className="fs-6 fw-semibold mb-1">
                          <strong>Start date :</strong>
                          {"20-02-2025"}
                        </p>
                        <p className="fs-6 fw-semibold mb-1">
                          <strong>End date :</strong>
                          {"20-02-2025"}
                        </p>
                        <p className="fs-6 fw-semibold mb-1">
                          <strong>Capacity :</strong>
                          {"12"}
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
              {/* <CardFooter className="py-4">
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
                      </CardFooter> */}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default FacultyCourses;
