import React from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface PieChartProps {
  subjectsData: {
    [key: string]: { totalQuestions: number; positiveMarksCount: number };
  };
}

const PieChart: React.FC<PieChartProps> = ({ subjectsData }) => {
  // Extract subject names
  const subjects = Object.keys(subjectsData);

  // Prepare the series for the donut chart with positive marks count for each subject
  const series = subjects.map(
    (subject) => subjectsData[subject].positiveMarksCount
  );

  // Sum up the total number of negative marks across all subjects
  const totalNegativeMarks = subjects.reduce((acc, subject) => {
    const positiveMarks = subjectsData[subject].positiveMarksCount;
    const negativeMarks = subjectsData[subject].totalQuestions - positiveMarks;
    return acc + negativeMarks;
  }, 0);

  // Prepare options for the donut chart
  const options = {
    chart: {
      type: "donut" as "donut", // Donut chart type
    },
    labels: [...subjects, "Total Negative Marks"], // Include "Total Negative Marks" label
    title: {
      text: "Subject Analysis (Positive vs Negative Marks)",
      align: "center" as "center",
      style: {
        fontSize: "16px",
        fontWeight: "bold",
      },
    },
    legend: {
      position: "bottom" as "bottom", // Position the legend below
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%", // Adjust the size of the donut chart
        },
      },
    },
  };

  // Add the total negative marks as a single data point in the series
  const flatSeries = [...series, totalNegativeMarks];

  // Sum up the total positive marks across all subjects
  const totalPositiveMarks = series.reduce((acc, curr) => acc + curr, 0);

  return (
    <div>
      <Chart
        options={options}
        series={flatSeries} // Series with positive marks for each subject and total negative marks
        type="donut"
        height={400}
      />
      <div className="text-center">
        <p>Total Positive Marks Across All Subjects: {totalPositiveMarks}</p>
        <p>Total Negative Marks Across All Subjects: {totalNegativeMarks}</p>
      </div>
    </div>
  );
};

export default PieChart;
