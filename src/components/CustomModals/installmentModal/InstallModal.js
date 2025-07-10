import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { FaPlus, FaMinus } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import axios from "axios";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

const InstallModal = ({
  modal,
  toggle,
  onSubmitInstallment,
  totalFees,
  batchId = null,
  studId = null,
}) => {
  const location = useLocation();
  const [initialAmount, setInitialAmount] = useState(0);
  const remainingAmount = totalFees - parseFloat(initialAmount || 0);
  const [numOfInstallments, setnumOfInstallments] = useState(0);
  const [frequencyDays, setFrequencyDays] = useState(0);
  // const [installmentStructure, setInstallmentStructure] = useState([]);
  const [installmentStructure, setInstallmentStructure] = useState([
    { title: "", amount: null, date: null },
  ]);

  const handleFeeChange = (index, key, value) => {
    const updated = [...installmentStructure];
    updated[index][key] = value;
    setInstallmentStructure(updated);
  };

  const handleAddInstallment = () => {
    setInstallmentStructure((prev) => [
      ...prev,
      { title: "", amount: null, date: new Date() },
    ]);
  };

  const handleRemoveInstallment = (index) => {
    setInstallmentStructure((prev) => prev.filter((_, i) => i != index));
  };

  const generateInstallments = () => {
    const today = new Date();
    const baseInstallmentAmount = parseFloat(
      (remainingAmount / numOfInstallments).toFixed(2)
    );
    const newStructure = [];
    // Initial installment
    newStructure.push({
      title: "Initial",
      amount: initialAmount,
      date: new Date(today), // Clone the date to avoid reference issues
    });

    // N Installments
    for (let i = 1; i <= numOfInstallments; i++) {
      const installmentDate = new Date(today); // Start from today each time
      installmentDate.setDate(installmentDate.getDate() + frequencyDays * i); // Add 5 days per installment

      newStructure.push({
        title: `${i}-Install`,
        amount: baseInstallmentAmount,
        date: installmentDate,
      });
    }
    // console.log(newStructure);
    setInstallmentStructure(newStructure);
  };

  const resetForm = () => {
    setInitialAmount(0);
    setnumOfInstallments(0);
    setFrequencyDays(0);
    setInstallmentStructure([{ title: "", amount: null, date: null }]);
  };

  const handleSubmit = () => {
    const validInstallments = installmentStructure.filter(
      (inst) => inst.title && inst.amount && inst.date
    );

    if (validInstallments.length === 0) {
      alert("Please fill at least one installment completely.");
      return;
    }

    const formatted = validInstallments.map((item) => ({
      installment_title: item.title,
      part_amount: item.amount.toString(),
      due_date: new Date(item.date).toISOString().split("T")[0], // ✅ Formats to "YYYY-MM-DD"
    }));

    // console.log(formatted);
    onSubmitInstallment(formatted); // ✅ send to parent
    resetForm();
    toggle(); // close modal
  };

  const handleSaveInstallment = async () => {
    const validInstallments = installmentStructure.filter(
      (inst) => inst.title && inst.amount && inst.date
    );

    if (validInstallments.length === 0) {
      alert("Please fill at least one installment completely.");
      return;
    }

    const formatted = validInstallments.map((item) => ({
      batch_Student_id: studId,
      installment_title: item.title,
      part_amount: item.amount.toString(),
      due_date: new Date(item.date).toISOString().split("T")[0], // ✅ Formats to "YYYY-MM-DD"
    }));
    // console.log(formatted);

    const payload = {
      batch_installments: formatted,
      CreatedBy: "Developer", // or logged-in user
    };
    console.log(payload);

    try {
      const res = await axios.post(
        `${API_PATH}/api/Save_Student_Installment`,
        payload,
        {
          params: {
            APIKEY: API_KEY,
            batch_student_id: studId,
          },
        }
      );
      console.log(res);
      resetForm();
      // toggle(); // close modal
    } catch (error) {
      console.log(error);
    } finally {
      toggle(); // close modal
    }
  };

  // useEffect(() => {
  //   const fetchTotalAmount = async () => {
  //     try {
  //       const res = await axios.get(`${API_PATH}/api/Get_Batch_installment`, {
  //         params: {
  //           APIKEY: API_KEY,
  //           batchid: 41,
  //           studentid: 53,
  //         },
  //       });

  //       const installmentData = res?.data || [];
  //       console.log("--------------");
  //       console.log(installmentData);
  //       console.log("--------------");
  //       // ✅ Convert `part_amount` to number and sum it
  //       // const total = installmentData.reduce((sum, item) => {
  //       //   const amount = parseFloat(item.part_amount || 0);
  //       //   return sum + (isNaN(amount) ? 0 : amount);
  //       // }, 0);

  //       // console.log("Total Amount:", total);
  //       // setTotalAmount(total); // <-- Store the total
  //     } catch (err) {
  //       console.error("Error fetching installment data:", err);
  //     }
  //   };

  //   fetchTotalAmount();
  // }, []);

  // console.log(`batchId --> ${batchId}`);
  // console.log(`studId --> ${studId}`);

  return (
    <Modal
      isOpen={modal}
      toggle={toggle}
      size="xl"
      centered
      backdrop="static"
      keyboard={false}
    >
      <ModalHeader
        toggle={toggle}
        className="bg-white border-bottom"
        // style={{ position: "sticky", top: 0 }}
      >
        <h1>Installments</h1>
      </ModalHeader>

      <ModalBody
      // style={{
      //   overflowY: "auto",
      //   height: "40vh",
      // }}
      >
        <div className="d-flex justify-content-end mb-2">
          <span style={{ fontWeight: 600 }}>Total fees : {totalFees}</span>
        </div>
        <Form>
          <Row className="align-items-end">
            <Col lg={2} md={4}>
              <FormGroup>
                <Label>Initial Deposit</Label>
                <Input
                  type="text"
                  placeholder="e.g. 10000"
                  value={initialAmount}
                  onChange={(e) => setInitialAmount(e.target.value)}
                />
              </FormGroup>
            </Col>

            <Col lg={2} md={4}>
              <FormGroup>
                <Label>Remaining Amount</Label>
                <Input
                  type="text"
                  value={remainingAmount >= 0 ? remainingAmount : 0}
                  readOnly
                  style={{ backgroundColor: "#f0f0f0", cursor: "not-allowed" }}
                />{" "}
              </FormGroup>
            </Col>

            <Col lg={2} md={4}>
              <FormGroup>
                <Label>Installments</Label>
                <Input
                  type="text"
                  placeholder="e.g. 3"
                  value={numOfInstallments}
                  onChange={(e) => setnumOfInstallments(e.target.value)}
                />
              </FormGroup>
            </Col>

            <Col lg={2} md={4}>
              <FormGroup>
                <Label>Frequency (in days)</Label>
                <Input
                  type="text"
                  placeholder="e.g. 30"
                  value={frequencyDays}
                  onChange={(e) => setFrequencyDays(e.target.value)}
                />
              </FormGroup>
            </Col>

            <Col lg={3} md={4}>
              <FormGroup>
                <Label className="invisible">.</Label>{" "}
                {/* invisible to align height */}
                <Button color="primary" block onClick={generateInstallments}>
                  Create Installment
                </Button>
              </FormGroup>
            </Col>
          </Row>

          <Col md={12}>
            <hr />
          </Col>

          {installmentStructure.map((item, index) => (
            <Row className="align-items-end mb-3">
              <Col md={4}>
                <FormGroup>
                  {/* <Label>{item.title || "Title"}</Label> */}
                  <Label>{"Title"}</Label>
                  <Input
                    type="text"
                    value={item.title}
                    onChange={(e) =>
                      handleFeeChange(index, "title", e.target.value)
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label>Amount</Label>
                  <Input
                    type="number"
                    value={item.amount}
                    onChange={(e) =>
                      handleFeeChange(index, "amount", e.target.value)
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={5}>
                <FormGroup>
                  <Label>Date</Label>
                  <div className="d-flex align-items-center">
                    <DatePicker
                      selected={item.date} // ✅ bind to item.date
                      onChange={(date) => handleFeeChange(index, "date", date)}
                      dateFormat="dd-MM-yyyy"
                      placeholderText="Select start date"
                      isClearable
                      scrollableYearDropdown
                      yearDropdownItemNumber={50}
                      minDate={new Date(1900, 0, 1)}
                      maxDate={new Date(2025, 11, 31)}
                      popperPlacement="bottom-start"
                      className="form-control"
                    />

                    <div
                      onClick={handleAddInstallment}
                      style={{
                        marginLeft: "8px",
                        width: "28px",
                        height: "28px",
                        backgroundColor: "#5e72e4",
                        color: "#fff",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      <FaPlus size={12} />
                    </div>

                    {installmentStructure.length > 1 && (
                      <div
                        onClick={() => handleRemoveInstallment(index)}
                        style={{
                          marginLeft: "8px",
                          width: "28px",
                          height: "28px",
                          backgroundColor: "#f5365c",
                          color: "#fff",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                      >
                        <FaMinus size={12} />
                      </div>
                    )}
                  </div>
                </FormGroup>
              </Col>
            </Row>
          ))}
        </Form>
      </ModalBody>

      <ModalFooter
        className="bg-white border-top"
        style={{ position: "sticky", bottom: 0, zIndex: 10 }}
      >
        {location.pathname === "/admin/batchStudent" ? (
          <Button color="primary" onClick={handleSaveInstallment}>
            Save Installment
          </Button>
        ) : (
          <Button color="primary" onClick={handleSubmit}>
            Add
          </Button>
        )}

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
    </Modal>
  );
};

export default InstallModal;
