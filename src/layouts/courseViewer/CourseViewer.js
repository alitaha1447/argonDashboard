import React, { useState, useRef } from "react";
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";
import { MdInsertComment, MdOutlineTimer } from "react-icons/md";

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
  const [expandedCommentIndex, setExpandedCommentIndex] = useState([]);
  const [lessons, setLessons] = useState([
    {
      id: 0,
      title: "Intro Video (YouTube)",
      completed: true,
      locked: false,
      type: "youtube",
      mediaUrl: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
    },
    {
      id: 1,
      title: "Sample Image Slide",
      completed: false,
      locked: false,
      type: "image",
      mediaUrl: require("assets/img/ship-7643503_1280.png"),
    },
    {
      id: 2,
      title: "Local Video (MP4)",
      completed: false,
      locked: false,
      type: "video",
      mediaUrl:
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    },
    {
      id: 3,
      title: "Sample PDF File",
      type: "pdf",
    },
  ]);
  const [comments, setComments] = useState([]); // [{ [index]: ["comment1", "comment2"] }]
  const [inputComment, setInputComment] = useState(""); // for current input
  const [numPages, setNumPages] = useState();
  // const [pageNumber, setPageNumber] = useState(1);
  // const [docs, setDocs] = useState([]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const lesson = currentIndex !== null ? lessons[currentIndex] : null;

  const renderMedia = () => {
    switch (lesson.type) {
      case "youtube":
        return (
          // <div className="react-player-wrapper">
          <ReactPlayer
            src={lesson.mediaUrl}
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
            <source src={lesson.mediaUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );

      case "image":
        return (
          <img
            src={lesson.mediaUrl}
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

      default:
        return <p>Unsupported media type</p>;
    }
  };

  const toggleCommentExpansion = (idx) => {
    if (expandedCommentIndex.includes(idx)) {
      setExpandedCommentIndex(
        expandedCommentIndex.filter((index) => index !== idx)
      );
    } else {
      setExpandedCommentIndex([...expandedCommentIndex, idx]);
    }
  };

  const handleCommentSubmit = (lessonIdx) => {
    if (!inputComment.trim()) return;

    setLessons((prevLessons) => {
      const updatedLessons = [...prevLessons];

      const lesson = updatedLessons[lessonIdx];

      // Dynamically create comments array if not present
      if (!lesson.comments) {
        lesson.comments = [];
      }

      lesson.comments.push({
        commentId: Date.now(),
        comment: inputComment.trim(),
      });

      return updatedLessons;
    });

    setInputComment("");
  };

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
              <h2 className="mb-4 fw-bold text-dark">Now Playing</h2>
              <div className="video-wrapper rounded-3 mb-3 h-100">
                {currentIndex !== null ? (
                  renderMedia()
                ) : (
                  <p>Please select a lesson to begin.</p>
                )}
                <DocViewer
                  documents={docs}
                  pluginRenderers={DocViewerRenderers}
                />
                {/* <div>
                  <input
                    type="file"
                    accept=".ppt"
                    onChange={handleFileChange}
                  />
                  {docs.length > 0 && <div style={{ height: "80vh" }}></div>}
                </div> */}
              </div>
            </div>
          </Col>

          {/* Sidebar */}
          <Col lg={4} md={12}>
            <div
              className="rounded-3 shadow-sm p-3 h-100"
              style={{ background: "#eee9dbff" }}
            >
              <h2 className="mb-3 fw-bold text-dark">Course Content</h2>

              <div className="overflow-auto" style={{ maxHeight: "75vh" }}>
                {lessons.map((lesson, lessonIdx) => {
                  // const isActive = index === currentIndex;
                  // const isExpanded = index === expandedCommentIndex;
                  // console.log(lessonIdx);
                  return (
                    <div
                      key={lesson.id}
                      style={{
                        opacity: lesson.locked ? 0.6 : 1,
                        border:
                          expandedCommentIndex.includes(lessonIdx) ||
                          lessonIdx === currentIndex
                            ? "2px solid #0d6efd"
                            : "1px solid #dee2e6",
                        borderRadius: "0.5rem",
                        marginBottom: "0.5rem",
                        transition: "border-color 0.3s",
                        backgroundColor: "#fff",
                        height:
                          expandedCommentIndex.includes(lessonIdx) ||
                          lessonIdx === currentIndex
                            ? "2px solid #0d6efd"
                            : "1px solid #dee2e6",
                        overflow: "hidden",
                        transition: "all 0.3s ease",
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
                          onClick={() =>
                            setCurrentIndex((prevIndex) =>
                              prevIndex === lessonIdx ? null : lessonIdx
                            )
                          }
                        >
                          <strong>{lesson.title}</strong>
                          <div className="d-flex align-items-center gap-1 text-muted small">
                            <MdOutlineTimer size={14} />
                            <span>2:30</span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <MdInsertComment
                            style={{ cursor: "pointer" }}
                            onClick={() => toggleCommentExpansion(lessonIdx)}
                          />
                          <CiTextAlignLeft />
                        </div>
                      </div>
                      {expandedCommentIndex.includes(lessonIdx) && (
                        <div
                          style={{
                            padding: "0 1rem 1rem",
                          }}
                        >
                          <textarea
                            className="form-control"
                            placeholder="Add your comment here..."
                            rows={3}
                            value={inputComment}
                            onChange={(e) => setInputComment(e.target.value)}
                          />
                          <button
                            className="btn btn-sm btn-primary mt-2 mb-2"
                            onClick={() => handleCommentSubmit(lessonIdx)}
                          >
                            Submit
                          </button>
                          {/* ✅ PLACE THIS HERE */}
                          {lessons[lessonIdx].comments?.length > 0 && (
                            <ul className="list-group list-group-flush mt-2">
                              {lessons[lessonIdx].comments.map((cmt) => (
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
