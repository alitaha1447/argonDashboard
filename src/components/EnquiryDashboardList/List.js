import React, { useEffect, useState } from "react";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Col,
  Input,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { BsThreeDotsVertical } from "react-icons/bs";

import { enquiry } from "DummyData";

const List = ({ selectedEnquiryType, isTableLoading, listData }) => {
  //   const [selectedEnquiryType, setSelectedEnquiryType] = useState(enquiry[0]);

  //   const [listData, setListData] = useState([]);
  //   const [isTableLoading, setIsTableLoading] = useState(false);

  //   const handleEnquiryTypeChange = (selectedOption) => {
  //     setSelectedEnquiryType(selectedOption); // only update state
  //   };

  //   const formatDate = (date) => {
  //     const d = new Date(date);
  //     const day = String(d.getDate()).padStart(2, "0");
  //     const month = String(d.getMonth() + 1).padStart(2, "0"); // months are 0-based
  //     const year = d.getFullYear();
  //     return `${day}-${month}-${year}`;
  //   };
  // console.log(listData);
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0"); // months are 0-based
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };
  return (
    <>
      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col" className="text-center"></th>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Contact Number</th>
            {(selectedEnquiryType.label === "Course Enquiry" ||
              selectedEnquiryType.label === "Internship Enquiry") && (
              <th scope="col">Highest Qualification</th>
            )}

            {selectedEnquiryType.label === "Course Enquiry" ||
            selectedEnquiryType.label === "Internship Enquiry" ? (
              <th scope="col">Course</th>
            ) : (
              <th scope="col">Product</th>
            )}
            <th scope="col">Branch</th>
            <th scope="col">Enquiry Date</th>
            <th scope="col">Status</th>
            {/* <th scope="col">Test Status</th>
                      <th scope="col">Qualified/Not Qualified</th> */}
            <th scope="col">Action</th>
          </tr>
        </thead>
        {/* tbody will be dynamically rendered */}
        <></>
        <tbody>
          {isTableLoading ? (
            <tr>
              <td colSpan="10" className="text-center py-4">
                <i className="fas fa-spinner fa-spin fa-2x text-primary" />
                <p className="mt-2 mb-0">Loading data...</p>
              </td>
            </tr>
          ) : listData.length > 0 ? (
            listData.map((item, index) => (
              <tr>
                <td>
                  <div className="d-flex justify-content-center align-items-center">
                    <Input type="checkbox" style={{ margin: 0 }} />
                  </div>
                </td>
                <td>{item.Id}</td>
                <td>{item.Name}</td>
                <td>{item.Mobileno}</td>
                {(selectedEnquiryType.label === "Course Enquiry" ||
                  selectedEnquiryType.label === "Internship Enquiry") && (
                  <td>{item.QualificationCode}</td>
                )}
                {selectedEnquiryType.label === "Course Enquiry" ||
                selectedEnquiryType.label === "Internship Enquiry" ? (
                  <td>{item.TopicTitle}</td>
                ) : (
                  <td>{item.product_name}</td>
                )}
                <td>{item.BranchName}</td>
                <td>{formatDate(item.CreatedOn)}</td>
                <td>{item.status_txt}</td>
                <td style={{ textAlign: "center" }}>
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
                        onClick={() => {
                          console.log("Edit clicked for", item.name);
                        }}
                      >
                        ✏️ Edit
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => {
                          console.log("Delete clicked for", item.name);
                        }}
                      >
                        🗑️ Delete
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center py-4 text-muted">
                No data found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default List;
