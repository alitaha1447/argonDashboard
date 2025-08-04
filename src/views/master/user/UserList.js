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
  Input,
  Spinner,
} from "reactstrap";
import Header from "components/Headers/Header";
import InputField from "components/FormFields/InputField";
import RadioGroupField from "components/FormFields/RadioGroup";
import FilterBar from "components/CustomFilter/FilterBar";
import CustomPagination from "components/CustomPagination/CustomPagination";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import { MdFilterAlt } from "react-icons/md";
import { MdFilterAltOff } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

const facultyBatch = [
  {
    userId: 1,
    userName: "Taha",
    email: "ali.taha1447@gmail.com",
    mobile: "9981341447",
  },
];

const pageNum = [
  { value: 10, label: "10" },
  { value: 25, label: " 25" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
];

const UserList = () => {
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageStart, setPageStart] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumDropDown, setPageNumDropDown] = useState(pageNum[0]);
  const pageSize = pageNumDropDown?.value;
  const [userLists, setuserLists] = useState([]);

  const fetchUserList = async (page = 1, size = pageSize, filters = {}) => {
    setIsTableLoading(true);
    try {
      const res = await axios.get(`${API_PATH}/api/Get_User_List`, {
        params: {
          APIKEY: API_KEY,
          userid: null,
          pageno: page,
          pagesize: size,
        },
      });
      setuserLists(res?.data?.Data);
      setPageNumber(res.data.PageNumber);
      setTotalPages(res.data.TotalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setIsTableLoading(false);
    }
  };

  useEffect(() => {
    fetchUserList(1, pageSize);
  }, [pageSize]);

  return (
    <div>
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
                    selectedBranch={selectedBranch}
                    setSelectedBranch={setSelectedBranch}
                    // handleSearchClick={handleSearchClick}
                    showSearchByFacultyName={true}
                    showSearchByName={false}
                    showBatch={false}
                    showCourseEnquiry={false}
                    showStatus={false}
                    showDatePicker={false}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </Col>
          <Col className="pb-4 d-none d-sm-block">
            <FilterBar
              selectedBranch={selectedBranch}
              setSelectedBranch={setSelectedBranch}
              // handleSearchClick={handleSearchClick}
              showSearchByName={true}
              showSearchByFacultyName={false}
              showBatch={false}
              showCourseEnquiry={false}
              showStatus={false}
              showDatePicker={false}
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
                  <h3 className="mb-0">User Lists</h3>
                  <UncontrolledDropdown direction="left">
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
                        // onClick={handlePrint}
                      >
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
                      <th scope="col">User Id</th>
                      <th scope="col">User Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Mobile</th>
                      <th scope="col">Is Active</th>
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
                    ) : userLists.length > 0 ? (
                      userLists.map((item, index) => (
                        <tr key={item.Id}>
                          <td>{item.Id}</td>
                          <td>{item.Name}</td>
                          <td>{item.Email}</td>
                          <td>{item.MobileNo}</td>
                          <td>
                            <div className="d-flex justify-content-center align-items-center">
                              <Input
                                type="checkbox"
                                style={{ margin: 0 }}
                                checked={item.IsActive === 1} // ✅ Checked only if IsActive is 1
                                // checked={studentID.some(
                                //   (s) => s.enrollmentid === item.Id
                                // )} // ✅ controlled state
                                // onChange={() => handleCheckId(item.Id)}
                                // disabled={item.status_txt === "Admission Done"} // ✅ disable if condition matches
                              />
                            </div>
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
              {/* ✅ Card View for Mobile & Tablet */}
              <div className="d-block d-lg-none p-3">
                {isTableLoading ? (
                  <Spinner color="primary">Loading...</Spinner>
                ) : userLists.length > 0 ? (
                  userLists.map((item, index) => (
                    <Card className="mb-3 shadow-sm">
                      <div className="d-flex p-4 justify-content-between">
                        <div className="d-flex">
                          <div>
                            <p className="fs-6 fw-semibold mb-1">
                              <strong>User Id. :</strong> {item.Id}
                            </p>
                            <p className="fs-6 fw-semibold mb-1">
                              <strong>User Name:</strong> {item.Name}
                            </p>
                            <p className="fs-6 fw-semibold mb-1">
                              <strong>Email:</strong>
                              {item.Email}
                            </p>

                            <p className="fs-6 fw-semibold mb-1">
                              <strong>Mobile :</strong>
                              {item.MobileNo}
                            </p>
                            <p className="fs-6 fw-semibold mb-1">
                              <div className="d-flex align-items-center">
                                <strong>Is Active</strong>
                                <Input
                                  type="checkbox"
                                  style={{ margin: 0 }}
                                  checked={item.IsActive === 1} // ✅ Checked only if IsActive is 1
                                  // checked={studentID.some(
                                  //   (s) => s.enrollmentid === item.Id
                                  // )} // ✅ controlled state
                                  // onChange={() => handleCheckId(item.Id)}
                                  // disabled={
                                  //   item.status_txt === "Admission Done"
                                  // } // ✅ disable if condition matches
                                />
                              </div>
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
                  fetchPaginatedData={fetchUserList}
                  pageNumber={pageNumber}
                  pageNumDropDown={pageNumDropDown}
                  setPageNumDropDown={setPageNumDropDown}
                  pageNum={pageNum}
                  // activeFilters={activeFilters}
                />
              </CardFooter>
            </Card>
          </div>
        </Row>
        <ToastContainer />
      </Container>
      <ToastContainer />
    </div>
  );
};

export default UserList;
