import React, { useState } from "react";
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
} from "reactstrap";
import { MdFilterAlt } from "react-icons/md";
import { MdFilterAltOff } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";

import FilterBar from "components/CustomFilter/FilterBar";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

const ReceiptList = () => {
  const [showFilters, setShowFilters] = useState(false);

  const [batches, setBatches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [searchText, setSearchText] = useState("");

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
                      <th scope="col">Receipt.No</th>
                      <th scope="col">Receipt Date</th>
                      <th scope="col">Student Name</th>
                      <th scope="col">Receipt Amount</th>
                      <th scope="col">Total Amount</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {daily.map((item, index) => (
                              <tr key={index}>
                                <td>{item.Id}</td>
                                <td>{item.TopicTitle}</td>
                                <td>{item.IsActive === 1 ? "Yes" : "No"}</td>
                                <td>{item.IsActive === 1 ? "Yes" : "No"}</td>
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
    </>
  );
};

export default ReceiptList;
