import React from "react";
import ReactApexChart from "react-apexcharts";

interface GraphData {
  data: string;
  marks: string;
}

const GRAPHDATA: GraphData[] = [
  { data: "10-01-2025", marks: "75%" },
  { data: "9-01-2025", marks: "55%" },
  { data: "8-01-2025", marks: "80%" },
  { data: "7-01-2025", marks: "10%" },
];

const ProgressGraph: React.FC = () => {
  const categories = GRAPHDATA.map((item) => item.data);
  const marks = GRAPHDATA.map((item) => parseFloat(item.marks));

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      animations: {
        enabled: true,
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%", // Rounded bar ends for a sleek look
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories,
      title: {
        text: "Date",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          color: "#333",
        },
      },
    },
    yaxis: {
      title: {
        text: "Marks (%)",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          color: "#333",
        },
      },
    },
    fill: {
      colors: ["#1e90ff"], // Stylish blue gradient
      opacity: 0.8,
    },
    grid: {
      borderColor: "#e7e7e7",
      strokeDashArray: 4,
    },
    title: {
      text: "Progress Graph",
      align: "center",
      style: {
        fontSize: "18px",
        fontWeight: "bold",
        color: "#444",
      },
    },
    tooltip: {
      theme: "dark",
    },
  };

  const chartSeries = [
    {
      name: "Marks",
      data: marks,
    },
  ];

  return (
    <div className="progress-graph-container my-5">
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={350}
        width={700}
      />
    </div>
  );
};

export default ProgressGraph;
