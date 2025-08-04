import React, { useState } from "react";
import { Col, Container, Row, Progress, Button } from "reactstrap";
import { IoIosArrowDown } from "react-icons/io";
import "layouts/courseViewer2/CourseViewer2.css";
import { useResizeDetector } from "react-resize-detector";
import ReactPlayer from "react-player";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const CourseViewer2 = () => {
  const { width, height, ref } = useResizeDetector();
  // const [expandCourse, setExpandCourse] = useState([]);
  const [expandCourse, setExpandCourse] = useState(null);
  const [activeTab, setActiveTab] = useState("Content");
  const [currentIndex, setCurrentIndex] = useState(null);
  const [numPages, setNumPages] = useState();
  const [currentMedia, setCurrentMedia] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const [courses, setCourses] = useState([
    {
      id: 0,
      title: "Python",
    },
    {
      id: 1,
      title: "React JS",
    },
    {
      id: 2,
      title: "Full Stack Developer",
    },
    {
      id: 3,
      title: "Node JS",
      type: "pdf",
    },
  ]);

  const subtopics = [
    {
      label: "Topic 1 - You Tude Video",
      type: "youtube",
      mediaUrl: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
    },
    {
      label: "Topic 2 - MP 4 Video",
      type: "video",
      mediaUrl:
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    },
    { label: "Topic 3 - PDF", type: "pdf" },
    {
      label: "Topic 4 - Image",
      type: "image",
      mediaUrl: require("assets/img/ship-7643503_1280.png"),
    },
  ];

  const renderMedia = () => {
    if (!currentMedia) return <p>Please select a lesson to begin.</p>;
    switch (currentMedia.type) {
      case "youtube":
        return (
          // <div className="react-player-wrapper">
          <ReactPlayer
            src="https://www.youtube.com/watch?v=LXb3EKWsInQ"
            controls
            width="100%"
            height="100%"
            className="react-player"
            style={{ borderRadius: "12px" }}
          />
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
            <source src={currentMedia.mediaUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      case "image":
        return (
          <img
            src={currentMedia.mediaUrl}
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
    }
  };

  const toggleCourseExpand = (id) => {
    setExpandCourse((prev) => (prev === id ? null : id));
    // if (expandCourse.includes(id)) {
    //   setExpandCourse(expandCourse.filter((index) => index !== id));
    // } else {
    //   setExpandCourse([...expandCourse, id]);
    // }
  };

  return (
    <div className="py-3" style={{ minHeight: "100vh" }}>
      <Container fluid style={{}}>
        <Row className="gy-3 h-100" style={{ height: "100%" }}>
          <Col lg={4}>
            <div className="shadow-sm p-1 rounded-3" style={{}}>
              <div
                className="rounded-3 shadow-sm p-3 mb-2"
                style={{ background: "white" }}
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
              </div>

              {/* Contents */}
              <div
                className="rounded-3 shadow-sm mb-2"
                style={{ background: "white" }}
              >
                <div className="p-3 text-uppercase fw-bold text-muted small ">
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                      color: "#333",
                    }}
                  >
                    Contents
                  </span>
                </div>
                <div
                  className="overflow-auto"
                  style={{ maxHeight: "calc(320px)" }}
                >
                  {courses.map((course, courseID) => (
                    <div
                      key={course.id}
                      className="mb-1"
                      style={{
                        opacity: course.locked ? 0.6 : 1,
                        height: "auto",
                        // height: expandCourse.includes(courseID)
                        //   ? "auto"
                        //   : "auto",
                        backgroundColor: "#dee2e6",
                        // borderRadius: "0.5rem",
                        border: "1px solid #dee2e6",
                        padding: "0.75rem",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-2">
                          <span style={{ color: "green", fontSize: "1.2rem" }}>
                            ✔
                          </span>
                          <span className="fw-semibold">{course.title}</span>
                        </div>
                        <div
                          onClick={() => {
                            toggleCourseExpand(courseID);
                          }}
                        >
                          <IoIosArrowDown />
                        </div>
                      </div>
                      {expandCourse === courseID && (
                        <div className="mt-3 ms-4">
                          {subtopics.map((topic, idx) => {
                            return (
                              <div
                                key={idx}
                                className="d-flex align-items-center gap-2 mb-2 border rounded bg-white px-3 py-2"
                                role="button"
                                onClick={() => setCurrentMedia(topic)} // ✅ Set topic directly here
                              >
                                <span className="text-dark small fw-medium">
                                  {topic.label}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Col>
          <Col lg={8}>
            <div
              className="shadow-sm py-1 rounded-3"
              style={{ background: "white" }}
            >
              {/* Tabs */}
              <div
                className="border-bottom border-dark d-flex  align-items-center p-3 gap-4"
                style={{
                  overflowX: "auto",
                  whiteSpace: "nowrap",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {["Content", "Comment", "Notes", "Announcements", "More"].map(
                  (tab) => (
                    <span
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-2 cursor-pointer ${
                        activeTab === tab
                          ? "fw-semibold border-bottom border-primary text-primary"
                          : "text-muted"
                      }`}
                      style={{ cursor: "pointer" }}
                    >
                      {tab}
                    </span>
                  )
                )}
              </div>
              <div className="mt-3 mb-3 px-3 d-flex justify-content-end">
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
              <div className="rounded-3 shadow mx-1 p-3" style={{}}>
                <h2>Unit 1 Sr.2 - PDF</h2>
                <div className="video-wrapper rounded-3 mb-3">
                  {currentMedia !== null ? (
                    renderMedia()
                  ) : (
                    <p>Please select a lesson to begin.</p>
                  )}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CourseViewer2;
