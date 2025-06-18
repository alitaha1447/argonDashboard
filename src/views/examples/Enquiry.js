import React from "react";
import { Container, Row, Col, Card } from "reactstrap";

import Header from "components/Headers/Header";
import EnquiryForm from "components/Organisms/EnquiryForm";

const Enquiry = () => {
  return (
    <>
      <Header />
      <Container className="mt--9" fluid>
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
