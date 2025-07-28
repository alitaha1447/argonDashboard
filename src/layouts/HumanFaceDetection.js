import React, { useEffect, useRef, useState } from "react";
import Human from "@vladmandic/human";
import Webcam from "react-webcam";

const human = new Human({
  modelBasePath: "https://vladmandic.github.io/human/models",
  face: { enabled: true },
});

const HumanFaceDetection = () => {
  const webcamRef = useRef(null);
  const [webcamOn, setWebcamOn] = useState(true);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      await human.load();
      await human.warmup();
    };
    loadModels();
  }, []);

  const captureImage = (setImage) => {
    if (webcamRef.current) {
      const screenshot = webcamRef.current.getScreenshot();
      const image = new Image();
      image.src = screenshot;

      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0);
        setImage(canvas);
        setWebcamOn(false); // stop webcam after capture
      };
    }
  };

  const calculateCosineSimilarity = (vec1, vec2) => {
    const dotProduct = vec1.reduce((acc, val, i) => acc + val * vec2[i], 0);
    const mag1 = Math.sqrt(vec1.reduce((acc, val) => acc + val * val, 0));
    const mag2 = Math.sqrt(vec2.reduce((acc, val) => acc + val * val, 0));
    return dotProduct / (mag1 * mag2);
  };

  const compareFaces = async () => {
    if (!image1 || !image2) {
      setResult("❌ Please capture both images first.");
      return;
    }

    setLoading(true);
    setResult(null);

    const face1 = await human.detect(image1);
    const face2 = await human.detect(image2);

    if (face1.face.length === 0 || face2.face.length === 0) {
      setResult("❌ Face not detected in one or both images.");
      setLoading(false);
      return;
    }

    const descriptor1 = face1.face[0].embedding;
    const descriptor2 = face2.face[0].embedding;
    const similarity = calculateCosineSimilarity(descriptor1, descriptor2);

    setResult(
      similarity > 0.6
        ? `✅ Same person (Similarity: ${similarity.toFixed(2)})`
        : `❌ Different person (Similarity: ${similarity.toFixed(2)})`
    );
    setLoading(false);
  };

  return (
    <div>
      {webcamOn && (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={640}
          height={480}
        />
      )}

      <div style={{ marginTop: "10px" }}>
        <button onClick={() => captureImage(setImage1)}>Capture Image 1</button>
        <button
          onClick={() => {
            setWebcamOn(true); // reopen webcam for 2nd capture
            setTimeout(() => captureImage(setImage2), 300); // wait for webcam to initialize
          }}
        >
          Capture Image 2
        </button>
        <button onClick={compareFaces} disabled={loading}>
          {loading ? "Comparing..." : "Compare"}
        </button>
      </div>

      {loading && <p>🔄 Processing...</p>}
      {result && <p>{result}</p>}

      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        {image1 && <img src={image1.toDataURL()} alt="Image 1" width="200" />}
        {image2 && <img src={image2.toDataURL()} alt="Image 2" width="200" />}
      </div>
    </div>
  );
};

export default HumanFaceDetection;
