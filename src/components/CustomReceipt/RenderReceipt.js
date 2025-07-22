import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Card, Table } from "reactstrap";
// import "../receipt/receipt.css";

import { paymentMode } from "DummyData";
import { numberToWordsIndian } from "utils/numToWords";
import axios from "axios";
import { useLocation } from "react-router-dom";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

const RenderReceipt = ({ copyType }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const receiptId = queryParams.get("receiptId");
  const [data, setData] = useState({});
  const [paidInstallment, setpaidInstallment] = useState([]);
  const [ready, setReady] = useState(false); // ✅ ensures both receipts rendered

  useEffect(() => {
    const receiptData = async () => {
      // if (!receiptId || printedRef.current) return;
      try {
        const res = await axios.get(`${API_PATH}/api/Get_Receipt_Data`, {
          params: {
            APIKEY: API_KEY,
            receipt_id: receiptId,
          },
        });
        setData(res?.data);
        setpaidInstallment(res?.data?.paid_installment);
        setReady(true); // ✅ now it's safe to print

        // setTimeout(() => {
        //   window.print();
        // }, 500);
      } catch (error) {
        console.log(`Rciept --> ${error}`);
      }
    };
    if (receiptId) {
      receiptData();
    }
  }, [receiptId]);

  const totalPaid = paidInstallment.reduce(
    (acc, item) => acc + parseFloat(item.total_paid_amount || 0),
    0
  );

  const sgstRate = data?.sgst || 0; // assuming 9

  const cgstRate = data?.cgst || 0; // assuming 9

  // const sgstAmount = (totalPaid * sgstRate) / 100;
  // const cgstAmount = (totalPaid * cgstRate) / 100;

  // const totalWithGST = totalPaid + sgstAmount + cgstAmount;
  const totalWithGST = totalPaid + sgstRate + cgstRate;
  const roundOffAmount = totalWithGST.toFixed(2);

  const paymentModeLabel =
    paymentMode.find((mode) => mode.value === data.payment_mode)?.label || "-";

  const formattedDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = String(d.getFullYear());

    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    if (ready && !sessionStorage.getItem("receipt_printed")) {
      sessionStorage.setItem("receipt_printed", "true");
      setTimeout(() => {
        console.log("Calling print...");
        window.focus();
        window.print();
      }, 500);
    }
  }, [ready]);

  return (
    <div>
      <div className="receipt-table w-100" style={{ marginBottom: "40px" }}>
        <Table
          responsive
          className="table fs-6 w-100"
          style={{
            border: "2px solid black",
            borderCollapse: "collapse",
          }}
        >
          <thead className="receipt-table">
            <tr>
              {/* Left Column – Logo */}
              <td
                style={{
                  width: "25%",
                  verticalAlign: "top",
                }}
              >
                <img
                  alt="Miracle Logo"
                  src={require("../../assets/img/brand/MiracleInfoserv.png")}
                  style={{ height: "auto", maxWidth: "100%" }}
                />
                <p style={{ margin: 0, fontSize: "14px" }}>
                  Bhopal - 80, Zone-II, MP Nagar
                </p>
              </td>

              {/* Middle Column – Title */}
              <td
                style={{
                  width: "50%",
                  textAlign: "center",
                  verticalAlign: "top",
                }}
              >
                <h2 style={{ margin: 0 }}>Receipt</h2>
              </td>

              {/* Right Column – Info */}
              <td
                style={{
                  width: "25%",
                  textAlign: "left",
                  verticalAlign: "top",
                }}
              >
                <p className="mb-0">{copyType}</p>
                <p className="mb-0">Receipt No. : {data?.receipt_no}</p>
                <p className="mb-0">Center Name : {data.branch_name}</p>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colSpan={1}
                style={{
                  borderTop: "2px solid black",
                  borderBottom: "2px solid black",
                  padding: "8px",
                }}
              >
                Student Name : {data?.name}
              </td>
              <td
                colSpan={1}
                style={{
                  borderTop: "2px solid black",
                  borderBottom: "2px solid black",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                Course : {data?.topic_title}
              </td>
              <td
                colSpan={1}
                style={{
                  borderTop: "2px solid black",
                  borderBottom: "2px solid black",
                  padding: "8px",
                }}
              >
                Payment Date : {formattedDate(data?.payment_date)}
              </td>
            </tr>
            <tr>
              <td
                colSpan={3}
                style={{
                  borderTop: "2px solid black",
                  borderBottom: "2px solid black",
                  padding: "8px",
                }}
              >
                Roll No : {data?.admission_no}
              </td>
              {/* <td
                  colSpan={1}
                  style={{
                    borderTop: "2px solid black",
                    borderBottom: "2px solid black",
                    padding: "8px",
                  }}
                >
                  Roll No : MP-
                </td> */}
              {/* <td
                  colSpan={1}
                  style={{
                    borderTop: "2px solid black",
                    borderBottom: "2px solid black",
                    padding: "8px",
                  }}
                >
                  Roll No : MP-
                </td> */}
            </tr>
            <tr>
              {/* First column spans 2 cells */}
              <td
                colSpan={2}
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  // textAlign: "center",
                }}
              >
                Particular
                {/* Left Side (colSpan=2) */}
              </td>

              {/* Second column - normal */}
              <td
                style={{
                  border: "2px solid black",
                  padding: "8px",
                }}
              >
                Amount
              </td>
            </tr>
            {paidInstallment.map((item, index) => (
              <tr>
                <td
                  colSpan={2}
                  style={{
                    border: "2px solid black",
                    padding: "8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    {item?.installment_title}
                    {/* <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        margin: 0,
                      }}
                    >
                      Booking&nbsp;
                      <input type="checkbox" />
                    </label> */}
                    {/* <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        margin: 0,
                      }}
                    >
                      Registration&nbsp;
                      <input type="checkbox" />
                    </label> */}
                    {/* <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        margin: 0,
                      }}
                    >
                      Admission&nbsp;
                      <input type="checkbox" />
                    </label> */}
                    {/* <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        margin: 0,
                      }}
                    >
                      Installment&nbsp;
                      <input type="checkbox" />
                    </label> */}
                  </div>
                </td>
                <td
                  rowSpan={1}
                  style={{
                    border: "2px solid black",
                    padding: "8px",
                    // textAlign: "right",
                    verticalAlign: "top", // optional: aligns to top of the merged cell
                  }}
                >
                  {item?.total_paid_amount}
                </td>
              </tr>
            ))}
            {/* <tr>
                <td
                  colSpan={2}
                  style={{
                    border: "2px solid black",
                    padding: "8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    Course Fees:
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        margin: 0,
                      }}
                    >
                      Booking&nbsp;
                      <input type="checkbox" />
                    </label>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        margin: 0,
                      }}
                    >
                      Registration&nbsp;
                      <input type="checkbox" />
                    </label>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        margin: 0,
                      }}
                    >
                      Admission&nbsp;
                      <input type="checkbox" />
                    </label>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        margin: 0,
                      }}
                    >
                      Installment&nbsp;
                      <input type="checkbox" />
                    </label>
                  </div>
                </td>
                <td
                  rowSpan={1}
                  style={{
                    border: "2px solid black",
                    padding: "8px",
                    // textAlign: "right",
                    verticalAlign: "top", // optional: aligns to top of the merged cell
                  }}
                >
                  465897
                </td>
              </tr> */}

            {/* Row 2 - Second Particular */}
            {/* <tr>
                <td
                  colSpan={2}
                  style={{ border: "2px solid black", padding: "8px" }}
                >
                  Admission Fee
                </td>
                <td
                  rowSpan={1}
                  style={{
                    border: "2px solid black",
                    padding: "8px",
                    textAlign: "right",
                    verticalAlign: "top", // optional: aligns to top of the merged cell
                  }}
                ></td>
              </tr> */}

            {/* Row 3 - Third Particular */}
            <tr>
              <td
                colSpan={2}
                style={{ border: "2px solid black", padding: "8px" }}
              >
                SGST @ 9%
              </td>
              <td
                colSpan={1}
                style={{
                  border: "2px solid black",
                  padding: "8px",
                  // textAlign: "right",
                }}
              >
                {`${data?.sgst}`}
              </td>
            </tr>
            <tr>
              <td
                colSpan={2}
                style={{ border: "2px solid black", padding: "8px" }}
              >
                CGST @ 9%
              </td>
              <td
                style={{
                  border: "2px solid black",
                  padding: "8px",
                  // textAlign: "right",
                }}
              >
                {`${data?.cgst}`}
              </td>
            </tr>
            {/* <tr>
                <td
                  colSpan={2}
                  style={{ border: "2px solid black", padding: "8px" }}
                ></td>
                <td
                  style={{
                    border: "2px solid black",
                    padding: "8px",
                    textAlign: "right",
                  }}
                ></td>
              </tr> */}
            <tr>
              <td
                colSpan={2}
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  // textAlign: "right",
                }}
              >
                Total Fees paid
              </td>
              <td
                style={{
                  border: "2px solid black",
                  padding: "8px",
                  // textAlign: "right",
                }}
              >
                {roundOffAmount}
              </td>
            </tr>
            <tr>
              {/* Left side - Row 1 */}
              <td
                colSpan={2}
                style={{ border: "2px solid black", padding: "8px" }}
              >
                Amount in Words :{numberToWordsIndian(roundOffAmount)}
              </td>

              {/* Right side - Merged (rowSpan=3) */}
              <td
                rowSpan={3}
                style={{
                  border: "2px solid black",
                  padding: "8px",
                  textAlign: "right",
                  verticalAlign: "top", // optional
                }}
              ></td>
            </tr>

            <tr>
              {/* Left side - Row 2 */}
              <td
                colSpan={2}
                style={{ border: "2px solid black", padding: "8px" }}
              >
                Paid By : {paymentModeLabel}{" "}
              </td>
            </tr>

            <tr>
              {/* Left side - Row 3 */}
              <td
                colSpan={2}
                style={{ border: "2px solid black", padding: "8px" }}
              >
                Payment Gateway :
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td
                rowSpan={2}
                colSpan={3}
                style={{
                  borderTop: "2px solid black",
                  padding: "8px",
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                Student Signature : <br />
                <ol
                  style={{
                    paddingLeft: "18px",
                    marginBottom: "0",
                    marginTop: "8px",
                  }}
                >
                  <li>
                    Any issues/legal matters are subject to Bhopal jurisdiction.
                  </li>
                  <li>
                    Cheque / D.D. in Favour of Miracle Information Service (OPC)
                    Pvt. Ltd.
                  </li>
                  <li>
                    Certified that the particular given in the invoice are true
                    and correct according to best of our belief and knowledge.
                  </li>
                </ol>
              </td>
            </tr>

            {/* Row 2 exists but is empty because it's merged with row above */}
            <tr></tr>
          </tfoot>
        </Table>
      </div>
    </div>
  );
};

export default RenderReceipt;
