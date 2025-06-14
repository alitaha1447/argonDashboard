import React, { useState } from "react";
import Header from "components/Headers/Header";
import {
  Row,
  Card,
  // CardBody,
  // Nav,
  // NavItem,
  // NavLink,
  Container,
  CardHeader,
  Button,
  Table,
  // Progress,
  // Col,
  // Input,
} from "reactstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import EnquiryModal from "components/EnquiryModal/EnquiryModal";

const status = [
  { value: "all", label: "All" },
  { value: "enquiredRecieved", label: "Enquired Recieved" },
  { value: "consultancyGiven", label: "Consultancy Given" },
  { value: "convertToStudent", label: "Convert To Student" },
  { value: "followUp", label: "Follow Up" },
  { value: "rejected", label: "Rejected" },
];

const EnquiryDashboard = () => {
  // const [nameFilter, setNameFilter] = useState("");
  // const [numberFilter, setNumberFilter] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isFilterActive, setIsFilterActive] = useState(false);
  // const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [selectedDate, setSelectedDate] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [selectedEnquiry, setSelectedEnquiry] = useState(status[0]);

  const [modalOpen, setModalOpen] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Enquiry form submitted");
  };

  const data = [
    {
      name: "Taha",
      contactNumber: "+91-9981341447",
      highestQualification: "12th",
      course: "DSA",
      branch: "Male",
      enquiryDate: "27/06/2025",
      status: "Enquired Recieved",
      testStatus: "Failed",
      qualified: "Not",
    },
    {
      name: "John",
      contactNumber: "+91-9123456789",
      highestQualification: "Graduate",
      course: "Python",
      branch: "Male",
      enquiryDate: "27/03/1996",
      status: "Rejected",
      testStatus: "Failed",
      qualified: "Not",
    },
    {
      name: "Jane",
      contactNumber: "+91-9876543210",
      highestQualification: "10th",
      course: "Java",
      branch: "Female",
      enquiryDate: "27/03/1996",
      status: "Enquired Recieved",
      testStatus: "Failed",
      qualified: "Not",
    },
  ];

  // const handleChangeByName = (e) => {
  //   const value = e.target.value;
  //   setNameFilter(value);

  //   // If both inputs are empty, show full data immediately
  //   if (value.trim() === "") {
  //     setIsFilterActive(false);
  //     setFilteredData([]);
  //   }
  // };

  // const handleChangeByContact = (e) => {
  //   e.preventDefault();
  //   // const { name, value } = e.target;
  //   const { value } = e.target;
  //   setNumberFilter(value);

  //   // If both inputs are empty, show full data immediately
  //   if (value.trim() === "") {
  //     setIsFilterActive(false);
  //     setFilteredData([]);
  //   }
  // };

  const handleUnifiedSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (value.trim() === "") {
      setIsFilterActive(false);
      setFilteredData([]);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date === null) {
      setIsFilterActive(false);
      setFilteredData([]);
    }
  };

  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return new Date(`${year}-${month}-${day}`);
  };

  const handleEnquiry = (selected) => {
    setSelectedEnquiry(selected);
  };

  const handleSearchClick = (e) => {
    e.preventDefault();

    // const filtered = data.filter((item) => {
    //   const matchesName = item.name
    //     .toLowerCase()
    //     .includes(nameFilter.toLowerCase());
    //   const matchesNumber = item.contactNumber.includes(numberFilter);
    //   return matchesName && matchesNumber;
    // });

    const filtered = data.filter((item) => {
      // Text search
      const lowerSearch = searchText.toLowerCase();
      const matchesText =
        item.name.toLowerCase().includes(lowerSearch) ||
        item.contactNumber.includes(lowerSearch);

      // Date filter
      let matchesDate = true;
      if (selectedDate) {
        const enquiryDate = formatDate(item.enquiryDate);
        const selectedDateObj = new Date(selectedDate);

        matchesDate =
          enquiryDate.getDate() === selectedDateObj.getDate() &&
          enquiryDate.getMonth() === selectedDateObj.getMonth() &&
          enquiryDate.getFullYear() === selectedDateObj.getFullYear();
      }

      let matchesStatus = true;
      if (selectedEnquiry?.value !== "all") {
        matchesStatus =
          item.status.toLowerCase().replace(/\s/g, "") ===
          selectedEnquiry.value.toLowerCase().replace(/\s/g, "");
      }
      console.log(matchesStatus);
      return matchesText && matchesDate && matchesStatus;
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
        // handleChange={handleChangeByName}
        // handleContactChange={handleChangeByContact}
        handleSearchClick={handleSearchClick}
        handleUnifiedSearchChange={handleUnifiedSearchChange}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        handleDateChange={handleDateChange}
        handleEnquiry={handleEnquiry}
        selectedEnquiry={selectedEnquiry}
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
                  <Button color="primary" onClick={toggleModal}>
                    Add
                  </Button>
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
                      <th scope="col">Test Status</th>
                      <th scope="col">Qualified/Not Qualified</th>
                      <th scope="col">Action</th>
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
                        <td>{item.status}</td>
                        <td>{item.testStatus}</td>
                        <td>{item.qualified}</td>
                        <td
                          style={{ position: "relative", textAlign: "center" }}
                        >
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              setOpenDropdownIndex(
                                openDropdownIndex === index ? null : index
                              )
                            }
                          >
                            <BsThreeDotsVertical size={20} />
                          </div>

                          {openDropdownIndex === index && (
                            <div
                              style={{
                                position: "absolute",
                                top: "-30px",
                                right: "60px",
                                backgroundColor: "#fff",
                                border: "1px solid #ddd",
                                borderRadius: "4px",
                                boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
                                zIndex: 10,
                                minWidth: "100px",
                              }}
                            >
                              <div
                                style={{
                                  padding: "8px 12px",
                                  cursor: "pointer",
                                  borderBottom: "1px solid #eee",
                                }}
                                onClick={() => {
                                  console.log("Edit clicked for", item.name);
                                  setOpenDropdownIndex(null);
                                }}
                              >
                                ✏️ Edit
                              </div>
                              <div
                                style={{
                                  padding: "8px 12px",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  console.log("Delete clicked for", item.name);
                                  setOpenDropdownIndex(null);
                                }}
                              >
                                🗑️ Delete
                              </div>
                            </div>
                          )}
                        </td>
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
                        <p className="fs-6 fw-semibold mb-1">
                          <strong>Status:</strong> {item.status}
                        </p>
                        <p className="fs-6 fw-semibold mb-1">
                          <strong>Test Status:</strong> {item.testStatus}
                        </p>
                        <p className="fs-6 fw-semibold mb-1">
                          <strong>Qualified/Not:</strong> {item.qualified}
                        </p>
                      </div>
                      <div>
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            setOpenDropdownIndex(
                              openDropdownIndex === index ? null : index
                            )
                          }
                        >
                          <BsThreeDotsVertical size={20} />
                        </div>
                        {openDropdownIndex === index && (
                          <div
                            style={{
                              position: "absolute",
                              top: "30px",
                              right: "10px",
                              backgroundColor: "#fff",
                              border: "1px solid #ddd",
                              borderRadius: "4px",
                              boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
                              zIndex: 10,
                              minWidth: "100px",
                            }}
                          >
                            <div
                              style={{
                                padding: "8px 12px",
                                cursor: "pointer",
                                borderBottom: "1px solid #eee",
                              }}
                              onClick={() => {
                                console.log("Edit clicked for", item.name);
                                setOpenDropdownIndex(null);
                              }}
                            >
                              ✏️ Edit
                            </div>
                            <div
                              style={{
                                padding: "8px 12px",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                console.log("Delete clicked for", item.name);
                                setOpenDropdownIndex(null);
                              }}
                            >
                              🗑️ Delete
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>
        </Row>
      </Container>
      <EnquiryModal
        modal={modalOpen}
        toggle={toggleModal}
        handleSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default EnquiryDashboard;
