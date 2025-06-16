import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";

import Header from "components/Headers/Header";
import EnquiryForm from "components/Organisms/EnquiryForm";

import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import axios from "axios";

// DATA
import {
  products,
  enquiry,
  qualificationOptions,
  options,
  genderOptions,
  refOptions,
} from "DummyData";

const enquiryType = [
  { value: "internShip", label: "Internship" },
  { value: "fullTime", label: "Full Time" },
];

const Enquiry = () => {
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

  // const handleCheckboxChange = () => {
  //   setIsConfirmed(!isConfirmed);
  // };
  const handleSubmit = (e) => {
    e.preventDefault();

    // if (!isConfirmed) {
    //   console.log("Please confirm the details before submitting.");
    //   return;
    // }

    // console.log("Form submitted successfully.");
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
    <>
      <Header />
      <Container className="mt--9" fluid>
        <Row className="justify-content-center">
          <Col lg={12}>
            <Card className="shadow">
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
              <CardBody>
                <EnquiryForm
                  handleSubmit={handleSubmit}
                  selectedEnquiry={selectedEnquiry}
                  enquiryType={enquiryType}
                  selectEnquiryType={selectEnquiryType}
                  handleEnquiryType={(selected) =>
                    setSelectEnquiryType(selected)
                  }
                  selectedQualification={selectedQualification}
                  handleChangeQualification={(selected) =>
                    setSelectedOptionsQualification(selected)
                  }
                  selectedOptions={selectedOptions}
                  handleChangeCourse={(selected) =>
                    setSelectedOptions(selected)
                  }
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
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Enquiry;
