import React from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface PieChartProps {
  subject: string;
  totalQuestions: number; // Total size of the subject array
  positiveMarksCount: number; // Count of positive marks
}

const SubjectAnalysis: React.FC<PieChartProps> = ({
  subject,
  totalQuestions,
  positiveMarksCount,
}) => {
  const options = {
    chart: {
      type: "donut" as "donut", // Specify chart type
    },
    labels: ["Accuracy", "InAcurracy"], // Chart labels
    title: {
      text: `${subject} Analysis`, // Add subject name to the chart title
      align: "center" as "center", // Set alignment explicitly
      style: {
        fontSize: "14px",
        fontWeight: "bold",
      },
    },
    legend: {
      position: "bottom" as "bottom", // Position legend below the chart
    },
  };

  const series = [
    positiveMarksCount, // Data series for positive marks count
    totalQuestions - positiveMarksCount, // Remaining questions
  ];

  return (
    <div>
      <Chart options={options} series={series} type="donut" height={250} />
      <p className="text-center">{subject}</p>
    </div>
  );
};

export default SubjectAnalysis;
