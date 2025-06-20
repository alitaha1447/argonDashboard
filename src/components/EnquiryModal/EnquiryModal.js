import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  // ModalFooter,
  // Button,
  Card,
} from "reactstrap";

import Select from "react-select";

import EnquiryFormCardBody from "components/EnquiryForm/formBody/EnquiryFormCardBody";
// DATA
import { enquiry } from "../../DummyData";

const EnquiryModal = ({
  modal,
  toggle,
  //  handleSubmit
}) => {
  const [selectedEnquiry, setSelectedEnquiry] = useState(enquiry[0]);

  const handleEnquiry = (selected) => {
    setSelectedEnquiry(selected);
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} size="lg" centered>
        <Card className="shadow border-0 mb-0" style={{ maxHeight: "90vh" }}>
          <ModalHeader
            toggle={toggle}
            className="bg-white border-bottom"
            style={{ position: "sticky", top: 0, zIndex: 10 }}
          >
            <div className="d-flex flex-column g-5">
              <h1 className="">Enquiry Form</h1>
              <div style={{ width: "200px" }}>
                <Select
                  options={enquiry}
                  value={selectedEnquiry}
                  onChange={handleEnquiry}
                />
              </div>
            </div>
          </ModalHeader>

          <ModalBody style={{ overflowY: "auto" }}>
            <EnquiryFormCardBody selectedEnquiry={selectedEnquiry} />
          </ModalBody>

          {/* <ModalFooter
            className="bg-white border-top"
            style={{ position: "sticky", bottom: 0, zIndex: 10 }}
          >
            <Button color="primary" onClick={handleSubmit}>
              Submit
            </Button>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter> */}
        </Card>
      </Modal>
    </div>
  );
};

export default EnquiryModal;
