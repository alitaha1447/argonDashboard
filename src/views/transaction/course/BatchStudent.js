import React, { useState, useEffect, useRef } from "react";
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

import Select from "react-select";
import useBranchList from "customHookApi/EnquiryDashboardApi/useBranchList";
import useStatusEnquiry from "customHookApi/EnquiryDashboardApi/useStatusEnquiry";

import axios from "axios";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import { useReactToPrint } from "react-to-print";
// import { printAndExportExcel } from "utils/printFile/printAndExportExcel";
const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

const data = [
  {
    sNo: 1,
    enrollmentNo: "TA1132",
    Name: "Taha",
    Mobile: "9981341447",
    Course: "React",
    Add: "",
    Gender: "Male",
  },
];

const BatchStudent = () => {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [batches, setBatches] = useState([]);
  const [loadingBatches, setLoadingBatches] = useState(false);

  // customHookAPI
  const {
    branchOptions,
    setBranchOptions,
    isLoading,
    fetchBranch,
    setBranchSearchText,
    branchSearchText,
  } = useBranchList();

  useEffect(() => {
    if (branchSearchText.length < 3) {
      setBranchOptions([]);
      return;
    }

    fetchBranch();
  }, [branchSearchText]);

  const fetchBatch = async () => {
    setLoadingBatches(true); // Start loader
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

      setBatches(formattedBatch);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingBatches(false); // Stop loader
    }
  };

  // const printAndExportExcel = () => {
  //   // ✅ Prepare data
  //   const worksheet = XLSX.utils.json_to_sheet(data);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Batch Students");

  //   // ✅ Generate Excel buffer and save
  //   const excelBuffer = XLSX.write(workbook, {
  //     bookType: "xlsx",
  //     type: "array",
  //   });

  //   const blob = new Blob([excelBuffer], {
  //     type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  //   });

  //   saveAs(blob, "batch-students.xlsx");

  //   // ✅ Print page (optional: only table)
  //   window.print();
  // };

  return (
    <>
      <Header />
      <Container className="mt--9" fluid>
        <Row>
          <Col className="pb-4 d-block d-sm-block ">
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
                <div style={{ width: "170px" }}>
                  <Select
                    id="branch-select"
                    options={batches}
                    value={selectedBatch}
                    onChange={(selected) => setSelectedBatch(selected)}
                    onMenuOpen={fetchBatch}
                    placeholder="batch"
                    isClearable
                    isLoading={loadingBatches}
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
                  <h3 className="mb-0 list">Lists</h3>
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
                        // onClick={() => printAndExportExcel(data)}
                      >
                        Print
                      </Button>
                      <Button
                        color="primary"
                        block
                        size="md"
                        // onClick={() => printAndExportExcel(data)}
                      >
                        Save as Excel
                      </Button>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
              </CardHeader>
              {/* ✅ Table View for Desktop (Large screens only) */}
              <div className="d-none d-lg-block print-only">
                <Table className="align-items-center table-flush " responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col">Enrollment No.</th>
                      <th scope="col">Name</th>
                      <th scope="col">Mobile</th>
                      <th scope="col">Course</th>
                      <th scope="col">Add</th>
                      <th scope="col">Gender</th>
                      <th scope="col">Action</th>
                      {/* <th scope="col">Date</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index}>
                        <td>{item.sNo}</td>
                        <td>{item.enrollmentNo}</td>
                        <td>{item.Name}</td>
                        <td>{item.Mobile}</td>
                        <td>{item.Course}</td>
                        <td>{item.Add}</td>
                        <td>{item.Gender}</td>

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
                                Add Installment
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              {/* ✅ Card View for Mobile & Tablet */}
              <div className="d-block d-lg-none p-3 print-hidden">
                <Card className="mb-3 shadow-sm">
                  <div className="d-flex p-4 justify-content-between">
                    <div className="d-flex">
                      <div>
                        <p className="fs-6 fw-semibold mb-1">
                          <strong>S.No. :</strong> {"1"}
                        </p>
                        <p className="fs-6 fw-semibold mb-1">
                          <strong>Enrollment No. :</strong> {"Taha"}
                        </p>
                        <p className="fs-6 fw-semibold mb-1">
                          <strong>Name :</strong>
                          {"React Js"}
                        </p>
                        <p className="fs-6 fw-semibold mb-1">
                          <strong>Mobile :</strong>
                          {"20-02-2025"}
                        </p>
                        <p className="fs-6 fw-semibold mb-1">
                          <strong>Course :</strong>
                          {"20-02-2025"}
                        </p>
                        <p className="fs-6 fw-semibold mb-1">
                          <strong>Add :</strong>
                          {"12"}
                        </p>
                        <p className="fs-6 fw-semibold mb-1">
                          <strong>Gender :</strong>
                          {"Male"}
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
                          Add Installment
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                </Card>
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

export default BatchStudent;
