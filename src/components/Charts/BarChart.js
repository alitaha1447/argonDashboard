import React from "react";
import { Bar } from "react-chartjs-2";
import { Col, Card, CardHeader, Row, CardBody } from "reactstrap";

const BarChart = ({ data, options }) => {
  return (
    <>
      <Col className="mb-5 mb-xl-0 " xl="8">
        <Card className="bg-gradient-default shadow">
          <CardHeader className="bg-transparent">
            <Row className="align-items-center">
              <div className="col">
                {/* <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6> */}
                <h2 className="text-white mb-0">Course Enquiry</h2>
              </div>
              <div className="col"></div>
            </Row>
          </CardHeader>
          <CardBody>
            {/* Chart */}
            <div className="chart">
              <Bar
                // data={chartExample3.data}
                data={data}
                options={options}
              />
            </div>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default BarChart;
