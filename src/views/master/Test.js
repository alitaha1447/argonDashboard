import React from "react";
import { Container, Row, Col, Card } from "reactstrap";

import Header from "components/Headers/Header";
import QuestionBank from "components/TestMaster/QuestionBank";
const Test = () => {
  return (
    <div>
      <Header />
      <Container className="mt--9" fluid>
        <Row className="justify-content-center">
          <Col lg={12}>
            <Card className="shadow">
              <QuestionBank />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Test;
