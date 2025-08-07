import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Progress,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Collapse,
} from "reactstrap";
import { course } from "DummyData";
import { MdInsertComment, MdOutlineTimer } from "react-icons/md";
import { IoIosArrowDown, IoMdSend, IoIosArrowUp } from "react-icons/io";
import { CiTextAlignLeft } from "react-icons/ci";
import {
  MdZoomOutMap,
  MdOutlineZoomOutMap,
  MdOutlineZoomInMap,
} from "react-icons/md";
import { FaUserTie } from "react-icons/fa";
import "layouts/courseViewer/CourseViewer.css";
import { useResizeDetector } from "react-resize-detector";
import parse from "html-react-parser";
import Iframe from "react-iframe";
import ReactPlayer from "react-player";
// import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const CourseViewer = () => {
  const mediaRef = useRef(null);
  const contentRef = useRef({});
  const { width, height, ref } = useResizeDetector();
  const [expandedCommentIndex, setExpandedCommentIndex] = useState(null);

  const [expandedCourseIndex, setExpandedCourseIndex] = useState(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [inputComment, setInputComment] = useState("");
  const [inputReply, setInputReply] = useState("");
  const [numPages, setNumPages] = useState();
  const [selectedTopic, setSelectedTopic] = useState(null);

  const [courses, setCourses] = useState(course);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null); // e.g. for file path
  const [textHtml1, setTextHtml1] = useState("");
  const [user, setUser] = useState(false);
  const [activeReplyId, setActiveReplyId] = useState(null);

  const docs = [
    {
      uri: "https://sample-videos.com/ppt/Sample-PPT-File-500kb.ppt",
      fileType: "ppt",
      fileName: "taha",
    }, // Local File
  ];

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/test1.txt`)
      .then((res) => res.text())
      .then((data) => {
        setTextHtml1(data);
      })
      .catch((err) => console.error("Error loading file:", err));
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const pptUrl = `${process.env.PUBLIC_URL}/SamplePPTFile_500kb.ppt`;

  const renderMedia = () => {
    if (!selectedTopic) return <p>Select a topic to view its content.</p>;
    switch (selectedTopic.type) {
      case "youtube":
        return (
          // <div className="react-player-wrapper">
          <ReactPlayer
            src={selectedTopic.mediaUrl}
            controls
            width="100%"
            height="100%"
            className="react-player"
            style={{ borderRadius: "12px" }}
          />
          // </div>
        );

      case "video":
        return (
          <video
            controls
            controlsList="nodownload noremoteplayback noplaybackrate"
            disablePictureInPicture
            width="100%"
            height="100%"
            style={{ borderRadius: "12px" }}
            onContextMenu={(e) => e.preventDefault()}
          >
            <source src={selectedTopic.mediaUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );

      case "image":
        return (
          <img
            src={selectedTopic.mediaUrl}
            alt="Lesson Visual"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              borderRadius: "12px",
            }}
          />
        );
      case "pdf":
        return (
          <div
            ref={ref}
            style={{
              width: "100%",
              height: "100%",
              overflowY: "scroll",
              position: "relative",
            }}
          >
            <button
              onClick={() => {
                setIsFullscreen(true);
                setSelectedPdf(
                  `${process.env.PUBLIC_URL}/Miracle Infoserv.pdf`
                );
              }}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                zIndex: 10,
                // background: "#000",
                // color: "#fff",
                border: "none",
                borderRadius: "4px",
                // padding: "4px 8px",
                cursor: "pointer",
              }}
            >
              <MdOutlineZoomOutMap />
            </button>
            <Document
              file={`${process.env.PUBLIC_URL}/Miracle Infoserv.pdf`}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={1} width={width} height={height} />
            </Document>
          </div>
        );

      case "ppt":
        return <DocViewer documents={docs} />;
      case "text":
        return (
          <div
            style={{
              width: "100%",
              height: "100%",
              overflow: "auto",
            }}
          >
            {parse(textHtml1)}
          </div>
        );
      case "link":
        return (
          <div
            style={{
              width: "100%",
              height: "100%",
              border: "1px solid #ccc",
            }}
          >
            <Iframe
              url="https://www.learnpython.org/#google_vignette"
              width="100%"
              height="100%"
              allowFullScreen
            />
          </div>
        );

      default:
        return <p>Unsupported media type</p>;
    }
  };

  const toggleExpansion = (index, sectionType) => {
    setExpandedCourseIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const toggleCommentExpansion = (courseIndex) => {
    setExpandedCommentIndex((prevIndex) =>
      prevIndex === courseIndex ? null : courseIndex
    );
  };
  const handleReply = (courseIndex, commentIndex) => {
    if (!inputReply.trim()) return;

    setCourses((prevCourses) => {
      const updatedCourses = [...prevCourses];
      const selectedComment =
        updatedCourses[courseIndex]?.comment?.[commentIndex];

      if (selectedComment) {
        if (!selectedComment.reply) {
          selectedComment.reply = [];
        }
        selectedComment.reply.push({
          replyId: Date.now(),
          text: inputReply.trim(),
        });
      }

      return updatedCourses;
    });

    // Clear input & hide reply textarea
    setInputReply("");
    setActiveReplyId(null);
  };

  const handleCommentSubmit = (courseIndex) => {
    if (!inputComment.trim()) return;

    setCourses((prev) => {
      const updated = [...prev];
      const course = updated[courseIndex];

      if (!course.comment) {
        course.comment = [];
      }
      course.comment.push({
        commentId: Date.now(),
        comment: inputComment.trim(),
      });
      return updated;
    });

    setInputComment("");
  };

  const toggleUser = () => {
    setUser((prev) => !prev);
  };

  return (
    <div className="course-viewer-wrapper py-3">
      <Container fluid>
        <Row className="gx-3 gy-3" style={{}}>
          {/* Main Content Area */}
          <Col lg={8} md={12}>
            <div
              ref={mediaRef}
              className="rounded-3 shadow-sm p-3"
              style={{ background: "#eee9dbff" }}
            >
              <div className="mb-3 d-flex flex-sm-row justify-content-between align-items-center align-items-sm-start gap-2 sticky-xs">
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
                {renderMedia()}
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
                    <h2 className="fw-bold text-dark mb-1">Courses</h2>
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
                    className={`user-modal my-3 p-3 rounded position-absolute top-5 start-10 ${
                      user ? "show" : ""
                    }`}
                    style={{
                      zIndex: 999,
                      backgroundColor: "#d4d3d0ff",
                      width: "calc(100% - 60px)",
                      maxWidth: "600px",
                      transition: "opacity 0.3s ease, transform 0.3s ease",
                    }}
                  >
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
                                Contact No
                              </Button>
                              <span className="text-dark fw-semibold contact-number">
                                +91-1236547890
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
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
                style={{ height: "65vh" }}
              >
                {courses.map((course, courseIndex) => {
                  const isExpanded = expandedCourseIndex === courseIndex;

                  return (
                    <div
                      key={course.id}
                      className="mb-3 rounded-3"
                      style={{
                        backgroundColor: "#fff",
                        border: isExpanded
                          ? "2px solid #0d6efd"
                          : "1px solid #dee2e6",
                        // height: isExpanded ? "auto" : "80px",
                        maxHeight: isExpanded ? "450px" : "80px", // Estimate max height
                        transition:
                          "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        overflow: "hidden",
                        // overflowY: "auto",
                      }}
                    >
                      <div
                        style={{
                          padding: "1rem",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div style={{ cursor: "pointer" }}>
                          <strong>{course.title}</strong>
                          <div className="d-flex align-items-center gap-1 text-muted small">
                            <MdOutlineTimer size={14} />
                            <span>2:30</span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <div
                            style={{
                              backgroundColor:
                                expandedCommentIndex === courseIndex
                                  ? "#e9ecef"
                                  : "transparent",
                              borderRadius: "5px",
                              padding: "5px",
                              display: "inline-block",
                            }}
                          >
                            <MdInsertComment
                              size={20}
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                toggleCommentExpansion(courseIndex)
                              }
                            />
                          </div>

                          <CiTextAlignLeft style={{ cursor: "pointer" }} />
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={() => toggleExpansion(courseIndex)}
                          >
                            {isExpanded ? <IoIosArrowUp /> : <IoIosArrowDown />}
                          </span>
                        </div>
                      </div>
                      {/* Expandable Topics */}
                      <div
                        style={{
                          maxHeight: "350px", // or any height you prefer
                          overflowY: "auto",
                          paddingRight: "0.5rem",
                          scrollbarWidth: "none" /* Firefox */,
                        }}
                        // className={`expand-wrapper ${isExpanded ? "open" : ""}`}
                      >
                        {course?.topics?.map((topic, topicIndex) => (
                          <div
                            key={topicIndex}
                            className="topic-item"
                            onClick={() => {
                              setSelectedTopic(topic);
                              mediaRef.current?.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                              });
                            }}
                            style={{
                              cursor: "pointer",
                              padding: "0.5rem",
                              marginLeft: "1rem",
                            }}
                          >
                            <strong>{topic.label}</strong>
                            <div className="d-flex align-items-center gap-1 text-muted small">
                              {topic?.time && (
                                <>
                                  <MdOutlineTimer size={14} />
                                  <span>{topic.time.trim()}</span>
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                        {!course.topics && (
                          <div className="p-2">
                            <p className="text-muted">
                              No topics available for this course.
                            </p>
                          </div>
                        )}

                        {expandedCommentIndex === courseIndex && (
                          <div
                            style={{
                              padding: "0 1rem 1rem",
                              marginTop: "1rem",
                            }}
                          >
                            <textarea
                              className="form-control"
                              placeholder="Add your comment here..."
                              rows={2}
                              value={inputComment}
                              onChange={(e) => setInputComment(e.target.value)}
                            />
                            <button
                              className="btn btn-sm btn-primary mt-2 mb-2"
                              onClick={() => handleCommentSubmit(courseIndex)}
                            >
                              Submit
                            </button>

                            {courses[courseIndex]?.comment?.length > 0 && (
                              <ul className="list-group list-group-flush mt-2">
                                {courses[courseIndex].comment.map(
                                  (cmt, cmtIndx) => {
                                    const isReplying =
                                      activeReplyId === cmtIndx;
                                    return (
                                      <li
                                        key={cmtIndx}
                                        className="list-group-item py-2 px-2 small"
                                        style={{
                                          border: "1px solid red",
                                          marginBottom: "0.5rem",
                                        }}
                                      >
                                        <div
                                          style={{
                                            fontSize: "1.0rem",
                                            fontWeight: 500,
                                          }}
                                        >
                                          {cmt.comment}
                                        </div>
                                        <span
                                          className="btn btn-link text-primary p-0"
                                          style={{
                                            fontSize: "0.75rem",
                                            lineHeight: "1",
                                            marginTop: "2px",
                                          }}
                                          onClick={() =>
                                            setActiveReplyId((prev) =>
                                              prev === cmtIndx ? null : cmtIndx
                                            )
                                          }
                                        >
                                          Reply
                                        </span>
                                        {isReplying && (
                                          <>
                                            <textarea
                                              className="form-control form-control-sm mt-2"
                                              rows={1}
                                              placeholder="Write your reply..."
                                              value={inputReply}
                                              onChange={(e) =>
                                                setInputReply(e.target.value)
                                              }
                                            />
                                            <div className="d-flex justify-content-end mt-2">
                                              <Button
                                                size="sm"
                                                color="success"
                                                onClick={() =>
                                                  handleReply(
                                                    courseIndex,
                                                    cmtIndx
                                                  )
                                                }
                                              >
                                                Replied
                                              </Button>
                                            </div>
                                          </>
                                        )}
                                        {/* Replies (if any) */}
                                        {cmt?.reply?.length > 0 && (
                                          <ul
                                            className="list-unstyled mt-2 ms-1"
                                            style={{
                                              border: "1px solid blue",
                                              marginBottom: "0.5rem",
                                            }}
                                          >
                                            {cmt.reply.map((rep, repIndex) => (
                                              <li
                                                key={rep.replyId}
                                                className="mb-1 px-3"
                                                style={{
                                                  fontSize: "0.85rem",
                                                  color: "#333",
                                                }}
                                              >
                                                {rep.text}
                                              </li>
                                            ))}
                                          </ul>
                                        )}
                                        {/* Reply button */}
                                        {/* <span
                                          className="btn btn-link text-primary p-0"
                                          style={{
                                            fontSize: "0.75rem",
                                            lineHeight: "1",
                                            marginTop: "2px",
                                          }}
                                          onClick={() =>
                                            setActiveReplyId((prev) =>
                                              prev === cmtIndx ? null : cmtIndx
                                            )
                                          }
                                        >
                                          Reply
                                        </span> */}
                                        {/* Reply Textarea */}
                                        {/* {isReplying && (
                                          <>
                                            <textarea
                                              className="form-control form-control-sm mt-2"
                                              rows={1}
                                              placeholder="Write your reply..."
                                              value={inputReply}
                                              onChange={(e) =>
                                                setInputReply(e.target.value)
                                              }
                                            />
                                            <div className="d-flex justify-content-end mt-2">
                                              <Button
                                                size="sm"
                                                color="success"
                                                onClick={() =>
                                                  handleReply(
                                                    courseIndex,
                                                    cmtIndx
                                                  )
                                                }
                                              >
                                                Replied
                                              </Button>
                                            </div>
                                          </>
                                        )} */}
                                      </li>
                                    );
                                  }
                                )}
                              </ul>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      {isFullscreen && selectedPdf && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#fff",
            zIndex: 9999,
            overflowY: "auto",
            padding: 20,
          }}
        >
          {/* Close Fullscreen Button */}
          <button
            onClick={() => {
              setIsFullscreen(false);
              setSelectedPdf(null);
            }}
            style={{
              position: "fixed",
              top: 20,
              right: 20,
              zIndex: 10000,
              // backgroundColor: "#000",
              // color: "#fff",
              border: "none",
              borderRadius: 4,
              // padding: "8px 12px",
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            <MdOutlineZoomInMap />
          </button>

          <Document file={selectedPdf} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (_, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={window.innerWidth - 40}
              />
            ))}
          </Document>
        </div>
      )}
    </div>
  );
};

export default CourseViewer;
