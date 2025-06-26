import React, { useEffect } from "react";
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

const FeeDetail = ({ modal, toggle }) => {
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
        <h1>Fee Details</h1>
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
              <th scope="col">Title</th>
              <th scope="col">Amount</th>
              <th scope="col">Payment Status</th>
              <th scope="col">Due Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{"TAHA"}</td>
              <td>{"55000"}</td>
              <td>{"Paid"}</td>
              <td>{"02-02-2025"}</td>
            </tr>
          </tbody>
        </Table>
      </ModalBody>
      {/* <ModalFooter
        className="bg-white border-top"
        style={{ position: "sticky", bottom: 0, zIndex: 10 }}
      >
        <Button color="primary">Payment</Button>
      
      </ModalFooter> */}
    </Modal>
  );
};

export default FeeDetail;
