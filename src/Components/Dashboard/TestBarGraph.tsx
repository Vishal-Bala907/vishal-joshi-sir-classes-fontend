import React from "react";
import ReactApexChart from "react-apexcharts";

const TestBarGraph: React.FC = () => {
  const series = [
    {
      name: "Marks Obtained",
      data: [98, 95, 92, 89, 87], // Replace with your test scores
    },
  ];

  const options = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
        columnWidth: "55%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        "Math Genius Test",
        "Physics Mastery",
        "Code Proficiency",
        "Chemistry Quiz",
        "History Challenge",
      ], // Replace with your test names
      labels: {
        style: {
          colors: "#ffffff", // White labels for modern look
        },
      },
    },
    yaxis: {
      title: {
        text: "Marks (%)",
        style: {
          color: "#ffffff",
        },
      },
      labels: {
        style: {
          colors: "#ffffff",
        },
      },
    },
    title: {
      text: "Test Scores",
      align: "center",
      style: {
        fontSize: "20px",
        color: "#ffffff",
      },
    },
    fill: {
      colors: ["#4a90e2"], // Stylish blue bars
      opacity: 0.9,
    },
    grid: {
      borderColor: "#444",
    },
    tooltip: {
      theme: "dark",
    },
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#1f1f2e",
        borderRadius: "10px",
      }}
    >
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default TestBarGraph;