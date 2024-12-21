import React, { useState, useEffect, memo } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"));

interface PieChartProps {
  subjectsData: {
    [key: string]: { totalQuestions: number; positiveMarksCount: number };
  };
}

const PieChart: React.FC<PieChartProps> = memo(({ subjectsData }) => {
  console.log(subjectsData);

  const [series, setSeries] = useState<number[]>([]);
  const [flatSeries, setFlatSeries] = useState<number[]>([]);
  const [totalPositiveMarks, setTotalPositiveMarks] = useState<number>(0);
  const [totalNegativeMarks, setTotalNegativeMarks] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  // Function to calculate series and total marks
  const calculateMarks = () => {
    const subjects = Object.keys(subjectsData);

    if (subjects.length === 0) {
      // Handle case where there are no subjects
      setSeries([0]);
      setFlatSeries([0]);
      setTotalPositiveMarks(0);
      setTotalNegativeMarks(0);
      setLoading(false);
      return;
    }

    // Prepare the series for the donut chart with positive marks count for each subject
    const seriesData = subjects.map(
      (subject) => subjectsData[subject].positiveMarksCount || 0
    );

    // Sum up the total number of negative marks across all subjects
    const totalNegativeMarksData = subjects.reduce((acc, subject) => {
      const positiveMarks = subjectsData[subject].positiveMarksCount || 0;
      const negativeMarks =
        (subjectsData[subject].totalQuestions || 0) - positiveMarks;
      return acc + Math.max(negativeMarks, 0); // Avoid negative values
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
    setLoading(false);
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

  // Add check to ensure the flatSeries array is not empty or undefined before rendering
  if (loading || !Array.isArray(flatSeries) || flatSeries.length === 0) {
    return <div>Loading...</div>;
  }

  // Check if the series data is valid before passing to the chart
  if (flatSeries.some((item) => item === undefined || isNaN(item))) {
    console.error("Invalid data in flatSeries:", flatSeries);
    return <div>Error loading chart. Invalid data.</div>;
  }

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
});

export default memo(PieChart);
