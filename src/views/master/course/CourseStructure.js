import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  Input,
  Button,
  Label,
  CardBody,
} from "reactstrap";
import Header from "components/Headers/Header";
import axios from "axios";
import Select from "react-select";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

const CourseStructure = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [expandedModules, setExpandedModules] = useState([]);

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    try {
      const res = await axios.get(`${API_PATH}/api/GetCourse`, {
        params: { APIKEY: API_KEY },
      });
      const formatted = res.data.map((course) => ({
        value: course.Id,
        label: course.TopicTitle,
      }));
      setCourses(formatted);
    } catch (err) {
      console.error("Failed to fetch courses", err);
    }
  };

  const handleCourseChange = (selectedOption) => {
    setSelectedCourse(selectedOption);
    setModules([]);
    setSelectedItem(null);
    setExpandedModules([]);
  };

  const addModule = () => {
    const nextId = modules.length + 1;
    setModules([
      ...modules,
      {
        id: nextId,
        name: `Module ${nextId}`,
        contents: [],
      },
    ]);
  };

  const removeModule = (moduleIdx) => {
    const updatedModules = [...modules];
    updatedModules.splice(moduleIdx, 1);
    setModules(updatedModules);
    setSelectedItem(null);
    setExpandedModules(expandedModules.filter((idx) => idx !== moduleIdx));
  };

  const toggleModuleExpansion = (moduleIdx) => {
    if (expandedModules.includes(moduleIdx)) {
      setExpandedModules(expandedModules.filter((idx) => idx !== moduleIdx));
    } else {
      setExpandedModules([...expandedModules, moduleIdx]);
    }
  };

  const addContentToModule = (moduleIndex) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].contents.push({
      title: "",
      file: null,
      submitted: false,
    });
    setModules(updatedModules);

    // ✅ Auto-expand module if not already
    if (!expandedModules.includes(moduleIndex)) {
      setExpandedModules([...expandedModules, moduleIndex]);
    }
  };

  const removeContentFromModule = (moduleIndex, contentIndex) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].contents.splice(contentIndex, 1);
    setModules(updatedModules);
    if (
      selectedItem &&
      selectedItem.moduleIdx === moduleIndex &&
      selectedItem.contentIdx === contentIndex
    ) {
      setSelectedItem(null);
    }
  };

  const handleSelectContent = (moduleIdx, contentIdx) => {
    setSelectedItem({ moduleIdx, contentIdx });
  };

  const handleFieldChange = (field, value) => {
    if (selectedItem) {
      const { moduleIdx, contentIdx } = selectedItem;
      const updatedModules = [...modules];
      updatedModules[moduleIdx].contents[contentIdx][field] = value;
      setModules(updatedModules);
    }
  };

  const handleSubmitContent = () => {
    if (!selectedItem) return;
    const { moduleIdx, contentIdx } = selectedItem;
    const content = modules[moduleIdx].contents[contentIdx];
    if (!content.title || !content.file) {
      alert("Please enter a title and select a file.");
      return;
    }
    const updatedModules = [...modules];
    updatedModules[moduleIdx].contents[contentIdx].submitted = true;
    setModules(updatedModules);
  };

  return (
    <>
      <Header />
      <Container fluid className="mt--8">
        <Card className="shadow mb-4 bg-white">
          <CardHeader className="bg-white border-0">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
              <h2 className="mb-2 text-dark">Course Structure</h2>
              <div style={{ width: "300px" }}>
                <Select
                  placeholder="Select Course"
                  options={courses}
                  value={selectedCourse}
                  onChange={handleCourseChange}
                  isClearable
                />
              </div>
            </div>
          </CardHeader>

          <CardBody className="bg-white rounded">
            <Row>
              {/* Left Side */}
              <Col
                md="3"
                className="border-end"
                style={{ borderRight: "1px solid #ccc", minHeight: "70vh" }}
              >
                <div className="p-2">
                  {selectedCourse && (
                    <div className="d-flex justify-content-between bg-primary rounded align-items-center mb-3">
                      <span className="fw-bold text-white px-2">▼ Modules</span>
                      <span
                        onClick={addModule}
                        style={{ cursor: "pointer" }}
                        className="text-white fw-bold cursor-pointer  text-lg ml-6 mr-2"
                      >
                        +
                      </span>
                    </div>
                  )}

                  {modules.length === 0 && (
                    <div className="text-muted">No modules added yet.</div>
                  )}

                  {modules.map((mod, moduleIdx) => (
                    <div key={moduleIdx} className="mb-3">
                      <div
                        className="d-flex justify-content-between bg-white rounded border border-primary bg-white border pl-2 align-items-center mb-3 text-white"
                        onClick={() => toggleModuleExpansion(moduleIdx)}
                        style={{ cursor: "pointer" }}
                      >
                        <strong className="text-primary">
                          ▼ {mod.name}{" "}
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              addContentToModule(moduleIdx);
                            }}
                            className="text-primary  text-lg ml-7 mr-2"
                          >
                            +
                          </span>
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              removeModule(moduleIdx);
                            }}
                            className="text-primary text-lg pl-2 pb-1"
                          >
                            ×
                          </span>
                        </strong>
                        <div className="d-flex align-items-center"></div>
                      </div>

                      {expandedModules.includes(moduleIdx) && (
                        <div className="ms-3 mt-2">
                          {mod.contents.map((_, contentIdx) => (
                            <div
                              key={contentIdx}
                              onClick={() =>
                                handleSelectContent(moduleIdx, contentIdx)
                              }
                              className={`mb-2 d-flex justify-content-between border border-primary align-items-center px-2 rounded ${
                                selectedItem &&
                                selectedItem.moduleIdx === moduleIdx &&
                                selectedItem.contentIdx === contentIdx
                                  ? "bg-white text-primary"
                                  : "bg-white text-primary"
                              }`}
                              style={{ cursor: "pointer", fontSize: "0.9rem" }}
                            >
                              <span>Content {contentIdx + 1}</span>
                              <span
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeContentFromModule(
                                    moduleIdx,
                                    contentIdx
                                  );
                                }}
                                className="text-primary text-lg pl-2"
                              >
                                ×
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Col>

              {/* Right Side */}
              <Col md="9" className="p-3 bg-white">
                {selectedItem ? (
                  <Card>
                    <CardHeader className="bg-white">
                      <h5 className="text-primary mb-0">
                        Editing - Module {selectedItem.moduleIdx + 1}, Content{" "}
                        {selectedItem.contentIdx + 1}
                      </h5>
                    </CardHeader>
                    <CardBody>
                      <div className="mb-3">
                        <Label>Title</Label>
                        <Input
                          bsSize="sm"
                          value={
                            modules[selectedItem.moduleIdx].contents[
                              selectedItem.contentIdx
                            ].title
                          }
                          onChange={(e) =>
                            handleFieldChange("title", e.target.value)
                          }
                          placeholder="Enter title"
                          disabled={
                            modules[selectedItem.moduleIdx].contents[
                              selectedItem.contentIdx
                            ].submitted
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <Label>Upload File</Label>
                        <div className="border rounded p-1">
                          <Input
                            bsSize="sm"
                            type="file"
                            onChange={(e) =>
                              handleFieldChange("file", e.target.files[0])
                            }
                            disabled={
                              modules[selectedItem.moduleIdx].contents[
                                selectedItem.contentIdx
                              ].submitted
                            }
                            className="form-control border-0"
                          />
                        </div>
                        {modules[selectedItem.moduleIdx].contents[
                          selectedItem.contentIdx
                        ].file && (
                          <small className="text-muted">
                            {
                              modules[selectedItem.moduleIdx].contents[
                                selectedItem.contentIdx
                              ].file.name
                            }
                          </small>
                        )}
                      </div>
                      <div className="text-end">
                        <Button
                          size="sm"
                          color="primary"
                          onClick={handleSubmitContent}
                          disabled={
                            modules[selectedItem.moduleIdx].contents[
                              selectedItem.contentIdx
                            ].submitted
                          }
                          style={{ color: "white" }}
                        >
                          {modules[selectedItem.moduleIdx].contents[
                            selectedItem.contentIdx
                          ].submitted
                            ? "Submitted"
                            : "Submit"}
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                ) : (
                  <Card body className="text-center">
                    <p>Select a content item from the left to edit details.</p>
                  </Card>
                )}
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default CourseStructure;
