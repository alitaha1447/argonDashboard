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
  const [newModuleName, setNewModuleName] = useState("");
  const [isCreatingModule, setIsCreatingModule] = useState(false);

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
    setIsCreatingModule(false);
  };

  const addModule = () => {
    setIsCreatingModule((prev) => !prev);
    setSelectedItem(null);
  };

  const handleCreateModule = () => {
    if (!newModuleName.trim()) {
      alert("Please enter a module name.");
      return;
    }
    const newModules = [
      ...modules,
      {
        id: modules.length + 1,
        name: newModuleName.trim(),
        contents: [],
      },
    ];
    setModules(newModules);
    setExpandedModules([...expandedModules, newModules.length - 1]);
    setNewModuleName("");
    setIsCreatingModule(false);
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
    if (!expandedModules.includes(moduleIndex)) {
      setExpandedModules([...expandedModules, moduleIndex]);
    }
    setSelectedItem({
      moduleIdx: moduleIndex,
      contentIdx: updatedModules[moduleIndex].contents.length - 1,
    });
    setIsCreatingModule(false);
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
    setIsCreatingModule(false);
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
            <h2 className="mb-2 text-dark">Course Structure</h2>
          </CardHeader>

          <CardBody className="bg-white rounded">
            <Row>
              {/* Left Side */}
              <Col
                xs="12"
                md="4"
                lg="3"
                className="mb-3 border-end"
                style={{ minHeight: "70vh" }}
              >
                <div className="p-2">
                  <div className="mb-3">
                    <Select
                      placeholder="Select Course"
                      options={courses}
                      value={selectedCourse}
                      onChange={handleCourseChange}
                      isClearable
                    />
                  </div>

                  {selectedCourse && (
                    <div
                      onClick={addModule}
                      className="d-flex justify-content-between align-items-center bg-primary rounded px-2 py-1 mb-3"
                      style={{ cursor: "pointer" }}
                    >
                      <span className="fw-bold text-white">
                        {isCreatingModule ? (
                          <>
                            <i className="fa-solid fa-caret-down me-2"></i>
                            Add Modules
                          </>
                        ) : (
                          <>
                            <i className="fa-solid fa-caret-right me-2"></i>
                            Add Modules
                          </>
                        )}
                      </span>

                      <span className="text-white fw-bold">+</span>
                    </div>
                  )}

                  {modules.length === 0 && (
                    <div className="text-muted">No modules added yet.</div>
                  )}

                  {modules.map((mod, moduleIdx) => (
                    <div
                      key={moduleIdx}
                      className="mb-3 p-2 rounded"
                      style={{
                        backgroundColor: "#f5f9ff",
                        border: "1px solid #cce0ff",
                      }}
                    >
                      <div
                        className="d-flex justify-content-between align-items-center bg-white rounded border border-primary px-2 py-1 mb-2"
                        onClick={() => toggleModuleExpansion(moduleIdx)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="d-flex justify-content-between align-items-center w-100">
                          <span className="text-primary fw-bold">
                            <i
                              className={`fa-solid ${
                                expandedModules.includes(moduleIdx)
                                  ? "fa-caret-down"
                                  : "fa-caret-right"
                              } me-2`}
                            ></i>
                            {mod.name}
                          </span>

                          <div className="d-flex align-items-center">
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                addContentToModule(moduleIdx);
                              }}
                              className="text-primary fw-bold mx-2"
                              style={{ cursor: "pointer", fontSize: "1.2rem" }}
                            >
                              +
                            </span>
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                removeModule(moduleIdx);
                              }}
                              className="text-primary fw-bold"
                              style={{ cursor: "pointer", fontSize: "1.2rem" }}
                            >
                              ×
                            </span>
                          </div>
                        </div>
                      </div>

                      {expandedModules.includes(moduleIdx) && (
                        <div className="ms-3 mt-2">
                          {mod.contents.map((_, contentIdx) => (
                            <div
                              key={contentIdx}
                              onClick={() =>
                                handleSelectContent(moduleIdx, contentIdx)
                              }
                              className={`mb-2 d-flex justify-content-between border border-primary align-items-center px-2 py-1 rounded bg-white text-primary`}
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
                                className="text-primary fw-bold"
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
              <Col xs="12" md="8" lg="9" className="p-3 bg-white">
                {isCreatingModule ? (
                  <Card>
                    <CardHeader className="bg-white d-flex justify-content-between align-items-center">
                      <h5 className="text-primary mb-0">Create New Module</h5>
                      <Button
                        close
                        onClick={() => setIsCreatingModule(false)}
                      />
                    </CardHeader>
                    <CardBody>
                      <div className="mb-3">
                        <Label>Module Name</Label>
                        <Input
                          bsSize="sm"
                          value={newModuleName}
                          onChange={(e) => setNewModuleName(e.target.value)}
                          placeholder="Enter module name"
                        />
                      </div>
                      <div className="text-end">
                        <Button
                          size="sm"
                          color="primary"
                          onClick={handleCreateModule}
                        >
                          Create Module
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                ) : selectedItem ? (
                  <Card>
                    <CardHeader className="bg-white d-flex justify-content-between align-items-center">
                      <h5 className="text-primary mb-0">
                        Editing - {modules[selectedItem.moduleIdx].name},
                        Content {selectedItem.contentIdx + 1}
                      </h5>

                      <Button close onClick={() => setSelectedItem(null)} />
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
                    <p>
                      Select a content item from the left or add a module to
                      begin.
                    </p>
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
