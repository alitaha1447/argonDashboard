import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  Container,
  Row,
  Table,
  Input,
  Button,
  Label,
  CardBody,
} from "reactstrap";
import { FaPlus } from "react-icons/fa";
import Header from "components/Headers/Header";
import axios from "axios";
import Select from "react-select";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

const CourseStructure = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modules, setModules] = useState([]);

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

  const removeModule = (index) => {
    const updated = [...modules];
    updated.splice(index, 1);
    setModules(updated);
  };

  const addContentToModule = (moduleIndex) => {
    const updated = [...modules];
    const contentNumber = updated[moduleIndex].contents.length + 1;
    updated[moduleIndex].contents.push({
      title: `Content ${contentNumber}`,
      file: null,
      submitted: false,
    });
    setModules(updated);
  };

  const removeContentFromModule = (moduleIndex, contentIndex) => {
    const updated = [...modules];
    updated[moduleIndex].contents.splice(contentIndex, 1);
    setModules(updated);
  };

  const handleContentChange = (moduleIndex, contentIndex, type, value) => {
    const updated = [...modules];
    updated[moduleIndex].contents[contentIndex][type] = value;
    setModules(updated);
  };

  const handleSubmitContent = (moduleIndex, contentIndex) => {
    const content = modules[moduleIndex].contents[contentIndex];
    if (!content.title || !content.file) {
      alert("Please enter a title and select a file.");
      return;
    }

    console.log("Submitted Content:", {
      module: modules[moduleIndex].name,
      title: content.title,
      file: content.file,
    });

    const updated = [...modules];
    updated[moduleIndex].contents[contentIndex].submitted = true;
    setModules(updated);
  };

  return (
    <>
      <Header />
      <Container className="mt--9" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader>
                <div className="d-flex justify-content-between align-items-center flex-column flex-md-row">
                  <h1 className="mb-2">Course Structure</h1>
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

                {selectedCourse && (
                  <div className="mt-3 border-top pt-2">
                    <Button color="primary" onClick={addModule}>
                      <FaPlus className="me-2" />
                      Add Module
                    </Button>
                  </div>
                )}
              </CardHeader>

              <CardBody>
                {modules.map((mod, moduleIdx) => (
                  <div key={moduleIdx} className="mb-4 border p-3 rounded">
                    {/* Module Title and Delete */}
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5 className="fw-bold mb-0">{mod.name}</h5>
                      <button
                        onClick={() => removeModule(moduleIdx)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "gray",
                          fontSize: "1.50rem",
                          cursor: "pointer",
                          lineHeight: "1",
                        }}
                        title="Delete Module"
                      >
                        ×
                      </button>
                    </div>

                    {/* Add Content Button */}
                    <Button
                      size="sm"
                      color="primary"
                      onClick={() => addContentToModule(moduleIdx)}
                      className="mb-3"
                    >
                      <FaPlus className="me-1" /> Add Content
                    </Button>

                    {/* Content List */}
                    {mod.contents.map((content, contentIdx) => (
                      <div
                        key={contentIdx}
                        className="border rounded p-3 mb-3"
                        style={{
                          backgroundColor: content.submitted
                            ? "#f8f9fa"
                            : "#fff",
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-start">
                          <div className="w-100">
                            <Label className="mb-1">Title</Label>
                            <Input
                              className="mb-2"
                              value={content.title}
                              onChange={(e) =>
                                handleContentChange(
                                  moduleIdx,
                                  contentIdx,
                                  "title",
                                  e.target.value
                                )
                              }
                              disabled={content.submitted}
                            />

                            <div className="d-flex align-items-end gap-2">
                              <div className="flex-grow-1">
                                <Label className="mb-1">Upload File</Label>
                                <Input
                                  type="file"
                                  onChange={(e) =>
                                    handleContentChange(
                                      moduleIdx,
                                      contentIdx,
                                      "file",
                                      e.target.files[0]
                                    )
                                  }
                                  disabled={content.submitted}
                                  className="mb-1"
                                />
                                {content.file && (
                                  <small className="text-muted">
                                    {content.file.name}
                                  </small>
                                )}
                              </div>

                              {/* Submit Button */}
                              <div className="mb-2">
                                <Button
                                  size="sm"
                                  color="primary"
                                  onClick={() =>
                                    handleSubmitContent(moduleIdx, contentIdx)
                                  }
                                  disabled={content.submitted}
                                >
                                  {content.submitted ? "Submitted" : "Submit"}
                                </Button>
                              </div>
                            </div>
                          </div>

                          {/* Cut/Delete Button */}
                          <button
                            onClick={() =>
                              removeContentFromModule(moduleIdx, contentIdx)
                            }
                            style={{
                              background: "none",
                              border: "none",
                              color: "gray",
                              fontSize: "1.50rem",
                              cursor: "pointer",
                              lineHeight: "2",
                            }}
                            title="Remove Content"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default CourseStructure;
