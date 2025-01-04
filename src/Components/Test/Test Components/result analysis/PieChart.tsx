import React, { useState, useEffect, memo } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"));

interface PieChartProps {
  subjectsData: {
    [key: string]: { totalQuestions: number; positiveMarksCount: number };
  };
}

const PieChart: React.FC<PieChartProps> = memo(({ subjectsData }) => {
  const [flatSeries, setFlatSeries] = useState<number[]>([]);
  const [totalPositiveMarks, setTotalPositiveMarks] = useState<number>(0);
  const [totalNegativeMarks, setTotalNegativeMarks] = useState<number>(0);
  const [totalNotAnswered, setTotalNotAnswered] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const calculateMarks = () => {
    const subjects = Object.keys(subjectsData);

    if (subjects.length === 0) {
      setFlatSeries([0, 0, 0]);
      setTotalPositiveMarks(0);
      setTotalNegativeMarks(0);
      setTotalNotAnswered(0);
      setLoading(false);
      return;
    }

    const positiveMarks = subjects.map(
      (subject) => subjectsData[subject].positiveMarksCount || 0
    );

    const totalNegativeMarksData = subjects.reduce((acc, subject) => {
      const positiveMarks = subjectsData[subject].positiveMarksCount || 0;
      const negativeMarks =
        (subjectsData[subject].totalQuestions || 0) - positiveMarks;
      return acc + Math.max(negativeMarks, 0);
    }, 0);

    const totalNotAnsweredData = subjects.reduce((acc, subject) => {
      const totalQuestions = subjectsData[subject].totalQuestions || 0;
      const positiveMarks = subjectsData[subject].positiveMarksCount || 0;
      const negativeMarks = Math.max(totalQuestions - positiveMarks, 0);
      return (
        acc + Math.max(totalQuestions - (positiveMarks + negativeMarks), 0)
      );
    }, 0);

    const flatSeriesData = [
      positiveMarks.reduce((acc, curr) => acc + curr, 0),
      totalNegativeMarksData,
      totalNotAnsweredData,
    ];

    setFlatSeries(flatSeriesData);
    setTotalPositiveMarks(flatSeriesData[0]);
    setTotalNegativeMarks(flatSeriesData[1]);
    setTotalNotAnswered(flatSeriesData[2]);
    setLoading(false);
  };

  useEffect(() => {
    calculateMarks();
    return () => {
      setFlatSeries([]);
      setTotalPositiveMarks(0);
      setTotalNegativeMarks(0);
      setTotalNotAnswered(0);
    };
  }, [subjectsData]);

  const options = {
    chart: { type: "donut" as "donut" },
    labels: ["Total Positive Marks", "Total Negative Marks", "Not Answered"],
    title: {
      text: "Overall Analysis (Positive, Negative, Not Answered)",
      align: "center" as "center",
      style: { fontSize: "16px", fontWeight: "bold" },
    },
    legend: { position: "bottom" as "bottom" },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
        },
      },
    },
  };

  if (loading || !Array.isArray(flatSeries) || flatSeries.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        width: "40%",
        maxWidth: "400px",
      }}
    >
      <Chart options={options} series={flatSeries} type="donut" height={400} />
      {/* <div className="text-center">
        <p>Total Positive Marks: {totalPositiveMarks}</p>
        <p>Total Negative Marks: {totalNegativeMarks}</p>
        <p>Total Not Answered: {totalNotAnswered}</p>
      </div> */}
    </div>
  );
});

export default memo(PieChart);
