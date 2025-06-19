import React from "react";
import { CardHeader } from "reactstrap";
import Select from "react-select";
// import { enquiry } from "DummyData";

const EnquiryFormCardHeader = ({ enquiry, selectedEnquiry, handleEnquiry }) => {
  return (
    <>
      <CardHeader className="bg-white">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center w-100 pb-2 gap-2">
          <h1 className="mb-2 mb-md-0">Enquiry Form</h1>
          <div style={{ width: "200px" }}>
            <Select
              options={enquiry}
              value={selectedEnquiry}
              onChange={handleEnquiry}
            />
          </div>
        </div>
      </CardHeader>
    </>
  );
};

export default EnquiryFormCardHeader;
