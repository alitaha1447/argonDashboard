import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import EXIF from "exif-js";
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

// Campus location (latitude, longitude)
const campusLocation = {
  latitude: 23.231465316719643,
  longitude: 77.43552865061508,
};
// 23.231465316719643, 77.43552865061508;
// Function to calculate distance between two geographical points using Haversine formula
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  // console.log(`Current --> ${lat1}`);
  // console.log(`Current --> ${lon1}`);
  // console.log(`Campus --> ${lat2}`);
  // console.log(`Campus --> ${lon2}`);
  const R = 6371; // Radius of the Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180; // Convert degrees to radians
  const dLon = ((lon2 - lon1) * Math.PI) / 180; // Convert degrees to radians

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c * 1000; // Distance in meters
  return distance;
};

const Attendance = () => {
  const { name, email, mobileno, selectedBranch, isorganisational } =
    useSelector((state) => state?.auth);
  console.log(isorganisational);
  const st = isorganisational ? "TAHA" : "Student";
  console.log(st);
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [location, setLocation] = useState(null);
  const [attendanceStatus, setAttendanceStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // State for loading spinner
  const [isImageBlurred, setIsImageBlurred] = useState(false); // State to control image blur

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
      console.log(webcamRef.current);
      const imageSrc = webcamRef.current.getScreenshot();
      // console.log(imageSrc);
      setImage(imageSrc);
      setIsCameraOpen(false);

      // Show loader and blur the image while processing
      setIsLoading(true);
      setIsImageBlurred(true); // Apply the blur effect

      try {
        // Get the current location (latitude and longitude)
        const currentLocation = await getCurrentLocation();
        // setLocation(currentLocation); // Set the location in state
        // console.log("Current Location:", currentLocation);

        const distance = calculateDistance(
          currentLocation.latitude,
          currentLocation.longitude,
          campusLocation.latitude,
          campusLocation.longitude
        );
        // console.log("Distance from campus:", distance, "meters");

        // Check if the distance is within a certain threshold (e.g., 50 meters)
        if (distance <= 50) {
          setAttendanceStatus("Attendance Done");
        } else {
          setAttendanceStatus("Out of Campus Range");
        }
      } catch (error) {
        console.error("Error getting location:", error);
        setAttendanceStatus("Error retrieving location");
      }

      // Hide the loader and remove blur after processing
      setIsLoading(false);
      setIsImageBlurred(false);
      //   setTimeout(() => {
      //     setImage(false);
      //   }, [9000]);
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
