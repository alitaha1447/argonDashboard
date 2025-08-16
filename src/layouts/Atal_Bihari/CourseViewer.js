import "layouts/Atal_Bihari/CourseViewer.css";
import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Button, Progress } from "reactstrap";
import { FaUserTie, FaDownload, FaCheckCircle } from "react-icons/fa";
import { MdInsertComment, MdOutlineTimer } from "react-icons/md";
import { IoIosArrowDown, IoMdSend, IoIosArrowUp } from "react-icons/io";
import { RiPencilFill, RiPencilLine } from "react-icons/ri";
import { ImCross } from "react-icons/im";
import {
  FaYoutube,
  FaFilePdf,
  FaFileAlt,
  FaImage,
  FaFilePowerpoint,
  FaVideo,
  FaLink,
} from "react-icons/fa";
import { AtalBihari2 } from "DummyData";
import parse from "html-react-parser";
import Iframe from "react-iframe";
import ReactPlayer from "react-player";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;


const CourseViewer = () => {
  const mediaRef = useRef(null);
  const [textHtml1, setTextHtml1] = useState("");
  const [user, setUser] = useState(false);

  const [selectedTopic, setSelectedTopic] = useState(null);
  const [expandedSubject, setExpandedSubject] = useState(null);
  const [expandedTopic, setExpandedTopic] = useState(null)
  const [comment, setComment] = useState(null);
  const [inputComment, setInputComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);
  const [note, setNote] = useState(null);
  const [inputNote, setInputNote] = useState("");
  const [notesList, setNotesList] = useState([]);
  const [inputReply, setInputReply] = useState("");
  const [replyList, setReplyList] = useState([]);
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const makeKey = (subj, unit, topic) => `${subj}-${unit}-${topic}`;


  const docs = [
    {
      uri: "https://sample-videos.com/ppt/Sample-PPT-File-500kb.ppt",
      fileType: "ppt",
      fileName: "Sample-PPT-File-500kb.ppt",
    },
  ];
  const docs2 = [
    {
      uri: require("assets/files/BY-102.pdf"),
      fileType: "pdf",
      fileName: "BY-102.pdf",
    },
  ];
  // useEffect(() => {
  //   fetch(`${process.env.PUBLIC_URL}/test1.txt`)
  //     .then((res) => res.text())
  //     .then((data) => {
  //       setTextHtml1(data);
  //     })
  //     .catch((err) => console.error("Error loading file:", err));
  // }, []);

  useEffect(() => {
    if (!AtalBihari2?.length) return;

    const subjectIdx = 0; // first subject
    const unitIdx = 0;    // first unit of first subject
    const topicIndex = 0; // first topic of first unit

    const topic = AtalBihari2[subjectIdx]?.units?.[unitIdx]?.topics?.[topicIndex];
    if (!topic) return;

    setExpandedSubject(subjectIdx);
    setExpandedTopic(`${unitIdx}-${subjectIdx}`);
    setSelectedTopic(topic);

    // Scroll player into view if needed
    requestAnimationFrame(() => {
      mediaRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [])

  useEffect(() => {
    if (selectedTopic) {
      // Delay to simulate load time or wait for content-specific events
      const timeout = setTimeout(() => {
        setMediaLoading(false);
      }, 800); // adjust time as needed

      return () => clearTimeout(timeout);
    }
  }, [selectedTopic]);

  useEffect(() => {
    if (selectedTopic?.type === "text" && selectedTopic.file) {
      const fetchTextFile = async () => {
        try {
          const response = await fetch(`${process.env.PUBLIC_URL}/${selectedTopic.file}`);
          if (!response.ok) throw new Error("File not found");
          const data = await response.text();
          setTextHtml1(data);
        } catch (error) {
          console.error("Error fetching text file:", error);
          setTextHtml1("<p style='color:red;'>Unable to load file.</p>");
        }
      };

      fetchTextFile();
    }
  }, [selectedTopic]);

  const renderMedia = () => {
    if (mediaLoading) {
      return (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: 300 }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }
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
          <DocViewer documents={docs2} pluginRenderers={DocViewerRenderers} />
        );

      case "ppt":
        return (
          <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />
        );
      case "text":
        return (
          <div
            style={{
              width: "100%",
              height: "100%",
              overflow: "auto",
              scrollbarWidth: "thin",
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
              url={selectedTopic.mediaUrl}
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

  const toggleTopic = (unitIdx, subjectIdx) => {
    const topicKey = `${unitIdx}-${subjectIdx}`;
    setExpandedTopic((prev) => (prev === topicKey ? null : topicKey));
  };

  const toggleComment = (unitIdx, subjectIdx) => {
    const commentKey = `${unitIdx}-${subjectIdx}`;
    setComment((prev) => (prev === commentKey ? null : commentKey));
  };

  const toggleNote = (unitIdx, subjectIdx) => {
    const noteKey = `${unitIdx}-${subjectIdx}`;
    setNote((prev) => (prev === noteKey ? null : noteKey));
  };


  const handleCommentSubmit = (unitIdx, subjectIdx) => {
    const newComment = inputComment; // Get the current comment
    if (newComment.trim()) {
      // Add the comment to the list
      setCommentsList((prevComments) => [
        ...prevComments,
        { unitIdx, subjectIdx, comment: newComment },
      ]);
      setInputComment(""); // Reset the input field
    }
  };

  // Handle reply submission
  const handleReply = (unitIdx, subjectIdx, commentIndex) => {
    const newReply = inputReply;
    if (newReply.trim()) {
      const updatedReplies = [...replyList];
      updatedReplies.push({
        unitIdx,
        subjectIdx,
        commentIndex,
        reply: newReply,
      });
      setReplyList(updatedReplies);
      setInputReply(""); // Reset the reply input field
      setActiveReplyId(null); // Hide the reply input after submission
    }
  };

  const handleAddNote = (unitIdx, subjectIdx) => {
    const newNote = inputNote;
    if (newNote.trim()) {
      setNotesList((prevNotes) => [
        ...prevNotes,
        { unitIdx, subjectIdx, note: newNote },
      ]);
      setInputNote("");
    }
  };

  const handleDownloadNotesForUnit = (unitIdx, subjectIdx) => {
    const filteredNotes = notesList
      .filter(
        (item) =>
          item.unitIdx === unitIdx && item.subjectIdx === subjectIdx
      )
      .map(
        (item) =>
          `Subject: ${item.unitIdx}-${item.subjectIdx}\nNote: ${item.note}\n\n`
      )
      .join("");

    if (!filteredNotes) {
      alert("No notes available for download.");
      return;
    }

    const blob = new Blob([filteredNotes], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `notes-unit-${unitIdx}-subject-${subjectIdx}.txt`; // Naming file based on unit and subject
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };


  const getCurrentPath = () => {
    if (!selectedTopic || !expandedTopic) return null;
    const [unitIdx, subjectIdx] = expandedTopic.split("-").map(Number);

    const subject = AtalBihari2?.[subjectIdx];
    const unit = subject?.units?.[unitIdx];
    const topics = unit?.topics || [];
    let topicIndex = topics.indexOf(selectedTopic);
    // if (topicIndex === -1) {
    //   topicIndex = topics.findIndex(
    //     (t) => t.label === selectedTopic.label && t.type === selectedTopic.type
    //   );
    // }
    // if (topicIndex === -1) return null;

    return { subjectIdx, unitIdx, topicIndex };
  };

  // Get the next topic path across (topic → unit → subject → semester)
  const getNextPath = (path) => {
    if (!path) return null;
    const { subjectIdx, unitIdx, topicIndex } = path;


    const subjects = AtalBihari2 || [];
    // const {  } = path;

    // Same unit → next topic
    const units = subjects?.[subjectIdx]?.units || [];
    const topics = units?.[unitIdx]?.topics || [];
    if (topicIndex + 1 < topics.length) {
      return {

        subjectIdx,
        unitIdx,
        topicIndex: topicIndex + 1,
      };
    }

    // Next unit (same subject)
    // for (let u = unitIndex + 1; u < units.length; u++) {
    //   const tps = units[u]?.topics || [];
    //   if (tps.length) {
    //     return { semesterIndex, subjectIndex, unitIndex: u, topicIndex: 0 };
    //   }
    // }

    // Next subject (same semester)
    // for (let s = subjectIndex + 1; s < subjects.length; s++) {
    //   const u2 = subjects[s]?.units || [];
    //   for (let u = 0; u < u2.length; u++) {
    //     const tps = u2[u]?.topics || [];
    //     if (tps.length) {
    //       return {
    //         semesterIndex,
    //         subjectIndex: s,
    //         unitIndex: u,
    //         topicIndex: 0,
    //       };
    //     }
    //   }
    // }

    // (Optional) Next semester
    // for (let sem = semesterIndex + 1; sem < semesters.length; sem++) {
    //   const subjArr = semesters[sem]?.subjects || [];
    //   for (let s = 0; s < subjArr.length; s++) {
    //     const uArr = subjArr[s]?.units || [];
    //     for (let u = 0; u < uArr.length; u++) {
    //       const tps = uArr[u]?.topics || [];
    //       if (tps.length) {
    //         return {
    //           semesterIndex: sem,
    //           subjectIndex: s,
    //           unitIndex: u,
    //           topicIndex: 0,
    //         };
    //       }
    //     }
    //   }
    // }

    return null; // nothing next
  };

  // Jumps to that path and updates UI
  const goToPath = (path) => {
    if (!path) return;

    const { subjectIdx, unitIdx, topicIndex } = path;
    const topic =
      AtalBihari2?.[subjectIdx]?.units?.[unitIdx]?.topics?.[topicIndex];
    if (!topic) return;
    // Expand the correct subject & unit
    setExpandedSubject(subjectIdx);
    setExpandedTopic(`${unitIdx}-${subjectIdx}`);

    // Select & render it on the left
    setSelectedTopic(topic);

    // Bring player into view
    requestAnimationFrame(() => {
      mediaRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const handleCompleteAndContinue = () => {
    const curr = getCurrentPath();
    if (!curr) return;
    // tick the current topic
    const currKey = makeKey(
      curr.subjectIdx,
      curr.unitIdx,
      curr.topicIndex
    );
    setCompleted((prev) =>
      prev.includes(currKey) ? prev : [...prev, currKey]
    );

    // then move to next
    const next = getNextPath(curr);
    if (next) {
      goToPath(next);
    }
  };

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
                    background: "#5E72E4", color: "white", border: "none",
                  }}
                  onClick={handleCompleteAndContinue}
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
                    <h2 className="fw-bold text-dark mb-1">
                      आधारभूत स्वास्थ्य संरक्षण
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
                  height: "60dvh",
                  overflow: "auto",
                  overscrollBehavior: "auto",
                  WebkitOverflowScrolling: "touch",
                  minHeight: 0,
                  touchAction: "pan-y",
                  scrollbarWidth: "thin",
                  scrollbarGutter: "stable",
                }}
              >
                {AtalBihari2.map((subject, subjectIdx) => {
                  return (
                    <div key={subjectIdx} className="mb-3 rounded-3" style={{
                      backgroundColor: "#fff",
                      border:
                        expandedSubject === subjectIdx
                          ? "2px solid #0d6efd"
                          : "1px solid #dee2e6",
                      maxHeight:
                        expandedSubject === subjectIdx ? "none" : "80px",
                      transition:
                        "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      overflowY: "hidden",
                    }}>
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
                          onClick={() => toggleSubject(subjectIdx)}
                        >
                          <strong>{subject.subjectName}</strong>
                          <div className="d-flex align-items-center gap-1 text-muted small">
                            <MdOutlineTimer size={14} />
                            <span>2:30</span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={() => toggleSubject(subjectIdx)}
                          >
                            {expandedSubject === subjectIdx ? (
                              <IoIosArrowUp />
                            ) : (
                              <IoIosArrowDown />
                            )}
                          </span>
                        </div>
                      </div>
                      {expandedSubject === subjectIdx && (
                        subject.units.map((unit, unitIdx) => {
                          return (<div key={unitIdx}
                            style={{
                              padding: "0.5rem",
                              margin: "0 1rem",
                            }}>
                            <div style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}>
                              <strong
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  toggleTopic(unitIdx, subjectIdx)
                                }
                              >
                                <span style={{ opacity: 0.8 }}>
                                  {unit.unitNumber}:
                                </span>
                                {unit.unitTitle}
                              </strong>
                              <div className="d-flex align-items-center gap-2">
                                <div
                                  style={{
                                    backgroundColor:
                                      comment ===
                                        `${unitIdx}-${subjectIdx}`
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
                                      toggleComment(unitIdx, subjectIdx)
                                    }
                                  />
                                </div>
                                <div
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    toggleNote(unitIdx, subjectIdx)
                                  }
                                >

                                  {note ===
                                    `${unitIdx}-${subjectIdx}` ? (
                                    <RiPencilFill size={20} />
                                  ) : (
                                    <RiPencilLine size={20} />
                                  )}
                                </div>
                                <span
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    toggleTopic(unitIdx, subjectIdx)
                                  }
                                >

                                  {expandedTopic ===
                                    `${unitIdx}-${subjectIdx}` ? (
                                    <IoIosArrowUp />
                                  ) : (
                                    <IoIosArrowDown />
                                  )}
                                </span>
                              </div>
                            </div>
                            {comment === `${unitIdx}-${subjectIdx}` && (
                              <div
                                style={{
                                  // padding: "0 1rem 1rem",
                                  marginTop: "1rem",
                                }}
                              >
                                <span
                                  className="crossIcon"
                                  onClick={() => {
                                    setComment(
                                      (prevIndex) =>
                                        prevIndex ===
                                        `${unitIdx}-${subjectIdx}` &&
                                        null
                                    );
                                  }}
                                >
                                  <ImCross size={12} color="red" />
                                </span>
                                <textarea
                                  className="form-control"
                                  placeholder="Add your comment here..."
                                  rows={1}
                                  value={inputComment}
                                  onChange={(e) =>
                                    setInputComment(e.target.value)
                                  }
                                />
                                <button
                                  className="btn btn-sm btn-primary mt-2 mb-2"
                                  onClick={() =>
                                    handleCommentSubmit(
                                      unitIdx,
                                      subjectIdx
                                    )
                                  }
                                >
                                  Submit
                                </button>
                                {/* Separator Line */}

                                <ul className="list-group list-group-flush mt-2">
                                  {/* Display submitted comments */}
                                  {commentsList
                                    .filter(
                                      (item) =>
                                        item.unitIdx === unitIdx &&
                                        item.subjectIdx === subjectIdx
                                    )
                                    .map((item, cmtIndx) => (
                                      <li
                                        key={cmtIndx}
                                        className="list-group-item py-2 px-2 small"
                                        style={{
                                          border: "1px solid lightgray",
                                          borderRadius: "5px",
                                          marginBottom: "0.5rem",
                                        }}
                                      >
                                        {/* Top row with user & date */}
                                        <div className="d-flex justify-content-between align-items-center mb-1">
                                          <span
                                            style={{
                                              fontSize: "0.75rem",
                                              fontWeight: 600,
                                              color: "#007bff",
                                            }}
                                          >
                                            {"Taha Ali"}
                                          </span>
                                          <span
                                            style={{
                                              fontSize: "0.60rem",
                                              color: "#6c757d",
                                              display: "flex",
                                              flexDirection: "column", // makes date & time stack
                                              lineHeight: "1.2",
                                            }}
                                          >
                                            <span>
                                              {new Date().toLocaleDateString(
                                                "en-IN",
                                                { dateStyle: "medium" }
                                              )}
                                            </span>
                                            <span>
                                              {new Date().toLocaleTimeString(
                                                "en-IN",
                                                { timeStyle: "medium" }
                                              )}
                                            </span>
                                          </span>
                                        </div>
                                        <div
                                          style={{
                                            fontSize: "1.0rem",
                                            fontWeight: 500,
                                          }}
                                        >
                                          {item.comment}
                                        </div>
                                        <span
                                          className="btn btn-link text-primary p-0"
                                          style={{
                                            fontSize: "0.75rem",
                                            lineHeight: "1",
                                            marginTop: "2px",
                                            marginLeft: "10px",
                                          }}
                                          onClick={() =>
                                            setActiveReplyId((prev) =>
                                              prev === cmtIndx
                                                ? null
                                                : cmtIndx
                                            )
                                          }
                                        >
                                          Reply (
                                          {
                                            replyList.filter(
                                              (reply) =>
                                                reply.commentIndex ===
                                                cmtIndx
                                            ).length
                                          }
                                          )
                                        </span>
                                        {activeReplyId === cmtIndx && (
                                          <>
                                            <textarea
                                              className="form-control form-control-sm mt-2"
                                              rows={1}
                                              placeholder="Write your reply..."
                                              value={inputReply}
                                              onChange={(e) =>
                                                setInputReply(
                                                  e.target.value
                                                )
                                              }
                                            />
                                            <div className="d-flex justify-content-end mt-2">
                                              <Button
                                                size="sm"
                                                color="success"
                                                onClick={() =>
                                                  handleReply(
                                                    unitIdx,
                                                    subjectIdx,
                                                    cmtIndx
                                                  )
                                                }
                                              >
                                                Reply
                                              </Button>
                                            </div>
                                          </>
                                        )}

                                        {replyList
                                          .filter(
                                            (reply) =>
                                              reply.unitIdx ===
                                              unitIdx &&
                                              reply.subjectIdx ===
                                              subjectIdx &&
                                              reply.commentIndex === cmtIndx
                                          )
                                          .map((reply, index) => (
                                            <div
                                              key={index}
                                              style={{
                                                paddingLeft: "20px",
                                              }}
                                            >
                                              <span
                                                style={{
                                                  fontSize: "0.85rem",
                                                }}
                                              >
                                                {reply.reply}
                                              </span>
                                            </div>
                                          ))}
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            )}
                            {note === `${unitIdx}-${subjectIdx}` && (
                              <div>
                                <span
                                  className="crossIcon"
                                  onClick={() => {
                                    setNote(
                                      (prevIndex) =>
                                        prevIndex ===
                                        `${unitIdx}-${subjectIdx}` &&
                                        null
                                    );
                                  }}
                                >
                                  <ImCross size={12} color="red" />
                                </span>
                                <textarea
                                  className="form-control"
                                  placeholder="Add your notes here..."
                                  rows={2}
                                  value={inputNote}
                                  onChange={(e) =>
                                    setInputNote(e.target.value)
                                  }
                                />
                                <button
                                  className="btn btn-sm btn-primary mt-2 mb-2"
                                  onClick={() =>
                                    handleAddNote(unitIdx, subjectIdx)
                                  }
                                >
                                  Add Note
                                  {/* <FaDownload /> */}
                                </button>
                                <ul className="list-group list-group-flush mt-2">
                                  {/* Display submitted comments */}
                                  {notesList
                                    .filter(
                                      (item) =>
                                        item.unitIdx === unitIdx &&
                                        item.subjectIdx === subjectIdx
                                    )
                                    .map((item, index) => (
                                      <li
                                        key={index}
                                        className="list-group-item py-2 px-2 small"
                                        style={{
                                          border: "1px solid lightgray",
                                          borderRadius: "5px",
                                          marginBottom: "0.5rem",
                                        }}
                                      >
                                        {/* Top row with user & date */}
                                        <div
                                          style={{
                                            display: "flex",
                                            justifyContent: "space-between", // pushes date/time to right
                                            alignItems: "flex-start",
                                          }}
                                        >
                                          {/* Left: Note text */}
                                          <span
                                            style={{ fontSize: "1.0rem", fontWeight: 500, }}
                                          >
                                            {item.note}
                                          </span>

                                          {/* Right: Date & time stacked */}
                                          <span
                                            style={{
                                              fontSize: "0.65rem",
                                              color: "#6c757d",
                                              display: "flex",
                                              flexDirection: "column",
                                              textAlign: "right",
                                              lineHeight: "1.2",
                                              minWidth: "70px", // keeps alignment neat
                                            }}
                                          >
                                            <span>
                                              {new Date().toLocaleDateString(
                                                "en-IN",
                                                { dateStyle: "medium" }
                                              )}
                                            </span>
                                            <span>
                                              {new Date().toLocaleTimeString(
                                                "en-IN",
                                                { timeStyle: "short" }
                                              )}
                                            </span>
                                          </span>
                                        </div>
                                      </li>
                                    ))}
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "flex-end",
                                    }}
                                  >
                                    <button
                                      className="btn btn-sm btn-primary mt-2 mb-2"
                                      onClick={() =>
                                        handleDownloadNotesForUnit(
                                          unitIdx,
                                          subjectIdx
                                        )
                                      }
                                    >
                                      <FaDownload />
                                    </button>
                                  </div>
                                </ul>
                              </div>
                            )}
                            {expandedTopic ===
                              `${unitIdx}-${subjectIdx}` && // Dynamic topic rendering
                              unit.topics?.map((topic, topicIndex) => {
                                let icon;
                                switch (topic.type) {
                                  case "youtube":
                                    icon = <FaYoutube color="#ff0000" />;
                                    break;
                                  case "video":
                                    icon = <FaVideo color="black" />;
                                    break;
                                  case "pdf":
                                    icon = <FaFilePdf color="#e63946" />;
                                    break;
                                  case "image":
                                    icon = <FaImage color="#16a34a" />;
                                    break;
                                  case "ppt":
                                    icon = (
                                      <FaFilePowerpoint color="#16a34a" />
                                    );
                                    break;
                                  case "text":
                                    icon = <FaFileAlt color="#16a34a" />;
                                    break;

                                  case "link":
                                    icon = <FaLink color="#f97316" />;
                                    break;
                                }
                                return (
                                  <div
                                    key={topicIndex}
                                    style={{
                                      cursor: "pointer",
                                      padding: "0.5rem 1rem",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <div
                                      onClick={() => {
                                        setMediaLoading(true); setSelectedTopic(topic);
                                        mediaRef.current?.scrollIntoView({
                                          behavior: "smooth",
                                          block: "start",
                                        });
                                      }}
                                      style={{
                                        gap: "0.5rem",
                                      }}
                                    >

                                      {icon}
                                      <strong style={{ marginLeft: "0.5rem" }}>

                                        {topic.label}</strong>
                                    </div>
                                    {

                                      completed.includes(
                                        makeKey(
                                          subjectIdx,
                                          unitIdx,
                                          topicIndex
                                        )
                                      ) && (
                                        <div>

                                          <FaCheckCircle color="green" />
                                        </div>
                                      )
                                    }

                                  </div>
                                );
                              })}

                          </div>
                          )
                        }
                        ))}
                    </div>
                  )
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
