import React, { useEffect, useRef, useState } from "react";
import Human from "@vladmandic/human";

const HumanFaceDetection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const animationRef = useRef(null);
  const isDetectingRef = useRef(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [faceStatus, setFaceStatus] = useState(null); // 'real', 'fake', or null

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

  const openCamera = async () => {
    if (isCameraOn || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      // Load models if not already loaded
      if (!humanRef.current.initialized) {
        await humanRef.current.load();
      }

      // Get video stream
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      mediaStreamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await new Promise((resolve) => {
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play().then(resolve);
          };
        });
      }

      setIsCameraOn(true);
      isDetectingRef.current = true;
      detectVideo();
    } catch (err) {
      console.error("Error accessing webcam: ", err);
      setError(`Error: ${err.message}`);
      stopCamera();
    } finally {
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsCameraOn(false);
    isDetectingRef.current = false;
  };

  const detectVideo = async () => {
    if (!isDetectingRef.current || !videoRef.current || !canvasRef.current)
      return;

    try {
      const result = await humanRef.current.detect(videoRef.current);
      console.log(result);
      // Update canvas dimensions to match video
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;

      // Draw detections
      await humanRef.current.draw.all(canvasRef.current, result);

      // Continue detection loop
      animationRef.current = requestAnimationFrame(detectVideo);
    } catch (err) {
      console.error("Detection error:", err);
      setError("Detection error - check console");
      stopCamera();
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
      // if (humanRef.current) {
      //   humanRef.current.dispose();
      // }
    };
  }, []);

  return (
    <div>
      <div
        style={{
          position: "relative",
          width: "576px",
          height: "420px",
          overflow: "hidden",
          border: "2px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#f0f0f0",
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: isCameraOn ? "block" : "none",
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
          }}
        />
        {!isCameraOn && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#666",
            }}
          >
            Camera is off
          </div>
        )}
      </div>

      {error && <div style={{ color: "red", margin: "10px 0" }}>{error}</div>}

      <div style={{ marginTop: 10 }}>
        <button onClick={openCamera} disabled={isCameraOn || isLoading}>
          {isLoading ? "Loading..." : "Open Camera"}
        </button>
        <button
          onClick={stopCamera}
          style={{ marginLeft: 10, backgroundColor: "red", color: "white" }}
          disabled={!isCameraOn}
        >
          Stop Camera
        </button>
      </div>
    </div>
  );
};

export default HumanFaceDetection;
