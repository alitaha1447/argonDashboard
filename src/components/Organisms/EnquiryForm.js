import React, { useState } from "react";
import { CardBody } from "reactstrap";

import EnquiryFormCardHeader from "components/EnquiryForm/formHeader/EnquiryFormCardHeader";
import EnquiryFormCardBody from "components/EnquiryForm/formBody/EnquiryFormCardBody";

import { ToastContainer } from "react-toastify";

// DATA
import { enquiry } from "DummyData";

// Initialize UUID (if needed for later use)

const EnquiryForm = () => {
  const [selectedEnquiry, setSelectedEnquiry] = useState(enquiry[0]);

  return (
    <>
      <EnquiryFormCardHeader
        enquiry={enquiry}
        selectedEnquiry={selectedEnquiry}
        handleEnquiry={(selected) => {
          setSelectedEnquiry(selected);
        }}
      />
      <CardBody>
        <EnquiryFormCardBody selectedEnquiry={selectedEnquiry} />
      </CardBody>
      <ToastContainer />
    </>
  );
};

export default EnquiryForm;
