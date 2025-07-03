import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, Table } from "reactstrap";
import axios from "axios";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

const FeeDetail = ({ modal, toggle, batchid, batchstudentid }) => {
  const [installments, setInstallments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (modal && batchid && batchstudentid) {
      const fetchDetail = async () => {
        try {
          setLoading(true);
          const res = await axios.get(`${API_PATH}/api/Get_Batch_installment`, {
            params: {
              APIKEY: API_KEY,
              batchid: batchid,
              studentid: batchstudentid,
            },
          });
          setInstallments(res.data || []);
        } catch (error) {
          console.error("Error fetching fee detail:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchDetail();
    }
  }, [modal, batchid, batchstudentid]);

  function formatDateToDDMMYYYY(datetimeStr) {
    const date = new Date(datetimeStr);
    if (isNaN(date)) return "Invalid Date";

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  return (
    <Modal
      isOpen={modal}
      toggle={toggle}
      size="lg"
      centered
      backdrop="static"
      keyboard={false}
    >
      <ModalHeader toggle={toggle} className="bg-white border-bottom">
        <h1>Fee Details</h1>
      </ModalHeader>

      <ModalBody style={{ overflowY: "auto", maxHeight: "50vh" }}>
        {loading ? (
          <div className="text-center py-3">
            <i className="fas fa-spinner fa-spin fa-2x text-primary" />
            <p className="mt-2 mb-0">Loading fee details...</p>
          </div>
        ) : installments.length === 0 ? (
          <div className="text-center text-muted">No data found.</div>
        ) : (
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
              {installments.map((item, index) => (
                <tr key={index}>
                  <td>{item.installment_title}</td>
                  <td>{item.part_amount}</td>
                  <td>{item.ispaid}</td>
                  <td>{formatDateToDDMMYYYY(item.due_date)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </ModalBody>
    </Modal>
  );
};

export default FeeDetail;
