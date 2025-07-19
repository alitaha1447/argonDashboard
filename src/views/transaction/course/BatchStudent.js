import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
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
} from "reactstrap";
import { FaPlus } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdFilterAlt } from "react-icons/md";
import { MdFilterAltOff } from "react-icons/md";

import Header from "components/Headers/Header";
import FilterBar from "components/CustomFilter/FilterBar";
import PaymentDetail from "components/CustomModals/paymentDetailModal/PaymentDetail";
import InstallModal from "components/CustomModals/installmentModal/InstallModal";
import { exportToExcel } from "utils/printFile/exportToExcel";
import { printTableData } from "utils/printFile/printFile";
// import Select from "react-select";
// import useBranchList from "customHookApi/EnquiryDashboardApi/useBranchList";
// import useStatusEnquiry from "customHookApi/EnquiryDashboardApi/useStatusEnquiry";

import axios from "axios";
import Loader from "components/CustomLoader/Loader";
import { useSelector } from "react-redux";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

const BatchStudent = () => {
  const navigate = useNavigate();
  const Branch = useSelector((state) => state.auth.selectedBranch);
  // console.log(Branch);/

  const [isTableLoading, setisTableLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showPaymentDetail, setShowPaymentDetail] = useState(false);

  const [selectedBranch, setSelectedBranch] = useState(null);
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [loadingBatches, setLoadingBatches] = useState(false);
  const [batchStudent, setBatchStudent] = useState([]);
  const [studid, setStudid] = useState("");
  // const [totalAmount, setTotalAmount] = useState(null);
  const [installModal, setInstallModal] = useState(false);
  // const [installmentStdId, setInstallmentStdId] = useState("");
  // customHookAPI
  // const {
  //   branchOptions,
  //   setBranchOptions,
  //   isLoading,
  //   fetchBranch,
  //   setBranchSearchText,
  //   branchSearchText,
  // } = useBranchList();

  // useEffect(() => {
  //   if (branchSearchText.length < 3) {
  //     setBranchOptions([]);
  //     return;
  //   }

  //   fetchBranch();
  // }, [branchSearchText]);
  // console.log(selectedBranch);
  // console.log(selectedBatch);
  const fetchBatch = async () => {
    const branchIDToUse = selectedBranch?.value;
    // || Branch?.value;

    if (!branchIDToUse) return; // ✅ exit if nothing to use
    // if (!selectedBranch?.value) return; // 🚫 Don't proceed if no branch is selected
    setLoadingBatches(true); // Start loader
    try {
      const res = await axios.get(`${API_PATH}/api/GetBatch`, {
        params: {
          APIKEY: API_KEY,
          branchid: branchIDToUse,
        },
      });

      const formattedBatch = res?.data.map((item) => ({
        value: item.BatchID,
        label: item.BatchName,
      }));

      setBatches(formattedBatch);
    } catch (error) {
      console.log(error);
      // setBatches([]);
    } finally {
      setLoadingBatches(false); // Stop loader
    }
  };

  useEffect(() => {
    const fetchBatchStudent = async () => {
      setisTableLoading(true);
      if (!selectedBatch?.value) {
        setBatchStudent([]); // ✅ Clear student list if no batch selected
        setisTableLoading(false);
        return;
      }
      try {
        const res = await axios.get(`${API_PATH}/api/Get_Batch_student`, {
          params: {
            APIKEY: API_KEY,
            batchid: selectedBatch?.value,
          },
        });
        setBatchStudent(res?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setisTableLoading(false);
      }
    };
    fetchBatchStudent();
  }, [selectedBatch?.value]);

  const togglePaymentDetail = (id) => {
    setStudid(id);
    setShowPaymentDetail((prev) => !prev);
  };

  const toggleInstallModal = (id = null) => {
    if (id !== null) setStudid(id);
    setInstallModal((prev) => !prev);
  };

  const resetBatchAndStudent = () => {
    setSelectedBatch(null);
    setStudid("");
  };

  const handleExport = () => {
    const exportData = batchStudent.map((item, index) => {
      return {
        "S.No	": index + 1,
        "Enrollment No.": item.admission_no,
        Name: item.name,
        Mobile: item.mobileno,
      };
    });
    exportToExcel(exportData, "BatchStudent", "Sheet1");
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
                    // branch={Branch} // 👈 pass it here
                    selectedBranch={selectedBranch}
                    setSelectedBranch={setSelectedBranch}
                    fetchBatch={fetchBatch}
                    batches={batches}
                    selectedBatch={selectedBatch}
                    setSelectedBatch={setSelectedBatch}
                    showBatch={true}
                    showStatus={false}
                    showCourseEnquiry={false}
                    showDatePicker={false}
                    showSearchByName={false}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </Col>
          <Col className="pb-4 d-none d-sm-block ">
            <FilterBar
              // branch={Branch} // 👈 pass it here
              selectedBranch={selectedBranch}
              setSelectedBranch={setSelectedBranch}
              fetchBatch={fetchBatch}
              batches={batches}
              selectedBatch={selectedBatch}
              setSelectedBatch={setSelectedBatch}
              showBatch={true}
              showStatus={false}
              showCourseEnquiry={false}
              showDatePicker={false}
              showSearchByName={false}
            />
          </Col>
        </Row>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <div
                  className="no-print"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <h3 className="mb-0 list">Lists</h3>
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
                        onClick={() => printTableData("Student Batch Lists")}
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
                      <Button
                        color="primary"
                        block
                        size="md"
                        onClick={() => navigate("/admin/userCreation")}
                      >
                        Add Student
                      </Button>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
              </CardHeader>
              {/* ✅ Table View for Desktop (Large screens only) */}

              <div className="d-none d-lg-block print-only">
                <Table
                  id="printable-table"
                  className="align-items-center table-flush "
                  responsive
                >
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col">Enrollment No.</th>
                      <th scope="col">Name</th>
                      <th scope="col">Mobile</th>

                      <th className="no-print" scope="col">
                        Action
                      </th>
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
                    ) : batchStudent.length > 0 ? (
                      batchStudent.map((item, index) => {
                        return (
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.admission_no}</td>
                            <td>{item.name}</td>
                            <td>{item.mobileno}</td>
                            <td className="no-print">
                              <UncontrolledDropdown direction="up">
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
                                    key={`${index}-installments`}
                                    onClick={() => toggleInstallModal(item?.id)}
                                  >
                                    Installments
                                  </DropdownItem>
                                  <DropdownItem
                                    key={`${index}-receiveAmount`}
                                    onClick={() =>
                                      togglePaymentDetail(item?.id)
                                    }
                                  >
                                    Recieve Amount
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
              <div className="d-block d-lg-none p-3 print-hidden">
                {isTableLoading ? (
                  <Loader />
                ) : batchStudent.length > 0 ? (
                  batchStudent.map((item, index) => (
                    <Card key={index} className="mb-3 shadow-sm">
                      <div className="d-flex p-4 justify-content-between">
                        <div className="d-flex">
                          <div>
                            <p className="fs-6 fw-semibold mb-1">
                              <strong>S.No. :</strong> {item.id}
                            </p>
                            <p className="fs-6 fw-semibold mb-1">
                              <strong>Enrollment No. :</strong>
                              {item.enrollmentid}
                            </p>
                            <p className="fs-6 fw-semibold mb-1">
                              <strong>Name :</strong>
                              {item.name}
                            </p>
                            <p className="fs-6 fw-semibold mb-1">
                              <strong>Mobile :</strong>
                              {item.mobileno}
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
                              key={`${index}-installments`}
                              onClick={() => toggleInstallModal(item.id)}
                            >
                              Installments
                            </DropdownItem>
                            <DropdownItem
                              key={`${index}-receiveAmount`}
                              onClick={() => togglePaymentDetail(item.id)}
                            >
                              Recieve Amount
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center">
                    <i className="fas fa-info-circle mr-2" />
                    No data found.
                  </div>
                )}
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
        <PaymentDetail
          modal={showPaymentDetail}
          toggle={togglePaymentDetail}
          batchId={selectedBatch?.value}
          studId={studid}
        />
        <InstallModal
          modal={installModal}
          toggle={toggleInstallModal}
          batchId={selectedBatch?.value}
          studId={studid}
          resetParentIds={resetBatchAndStudent}
        />
      </Container>
    </>
  );
};

export default BatchStudent;
