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
  Table,
} from "reactstrap";
const PaymentDetail = ({ modal, toggle }) => {
  return (
    <Modal
      isOpen={modal}
      toggle={toggle}
      size="lg"
      centered
      backdrop="static"
      keyboard={false}
    >
      <ModalHeader
        toggle={toggle}
        className="bg-white border-bottom"
        style={{ position: "sticky", top: 0, zIndex: 10 }}
      >
        <h1>Payment Details</h1>
      </ModalHeader>
      <ModalBody
        style={{
          overflowY: "auto",
          maxHeight: "50vh",
        }}
      >
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
            <tr>
              <th scope="col" className="text-center"></th>
              <th scope="col">Title</th>
              <th scope="col">Amount</th>
              <th scope="col">Due Date</th>
              <th scope="col">Late Fee</th>
              <th scope="col">Fine</th>
              <th scope="col">Input</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="d-flex justify-content-center align-items-center">
                  <Input
                    type="checkbox"
                    style={{ margin: 0 }}
                    // onClick={() => handleCheckId(item.Id)}
                  />
                </div>
              </td>
              <td>{"TAHA"}</td>
              <td>{"55000"}</td>
              <td>{"02-02-2025"}</td>
              <td>{"25000"}</td>
              <td>{"30000"}</td>
              <td>
                <Input
                  // id={id}
                  // name={id}
                  placeholder={`Enter Fees`}
                  type={"text"}
                  // value={value}
                  // onChange={onChange}
                />
              </td>
            </tr>
          </tbody>
        </Table>
      </ModalBody>
      <ModalFooter
        className="bg-white border-top"
        style={{ position: "sticky", bottom: 0, zIndex: 10 }}
      >
        <Button color="primary">Payment</Button>
        {/* <Button color="secondary" onClick={toggle}>
          Cancel
        </Button> */}
      </ModalFooter>
    </Modal>
  );
};

export default PaymentDetail;
