import React, { useState, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Progress,
} from "reactstrap";
import { course } from "DummyData";
import { MdInsertComment, MdOutlineTimer } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { CiTextAlignLeft } from "react-icons/ci";
import "layouts/courseViewer/CourseViewer.css";
import { useResizeDetector } from "react-resize-detector";
import ReactPlayer from "react-player";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const docs = [
  {
    uri: `${process.env.PUBLIC_URL}/SamplePPTFile_500kb.ppt`, // must be a direct link or base64
    fileType: "pptx",
    fileName: "Presentation.pptx",
  },
];

const CourseViewer = () => {
  const { width, height, ref } = useResizeDetector();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedCommentIndex, setExpandedCommentIndex] = useState(null);
  // const [expandedSections, setExpandedSections] = useState({});
  // const [expandedSections, setExpandedSections] = useState({
  //   index: null,
  //   type: null,
  // });
  const [expandedCourseIndex, setExpandedCourseIndex] = useState(null);

  // const [comments, setComments] = useState({}); // [{ [index]: ["comment1", "comment2"] }]
  const [inputComment, setInputComment] = useState(""); // for current input
  const [numPages, setNumPages] = useState();
  const [selectedTopic, setSelectedTopic] = useState(null);

  const [courses, setCourses] = useState(course);

  // const [expandedCommentIndex, setExpandedCommentIndex] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // const lesson = currentIndex !== null ? lessons[currentIndex] : null;

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
            style={{ width: "100%", height: "100%", overflowY: "scroll" }}
          >
            <Document
              file={`${process.env.PUBLIC_URL}/Miracle Infoserv.pdf`}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={1} width={width} height={height} />
            </Document>
          </div>
        );

      case "ppt":
        return (
          <iframe
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
              `${window.location.origin}/assets/files/SamplePPTFile_500kb.ppt`
            )}`}
            width="100%"
            height="100%"
            frameBorder="0"
            title="PowerPoint Viewer"
          />
        );

      default:
        return <p>Unsupported media type</p>;
    }
  };

  const toggleExpansion = (index, sectionType) => {
    // console.log(index);
    // setExpandedSections(
    //   (prev) =>
    //     prev.index === index && prev.type === sectionType
    //       ? { index: null, type: null } // toggle off
    //       : { index, type: sectionType } // open new
    // );
    // setExpandedSections((prev) => ({
    //   ...prev,
    //   [index]: prev[index] === sectionType ? null : sectionType,
    // }));
    setExpandedCourseIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const toggleCommentExpansion = (courseIndex) => {
    setExpandedCommentIndex((prevIndex) =>
      prevIndex === courseIndex ? null : courseIndex
    );
  };
  const handleCommentSubmit = (courseIndex) => {
    // if (!inputComment.trim()) return;
    // setComments((prev) => {
    //   const updatedComments = { ...prev };

    //   // If no comment array exists for this course, initialize it
    //   if (!updatedComments[courseIndex]) {
    //     updatedComments[courseIndex] = [];
    //   }

    //   // Push the new comment
    //   updatedComments[courseIndex].push({
    //     commentId: Date.now(),
    //     comment: inputComment.trim(),
    //   });

    //   return updatedComments;
    // });
    setCourses((prev) => {
      const updated = [...prev];
      console.log(updated);
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

  // const handleCommentSubmit = (lessonIdx) => {
  //   if (!inputComment.trim()) return;

  //   setLessons((prevLessons) => {
  //     const updatedLessons = [...prevLessons];

  //     const lesson = updatedLessons[lessonIdx];

  //     // Dynamically create comments array if not present
  //     if (!lesson.comments) {
  //       lesson.comments = [];
  //     }

  //     lesson.comments.push({
  //       commentId: Date.now(),
  //       comment: inputComment.trim(),
  //     });

  //     return updatedLessons;
  //   });

  //   setInputComment("");
  // };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];

  //   if (file && file.name.endsWith(".ppt")) {
  //     const newDoc = {
  //       file: file, // File object
  //       fileType: "ppt",
  //       fileName: file.name,
  //     };

  //     setDocs([newDoc]);
  //   } else {
  //     alert("Please select a valid PPTX file");
  //   }
  // };
  // const docs = [
  //   {
  //     // uri: `${process.env.PUBLIC_URL}/bill.pdf`,
  //     uri: {require('../')},
  //     fileType: "ppt",
  //     fileName: "demo",
  //   },
  // ];

  return (
    <div className="course-viewer-wrapper py-3">
      <Container fluid>
        <Row className="gx-3 gy-3">
          {/* Main Content Area */}
          <Col lg={8} md={12}>
            <div
              className="rounded-3 shadow-sm p-3"
              style={{ background: "#eee9dbff" }}
            >
              <div className="mb-3 d-flex flex-wrap justify-content-between align-items-center">
                <h2 className="fw-bold text-dark">Now Playing</h2>
                <Button
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
                {/* {currentIndex !== null ? ( */}
                {renderMedia()}
                {/* ) : (
                  <p>Please select a lesson to begin.</p>
                )} */}
              </div>
            </div>
          </Col>

          {/* Sidebar */}
          <Col lg={4} md={12}>
            <div
              className="rounded-3 shadow-sm p-3 h-100"
              style={{ background: "#eee9dbff" }}
            >
              <div className="mb-4">
                <h2 className="fw-bold text-dark mb-1">Courses</h2>
                <small className="text-muted">Section : 2025-26</small>

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
                style={{ maxHeight: "75vh" }}
              >
                {courses.map((course, courseIndex) => {
                  const isExpanded = expandedCourseIndex === courseIndex;
                  // const isActive = index === currentIndex;
                  // const isExpanded = index === expandedCommentIndex;
                  console.log(course);

                  return (
                    <div
                      key={course.id}
                      className="mb-3 rounded-3"
                      style={{
                        backgroundColor: "#fff",
                        border: isExpanded
                          ? "2px solid #0d6efd"
                          : "1px solid #dee2e6",
                        transition: "border-color 0.3s",
                        // opacity: lesson.locked ? 0.6 : 1,
                        // height: "auto",
                        // border:
                        //   expandedCommentIndex.includes(lessonIdx) ||
                        //   lessonIdx === currentIndex
                        //     ? "2px solid #0d6efd"
                        //     : "1px solid #dee2e6",
                        // borderRadius: "0.5rem",
                        // marginBottom: "0.5rem",
                        // transition: "border-color 0.3s",
                        // backgroundColor: "#fff",
                        // height:
                        //   expandedCommentIndex.includes(lessonIdx) ||
                        //   lessonIdx === currentIndex
                        //     ? "2px solid #0d6efd"
                        //     : "1px solid #dee2e6",
                        // overflow: "hidden",
                        // transition: "all 0.3s ease",
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
                        <div
                          style={{ cursor: "pointer" }}
                          // onClick={() =>
                          //   setCurrentIndex((prevIndex) =>
                          //     prevIndex === lessonIdx ? null : lessonIdx
                          //   )
                          // }
                        >
                          <strong>{course.title}</strong>
                          <div className="d-flex align-items-center gap-1 text-muted small">
                            <MdOutlineTimer size={14} />
                            <span>2:30</span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <MdInsertComment
                            style={{ cursor: "pointer" }}
                            onClick={() => toggleCommentExpansion(courseIndex)}
                          />
                          <CiTextAlignLeft style={{ cursor: "pointer" }} />
                          <IoIosArrowDown
                            style={{ cursor: "pointer" }}
                            onClick={() => toggleExpansion(courseIndex)}
                          />
                        </div>
                      </div>
                      {/* Expandable Topics */}
                      <div
                        className={`expand-wrapper ${isExpanded ? "open" : ""}`}
                      >
                        {course?.topics?.map((topic, topicIndex) => (
                          <div
                            key={topicIndex}
                            className="topic-item"
                            onClick={() => setSelectedTopic(topic)}
                            style={{
                              cursor: "pointer",
                              padding: "0.5rem",
                              marginLeft: "1rem",
                              // border: "1px solid red",
                              // backgroundColor:
                              //   selectedTopic?.label === topic.label
                              //     ? "#e6f0ff"
                              //     : "transparent",
                              // borderLeft:
                              //   selectedTopic?.label === topic.label
                              //     ? "3px solid #0d6efd"
                              //     : "none",
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
                            {/* {topic.label} */}
                          </div>
                        ))}
                        {!course.topics && (
                          <div className="p-2">
                            <p className="text-muted">
                              No topics available for this course.
                            </p>
                          </div>
                        )}
                      </div>
                      {expandedCommentIndex === courseIndex && (
                        <div style={{ padding: "0 1rem 1rem" }}>
                          <textarea
                            className="form-control"
                            placeholder="Add your comment here..."
                            rows={3}
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
                              {courses[courseIndex].comment.map((cmt) => (
                                <li
                                  key={cmt.commentId}
                                  className="list-group-item py-1 px-2 small"
                                >
                                  {cmt.comment}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
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
