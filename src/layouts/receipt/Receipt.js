import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Card, Table } from "reactstrap";
import "../receipt/receipt.css";

import AuthNavbar from "components/Navbars/AuthNavbar.js";
import { paymentMode } from "DummyData";
import { numberToWordsIndian } from "utils/numToWords";
import axios from "axios";
import { useLocation } from "react-router-dom";
import RenderReceipt from "components/CustomReceipt/RenderReceipt";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

const Receipt = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const receiptId = queryParams.get("receiptId");
  const [data, setData] = useState({});
  const [paidInstallment, setpaidInstallment] = useState([]);
  const hasPrintedRef = useRef(false);
  // useEffect(() => {
  //   const receiptData = async () => {
  //     try {
  //       const res = await axios.get(`${API_PATH}/api/Get_Receipt_Data`, {
  //         params: {
  //           APIKEY: API_KEY,
  //           receipt_id: receiptId,
  //           // receipt_id: "EA3E44DC-D2A2-4FE0-B9E7-E022D7C068F5",
  //         },
  //       });
  //       setData(res?.data);
  //       setpaidInstallment(res?.data?.paid_installment);
  //       // Trigger print after slight delay to ensure DOM is updated
  //       setTimeout(() => {
  //         window.print();
  //       }, 500);
  //     } catch (error) {
  //       console.log(`Rciept --> ${error}`);
  //     }
  //   };
  //   if (receiptId) {
  //     receiptData();
  //   }
  // }, [receiptId]);

  // const totalPaid = paidInstallment.reduce(
  //   (acc, item) => acc + parseFloat(item.total_paid_amount || 0),
  //   0
  // );

  // const sgstRate = data?.sgst || 0; // assuming 9

  // const cgstRate = data?.cgst || 0; // assuming 9

  // const sgstAmount = (totalPaid * sgstRate) / 100;
  // const cgstAmount = (totalPaid * cgstRate) / 100;

  // const totalWithGST = totalPaid + sgstAmount + cgstAmount;
  // const totalWithGST = totalPaid + sgstRate + cgstRate;
  // const roundOffAmount = totalWithGST.toFixed(2);

  // const paymentModeLabel =
  //   paymentMode.find((mode) => mode.value === data.payment_mode)?.label || "-";
  return (
    <div>
      <AuthNavbar />
      <Container style={{}}>
        {/* {RenderReceipt("Student")} */}
        {/* {RenderReceipt("Center")} */}
        <RenderReceipt copyType="Student" />
        <RenderReceipt copyType="Center" />
      </Container>
    </div>
  );
};

export default Receipt;
