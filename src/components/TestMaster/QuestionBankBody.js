import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Form,
  Row,
  Col,
  Button,
  Label,
  FormGroup,
  Input,
  Table,
} from "reactstrap";
import Select from "react-select";
import axios from "axios";
import { toast } from "react-toastify";
import Papa from "papaparse";
import RadioGroupField from "components/FormFields/RadioGroup";
import TextAreaField from "components/FormFields/TextAreaField";
import FileUploadFieldK from "components/FormFields/FileUploadFieldK";
import DownloadSampleFile from "components/FormFields/DownloadSampleFile";
import { printTableData } from "utils/printFile/printFile";

const Type = [
  { label: "Create Manually", value: "CreateManually" },
  { label: "Bulk Upload", value: "BulkUpload" },
];

const questionTypes = [
  { value: "type1", label: "Single Choice" },
  { value: "type2", label: "Multiple Choice" },
];

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

const QuestionBankBody = ({ selectedQuestionType }) => {
  const isCourseEnquiry =
    selectedQuestionType?.label === "Course Enquiry" ||
    selectedQuestionType?.label === "Internship Enquiry";

  const [uploadType, setUploadType] = useState(Type[0]);
  const [questionTypeOption, setQuestionTypeOption] = useState(null);
  const [selectedCourseOption, setSelectedCourseOption] = useState(null);
  const [selectedLevelOption, setSelectedLevelOption] = useState(null);
  const [additionalQuery, setAdditionalQuery] = useState("");
  const [csvData, setCsvData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [uploadedFilePath, setUploadedFilePath] = useState(null);
  console.log(uploadedFilePath);
  // Local options (static fallback)
  const [courses, setCourses] = useState([
    { value: "course1", label: "Computer Science" },
    { value: "course2", label: "Mathematics" },
  ]);
  const [levels, setLevels] = useState([
    { value: "level1", label: "Beginner" },
    { value: "level2", label: "Advanced" },
  ]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(e);

    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const fileContent = event.target.result.replace(/^\uFEFF/, "");

      Papa.parse(fileContent, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const dataWithId = results.data.map((row, index) => ({
            ...row,
            _id: index,
            _checked: true,
          }));
          setCsvData(dataWithId);
          setSelectedRows(dataWithId);
          setSelectAll(true);
        },
      });

      const extension = file.name.split(".").pop();
      const baseName = file.name.substring(0, file.name.lastIndexOf("."));
      const uuid = uuidv4();
      const newFileName = `${uuid}-${baseName}.${extension}`;

      const formData = new FormData();
      formData.append("file", file, newFileName);

      try {
        const response = await axios.post(
          `${API_PATH}/api/FileAPI/UploadFiles`,
          formData,
          {
            params: { APIKEY: API_KEY },
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        const filePath = response.data?.filePath || newFileName;
        setUploadedFilePath(filePath);
        toast.success("File uploaded successfully!");
      } catch (error) {
        console.error("Upload error:", error);
        toast.error("Failed to upload file.");
      }
    };
    reader.readAsText(file);
  };

  const handleSelectAll = () => {
    const checked = !selectAll;
    const updatedData = csvData.map((row) => ({ ...row, _checked: checked }));
    setCsvData(updatedData);
    setSelectedRows(checked ? updatedData : []);
    setSelectAll(checked);
  };

  const handleCheckboxChange = (rowId) => {
    const updatedData = csvData.map((row) =>
      row._id === rowId ? { ...row, _checked: !row._checked } : row
    );
    setCsvData(updatedData);
    const selected = updatedData.filter((r) => r._checked);
    setSelectedRows(selected);
    setSelectAll(selected.length === updatedData.length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      (uploadType.value === "BulkUpload" && selectedRows.length === 0) ||
      (uploadType.value === "CreateManually" && !additionalQuery.trim())
    ) {
      toast.warning("Please complete all required fields.");
      return;
    }

    const enquiryFormData = {
      Qualification: null,
      Course: isCourseEnquiry ? selectedCourseOption?.value : null,
      Level: selectedLevelOption?.value || null,
      QuestionText:
        uploadType.value === "CreateManually" ? additionalQuery : null,
      FilePath: uploadType.value === "BulkUpload" ? uploadedFilePath : null,
      Questions: uploadType.value === "BulkUpload" ? selectedRows : [],
      UploadMethod: uploadType.value,
      QuestionType: questionTypeOption?.label || null,
    };

    try {
      await axios.post(`${API_PATH}/api/SaveEnquiry`, enquiryFormData, {
        params: { APIKEY: API_KEY },
      });
      toast.success("Enquiry submitted successfully!");
    } catch (error) {
      console.error("Failed to submit enquiry:", error);
      toast.error("Submission failed. Please try again.");
    }
  };

  const handleDownload = () => {
    const fileName = uploadedFilePath;
    const fileUrl = `/downloads/${fileName}`;

    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", fileName); // Forces download to user's default Downloads folder
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  //   const download = () => {
  //     doc.save(uploadedFilePath); // This triggers automatic browser download
  //   };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label>Type - Single choice / Multichoice</Label>
            <Select
              options={questionTypes}
              value={questionTypeOption}
              onChange={setQuestionTypeOption}
              placeholder="Select Question Type"
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <RadioGroupField
            label="Question Upload Method"
            name="uploadMethod"
            options={Type}
            selected={uploadType}
            onChange={setUploadType}
          />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label>Course</Label>
            <Select
              options={courses}
              value={selectedCourseOption}
              onChange={setSelectedCourseOption}
              placeholder="Select Course"
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>Level</Label>
            <Select
              options={levels}
              value={selectedLevelOption}
              onChange={setSelectedLevelOption}
              placeholder="Select Level"
            />
          </FormGroup>
        </Col>
      </Row>

      {uploadType.value === "CreateManually" ? (
        <Row>
          <Col md={6}>
            <TextAreaField
              label="Question in text"
              id="additionalQuery"
              value={additionalQuery}
              onChange={(e) => setAdditionalQuery(e.target.value)}
              className="pb-2"
            />
          </Col>
        </Row>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <FileUploadFieldK
                label="Upload File"
                id="fileUpload"
                onChange={handleFileChange}
              />
            </Col>
            <Col md={6}>
              <FormGroup className="">
                <Label className="mb-2 d-block">Download the sample file</Label>
                <Button
                  color="primary"
                  //   onClick={download}
                  onClick={printTableData}
                >
                  Download
                </Button>
              </FormGroup>

              {/* <DownloadSampleFile
                filePath="/sample-files/sample-question.pdf"
                fileName="sample-question.pdf"
                label="Click to Download PDF Template"
              /> */}
            </Col>
          </Row>

          {csvData.length > 0 && (
            <>
              {/* Select All */}
              <div className="form-check mt-3">
                <Input
                  className="form-check-input"
                  type="checkbox"
                  id="selectAllCheckbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
                <Label className="form-check-label" htmlFor="selectAllCheckbox">
                  Select All
                </Label>
              </div>

              {/* Table Container */}
              <div className="table-scroll-container h-screen overflow-y-scroll mt-2 mb-4 ">
                <Table
                  id="printable-table"
                  bordered
                  responsive
                  striped
                  className="mb-0"
                >
                  <thead className="table-light">
                    <tr>
                      <th>Select</th>
                      {Object.keys(csvData[0])
                        .filter((k) => !k.startsWith("_"))
                        .map((key) => (
                          <th key={`head-${key}`}>{key}</th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    {csvData.map((row) => (
                      <tr key={row._id}>
                        <td>
                          <Input
                            type="checkbox"
                            checked={!!row._checked}
                            onChange={() => handleCheckboxChange(row._id)}
                          />
                        </td>
                        {Object.keys(row)
                          .filter((k) => !k.startsWith("_"))
                          .map((key) => (
                            <td key={`cell-${row._id}-${key}`}>{row[key]}</td>
                          ))}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </>
          )}

          {/* <p>here revie</p> */}
        </>
      )}

      <div className="text-end mt-3">
        <Button type="submit" color="primary">
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default React.memo(QuestionBankBody);
