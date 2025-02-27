import React, { useRef, useEffect, useState } from "react";
import "./video.css";

const CameraView: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (err) {
        setError(
          "Could not access the camera. Please allow camera permissions."
        );
        console.error(err);
      }
    };

    startCamera();

    // Cleanup: Stop the camera stream on unmount
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Proctor</h1>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <video
          ref={videoRef}
          style={{
            width: "100%",
            maxWidth: "600px",
            borderRadius: "8px",
            border: "2px solid #ddd",
          }}
          autoPlay
          muted
        />
      )}
    </div>
  );
};

export default CameraView;
