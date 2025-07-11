import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Input,
  Button,
  Table,
  Label,
  FormGroup,
} from "reactstrap";
import Select from "react-select";
import InputField from "components/FormFields/InputField";
import useBranchList from "customHookApi/EnquiryDashboardApi/useBranchList";
import axios from "axios";
import { paymentMode } from "DummyData";
import { ToastContainer, toast } from "react-toastify";
// import { useLocation } from "react-router-dom";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

const PaymentDetail = ({
  modal,
  toggle,
  branchId = null,
  batchId = null,
  studId = null,
  onPaymentSuccess = () => {},
  resetParentIds = () => {},
}) => {
  const [Loading, setLoading] = useState(false);

  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [installmentList, setInstallmentList] = useState([]);
  const [totalAmount, setTotalAmount] = useState([]);
  // const [totalAmount, setTotalAmount] = useState({});

  const [batches, setBatches] = useState([]);
  const [students, setStudents] = useState([]);

  const [payment, setPayment] = useState([]);

  const [paymentModeOptions, setPaymentModeOptions] = useState(paymentMode[0]);

  const [receiptId, setReceiptId] = useState("");
  const [isTableLoading, setIsTableLoading] = useState(false);

  const {
    branchOptions,
    setBranchOptions,
    isLoading,
    fetchBranch,
    setBranchSearchText,
    branchSearchText,
  } = useBranchList();

  const resetForm = () => {
    setSelectedBranch(null);
    setSelectedBatch(null);
    setSelectedStudent(null);
    setBatches([]);
    setStudents([]);
    setInstallmentList([]);
    setTotalAmount([]);
    setPayment([]);
    setPaymentModeOptions(paymentMode[0]);
  };

  useEffect(() => {
    if (branchSearchText.length < 3) {
      setBranchOptions([]);
      return;
    }

    fetchBranch();
  }, [branchSearchText]);

  const fetchBatch = async () => {
    // setLoading(true);
    if (!selectedBranch?.value) return; // ✅ prevent API call if branch not selected
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
      // setLoading(false);
    }
  };

  const fetchStudent = async () => {
    // setLoading(true);

    try {
      const res = await axios.get(`${API_PATH}/api/Get_Batch_student`, {
        params: {
          APIKEY: API_KEY,
          batchid: selectedBatch?.value,
        },
      });

      const formattedStudent = res?.data.map((item) => ({
        value: item.id,
        // value: item.studentid,
        label: item.name,
      }));

      setStudents(formattedStudent);
    } catch (error) {
      console.log(error);
    } finally {
      // setLoading(false);
    }
  };

  const fetchInstallmentAmount = async (batchValue, studentValue) => {
    try {
      const res = await axios.get(`${API_PATH}/api/Get_Batch_installment`, {
        params: {
          APIKEY: API_KEY,
          batchid: batchValue,
          studentid: studentValue,
        },
      });
      setInstallmentList(res?.data);
    } catch (error) {
      console.error("Error fetching installments:", error);
    }
  };

  const batch = selectedBatch?.value || batchId;
  const student = selectedStudent?.value ?? studId; // nullish coalescing operator.
  // const student =
  //   typeof studId === "object"
  //     ? studId?.value
  //     : selectedStudent?.value || studId;

  // const student =
  //   selectedStudent?.value ||
  //   (typeof studId === "object" ? studId?.value : studId);

  useEffect(
    () => {
      if (batch && student) {
        fetchInstallmentAmount(batch, student);
      }
    },
    [selectedBatch, selectedStudent, batchId, studId]
    // [batch, student]
  );

  const handleCheckboxChange = (index, id, partAmount, fine) => {
    const total = Number(partAmount) + Number(fine);
    const updatedAmount = [...totalAmount];
    const updatedPayment = [...payment];

    const existingIndex = updatedPayment.findIndex(
      (item) => item.installmentid === id
    );

    if (existingIndex !== -1) {
      // Already selected → uncheck → remove from payment
      updatedAmount[index] = "";
      updatedPayment.splice(existingIndex, 1);
    } else {
      // Not selected → check → add to payment
      updatedAmount[index] = total;
      updatedPayment.push({
        installmentid: id,
        amount: total.toString(),
      });
    }

    setTotalAmount(updatedAmount);
    setPayment(updatedPayment);
  };

  // const handleFeeInputChange = (index, id, value) => {
  //   const updatedAmount = [...totalAmount];
  //   updatedAmount[index] = value;

  //   const updatedPayment = [...payment];
  //   const existingIndex = updatedPayment.findIndex(
  //     (item) => item.installmentid === id
  //   );

  //   if (existingIndex !== -1) {
  //     // Update existing
  //     updatedPayment[existingIndex].amount = value;
  //   } else {
  //     // Add new entry
  //     updatedPayment.push({
  //       installmentid: id,
  //       amount: value,
  //     });
  //   }

  //   setTotalAmount(updatedAmount);
  //   setPayment(updatedPayment);
  // };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  const handlePayment = async () => {
    if (payment.length === 0) {
      toast.error(
        "Please select at least one installment to proceed with payment."
      );
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${API_PATH}/api/CollectFees`, payment, {
        params: {
          APIKEY: API_KEY,
          batchid: selectedBatch?.value || batchId,
          batch_studentid: selectedStudent?.value || studId,
          paymentmode: paymentModeOptions?.value,
        },
      });

      setReceiptId(res?.data?.receiptid);

      toast.success("Payment Success !!");
      resetForm(); // reset before navigating
      // ✅ Trigger callback to refresh dashboard
      // if (onPaymentSuccess) {
      //   onPaymentSuccess();
      // }
      resetParentIds(); // ✅ reset parent state
      toggle();
      onPaymentSuccess(); // ✅ Refresh parent (fee dashboard)
      window.open(`/receiptForm?receiptId=${res?.data?.receiptid}`, "_blank");
      // navigate("/receiptForm"); // ✅ navigate after API call success
      // setTimeout(() => {
      //   window.open(`/receiptForm?receiptId=${receiptId}`, "_blank");
      // }, 500); // optional small delay for smoother UI
    } catch (error) {
      console.log(error);
    } finally {
      resetForm();
      resetParentIds(); // ✅ reset parent state
      toggle();
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={modal}
      toggle={toggle}
      size="lg"
      centered
      backdrop="static"
      keyboard={false}
    >
      <ModalBody
        style={{
          overflowY: "auto",
          maxHeight: "auto",
        }}
      >
        {/* Dropdown Filters */}
        {/* {location.pathname !== "/admin/batchStudent"&&()} */}
        <div className="d-flex flex-column gap-3 mb-3" style={{ gap: "1rem" }}>
          <Row>
            <Col md={4} className={``}>
              <FormGroup>
                <Label>Branch</Label>

                <Select
                  id="branch-select"
                  options={branchOptions}
                  value={selectedBranch}
                  onChange={(selected) => {
                    setSelectedBranch(selected);
                    setSelectedBatch(null); // ✅ auto-reset batch when branch changes
                    setSelectedStudent(null); // ✅ Reset student
                  }}
                  onInputChange={(text) => setBranchSearchText(text)}
                  placeholder="Select Branch"
                  isLoading={isLoading}
                  noOptionsMessage={({ inputValue }) =>
                    inputValue.length < 3
                      ? "Type at least 3 characters to search"
                      : "No branches found"
                  }
                  isClearable
                />
              </FormGroup>
            </Col>
            <Col md={4} className={``}>
              <FormGroup>
                <Label>Batch</Label>
                <Select
                  // isDisabled={!selectedBranch}
                  options={batches}
                  value={selectedBatch}
                  onChange={(selected) => {
                    setSelectedBatch(selected); // ✅ auto-reset batch when branch changes
                    setSelectedStudent(null); // ✅ Reset student
                  }}
                  placeholder="Select Batch"
                  // placeholder={
                  //   selectedBranch ? "Select Batch" : "Select Branch First"
                  // }
                  onMenuOpen={fetchBatch}
                  // onMenuOpen={() => {
                  //   if (selectedBranch) fetchBatch();
                  // }}
                  // isLoading={Loading}
                />
              </FormGroup>
            </Col>
            <Col md={4} className={``}>
              <FormGroup>
                <Label>Student</Label>
                <Select
                  // isDisabled={!selectedBatch}
                  options={students}
                  value={selectedStudent}
                  onChange={(selected) => setSelectedStudent(selected)}
                  placeholder="Select Student"
                  onMenuOpen={fetchStudent}
                  // placeholder={
                  //   selectedBranch ? "Select Student" : "Select Batch First"
                  // }
                  // onMenuOpen={() => {
                  //   if (selectedBatch) fetchStudent();
                  // }}
                  // isLoading={Loading}
                />
              </FormGroup>
            </Col>
            <Col md={4} className={``}>
              <FormGroup>
                <Label>Payment Mode</Label>
                <Select
                  options={paymentMode}
                  value={paymentModeOptions}
                  onChange={(selected) => setPaymentModeOptions(selected)}
                  // onMenuOpen={fetchStudent}
                  placeholder="Select Payment Mode"
                />
              </FormGroup>
            </Col>
            {(paymentModeOptions?.value === 1 ||
              paymentModeOptions?.value === 2) && (
              <Col md={4}>
                <InputField
                  label="Transition Number"
                  id="transitionNumber"
                  type="text"
                  // Add your value and onChange handlers here if needed
                />
              </Col>
            )}
          </Row>
        </div>
        {/* Separator */}
        <div
          style={{
            borderBottom: "1px solid #dee2e6",
            marginBottom: "1rem",
          }}
        />
        <h1>Payment Details</h1>
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
            <tr>
              <th scope="col" className="text-center"></th>
              <th scope="col">Title</th>
              <th scope="col">Amount</th>
              <th scope="col">Due Date</th>
              <th scope="col">Fine</th>
              <th scope="col">Input</th>
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
            ) : installmentList.length > 0 ? (
              installmentList.map((item, index) => {
                const isPaid = item.ispaid === 1;
                return (
                  <tr
                    key={index}
                    title={isPaid ? "Payment done" : ""}
                    style={isPaid ? { backgroundColor: "#f8f9fa" } : {}}
                  >
                    <td>
                      <div className="d-flex justify-content-center align-items-center">
                        <Input
                          type="checkbox"
                          onChange={() =>
                            handleCheckboxChange(
                              index,
                              item.id,
                              item.part_amount,
                              item.fine
                            )
                          }
                          disabled={isPaid}
                          checked={!!totalAmount[index]}
                        />
                      </div>
                    </td>
                    <td>{item.installment_title}</td>
                    <td>{item.part_amount}</td>
                    <td>{formatDate(item.due_date)}</td>
                    <td>{item.fine}</td>
                    <td>
                      <Input
                        // id={id}
                        // name={id}
                        placeholder={`Enter Fees`}
                        type={"text"}
                        style={{ width: "100%", minWidth: "120px" }}
                        value={
                          isPaid ? item?.part_amount : totalAmount[index] || ""
                        }
                        // onChange={(e) =>
                        //   handleFeeInputChange(index, item.id, e.target.value)
                        // }
                      />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="10" className="text-center py-4 text-muted">
                  <i className="fas fa-info-circle mr-2" />
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </ModalBody>
      <ModalFooter
        className="bg-white border-top"
        style={{ position: "sticky", bottom: 0, zIndex: 10 }}
      >
        <Button color="primary" onClick={handlePayment} disabled={Loading}>
          {Loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Lodding in...
            </>
          ) : (
            "Payment"
          )}
        </Button>
        <Button
          color="secondary"
          onClick={() => {
            resetForm();
            resetParentIds(); // ✅ Reset parent state too
            toggle();
          }}
        >
          Cancel
        </Button>
      </ModalFooter>
      <ToastContainer />
    </Modal>
  );
};

export default React.memo(PaymentDetail);
