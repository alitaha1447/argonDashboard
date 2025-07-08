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
import useBranchList from "customHookApi/EnquiryDashboardApi/useBranchList";
import axios from "axios";
import { paymentMode } from "DummyData";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

const PaymentDetail = ({ modal, toggle, batchId = null, studId = null }) => {
  const location = useLocation();

  // console.log("Pathname:", location.pathname);
  // console.log("-----PaymentDetail------", batchId);
  // console.log("-----PaymentDetail------", studId);
  const navigate = useNavigate();
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
    }
  };

  const fetchStudent = async () => {
    try {
      const res = await axios.get(`${API_PATH}/api/Get_Batch_student`, {
        params: {
          APIKEY: API_KEY,
          batchid: selectedBatch?.value,
        },
      });

      const formattedStudent = res?.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));

      setStudents(formattedStudent);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  // const fetchInstallmentAmount = async () => {
  //   const res = await axios.get(`${API_PATH}/api/Get_Batch_installment`, {
  //     params: {
  //       APIKEY: API_KEY,
  //       batchid: selectedBatch?.value || batchId,
  //       studentid: selectedStudent?.value || studId,
  //     },
  //   });
  //   setInstallmentList(res?.data);
  // };

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

  useEffect(() => {
    const batch = selectedBatch?.value || batchId;
    const student = selectedStudent?.value || studId;

    if (batch && student) {
      fetchInstallmentAmount(batch, student);
    }
  }, [selectedBatch, selectedStudent, batchId, studId]);

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
    console.log(payment);
    try {
      const res = await axios.post(`${API_PATH}/api/CollectFees`, payment, {
        params: {
          APIKEY: API_KEY,
          batchid: selectedBatch?.value || batchId,
          batch_studentid: selectedStudent?.value || studId,
          paymentmode: paymentModeOptions?.value,
        },
      });
      console.log("Payment Success", res?.data);
      console.log("Payment Success", res);

      toast.success("Payment Success !!");
      resetForm(); // reset before navigating
      navigate("/receiptForm"); // ✅ navigate after API call success
    } catch (error) {
      console.log(error);
    } finally {
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
                />
              </FormGroup>
            </Col>
            <Col md={4} className={``}>
              <FormGroup>
                <Label>Batch</Label>
                <Select
                  options={batches}
                  value={selectedBatch}
                  onChange={(selected) => {
                    setSelectedBatch(selected); // ✅ auto-reset batch when branch changes
                    setSelectedStudent(null); // ✅ Reset student
                  }}
                  placeholder="Select Batch"
                  onMenuOpen={fetchBatch}
                />
              </FormGroup>
            </Col>
            <Col md={4} className={``}>
              <FormGroup>
                <Label>Student</Label>
                <Select
                  options={students}
                  value={selectedStudent}
                  onChange={(selected) => setSelectedStudent(selected)}
                  onMenuOpen={fetchStudent}
                  placeholder="Select Student"
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
              {/* <th scope="col">Late Fee</th> */}
              <th scope="col">Fine</th>
              <th scope="col">Input</th>
            </tr>
          </thead>
          <tbody>
            {installmentList.map((item, index) => (
              <tr key={index}>
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
                      checked={!!totalAmount[index]}
                    />
                  </div>
                </td>
                <td>{item.installment_title}</td>
                <td>{item.part_amount}</td>
                <td>{formatDate(item.due_date)}</td>
                {/* <td>{"25000"}</td> */}
                <td>{item.fine}</td>
                <td>
                  <Input
                    // id={id}
                    // name={id}
                    placeholder={`Enter Fees`}
                    type={"text"}
                    style={{ width: "100%", minWidth: "120px" }}
                    value={totalAmount[index] || ""}
                    // onChange={(e) =>
                    //   handleFeeInputChange(index, item.id, e.target.value)
                    // }
                  />
                </td>
              </tr>
            ))}
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
              Logging in...
            </>
          ) : (
            "Payment"
          )}
        </Button>
        <Button
          color="secondary"
          onClick={() => {
            resetForm();
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

export default PaymentDetail;
