import React, { useState, useEffect } from "react";
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
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Header from "components/Headers/Header";
import CourseMasterModal from "components/CustomModals/courseMasterModal/CourseMasterModal";
import { FaPlus } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import FilterBar from "components/CustomFilter/FilterBar";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

const CourseMaster = () => {
  const [courses, setCourses] = useState([]);
  const [showMaster, setShowMaster] = useState(false);
  const data = [
    {
      id: 1,
      courseName: "React JS",
      isActive: "Yes",
    },
    {
      id: 2,
      courseName: "React JS",
      isActive: "Yes",
    },
    {
      id: 3,
      courseName: "React JS",
      isActive: "Yes",
    },
    {
      id: 4,
      courseName: "React JS",
      isActive: "Yes",
    },
  ];
  const toggleMaster = () => {
    setShowMaster((prev) => !prev);
  };

  const getCourses = async () => {
    const res = await axios.get(`${API_PATH}/api/GetCourse`, {
      params: {
        APIKEY: API_KEY,
      },
    });
    console.log(res?.data);
    setCourses(res?.data);
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <>
      <Header />
      <Container className="mt--9" fluid>
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
                  <div
                    onClick={toggleMaster}
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "38px",
                      height: "38px",
                      backgroundColor: "#5e72e4",
                      color: "#fff",
                      borderRadius: "4px",
                    }}
                  >
                    <FaPlus />
                  </div>
                </div>
              </CardHeader>
              {/* ✅ Table View for Desktop (Large screens only) */}
              <div className="d-none d-lg-block">
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col">Course Name</th>
                      <th scope="col">Is Active</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((item, index) => (
                      <tr key={index}>
                        <td>{item.Id}</td>
                        <td>{item.TopicTitle}</td>
                        <td>{item.IsActive === 1 ? "Yes" : "No"}</td>
                        <td style={{}}>
                          <UncontrolledDropdown direction="">
                            <DropdownToggle
                              tag="span"
                              style={{ cursor: "pointer" }}
                              data-toggle="dropdown"
                              aria-expanded={false}
                            >
                              <BsThreeDotsVertical size={20} />
                            </DropdownToggle>

                            <DropdownMenu
                              left
                              style={{
                                minWidth: "120px",
                                border: "1px solid #ddd",
                                borderRadius: "4px",
                                boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
                              }}
                            >
                              <DropdownItem
                                key={index}
                                // onClick={() => toggleStatusModal(item.Id)}
                              >
                                Edit
                              </DropdownItem>
                              <DropdownItem
                                key={index}
                                // onClick={() => toggleStatusModal(item.Id)}
                              >
                                Delete
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              {/* ✅ Card View for Mobile & Tablet */}
              <div className="d-block d-lg-none p-3">
                {courses.map((item, index) => (
                  <Card key={index} className="mb-3 shadow-sm">
                    <div className="d-flex p-4 justify-content-between">
                      <div className="d-flex">
                        <div>
                          <p className="fs-6 fw-semibold mb-1">
                            <strong>Id:</strong> {item.Id}
                          </p>
                          <p className="fs-6 fw-semibold mb-1">
                            <strong>Course Name:</strong> {item.TopicTitle}
                          </p>
                          <p className="fs-6 fw-semibold mb-1">
                            <strong>Is Active:</strong>{" "}
                            {item.IsActive === 1 ? "Yes" : "No"}
                          </p>
                        </div>
                      </div>

                      <UncontrolledDropdown direction="left">
                        <DropdownToggle
                          tag="span"
                          style={{ cursor: "pointer" }}
                          data-toggle="dropdown"
                          aria-expanded={false}
                        >
                          <BsThreeDotsVertical size={20} />
                        </DropdownToggle>

                        <DropdownMenu
                          right
                          style={{
                            minWidth: "120px",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
                          }}
                        >
                          <DropdownItem
                            key={index}
                            // onClick={() => toggleStatusModal(item.Id)}
                          >
                            Edit
                          </DropdownItem>
                          <DropdownItem
                            key={index}
                            // onClick={() => toggleStatusModal(item.Id)}
                          >
                            Delete
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
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
        <CourseMasterModal
          modal={showMaster}
          toggle={toggleMaster}
          refreshList={getCourses}
        />
      </Container>
      <ToastContainer />
    </>
  );
};

export default CourseMaster;
