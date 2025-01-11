import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const StudySessionsGraph: React.FC = () => {
  const series = [
    {
      name: "Time Spent (hours)",
      data: [5, 4, 6, 7, 3, 8], // Replace with your session durations
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "bar", // Correct type
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
        columnWidth: "45%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        "Session 1",
        "Session 2",
        "Session 3",
        "Session 4",
        "Session 5",
        "Session 6",
      ], // Replace with your session labels
      labels: {
        style: {
          colors: "#ffffff",
        },
      },
    },
    yaxis: {
      title: {
        text: "Time (hours)",
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
      text: "Study Sessions Time",
      align: "center",
      style: {
        fontSize: "20px",
        color: "#ffffff",
      },
    },
    fill: {
      colors: ["#00c9a7"], // Futuristic green bars
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
        type="bar" // Ensure this matches the chart type
        height={350}
      />
    </div>
  );
};

export default StudySessionsGraph;
