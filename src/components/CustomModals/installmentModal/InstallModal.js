import React, { useState } from "react";
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

const InstallModal = ({ modal, toggle, onSubmitInstallment }) => {
  const [installmentStructure, setInstallmentStructure] = useState([
    { title: "", amount: null, date: new Date() },
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

  const handleSubmit = () => {
    const validInstallments = installmentStructure.filter(
      (inst) => inst.title && inst.amount && inst.date
    );

    if (validInstallments.length === 0) {
      alert("Please fill at least one installment completely.");
      return;
    }

    const formatted = validInstallments.map((item) => ({
      // id: 0,
      // BatchID: 0,
      installment_title: item.title,
      // installment_description: "", // optional
      part_amount: parseFloat(item.amount),
      due_date: new Date(item.date).toISOString(),
    }));
    // console.log(formatted);
    onSubmitInstallment(formatted); // ✅ send to parent
    toggle(); // close modal
  };

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
          <span style={{ fontWeight: 600 }}>Total fees : 80000</span>
        </div>
        <Form>
          <Row className="align-items-end">
            <Col md={2}>
              <FormGroup>
                <Label>Initial Deposit</Label>
                <Input type="text" placeholder="e.g. 10000" />
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup>
                <Label>Remaining Amount</Label>
                <Input type="text" placeholder="e.g. 70000" />
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup>
                <Label>Installments</Label>
                <Input type="text" placeholder="e.g. 3" />
              </FormGroup>
            </Col>

            <Col md={3}>
              <FormGroup>
                <Label>Frequency (in days)</Label>
                <Input type="text" placeholder="e.g. 30" />
              </FormGroup>
            </Col>

            <Col md={3}>
              <FormGroup>
                <Label className="invisible">.</Label>{" "}
                {/* invisible to align height */}
                <Button color="primary" block>
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
                  <Label>Title</Label>
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
                      selected={item.date}
                      onChange={(date) => handleFeeChange(index, "date", date)}
                      dateFormat="dd/MM/yyyy"
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
        <Button color="primary" onClick={handleSubmit}>
          Submit
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default InstallModal;
