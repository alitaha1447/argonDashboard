import React from "react";
import { Pie } from "react-chartjs-2";

import { Col, Card, CardHeader, Row, CardBody } from "reactstrap";
const PieChart = ({ data, options }) => {
  // PieChart

  return (
    <>
      <Col xl="4">
        <Card className="shadow">
          <CardHeader className="bg-transparent">
            <Row className="align-items-center">
              <div className="col">
                {/* <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Performance
                    </h6> */}
                <h2 className="mb-0">Type Enquiry</h2>
              </div>
            </Row>
          </CardHeader>
          <CardBody>
            {/* Chart */}
            <div className="chart" style={{}}>
              <Pie
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

export default PieChart;
