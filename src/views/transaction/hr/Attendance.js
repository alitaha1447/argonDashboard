import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Col,
  Container,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { useSelector } from "react-redux";
import axios from "axios";
import Human from "@vladmandic/human";
import { toast, ToastContainer } from "react-toastify";

const API_PATH = process.env.REACT_APP_API_PATH;
const API_KEY = process.env.REACT_APP_API_KEY;

const Attendance = () => {
  const { name, email, mobileno, selectedBranch, isorganisational } =
    useSelector((state) => state?.auth);
  // console.log(selectedBranch?.value);
  const [studentBatch, setStudentBatch] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(null);
  const isDetectingRef = useRef(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const human = useRef(null);
  const animationRef = useRef(null);
  const streamRef = useRef(null);

  // Initialize Human once
  const humanRef = useRef(
    new Human({
      modelBasePath: "https://vladmandic.github.io/human/models",
      face: { enabled: true },
      backend: "webgl",
      webgl: {
        context: "webgl",
        extensions: ["OES_texture_float", "OES_standard_derivatives"],
      },
      debug: true,
    })
  );

  useEffect(() => {
    const fetchStudentBatch = async () => {
      try {
        const res = await axios.get(`${API_PATH}/api/Get_Student_Batch`, {
          params: {
            APIKEY: API_KEY,
            studentid: 2559,
          },
        });
        // console.log(res);
        setStudentBatch(res?.data);
      } catch (err) {
        console.error("Error fetching student batch:", err);
      }
    };
    fetchStudentBatch();
  }, []);

  const formattedDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = String(d.getFullYear());

    return `${year}-${month}-${day}`;
  };

  const date = formattedDate(new Date());

  const handleAttended = async () => {
    const attendedData = {
      userid: 2559,
      batchid: studentBatch,
      attendance_date: date,
      ispresent: 1,
      laitudet: "23.23148503457796",
      longitude: "77.43552865054997",
      isapprove: 1,
      branchid: selectedBranch?.value,
    };
    // console.log(attendedData);
    try {
      const res = await axios.post(`${API_PATH}/api/Attendance`, attendedData, {
        params: {
          APIKEY: API_KEY,
        },
      });
      console.log(res?.data);
      toast("Attendace Done!!!");
    } catch (err) {
      console.error("Error fetching student batch:", err);
    }
  };

  const openCamera = async () => {
    setModal(true);

    try {
      if (!humanRef.current.initialized) {
        await humanRef.current.load();
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        mediaStreamRef.current = stream; // Store the stream
        await new Promise((resolve) => {
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play().then(resolve);
          };
        });
      }

      isDetectingRef.current = true;
      detectFaces(); // ✅ Start face detection loop
    } catch (err) {
      console.error("Camera error:", err);
      setError("Could not access camera. Please check permissions.");
      closeCamera();
    }
  };

  const detectFaces = async () => {
    console.log("Starting detection...");
    setIsProcessing(true); // Show loader here
    if (!isDetectingRef.current || !videoRef.current || !canvasRef.current)
      return;

    try {
      const result = await humanRef.current.detect(videoRef.current);

      // Check for person detection
      if (Array.isArray(result.body) && result.body.length > 0) {
        const firstPerson = result.body[0];
        if (firstPerson.score >= 0.6) {
          handleAttended();
          toast("Person detected successfully ✅");
          setIsProcessing(false); // Hide loader
          closeCamera();

          return; // Exit the function
        }
      }

      // Resize canvas and draw
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      await humanRef.current.draw.all(canvasRef.current, result);
      // Continue loop
      animationRef.current = requestAnimationFrame(detectFaces);
    } catch (err) {
      console.error("Detection error:", err);
      setError("Face detection failed");
      setIsProcessing(false); // Hide loader on error
    }
  };

  const closeCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    // Stop detection loop
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    // Stop camera stream
    // if (streamRef.current) {
    //   streamRef.current.getTracks().forEach((track) => track.stop());
    //   streamRef.current = null;
    // }

    // Clear video element
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setModal(false);
    isDetectingRef.current = false;
  };

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            <Row>
              {isorganisational === 1 ? (
                <Col lg={4} md={6} className="mb-4">
                  <Card className="h-100">
                    <CardBody>
                      <CardTitle tag="h2" className="text-primary fs-4">
                        Employee
                      </CardTitle>
                      <CardText className="mb-2">
                        <strong>Name:</strong>
                        <span className="text-break">{name}</span>
                      </CardText>
                      <CardText className="mb-2">
                        <strong className="me-1">Email:</strong>
                        <span className="text-break">{email}</span>
                      </CardText>
                      <CardText className="mb-2">
                        <strong>Contact No.:</strong>{" "}
                        <span className="text-break">{mobileno}</span>
                      </CardText>
                      <CardText className="mb-3">
                        <strong>Branch:</strong> {selectedBranch?.label}
                      </CardText>
                      <Button onClick={openCamera}>Attendance</Button>
                    </CardBody>
                  </Card>
                </Col>
              ) : (
                studentBatch.map((item, index) => (
                  <Col lg={4} key={index}>
                    <Card className="card-stats md-4 mb-xl-0">
                      <CardBody>
                        <CardTitle tag="h2" className="text-primary">
                          Batch {index + 1}
                        </CardTitle>
                        <CardText className="mb-xl-0">
                          <strong>Batch Name:</strong> {item.BatchName}
                        </CardText>
                        <CardText className="mb-xl-0">
                          <strong>Description:</strong> {item.Description}
                        </CardText>
                        <CardText className="">
                          <strong>Date:</strong> {item.StartDate}
                        </CardText>
                        <Button color="primary" onClick={openCamera}>
                          Attendance
                        </Button>
                      </CardBody>
                    </Card>
                  </Col>
                ))
              )}
            </Row>
          </div>
        </Container>
      </div>

      <Modal isOpen={modal} toggle={closeCamera} centered size="md">
        <ModalHeader toggle={closeCamera}>Take Attendance</ModalHeader>
        <ModalBody className="text-center">
          {error && <div className="alert alert-danger">{error}</div>}

          <div style={{ position: "relative", width: "100%", height: "400px" }}>
            {isProcessing && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 10,
                  color: "white",
                  background: "rgba(0,0,0,0.6)",
                  padding: "20px 30px",
                  borderRadius: "8px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div className="loader-spinner"></div>
                Detecting...
              </div>
            )}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                backgroundColor: "#000",
                transform: "scaleX(-1)", // Mirror the video
              }}
            />
            <canvas
              ref={canvasRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
              }}
            />
          </div>

          <div className="mt-3">
            <Button color="primary" className="me-3">
              Capture
            </Button>
            <Button color="secondary" onClick={closeCamera}>
              Close
            </Button>
          </div>
        </ModalBody>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default Attendance;
