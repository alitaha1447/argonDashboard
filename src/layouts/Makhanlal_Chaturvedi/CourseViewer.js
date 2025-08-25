import "layouts/courseViewer/CourseViewer.css";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { MdOutlineZoomOutMap, MdOutlineZoomInMap } from "react-icons/md";


// import { BCA } from "DummyData";
import { BCA2 } from "DummyData";
import { useResizeDetector } from "react-resize-detector";

// import { course } from "DummyData";
import { Tooltip } from 'react-tooltip'
import { isMobile } from 'react-device-detect';
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
  const navigate = useNavigate();
  const mediaRef = useRef(null);
  const { width, height, ref } = useResizeDetector();
  const [textHtml1, setTextHtml1] = useState("");
  const [user, setUser] = useState(false);
  //   ----------------------------------------------------------------------------
  // const [expandBCACourse, setExpandBCACourse] = useState(null);
  // const [expandedBCASubject, setExpandedBCASubject] = useState({}); // { [courseIndex]: subjectIdx|null }
  // 1) Flatten to subjects
  // const allSubjects = BCA.flatMap((course) => course.subjects);
  // 2) Local state for expanding a subject
  const [expandedSubject, setExpandedSubject] = useState(null);
  const [expandedMedia, setExpandedMedia] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [expandedTopic, setExpandedTopic] = useState(null); // Dynamic expansion state for topics
  const [comment, setComment] = useState(null);
  const [inputComment, setInputComment] = useState("");
  const [commentsList, setCommentsList] = useState([]); // New state to store comments

  const [note, setNote] = useState(null);
  const [inputNote, setInputNote] = useState("");
  const [notesList, setNotesList] = useState([]); // New state to store comments
  const [inputReply, setInputReply] = useState("");
  const [replyList, setReplyList] = useState([]); // New state to store comments
  // const [courses, setCourses] = useState(BCA);
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [completed, setCompleted] = useState([]);
  const makeKey = (subj, unit, topic) => `${subj}-${unit}-${topic}`;
  // const makeKey = (subjectIndex, unitIndex, topicIndex) => {
  //   return `${subjectIndex + 1}-${unitIndex + 1}-${topicIndex + 1}`;
  // };

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [fullText, setFullText] = useState("");
  const [progress, setProgress] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const truncateText = (text, maxLength = 50) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  let totalTopics = 0;
  BCA2.forEach(subject => {
    subject.units.forEach(unit => {
      totalTopics += unit.topics.length;
    });
  });

  const docs = [
    {
      uri: require("assets/files/BCA.pdf"),
      fileType: "pdf",
      fileName: "Sample-PPT-File-500kb.ppt",
    },
  ];
  const docs2 = [
    {
      uri: require("assets/files/BCA.pdf"),
      fileType: "pdf",
      fileName: "Miracle Infoserv.pdf",
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

  // async function onDocumentLoadSuccess({ numPages }) {
  //   setNumPages(numPages);
  //   let fullText = '';
  //   let textAccumulator = "";
  //   // Extract text from each page
  //   for (let i = 1; i <= numPages; i++) {
  //     const pdf = await pdfjs.getDocument(`${process.env.PUBLIC_URL}/introduction_to_the_human_body.pdf`).promise;
  //     const page = await pdf.getPage(i);
  //     const textContent = await page.getTextContent();
  //     const text = textContent.items.map(item => item.str).join(' ');
  //     textAccumulator += text + " ";
  //     console.log(`Text from page ${i}:`, text);
  //   }
  //   setFullText(textAccumulator);
  // }

  useEffect(() => {
    if (selectedTopic?.type === "text" && selectedTopic.file) {
      const fetchTextFile = async () => {
        try {
          const response = await fetch(`${process.env.PUBLIC_URL}/assets/txt/${selectedTopic.file}`);
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

  async function onDocumentLoadSuccess(pdf) {
    setNumPages(pdf.numPages);

    let textAccumulator = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const text = textContent.items.map((it) => it.str).join(" ");
      textAccumulator += text + " ";
      // console.log(`Text from page ${i}:`, text);
    }
    setFullText(textAccumulator.trim());
  }



  // Chunk helper (avoid very long utterances)
  function chunkText(text, size = 1600) {
    const chunks = [];
    let i = 0;
    while (i < text.length) {
      chunks.push(text.slice(i, i + size));
      i += size;
    }
    return chunks;
  }

  function speakText() {
    if (!("speechSynthesis" in window)) {
      console.warn("Text-to-speech not supported.");
      return;
    }
    if (!fullText) {
      console.warn("No text available yet.");
      return;
    }

    // Stop anything already speaking
    window.speechSynthesis.cancel();

    const chunks = chunkText(fullText);
    setIsSpeaking(true);

    // Queue chunks sequentially
    chunks.forEach((part, idx) => {
      const u = new SpeechSynthesisUtterance(part);
      // Set language if needed, e.g.: u.lang = "en-IN" or "hi-IN"
      // u.rate = 1; u.pitch = 1;

      if (idx === chunks.length - 1) {
        u.onend = () => setIsSpeaking(false);
        u.onerror = () => setIsSpeaking(false);
      }
      window.speechSynthesis.speak(u);
    });
  }

  function stopSpeech() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }

  const speakText1 = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // stop any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);

      // Detect language: Hindi uses Unicode range \u0900–\u097F
      const isHindi = /[\u0900-\u097F]/.test(text);

      utterance.lang = isHindi ? "hi-IN" : "en-IN"; // choose automatically
      // utterance.lang = "en-IN";
      // utterance.lang = 'hi-IN'; // Hindi voice
      utterance.rate = 1;       // adjust speed if needed
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Your browser does not support the Web Speech API.');
    }
  };


  const stopSpeech1 = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

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
            src={selectedTopic.imageUrl}
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
          // <DocViewer documents={docs2} pluginRenderers={DocViewerRenderers} />

          <div
            ref={ref}
            style={{
              width: "100%",
              height: "100%",
              overflowY: "scroll",
              position: "relative",
            }}
          >
            <button onClick={speakText} disabled={isSpeaking || !fullText}>Play</button>
            <button onClick={stopSpeech} disabled={!isSpeaking}>Stop</button>


            <button
              onClick={() => {
                setIsFullscreen(true);
                setSelectedPdf(
                  `${process.env.PUBLIC_URL}/assets/pdf/${selectedTopic.pdf}`
                );
              }}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                zIndex: 10,
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              <MdOutlineZoomOutMap />
            </button>

            <Document
              file={`${process.env.PUBLIC_URL}/assets/pdf/${selectedTopic.pdf}`}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} width={width} />
              ))}
            </Document>

            {/* <div style={{ marginTop: 20 }}>
              <button onClick={speakText} disabled={isSpeaking || !fullText}>
                Play
              </button>
              <button onClick={stopSpeech} disabled={!isSpeaking}>
                Stop
              </button>
            </div> */}
            {/* <div style={{ margin: "20px" }}>
                   <button onClick={extractAndSpeakText} disabled={isSpeaking}>
                     {isSpeaking ? "Speaking..." : "Read PDF"}
                   </button>
                   {isSpeaking && (
                     <button onClick={stopSpeaking} style={{ marginLeft: "10px" }}>
                       Stop
                     </button>
                   )}
                 </div> */}
          </div>
        );

      case "pptx":
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
            <button
              onClick={() => speakText1(textHtml1.replace(/<[^>]+>/g, ""))}
              style={{ margin: "10px", padding: "6px 12px", cursor: "pointer" }}
            >
              🔊
            </button>
            <button
              onClick={stopSpeech1}
              style={{ margin: "10px", padding: "6px 12px", cursor: "pointer" }}
            >
              ⏹
            </button>
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

  const toggleSubject = (i) =>
    setExpandedSubject(expandedSubject === i ? null : i);

  const toggleTopic = (unitIndex, subjectIndex) => {
    const topicKey = `${unitIndex}-${subjectIndex}`;
    setExpandedTopic(expandedTopic === topicKey ? null : topicKey);
  };

  const toggleComment = (unitIndex, subjectIndex) => {
    const commentKey = `${unitIndex}-${subjectIndex}`;
    setComment((prev) => (prev === commentKey ? null : commentKey));
  };

  const toggleNote = (unitIndex, subjectIndex) => {
    const noteKey = `${unitIndex}-${subjectIndex}`;
    setNote((prev) => (prev === noteKey ? null : noteKey));
  };

  const handleCommentSubmit = (unitIndex, subjectIndex) => {
    const newComment = inputComment; // Get the current comment
    if (newComment.trim()) {
      // Add the comment to the list
      setCommentsList((prevComments) => [
        ...prevComments,
        { unitIndex, subjectIndex, comment: newComment },
      ]);
      setInputComment(""); // Reset the input field
    }
  };

  // Handle reply submission
  const handleReply = (unitIndex, subjectIndex, commentIndex) => {
    const newReply = inputReply;
    if (newReply.trim()) {
      const updatedReplies = [...replyList];
      updatedReplies.push({
        unitIndex,
        subjectIndex,
        commentIndex,
        reply: newReply,
      });
      setReplyList(updatedReplies);
      setInputReply(""); // Reset the reply input field
      setActiveReplyId(null); // Hide the reply input after submission
    }
  };

  const handleAddNote = (unitIndex, subjectIndex) => {
    const newNote = inputNote; // Get the current comment
    if (newNote.trim()) {
      // Add the comment to the list
      setNotesList((prevNotes) => [
        ...prevNotes,
        { unitIndex, subjectIndex, note: newNote },
      ]);
      setInputNote(""); // Reset the input field
    }
  };

  // Handle downloading all notes as a text file
  const handleDownloadNotesForUnit = (unitIndex, subjectIndex) => {
    // Collect notes only for the current unit and subject
    const filteredNotes = notesList
      .filter(
        (item) =>
          item.unitIndex === unitIndex && item.subjectIndex === subjectIndex
      )
      .map(
        (item) =>
          `Subject: ${item.unitIndex}-${item.subjectIndex}\nNote: ${item.note}\n\n`
      )
      .join(""); // Join all notes into one string

    // If there are no notes, show an alert
    if (!filteredNotes) {
      alert("No notes available for download.");
      return;
    }

    // Create a Blob from the filtered notes text
    const blob = new Blob([filteredNotes], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    // Create an anchor element to trigger the download
    const link = document.createElement("a");
    link.href = url;
    link.download = `notes-unit-${unitIndex}-subject-${subjectIndex}.txt`; // Naming file based on unit and subject
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Revoke the URL after the download is triggered
    URL.revokeObjectURL(url);
  };

  // Find current indices from your existing expandedTopic "unitIndex-subjectIndex"
  const getCurrentPath = () => {
    if (!selectedTopic || !expandedTopic) return null;

    const [unitIndex, subjectIndex] = expandedTopic.split("-").map(Number);

    // Assuming Semester-1 in your current UI
    // const semesterIndex = 0;
    // const semester = BCA?.[semesterIndex];
    // const subject = semester?.subjects?.[subjectIndex];
    const subject = BCA2?.[subjectIndex];
    const unit = subject?.units?.[unitIndex];
    const topics = unit?.topics || [];
    // Try strict object match first, then a safe fallback (label+type)
    let topicIndex = topics.indexOf(selectedTopic);
    // if (topicIndex === -1) {
    //   topicIndex = topics.findIndex(
    //     (t) => t.label === selectedTopic.label && t.type === selectedTopic.type
    //   );
    // }
    // if (topicIndex === -1) return null;

    return { subjectIndex, unitIndex, topicIndex };
  };

  // Get the next topic path across (topic → unit → subject → semester)
  const getNextPath = (path) => {
    if (!path) return null;
    const { subjectIndex, unitIndex, topicIndex } = path;
    // const semesters = BCA;
    // const semester = semesters?.[semesterIndex];
    // if (!semester) return null;

    const subjects = BCA2 || [];
    // const {  } = path;

    // Same unit → next topic
    const units = subjects?.[subjectIndex]?.units || [];
    const topics = units?.[unitIndex]?.topics || [];
    if (topicIndex + 1 < topics.length) {
      return {
        // semesterIndex,
        subjectIndex,
        unitIndex,
        topicIndex: topicIndex + 1,
      };
    }

    // Next unit (same subject)
    for (let u = unitIndex + 1; u < units.length; u++) {
      const tps = units[u]?.topics || [];
      if (tps.length) {
        return { subjectIndex, unitIndex: u, topicIndex: 0 };
      }
    }

    // Next subject (same semester)
    for (let s = subjectIndex + 1; s < subjects.length; s++) {
      const u2 = subjects[s]?.units || [];
      for (let u = 0; u < u2.length; u++) {
        const tps = u2[u]?.topics || [];
        if (tps.length) {
          return {
            subjectIndex: s,
            unitIndex: u,
            topicIndex: 0,
          };
        }
      }
    }

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

    const { subjectIndex, unitIndex, topicIndex } = path;
    // const topic =
    //   BCA?.[semesterIndex]?.subjects?.[subjectIndex]?.units?.[unitIndex]
    //     ?.topics?.[topicIndex];
    const topic =
      BCA2?.[subjectIndex]?.units?.[unitIndex]?.topics?.[topicIndex];


    if (!topic) return;

    // Expand the correct subject & unit
    setExpandedSubject(subjectIndex);
    setExpandedTopic(`${unitIndex}-${subjectIndex}`);

    // Select & render it on the left
    setSelectedTopic(topic);

    // Bring player into view
    requestAnimationFrame(() => {
      mediaRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  // BUTTON: Complete & Continue → always move to next topic
  const handleCompleteAndContinue = () => {
    const curr = getCurrentPath();
    if (!curr) return;
    // tick the current topic
    const currKey = makeKey(
      // curr.semesterIndex,
      curr.subjectIndex,
      curr.unitIndex,
      curr.topicIndex
    );
    // setCompleted((prev) =>
    //   prev.includes(currKey) ? prev : [...prev, currKey]
    // );
    setCompleted((prev) => {
      if (prev.includes(currKey)) return prev; // already completed

      const updated = [...prev, currKey];
      // ✅ Calculate progress
      const completedCount = updated.length;
      // const remaining = totalTopics - completedCount;
      const percentage = ((completedCount / totalTopics) * 100).toFixed(2);
      setProgress(percentage)



      return updated;
    });

    // then move to next
    const next = getNextPath(curr);
    if (next) {
      goToPath(next);
    }
  };

  useEffect(() => {
    if (!BCA2?.length) return;

    const subjectIdx = 0; // first subject
    const unitIdx = 0;    // first unit of first subject
    const topicIndex = 0; // first topic of first unit

    const topic = BCA2[subjectIdx]?.units?.[unitIdx]?.topics?.[topicIndex];
    if (!topic) return;

    setExpandedSubject(subjectIdx);
    setExpandedTopic(`${unitIdx}-${subjectIdx}`);
    setSelectedTopic(topic);

    // Scroll player into view if needed
    requestAnimationFrame(() => {
      mediaRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [])

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
                <div className="d-flex gap-2 flex-nowrap">

                  <Button
                    className="btn btn-primary custom-btn"
                    style={{
                      background: "#5E72E4", color: "white", border: "none",
                    }}
                    onClick={() => navigate(-1)}

                  >
                    Go Back
                  </Button>
                  <Button
                    className="btn btn-primary custom-btn"
                    style={{
                      background: "#5E72E4", color: "white", border: "none",
                    }}
                    onClick={handleCompleteAndContinue}
                  >
                    Complete & Continue
                  </Button>
                </div>
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
                      B.COM. (Computer Applications)
                    </h2>
                    {/* <div className="">
                      <span
                        style={{
                          fontWeight: "bold",
                          fontSize: "0.95rem",
                          color: "#333",
                        }}
                      >
                        Semester - 1
                      </span>
                    </div> */}

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
                    {`${progress}% Completed`}

                  </span>
                </div>

                <Progress value={progress} />
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


                {
                  BCA2.map((subject, subjectIndex) => {
                    return (
                      <div
                        key={subjectIndex}
                        className="mb-3 rounded-3"
                        style={{
                          backgroundColor: "#fff",
                          // border: isExpanded
                          border:
                            expandedSubject === subjectIndex
                              ? "2px solid #0d6efd"
                              : "1px solid #dee2e6",
                          maxHeight:
                            expandedSubject === subjectIndex ? "none" : "auto",
                          transition:
                            "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                          overflowY: "hidden",
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
                            onClick={() => toggleSubject(subjectIndex)}
                          >
                            <strong data-tooltip-id="tooltip"
                              data-tooltip-content={subject.subjectName}>{truncateText(subject.subjectName)}</strong>
                            <div className="d-flex align-items-center gap-1 text-muted small">
                              <MdOutlineTimer size={14} />
                              <span>2:30</span>
                            </div>
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            <span
                              style={{ cursor: "pointer" }}
                              onClick={() => toggleSubject(subjectIndex)}
                            >
                              {expandedSubject === subjectIndex ? (
                                <IoIosArrowUp />
                              ) : (
                                <IoIosArrowDown />
                              )}
                            </span>
                          </div>
                        </div>
                        {expandedSubject === subjectIndex &&
                          subject?.units.map((unit, unitIndex) => {
                            // const isExpanded = expandedSubject === unitIndex;
                            return (
                              <div
                                key={unitIndex}
                                style={{
                                  padding: "0.5rem",
                                  margin: "0 1rem",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}
                                >
                                  <strong
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                      toggleTopic(unitIndex, subjectIndex)
                                    }
                                    data-tooltip-id="tooltip"
                                    data-tooltip-content={unit.unitTitle}
                                  >
                                    <span style={{ opacity: 0.8 }}>
                                      {unit.unitNumber}:
                                    </span>
                                    {truncateText(unit.unitTitle)}
                                  </strong>
                                  <div className="d-flex align-items-center gap-2">
                                    <div
                                      style={{
                                        backgroundColor:
                                          comment ===
                                            `${unitIndex}-${subjectIndex}`
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
                                          toggleComment(unitIndex, subjectIndex)
                                        }
                                      />
                                    </div>
                                    <div
                                      style={{ cursor: "pointer" }}
                                      data-tooltip-id="tooltip"
                                      data-tooltip-content="Add Note"
                                      onClick={() =>
                                        toggleNote(unitIndex, subjectIndex)
                                      }
                                    >
                                      {note ===
                                        `${unitIndex}-${subjectIndex}` ? (
                                        <RiPencilFill size={20} />
                                      ) : (
                                        <RiPencilLine size={20} />
                                      )}
                                    </div>
                                    <span
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        toggleTopic(unitIndex, subjectIndex)
                                      }
                                    >
                                      {expandedTopic ===
                                        `${unitIndex}-${subjectIndex}` ? (
                                        <IoIosArrowUp />
                                      ) : (
                                        <IoIosArrowDown />
                                      )}
                                    </span>
                                  </div>
                                </div>
                                {comment === `${unitIndex}-${subjectIndex}` && (
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
                                            `${unitIndex}-${subjectIndex}` &&
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
                                          unitIndex,
                                          subjectIndex
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
                                            item.unitIndex === unitIndex &&
                                            item.subjectIndex === subjectIndex
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
                                                        unitIndex,
                                                        subjectIndex,
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
                                                  reply.unitIndex ===
                                                  unitIndex &&
                                                  reply.subjectIndex ===
                                                  subjectIndex &&
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
                                          // <div
                                          //   key={index}
                                          //   style={{
                                          //     padding: "0.5rem 0",
                                          //   }}
                                          // >
                                          //   <p
                                          //     style={{
                                          //       fontSize: "0.9rem", // Smaller text for the comments
                                          //       margin: 0, // Removes extra margin around the paragraph
                                          //       color: "#555", // Sets a darker grey color for the comment text
                                          //     }}
                                          //   >
                                          //     {item.comment}
                                          //   </p>
                                          // </div>
                                        ))}
                                    </ul>
                                  </div>
                                )}
                                {note === `${unitIndex}-${subjectIndex}` && (
                                  <div
                                    style={
                                      {
                                        // padding: "0 1rem 1rem",
                                        // marginTop: "1rem",
                                      }
                                    }
                                  >
                                    <span
                                      className="crossIcon"
                                      onClick={() => {
                                        setNote(
                                          (prevIndex) =>
                                            prevIndex ===
                                            `${unitIndex}-${subjectIndex}` &&
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
                                        handleAddNote(unitIndex, subjectIndex)
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
                                            item.unitIndex === unitIndex &&
                                            item.subjectIndex === subjectIndex
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
                                              unitIndex,
                                              subjectIndex
                                            )
                                          }
                                        >
                                          <FaDownload />
                                        </button>
                                      </div>
                                    </ul>
                                  </div>
                                )}
                                {/* Show Topics under each Unit */}
                                {expandedTopic ===
                                  `${unitIndex}-${subjectIndex}` && // Dynamic topic rendering
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
                                        icon = <FaImage color="#2196F3" />;
                                        break;
                                      case "ppt":
                                        icon = (
                                          <FaFilePowerpoint color="#FF9800" />
                                        );
                                        break;
                                      case "text":
                                        icon = <FaFileAlt color="#4CAF50" />;
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
                                            // setMediaLoading(true);
                                            setSelectedTopic(topic);
                                            mediaRef.current?.scrollIntoView({
                                              behavior: "smooth",
                                              block: "start",
                                            });
                                          }}
                                          style={{
                                            // display: "flex",
                                            gap: "0.5rem",
                                          }}
                                        >
                                          {/* Icon on the left - you can replace this with your actual icon component */}
                                          <span style={{ display: "flex", }}>
                                          </span>
                                          {icon}
                                          <strong data-tooltip-id="tooltip"
                                            data-tooltip-content={topic.label} style={{ marginLeft: "0.5rem" }}>

                                            {truncateText(topic.label)}</strong>
                                          <div className="d-flex align-items-center gap-1 text-muted small">
                                            {topic?.time && (
                                              <>
                                                <MdOutlineTimer size={14} />
                                                <span>{topic.time.trim()}</span>
                                              </>
                                            )}
                                          </div>
                                          {/* <strong>{topicIndex}</strong> */}
                                        </div>
                                        {
                                          completed.includes(
                                            makeKey(
                                              subjectIndex,
                                              unitIndex,
                                              topicIndex
                                            )
                                          ) && (
                                            <div>

                                              <FaCheckCircle color="green" />
                                            </div>
                                          )
                                        }
                                        {/* <input
                                          type="checkbox"
                                          checked={completed.includes(
                                            makeKey(
                                              0,
                                              subjectIndex,
                                              unitIndex,
                                              topicIndex
                                            )
                                          )}
                                          onChange={() => {
                                            const key = makeKey(0, subjectIndex, unitIndex, topicIndex);
                                            setCompleted((prev) => {
                                              if (prev.includes(key)) {
                                                // If already checked, uncheck it
                                                return prev.filter((item) => item !== key);
                                              } else {
                                                // Otherwise, mark it as completed
                                                return [...prev, key];
                                              }
                                            });
                                          }}
                                          style={{ marginLeft: "1rem" }}
                                        /> */}
                                      </div>
                                    );
                                  })}
                              </div>
                            );
                          })}
                      </div>
                    );
                  })
                }


              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Tooltip
        id="tooltip"
        place="bottom"
        effect="solid"
        events={isMobile ? ["click"] : ["hover"]}
        style={{
          fontSize: "0.7rem",      // smaller text
          padding: "4px 8px",      // compact padding
          borderRadius: "4px",     // rounded corners
          backgroundColor: "#333", // dark bg
          color: "#fff",           // white text
          maxWidth: "180px",       // prevent very wide tooltip
          textAlign: "center"
        }}
      />
    </div>
  );
};

export default CourseViewer;
