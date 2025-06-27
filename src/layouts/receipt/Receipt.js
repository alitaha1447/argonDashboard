import React from "react";
import { Container, Row, Col, Card, Table } from "reactstrap";
import "../receipt/receipt.css";

import AuthNavbar from "components/Navbars/AuthNavbar.js";
const Receipt = () => {
  return (
    <div>
      <AuthNavbar />
      <Container style={{}}>
        <div className="receipt-table w-100">
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
                    src={require("../../assets/img/brand/miracleLogo.png")}
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
                  <p className="mb-0">Head Office Copy</p>
                  <p className="mb-0">Receipt No. : 001</p>
                  <p className="mb-0">Center Name :</p>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  colSpan={3}
                  style={{
                    borderTop: "2px solid black",
                    borderBottom: "2px solid black",
                    padding: "8px",
                  }}
                >
                  Student Name :
                </td>
              </tr>
              <tr>
                <td
                  colSpan={1}
                  style={{
                    borderTop: "2px solid black",
                    borderBottom: "2px solid black",
                    padding: "8px",
                  }}
                >
                  Roll No : MP-
                </td>
                <td
                  colSpan={1}
                  style={{
                    borderTop: "2px solid black",
                    borderBottom: "2px solid black",
                    padding: "8px",
                  }}
                >
                  Roll No : MP-
                </td>
                <td
                  colSpan={1}
                  style={{
                    borderTop: "2px solid black",
                    borderBottom: "2px solid black",
                    padding: "8px",
                  }}
                >
                  Roll No : MP-
                </td>
              </tr>
              <tr>
                {/* First column spans 2 cells */}
                <td
                  colSpan={2}
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    textAlign: "center",
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
                    textAlign: "right",
                    verticalAlign: "top", // optional: aligns to top of the merged cell
                  }}
                ></td>
              </tr>

              {/* Row 2 - Second Particular */}
              <tr>
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
              </tr>

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
                    textAlign: "right",
                  }}
                ></td>
              </tr>
              <tr>
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
              </tr>
              <tr>
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
              </tr>
              <tr>
                <td
                  colSpan={2}
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    textAlign: "right",
                  }}
                >
                  Total Fees paid
                </td>
                <td
                  style={{
                    border: "2px solid black",
                    padding: "8px",
                    textAlign: "right",
                  }}
                ></td>
              </tr>
              <tr>
                {/* Left side - Row 1 */}
                <td
                  colSpan={2}
                  style={{ border: "2px solid black", padding: "8px" }}
                >
                  Amount in Words
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
                  Paid By : Cash
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
                      Any disputes are subject to Bhopal jurisdiction only.
                    </li>
                    <li>
                      Certified that the above information is true and correct.
                    </li>
                  </ol>
                </td>
              </tr>

              {/* Row 2 exists but is empty because it's merged with row above */}
              <tr></tr>
            </tfoot>
          </Table>
        </div>
      </Container>
    </div>
  );
};

export default Receipt;
