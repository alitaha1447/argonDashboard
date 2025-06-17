import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";

import Header from "components/Headers/Header";
import EnquiryForm from "components/Organisms/EnquiryForm";

import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import axios from "axios";

// DATA
import { enquiry, genderOptions, refOptions, enquiryType } from "DummyData";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

const Enquiry = () => {
  // const [selectEnquiryType, setSelectEnquiryType] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState(null);
  const [referedBy, setReferedBy] = useState(null);
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [additionalQuery, setAdditionalQuery] = useState("");
  // Qualifications
  const [qualificationOptions, setQualificationOptions] = useState([]);
  const [selectedQualification, setSelectedOptionsQualification] =
    useState(null);
  // Prefered Courses
  const [courseOptions, setCourseOptions] = useState([]);
  const [selectedCoursesOptions, setSelectedCoursesOptions] = useState(null);
  const [selectedEnquiry, setSelectedEnquiry] = useState(enquiry[0]);
  //  Products
  const [productOptions, setProductOptions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setContactNumber("");
    setAddress("");
    setGender(null);
    setReferedBy(null);
    setWhatsappNumber("");
    setAdditionalQuery("");
    setSelectedOptionsQualification(null);
    setSelectedCoursesOptions(null);
    setSelectedProduct(null);
    setSelectedBranch(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isCourseEnquiry = selectedEnquiry?.label === "Course Enquiry";

    const enquiryFormdata = {
      EnquiryType: selectedEnquiry?.value,
      Name: fullName,
      Email: email,
      Mobileno: contactNumber,
      Address: address,
      Gender: gender?.value,
      Qualification: isCourseEnquiry ? selectedQualification?.value : null,
      Course: isCourseEnquiry
        ? selectedCoursesOptions?.map((c) => c.value).join(",") || ""
        : "",
      Product: !isCourseEnquiry ? selectedProduct?.value : null,
      Branch: isCourseEnquiry ? selectedBranch?.value : null,
      ReferedBy: referedBy?.value,
      WhatsappNo: whatsappNumber,
      AdditionalQuery: additionalQuery,
      CreatedBy: "Developer",
    };

    try {
      const res = await axios.post(
        `${API_PATH}/api/SaveEnquiry`,
        enquiryFormdata,
        {
          params: {
            APIKEY: "12345678@",
          },
        }
      );
      console.log("✅ Enquiry submitted successfully:", res);
    } catch (error) {
      console.error("❌ Failed to submit enquiry:", error);
    }
    console.log(enquiryFormdata);
    resetForm();
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
        const res = await axios.get(`${API_PATH}/api/branches`, {
          params: {
            APIKEY: API_KEY,
            searchtext: branchSearchText,
          },
        });

        const options =
          res.data?.map((branch) => ({
            label: branch?.BranchName || `Branch ${branch?.BranchId}`,
            value: branch?.BranchId,
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

  const fetchCourseDetails = async () => {
    try {
      const res = await axios.get(`${API_PATH}/api/GetCourse`, {
        params: {
          APIKEY: API_KEY,
          // searchtext: branchSearchText,
        },
      });
      const formattedCourses = res.data.map((item) => ({
        value: item.Id,
        label: item.TopicTitle,
      }));
      setCourseOptions(formattedCourses);
    } catch (error) {
      console.log(`course_Error ---> ${error}`);
    }
  };

  const fetchProductLists = async () => {
    try {
      const res = await axios.get(`${API_PATH}/api/GetProduct`, {
        params: {
          APIKEY: API_KEY,
          // searchtext: branchSearchText,
        },
      });

      const formattedProduct = res.data.map((item) => ({
        value: item.Id,
        label: item.Name,
      }));
      setProductOptions(formattedProduct);
    } catch (error) {
      console.log(`product_Error ---> ${error}`);
    }
  };

  const fetchQualificationLists = async () => {
    try {
      const res = await axios.get(`${API_PATH}/api/GetQualification`, {
        params: {
          APIKEY: API_KEY,
          // searchtext: branchSearchText,
        },
      });

      const formattedQualification = res.data.map((item) => ({
        label: item.QualificationName,
        value: item.QualificationId,
      }));
      setQualificationOptions(formattedQualification);
    } catch (error) {
      console.log(`qualification_Error ---> ${error}`);
    }
  };

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
                  // fullName
                  fullName={fullName}
                  setFullName={setFullName}
                  // email
                  email={email}
                  setEmail={setEmail}
                  contactNumber={contactNumber}
                  setContactNumber={setContactNumber}
                  address={address}
                  setAddress={setAddress}
                  genderOptions={genderOptions}
                  gender={gender}
                  setGender={setGender}
                  referedBy={referedBy}
                  setReferedBy={setReferedBy}
                  refOptions={refOptions}
                  whatsappNumber={whatsappNumber}
                  setWhatsappNumber={setWhatsappNumber}
                  additionalQuery={additionalQuery}
                  setAdditionalQuery={setAdditionalQuery}
                  // qualifications
                  qualificationOptions={qualificationOptions}
                  selectedQualification={selectedQualification}
                  handleChangeQualification={(selected) =>
                    setSelectedOptionsQualification(selected)
                  }
                  handleQualificationOpen={async () =>
                    await fetchQualificationLists()
                  }
                  // courses
                  courseOptions={courseOptions}
                  selectedCoursesOptions={selectedCoursesOptions}
                  handleChangeCourse={(selected) => {
                    setSelectedCoursesOptions(selected);
                  }}
                  handleCourseOpen={async () => await fetchCourseDetails()}
                  // products
                  productOptions={productOptions}
                  selectedProduct={selectedProduct}
                  handleProduct={(selected) => setSelectedProduct(selected)}
                  handleProductOpen={async () => await fetchProductLists()}
                  //  branches
                  selectedBranch={selectedBranch}
                  handleChangeBranch={(selected) => setSelectedBranch(selected)}
                  handleBranchInputChange={(text) => setBranchSearchText(text)}
                  isLoading={isLoading}
                  branchOptions={branchOptions}
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
