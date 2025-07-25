import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";

import * as faceapi from "face-api.js";

import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Col,
  Container,
  Row,
  Button,
} from "reactstrap";
import { useSelector } from "react-redux";

const campusLocation = {
  latitude: 23.231465316719643,
  longitude: 77.43552865061508,
};
// 23.231465316719643, 77.43552865061508;
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c * 1000;
  return distance;
};

const Attendance = () => {
  const { name, email, mobileno, selectedBranch, isorganisational } =
    useSelector((state) => state?.auth);
  const st = isorganisational ? "TAHA" : "Student";
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [referenceImage, setReferenceImage] = useState(null);

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [location, setLocation] = useState(null);
  const [attendanceStatus, setAttendanceStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isImageBlurred, setIsImageBlurred] = useState(false);

  const createImageFromBase64 = async (base64) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = base64;
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = reject;
    });
  };

  const compareFaces = async (base64A, base64B) => {
    const MODEL_URL = process.env.PUBLIC_URL + "/models";
    // Step 1: Load models

    await Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    ]);

    // Step 2: Convert base64 to image elements
    const img1 = await createImageFromBase64(base64A);
    const img2 = await createImageFromBase64(base64B);

    // Step 3: Get face descriptors
    const result1 = await faceapi
      .detectSingleFace(img1)
      .withFaceLandmarks()
      .withFaceDescriptor();

    const result2 = await faceapi
      .detectSingleFace(img2)
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!result1 || !result2) {
      return {
        match: false,
        reason: "Face not detected in one or both images.",
      };
    }

    // Step 4: Compare descriptors
    const distance = faceapi.euclideanDistance(
      result1.descriptor,
      result2.descriptor
    );

    const threshold = 0.6; // smaller is more strict
    return { match: distance < threshold, distance };
  };

  // Load face-api.js models
  // useEffect(() => {
  //   const loadModels = async () => {
  //     try {
  //
  //       // The models should be placed in the public folder of your React app
  //       const MODEL_URL = process.env.PUBLIC_URL + "/models";
  //       console.log(MODEL_URL);
  //       await Promise.all([
  //         faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
  //         faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
  //         faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
  //         faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
  //       ]);
  //       console.log("✅ Models loaded successfully");
  //       const face1 = document.getElementById("face");
  //       console.log(face1);
  //       let faceAIData = await faceapi
  //         .detectAllFaces(faceapi)
  //         .withFaceLandmarks()
  //         .withFaceDescriptors();
  //       // setModelsLoaded(true);
  //     } catch (error) {
  //       console.error("❌ Failed to load models", error);
  //       // setModelsLoaded(false);
  //     }
  //   };

  //   // loadModels();
  // }, []);
  // Function to get the current location of the user
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude });
          },
          (err) => {
            reject(err);
          }
        );
      } else {
        reject("Geolocation is not supported by this browser.");
      }
    });
  };

  // Function to handle image capture
  const handleImageCapture = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();

      localStorage.setItem("image", imageSrc);
      const x = localStorage.getItem("image");
      console.log(x);
      setImage(imageSrc);
      setReferenceImage(imageSrc);
      setIsCameraOpen(false);

      setIsLoading(true);
      setIsImageBlurred(true);

      // try {
      //   const currentLocation = await getCurrentLocation();

      //   const distance = calculateDistance(
      //     currentLocation.latitude,
      //     currentLocation.longitude,
      //     campusLocation.latitude,
      //     campusLocation.longitude
      //   );

      //   if (distance <= 50) {
      //     setAttendanceStatus("Attendance Done");
      //   } else {
      //     setAttendanceStatus("Out of Campus Range");
      //   }
      // } catch (error) {
      //   console.error("Error getting location:", error);
      //   setAttendanceStatus("Error retrieving location");
      // }

      setIsLoading(false);
      setIsImageBlurred(false);
    }
  };

  // Function to cancel the camera and reset the state
  const handleCancel = () => {
    setIsCameraOpen(false);
    setImage(null);
    // setLocation(null);
    setAttendanceStatus(null);
    setIsLoading(false);
    setIsImageBlurred(false);
  };

  return (
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
                      <strong>Name:</strong>{" "}
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

                    {isCameraOpen ? (
                      <>
                        <div
                          style={{
                            position: "relative",
                            filter: isImageBlurred ? "blur(8px)" : "none",
                          }}
                        >
                          <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            width="100%"
                            videoConstraints={{ facingMode: "user" }}
                            style={{ maxWidth: "100%" }}
                          />
                        </div>
                        <Button
                          color="primary"
                          block
                          onClick={handleImageCapture}
                        >
                          Capture Image
                        </Button>
                        <Button
                          color="danger"
                          block
                          onClick={handleCancel}
                          className="mt-2"
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button
                        className="mb-2"
                        color="primary"
                        block
                        onClick={() => setIsCameraOpen(true)}
                      >
                        Attendance
                      </Button>
                    )}

                    {image && (
                      <div style={{ position: "relative" }}>
                        <img
                          src={image}
                          alt="Captured"
                          style={{
                            width: "100%",
                            filter: isImageBlurred ? "blur(8px)" : "none",
                            opacity: isImageBlurred ? 0.4 : 1,
                            pointerEvents: isImageBlurred ? "none" : "auto",
                          }}
                        />

                        {isLoading && (
                          <div
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              textAlign: "center",
                              zIndex: 10,
                            }}
                          >
                            <div
                              className="spinner-border text-primary"
                              role="status"
                            >
                              <span className="sr-only">Loading...</span>
                            </div>
                            <p style={{ color: "white", marginTop: "10px" }}>
                              Processing...
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {attendanceStatus && (
                      <div className="mt-3">
                        <h5 className="mb-1">Attendance Status:</h5>
                        <p>{attendanceStatus}</p>
                      </div>
                    )}
                  </CardBody>
                </Card>
              </Col>
            ) : (
              <Col lg={4}>
                <Card className="card-stats md-4 mb-xl-0">
                  <CardBody>
                    <CardTitle tag="h2" className="text-primary">
                      Batch 1
                    </CardTitle>

                    <CardText className="mb-xl-0">
                      <strong>Name:</strong> Taha
                    </CardText>
                    <CardText className="">
                      <strong>Age:</strong> 25
                    </CardText>

                    {isCameraOpen ? (
                      <>
                        <div
                          style={{
                            position: "relative",
                            filter: isImageBlurred ? "blur(8px)" : "none",
                          }}
                        >
                          <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            width="100%"
                            videoConstraints={{
                              facingMode: "user",
                            }}
                          />
                        </div>
                        <Button
                          color="primary"
                          block
                          onClick={handleImageCapture}
                        >
                          Capture Image
                        </Button>
                        <Button
                          color="danger"
                          block
                          onClick={handleCancel}
                          style={{ marginTop: "10px" }}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button
                        className="mb-2"
                        color="primary"
                        block
                        onClick={() => setIsCameraOpen(true)}
                      >
                        Attendance
                      </Button>
                    )}

                    {image && (
                      <div style={{ position: "relative" }}>
                        <img
                          src={image}
                          alt="Captured"
                          style={{
                            width: "100%",
                            filter: isImageBlurred ? "blur(8px)" : "none",
                            opacity: isImageBlurred ? 0.4 : 1,
                            pointerEvents: isImageBlurred ? "none" : "auto", // disables interaction
                          }}
                        />

                        {isLoading && (
                          <div
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              textAlign: "center",
                              zIndex: 10,
                            }}
                          >
                            <div
                              className="spinner-border text-primary"
                              role="status"
                            >
                              <span className="sr-only">Loading...</span>
                            </div>
                            <p style={{ color: "white", marginTop: "10px" }}>
                              Processing...
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {attendanceStatus && (
                      <div>
                        <h5>Attendance Status:</h5>
                        <p>{attendanceStatus}</p>
                      </div>
                    )}
                  </CardBody>
                </Card>
              </Col>
            )}
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Attendance;
