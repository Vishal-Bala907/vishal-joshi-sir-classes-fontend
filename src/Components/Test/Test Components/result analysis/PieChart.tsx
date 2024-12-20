import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface PieChartProps {
  subjectsData: {
    [key: string]: { totalQuestions: number; positiveMarksCount: number };
  };
}

const PieChart: React.FC<PieChartProps> = ({ subjectsData }) => {
  const [series, setSeries] = useState<number[]>([]);
  const [flatSeries, setFlatSeries] = useState<number[]>([]);
  const [totalPositiveMarks, setTotalPositiveMarks] = useState<number>(0);
  const [totalNegativeMarks, setTotalNegativeMarks] = useState<number>(0);

  // Function to calculate series and total marks
  const calculateMarks = () => {
    const subjects = Object.keys(subjectsData);

    // Prepare the series for the donut chart with positive marks count for each subject
    const seriesData = subjects.map(
      (subject) => subjectsData[subject].positiveMarksCount
    );

    // Sum up the total number of negative marks across all subjects
    const totalNegativeMarksData = subjects.reduce((acc, subject) => {
      const positiveMarks = subjectsData[subject].positiveMarksCount;
      const negativeMarks =
        subjectsData[subject].totalQuestions - positiveMarks;
      return acc + negativeMarks;
    }, 0);

    // Prepare flatSeries (positive marks and negative marks)
    const flatSeriesData = [...seriesData, totalNegativeMarksData];

    // Sum up the total positive marks across all subjects
    const totalPositiveMarksData = seriesData.reduce(
      (acc, curr) => acc + curr,
      0
    );

    // Update state with calculated values
    setSeries(seriesData);
    setFlatSeries(flatSeriesData);
    setTotalPositiveMarks(totalPositiveMarksData);
    setTotalNegativeMarks(totalNegativeMarksData);
  };

  // Calculate marks when component mounts or when subjectsData changes
  useEffect(() => {
    calculateMarks();

    // Cleanup function to reset data when the component unmounts
    return () => {
      setSeries([]);
      setFlatSeries([]);
      setTotalPositiveMarks(0);
      setTotalNegativeMarks(0);
    };
  }, [subjectsData]); // Recalculate when subjectsData changes

  // Prepare options for the donut chart
  const options = {
    chart: {
      type: "donut" as "donut", // Donut chart type
    },
    labels: ["Total Positive Marks", "Total Negative Marks"], // Include labels for positive and negative marks
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
