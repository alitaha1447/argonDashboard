import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Button,
} from "reactstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import Header from "components/Headers/Header";
import EnquiryModal from "components/EnquiryModal/EnquiryModal";

const data = [
  {
    stateName: "MP",
    isActive: "True",
  },
  {
    stateName: "Goa",
    isActive: "True",
  },
  {
    stateName: "Kerala",
    isActive: "False",
  },
];

const State = () => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Enquiry form submitted");
  };

  return (
    <>
      <Header />
      <Container className="mt--9" fluid>
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
                      <th scope="col">State Name</th>
                      <th scope="col">Is Active</th>

                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  {/* tbody will be dynamically rendered */}
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index}>
                        <td>{item.stateName}</td>
                        <td>{item.isActive}</td>

                        <td style={{ position: "relative", textAlign: "" }}>
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
                                left: "50px",
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
                {data.map((item, index) => (
                  <Card key={index} className="mb-3 shadow-sm">
                    <div className="p-3 d-flex justify-content-between">
                      <div>
                        <p className="fs-6 fw-semibold mb-1">
                          <strong>State Name:</strong> {item.stateName}
                        </p>
                        <p className="fs-6 fw-semibold mb-1">
                          <strong>Is Active:</strong> {item.isActive}
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
                              top: "10px",
                              right: "40px",
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
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
      <EnquiryModal
        modal={modalOpen}
        toggle={toggleModal}
        handleSubmit={handleFormSubmit}
      />
    </>
  );
};

export default State;
