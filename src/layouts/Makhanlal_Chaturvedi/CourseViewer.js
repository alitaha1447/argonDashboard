import "layouts/courseViewer/CourseViewer.css";
import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Button, Progress } from "reactstrap";
import { IoIosArrowDown } from "react-icons/io";
import { FaUserTie, FaDownload } from "react-icons/fa";
import { BCA } from "DummyData";

const CourseViewer = () => {
  const mediaRef = useRef(null);
  const [user, setUser] = useState(false);
  //   ----------------------------------------------------------------------------
  // const [expandBCACourse, setExpandBCACourse] = useState(null);
  // const [expandedBCASubject, setExpandedBCASubject] = useState({}); // { [courseIndex]: subjectIdx|null }
  // 1) Flatten to subjects
  const allSubjects = BCA.flatMap((course) => course.subjects);
  // 2) Local state for expanding a subject
  const [expandedSubject, setExpandedSubject] = useState(null);

  const toggleUser = () => {
    setUser((prev) => !prev);
  };

  // const toggleBCAExpansion = (index) => {
  //   setExpandBCACourse((prevIndex) => (prevIndex === index ? null : index));
  // };
  // const toggleBCASubject = (cIdx, sIdx) => {
  //   setExpandedBCASubject((prev) => ({
  //     ...prev,
  //     [cIdx]: prev[cIdx] === sIdx ? null : sIdx,
  //   }));
  // };

  const toggleSubject = (i) =>
    setExpandedSubject(expandedSubject === i ? null : i);

  return (
    <div className="course-viewer-wrapper py-2">
      <Container fluid>
        <Row className="gx-3 gy-3">
          {/* Main Content Area */}
          <Col lg={8} md={12}>
            <div
              ref={mediaRef}
              className="rounded-3 shadow-sm p-3"
              style={{
                background: "#eee9dbff",
              }}
            >
              <div className="mb-3 d-flex flex-sm-row justify-content-between align-items-center align-items-sm-start">
                <h2 className="fw-bold text-dark mb-0 now-playing-heading">
                  Now Playing
                </h2>
                <Button
                  className="now-playing-button"
                  style={{
                    background: "#5E72E4",
                    color: "white",
                    border: "none",
                  }}
                >
                  Complete & Continue
                </Button>
              </div>
              <div className="video-wrapper rounded-3 mb-3 h-100">
                {/* {renderMedia()} */}
              </div>
            </div>
          </Col>

          {/* Sidebar */}
          <Col lg={4} md={12}>
            <div
              className="rounded-3 shadow-sm p-3 "
              style={{ background: "#eee9dbff", height: "100%" }}
            >
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h2 className="fw-bold text-dark mb-1">
                      Bachelor of Computer Applications (BCA)
                    </h2>
                    <div className="">
                      <span
                        style={{
                          fontWeight: "bold",
                          fontSize: "0.95rem",
                          color: "#333",
                        }}
                      >
                        Semester - 1
                      </span>
                    </div>

                    <small className="text-muted">Section : 2025-26</small>
                  </div>
                  <div
                    className="d-flex justify-content-center align-items-center rounded-circle"
                    style={{
                      width: "30px",
                      height: "30px",
                      background: "#ebdbafff",
                      cursor: "pointer",
                    }}
                    onClick={toggleUser}
                  >
                    <FaUserTie className="text-white" size={16} />
                  </div>
                </div>

                {user && (
                  <div
                    className={`user-modal my-3 p-3 rounded position-absolute top-6 start-10`}
                    style={{
                      zIndex: 999,
                      backgroundColor: "#d4d3d0ff",
                      width: "calc(100% - 60px)",
                      height: "250px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        overflowY: "auto",
                        paddingRight: "6px",
                        willChange: "transform",
                        backfaceVisibility: "hidden",
                        WebkitOverflowScrolling: "touch",
                        scrollbarWidth: "none", // for Firefox
                        msOverflowStyle: "none", // for IE/Edge
                      }}
                    >
                      {[1, 2, 3].map((_, index) => (
                        <div className="border border-primary rounded mb-2 p-2">
                          <div className="d-flex align-items-center">
                            <div
                              className="rounded-circle me-3 flex-shrink-0"
                              style={{
                                width: "80px",
                                height: "80px",
                                overflow: "hidden",
                                backgroundColor: "#f0f0f0",
                              }}
                            >
                              <img
                                src={require("assets/img/81kJPl8jmiL._SY741_.jpg")}
                                alt="User"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "contain",
                                }}
                              />
                            </div>

                            <div className="flex-grow-1">
                              <div className="fw-bold user-name">Taha</div>
                              <div className="d-flex flex-column text-muted user-details">
                                <span>Age: 25</span>
                                <span>Email ID: test@gmail.com</span>
                                <div className="d-flex align-items-center gap-2 mt-1">
                                  <Button
                                    size="sm"
                                    className="contact-btn"
                                    style={{
                                      background: "#5E72E4",
                                      color: "white",
                                      border: "none",
                                    }}
                                  >
                                    +91-1236547890
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="d-flex justify-content-end mb-1">
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "0.95rem",
                      color: "#333",
                    }}
                  >
                    20% Completed
                  </span>
                </div>

                <Progress value={20} />
              </div>
              <div
                className="overflow-auto hide-scrollbar"
                style={{
                  height: "60dvh", // was 60vh
                  overflow: "auto", // covers both X/Y
                  overscrollBehavior: "auto", // remove the 'contain' shorthand conflict
                  WebkitOverflowScrolling: "touch",
                  minHeight: 0, // keep this
                  touchAction: "pan-y", // new: helps on touch devices
                  scrollbarWidth: "thin", // fine (Firefox)
                  scrollbarGutter: "stable", // optional: prevents small jumps
                }}
              >
                {allSubjects.map((subject, idx) => {
                  const isExpanded = expandedSubject === idx;

                  return (
                    <div
                      key={idx}
                      className="mb-3 rounded-3"
                      style={{
                        backgroundColor: "#fff",
                        height: isExpanded ? "auto" : "auto",
                        border: isExpanded
                          ? "1px solid #0d6efd"
                          : "1px solid #eceff3ff",
                        overflow: "hidden",
                      }}
                    >
                      {/* Header shows SUBJECT NAME (was Semester) */}
                      <div
                        style={{
                          padding: "1rem",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => toggleSubject(idx)}
                      >
                        <strong>{subject.subjectName}</strong>
                        <span
                          style={{
                            display: "inline-block",
                            transform: isExpanded
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                          }}
                        >
                          <IoIosArrowDown />
                        </span>
                      </div>

                      {/* Body shows UNITS (was Subject row) */}
                      {isExpanded && (
                        <ul
                          className="list-group list-group-flush mt-2 mb-2 mx-2"
                          style={{
                            listStyle: "none",
                            border: "1px solid #eceff3ff",
                            borderRadius: "0.5rem",
                          }}
                        >
                          {subject.units.map((unit, uIdx) => (
                            <li
                              key={uIdx}
                              className="list-group-item py-1 px-2"
                              style={{ listStyle: "none", fontSize: "0.9rem" }}
                            >
                              <span style={{ opacity: 0.8 }}>
                                {unit.unitNumber}:
                              </span>{" "}
                              {unit.unitTitle}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CourseViewer;
