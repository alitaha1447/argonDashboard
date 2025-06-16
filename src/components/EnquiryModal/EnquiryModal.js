import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Card,
} from "reactstrap";

import Select, { components } from "react-select";
import axios from "axios";

import EnquiryForm from "components/Organisms/EnquiryForm";
// DATA
import {
  products,
  enquiry,
  qualificationOptions,
  options,
  genderOptions,
  refOptions,
} from "../../DummyData";

const enquiryType = [
  { value: "internShip", label: "Internship" },
  { value: "fullTime", label: "Full Time" },
];

const EnquiryModal = ({ modal, toggle, handleSubmit }) => {
  const [selectEnquiryType, setSelectEnquiryType] = useState(null);
  const [selectedQualification, setSelectedOptionsQualification] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState(enquiry[0]);
  const [selectedProduct, setSelectedProduct] = useState();

  const [selectedBranch, setSelectedBranch] = useState(null);
  const [branchOptions, setBranchOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [branchSearchText, setBranchSearchText] = useState("");

  // Custom Option component with checkbox
  const CheckboxOption = (props) => {
    return (
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
          style={{ marginRight: 10 }}
        />
        <label>{props.label}</label>
      </components.Option>
    );
  };

  const handleEnquiry = (selected) => {
    setSelectedEnquiry(selected);
  };

  useEffect(() => {
    if (branchSearchText.length < 3) {
      setBranchOptions([]);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          "https://hotelapi.shriyanshnath.com/api/branches",
          {
            params: {
              APIKEY: "12345678@",
              searchtext: branchSearchText,
            },
          }
        );

        const options =
          res.data?.map((branch) => ({
            label: branch?.BranchName || `Branch ${branch?.BranchId}`,
            value: branch?.BranchId?.toString(),
          })) || [];

        setBranchOptions(options);
      } catch (err) {
        console.error("Branch fetch error:", err);
        setBranchOptions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [branchSearchText]);

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
            <EnquiryForm
              handleSubmit={handleSubmit}
              selectedEnquiry={selectedEnquiry}
              enquiryType={enquiryType}
              selectEnquiryType={selectEnquiryType}
              handleEnquiryType={(selected) => setSelectEnquiryType(selected)}
              selectedQualification={selectedQualification}
              handleChangeQualification={(selected) =>
                setSelectedOptionsQualification(selected)
              }
              selectedOptions={selectedOptions}
              handleChangeCourse={(selected) => setSelectedOptions(selected)}
              selectedProduct={selectedProduct}
              handleProduct={(selected) => setSelectedProduct(selected)}
              selectedBranch={selectedBranch}
              handleChangeBranch={(selected) => setSelectedBranch(selected)}
              handleBranchInputChange={(text) => setBranchSearchText(text)}
              isLoading={isLoading}
              branchOptions={branchOptions}
              genderOptions={genderOptions}
              refOptions={refOptions}
              qualificationOptions={qualificationOptions}
              options={options}
              products={products}
              CheckboxOption={CheckboxOption}
            />
          </ModalBody>

          <ModalFooter
            className="bg-white border-top"
            style={{ position: "sticky", bottom: 0, zIndex: 10 }}
          >
            <Button color="primary" onClick={handleSubmit}>
              Submit
            </Button>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Card>
      </Modal>
    </div>
  );
};

export default EnquiryModal;
