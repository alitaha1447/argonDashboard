import React, { useState } from "react";
import Header from "components/Headers/Header";
import { Row, Card, Container, CardHeader, Button, Table } from "reactstrap";
import { BsThreeDotsVertical } from "react-icons/bs";

const EnquiryDashboard = () => {
  const [nameFilter, setNameFilter] = useState("");
  const [numberFilter, setNumberFilter] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isFilterActive, setIsFilterActive] = useState(false);

  const data = [
    {
      name: "Taha",
      contactNumber: "+91-9981341447",
      highestQualification: "12th",
      course: "DSA",
      branch: "Male",
      enquiryDate: "27/03/1996",
    },
    {
      name: "John",
      contactNumber: "+91-9123456789",
      highestQualification: "Graduate",
      course: "Python",
      branch: "Male",
      enquiryDate: "27/03/1996",
    },
    {
      name: "Jane",
      contactNumber: "+91-9876543210",
      highestQualification: "10th",
      course: "Java",
      branch: "Female",
      enquiryDate: "27/03/1996",
    },
  ];

  const handleChangeByName = (e) => {
    const value = e.target.value;
    setNameFilter(value);

    // If both inputs are empty, show full data immediately
    if (value.trim() === "") {
      setIsFilterActive(false);
      setFilteredData([]);
    }
  };

  const handleChangeByContact = (e) => {
    e.preventDefault();
    // const { name, value } = e.target;
    const { value } = e.target;
    setNumberFilter(value);

    // If both inputs are empty, show full data immediately
    if (value.trim() === "") {
      setIsFilterActive(false);
      setFilteredData([]);
    }
  };

  const handleSearchClick = (e) => {
    e.preventDefault();

    const filtered = data.filter((item) => {
      const matchesName = item.name
        .toLowerCase()
        .includes(nameFilter.toLowerCase());
      const matchesNumber = item.contactNumber.includes(numberFilter);
      return matchesName && matchesNumber;
    });

    setFilteredData(filtered);
    setIsFilterActive(true);
  };

  // Use filteredData if search was clicked and there are any filters, otherwise use all data
  const displayData = isFilterActive ? filteredData : data;

  return (
    <div>
      <Header
        cardTitle1={"Total Enquiry"}
        cardTitle2={"Student"}
        cardTitle3={"Not Interested"}
        cardTitle4={"Follow Up"}
        handleChange={handleChangeByName}
        handleSearchClick={handleSearchClick}
        handleContactChange={handleChangeByContact}
      />

      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <h3 className="mb-0">Lists</h3>
                  <Button color="primary">Add</Button>
                </div>
              </CardHeader>
              {/* ✅ Table View for Desktop (Large screens only) */}
              <div className="d-none d-lg-block">
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Contact Number</th>
                      <th scope="col">Highest Qualification</th>
                      <th scope="col">Course</th>
                      <th scope="col">Branch</th>
                      <th scope="col">Enquiry Date</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                      {/* <th scope="col">
                        <Button color="primary">Add</Button>
                      </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {displayData.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.contactNumber}</td>
                        <td>{item.highestQualification}</td>
                        <td>{item.course}</td>
                        <td>{item.branch}</td>
                        <td>{item.enquiryDate}</td>
                        <td>{item.gender}</td>
                        {/* <td>{item.gender}</td> */}
                        {/* <td></td> */}
                        <th
                          scope="col"
                          style={{ textAlign: "center", cursor: "pointer" }}
                          onClick={() => console.log("first")}
                        >
                          <BsThreeDotsVertical size={20} />
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              {/* ✅ Card View for Mobile & Tablet */}
              <div className="d-block d-lg-none p-3">
                {displayData.map((item, index) => (
                  <Card key={index} className="mb-3 shadow-sm">
                    <div className="p-3 d-flex justify-content-between">
                      <div>
                        <p className="fs-6 fw-semibold mb-1">
                          <strong>Name:</strong> {item.name}
                        </p>
                        <p className="fs-6 fw-semibold mb-1">
                          <strong>Contact Number:</strong> {item.contactNumber}
                        </p>
                        <p className="fs-6 fw-semibold mb-1">
                          <strong>Qualification:</strong>{" "}
                          {item.highestQualification}
                        </p>
                        <p className="fs-6 fw-semibold mb-1">
                          <strong>Course:</strong> {item.course}
                        </p>
                        <p className="fs-6 fw-semibold mb-1">
                          <strong>Branch:</strong> {item.branch}
                        </p>
                        <p className="fs-6 fw-semibold mb-1">
                          <strong>Enquiry Date:</strong> {item.enquiryDate}
                        </p>
                      </div>
                      <div>
                        <div style={{ cursor: "pointer" }}>
                          <BsThreeDotsVertical size={20} />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default EnquiryDashboard;
