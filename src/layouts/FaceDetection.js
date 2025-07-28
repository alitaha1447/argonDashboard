// import React, { useState, useRef, useEffect, useCallback } from "react";
// import * as faceapi from "face-api.js";
// import Webcam from "react-webcam";

// // 🔧 Resize image before processing
// const reduceImageSize = async (base64) => {
//   return new Promise((resolve) => {
//     const img = new Image();
//     img.src = base64;
//     img.onload = () => {
//       const canvas = document.createElement("canvas");
//       const MAX = 150;
//       let width = img.width;
//       let height = img.height;

//       if (width > height && width > MAX) {
//         height *= MAX / width;
//         width = MAX;
//       } else if (height > MAX) {
//         width *= MAX / height;
//         height = MAX;
//       }

//       canvas.width = width;
//       canvas.height = height;
//       const ctx = canvas.getContext("2d");
//       ctx.drawImage(img, 0, 0, width, height);
//       canvas.toBlob(
//         (blob) => {
//           const newImg = new Image();
//           newImg.src = URL.createObjectURL(blob);
//           resolve(newImg);
//         },
//         "image/jpeg",
//         0.7
//       );
//     };
//   });
// };

// const FaceDetection = () => {
//   const [image1, setImage1] = useState(null);
//   const [image2, setImage2] = useState(null);
//   const [isSamePerson, setIsSamePerson] = useState(null);
//   const [isCameraOpen, setIsCameraOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [modelsLoaded, setModelsLoaded] = useState(false);
//   const webcamRef = useRef(null);
//   const [processingTime, setProcessingTime] = useState(0);

//   // Load face-api models
//   useEffect(() => {
//     const MODEL_URL = process.env.PUBLIC_URL + "/models";
//     const loadModels = async () => {
//       try {
//         await Promise.all([
//           faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
//           faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
//           faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
//         ]);
//         setModelsLoaded(true);
//       } catch (error) {
//         console.error("Model loading error:", error);
//       }
//     };
//     loadModels();
//   }, []);

//   const captureImage = useCallback((setImage) => {
//     const screenshot = webcamRef.current.getScreenshot();
//     if (screenshot) {
//       setImage(screenshot);
//     }
//     setIsCameraOpen(false);
//   }, []);

//   const compareFaces = useCallback(async () => {
//     if (!image1 || !image2 || !modelsLoaded) return;

//     setIsLoading(true);
//     setProcessingTime(0);
//     setIsSamePerson(null);

//     const startTime = performance.now();
//     try {
//       const options = new faceapi.SsdMobilenetv1Options({ minConfidence: 0.5 });

//       const loadImageFromBase64 = (base64) =>
//         new Promise((resolve) => {
//           const img = new Image();
//           img.src = base64;
//           img.onload = () => resolve(img);
//         });

//       const [desc1, desc2] = await Promise.all(
//         [image1, image2].map(async (imgBase64) => {
//           const img = await loadImageFromBase64(imgBase64);
//           const detection = await faceapi
//             .detectSingleFace(img, options)
//             .withFaceLandmarks()
//             .withFaceDescriptor();
//           return detection?.descriptor || null;
//         })
//       );

//       if (!desc1 || !desc2) {
//         console.warn("One or both face descriptors are null");
//         setIsSamePerson(false);
//       } else {
//         const distance = faceapi.euclideanDistance(desc1, desc2);
//         console.log("Distance between faces:", distance);
//         setIsSamePerson(distance < 0.6); // more forgiving
//       }
//     } catch (err) {
//       console.error("Comparison error:", err);
//       setIsSamePerson(false);
//     } finally {
//       const endTime = performance.now();
//       const duration = ((endTime - startTime) / 1000).toFixed(1);
//       setProcessingTime(duration);
//       setIsLoading(false);
//     }
//   }, [image1, image2, modelsLoaded]);

//   return (
//     <div style={{ maxWidth: 640, margin: "0 auto" }}>
//       <div style={{ marginBottom: 20 }}>
//         <button
//           onClick={() => setIsCameraOpen(!isCameraOpen)}
//           disabled={isLoading}
//           style={{ marginRight: 10 }}
//         >
//           {isCameraOpen ? "Close Camera" : "Open Camera"}
//         </button>

//         {isCameraOpen && (
//           <div style={{ marginTop: 10 }}>
//             <Webcam
//               ref={webcamRef}
//               audio={false}
//               screenshotFormat="image/jpeg"
//               width={320}
//               height={240}
//               videoConstraints={{ facingMode: "user", width: 320, height: 240 }}
//             />
//             <div style={{ marginTop: 10 }}>
//               <button
//                 onClick={() => captureImage(setImage1)}
//                 disabled={isLoading}
//                 style={{ marginRight: 10 }}
//               >
//                 Capture First
//               </button>
//               <button
//                 onClick={() => captureImage(setImage2)}
//                 disabled={isLoading}
//               >
//                 Capture Second
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           marginBottom: 20,
//         }}
//       >
//         {image1 && (
//           <div>
//             <h3>First Image</h3>
//             <img
//               src={image1}
//               alt="1st"
//               style={{ width: 150, border: "2px solid #ccc" }}
//             />
//           </div>
//         )}
//         {image2 && (
//           <div>
//             <h3>Second Image</h3>
//             <img
//               src={image2}
//               alt="2nd"
//               style={{ width: 150, border: "2px solid #ccc" }}
//             />
//           </div>
//         )}
//       </div>

//       <button
//         onClick={compareFaces}
//         disabled={!image1 || !image2 || !modelsLoaded || isLoading}
//         style={{
//           padding: "10px 20px",
//           backgroundColor: "#4CAF50",
//           color: "#fff",
//           border: "none",
//           borderRadius: 4,
//         }}
//       >
//         {isLoading ? "Comparing..." : "Compare Faces"}
//       </button>

//       {/* 🌀 Spinner */}
//       {isLoading && (
//         <div style={{ marginTop: 20, textAlign: "center" }}>
//           <div
//             style={{
//               width: 40,
//               height: 40,
//               border: "5px solid #f3f3f3",
//               borderTop: "5px solid #4CAF50",
//               borderRadius: "50%",
//               animation: "spin 1s linear infinite",
//               margin: "0 auto",
//             }}
//           />
//           <p style={{ marginTop: 10 }}>Processing...</p>
//         </div>
//       )}

//       {/* 🎯 Result */}
//       {isSamePerson !== null && (
//         <div
//           style={{
//             marginTop: 20,
//             padding: 15,
//             borderRadius: 4,
//             color: isSamePerson ? "#3c763d" : "#a94442",
//             backgroundColor: isSamePerson ? "#dff0d8" : "#f2dede",
//             border: `1px solid ${isSamePerson ? "#d6e9c6" : "#ebccd1"}`,
//           }}
//         >
//           <h3>Result:</h3>
//           <p>{isSamePerson ? "✅ Same Person" : "❌ Different Person"}</p>
//         </div>
//       )}

//       {/* ⏱️ Time */}
//       {!isLoading && processingTime > 0 && (
//         <div style={{ marginTop: 20 }}>
//           <p>🕒 Total Processing Time: {processingTime}s</p>
//         </div>
//       )}

//       {/* Spinner Keyframes */}
//       <style>
//         {`
//           @keyframes spin {
//             0% { transform: rotate(0deg); }
//             100% { transform: rotate(360deg); }
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default FaceDetection;
