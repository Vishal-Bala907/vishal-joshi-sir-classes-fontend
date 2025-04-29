import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts"; // Import ApexOptions type

const TestBarGraph: React.FC = () => {
  const series = [
    {
      name: "Marks Obtained",
      data: [98, 95, 92, 89, 87], // Replace with your test scores
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "bar", // Type is now correctly inferred as 'bar'
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
          colors: "#000000", // White labels for modern look
        },
      },
    },
    yaxis: {
      title: {
        text: "Marks (%)",
        style: {
          color: "#000000",
        },
      },
      labels: {
        style: {
          colors: "#000000",
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
        backgroundColor: "white",
        borderRadius: "10px",
        color: "black",
      }}
    >
      <ReactApexChart
        options={options}
        series={series}
        type="bar" // Ensure this matches the chart type in options
        height={350}
      />
    </div>
  );
};

export default TestBarGraph;
