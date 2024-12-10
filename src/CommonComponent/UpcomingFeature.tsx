import React from "react";

const UpcomingFeature = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f8ff", // Light background color
        padding: "20px",
        borderRadius: "10px",
        border: "2px dashed #4CAF50", // Dashed border to highlight
        width: "300px",
        margin: "20px auto",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2
        style={{
          fontSize: "20px",
          color: "#4CAF50", // Green text for emphasis
          marginBottom: "10px",
        }}
      >
        🚧 Upcoming Feature 🚧
      </h2>
      <p
        style={{
          fontSize: "16px",
          color: "#555", // Dark gray text for description
        }}
      >
        This feature is under development and will be available soon!
      </p>
    </div>
  );
};

export default UpcomingFeature;
