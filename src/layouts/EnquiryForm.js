import { Container, Row, Col, Card } from "reactstrap";

import React from "react";

import AuthNavbar from "components/Navbars/AuthNavbar.js";
import EnquiryForm from "components/Organisms/EnquiryForm";

const Enquiry = () => {
  return (
    <>
      <AuthNavbar />
      <Container className="container mt-0 mb-5" fluid>
        <Row className="justify-content-center">
          <Col lg={12}>
            <Card className="shadow">
              <EnquiryForm />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Enquiry;
