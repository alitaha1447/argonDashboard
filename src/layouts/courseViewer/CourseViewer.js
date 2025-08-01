import React, { useState, useRef } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { FaPlay, FaLock, FaCheckCircle } from "react-icons/fa";
import "layouts/courseViewer/CourseViewer.css";
import ReactPlayer from "react-player";
const lessons = [
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
];
const CourseViewer = () => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const lesson = lessons[currentLesson];

  const renderMedia = () => {
    switch (lesson.type) {
      case "youtube":
        return (
          <ReactPlayer
            src={lesson.mediaUrl}
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

      default:
        return <p>Unsupported media type</p>;
    }
  };

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
              <div className="video-wrapper rounded-3 mb-3">
                {renderMedia()}
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
                {lessons.map((lesson, index) => (
                  <Card
                    key={lesson.id}
                    className={`mb-2 ${
                      index === currentLesson ? "border-primary" : ""
                    }`}
                    style={{
                      cursor: "pointer",
                      opacity: lesson.locked ? 0.6 : 1,
                      borderWidth: index === currentLesson ? "2px" : "1px",
                    }}
                    onClick={() => setCurrentLesson(index)}
                  >
                    <CardBody className="d-flex justify-content-between align-items-center p-3">
                      <div>
                        <strong>{lesson.title}</strong>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CourseViewer;
