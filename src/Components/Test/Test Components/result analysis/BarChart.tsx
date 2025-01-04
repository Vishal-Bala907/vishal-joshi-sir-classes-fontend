import React, { useState, useEffect, memo } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"));
import AOS from "aos";
import "aos/dist/aos.css";

interface BarChartProps {
  subjectsData: {
    [key: string]: { totalQuestions: number; positiveMarksCount: number };
  };
}

const BarChart: React.FC<BarChartProps> = memo(({ subjectsData }) => {
  console.log(subjectsData);
  const [categories, setCategories] = useState<string[]>([]);
  const [series, setSeries] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const calculateSeries = () => {
    const subjects = Object.keys(subjectsData);

    if (subjects.length === 0) {
      setCategories([]);
      setSeries([]);
      setLoading(false);
      return;
    }

    // Prepare data for the bar chart
    const positiveCounts = subjects.map(
      (subject) => subjectsData[subject].positiveMarksCount || 0
    );

    const negativeCounts = subjects.map((subject) => {
      const positiveMarks = subjectsData[subject].positiveMarksCount || 0;
      const totalQuestions = subjectsData[subject].totalQuestions || 0;
      return Math.max(totalQuestions - positiveMarks, 0); // Avoid negative values
    });

    const notAnsweredCounts = subjects.map((subject) => {
      const totalQuestions = subjectsData[subject].totalQuestions || 0;
      const positiveMarks = subjectsData[subject].positiveMarksCount || 0;
      const negativeMarks = Math.max(totalQuestions - positiveMarks, 0);
      return Math.max(totalQuestions - (positiveMarks + negativeMarks), 0);
    });

    setCategories(subjects);
    setSeries([
      { name: "Positive Marks", data: positiveCounts },
      { name: "Negative Marks", data: negativeCounts },
      { name: "Not Answered", data: notAnsweredCounts },
    ]);
    setLoading(false);
  };

  useEffect(() => {
    calculateSeries();
    AOS.init();
    return () => {
      setCategories([]);
      setSeries([]);
    };
  }, [subjectsData]);

  const options = {
    chart: {
      type: "bar" as "bar",
    },
    xaxis: {
      categories,
      title: {
        text: "Subjects",
      },
    },
    yaxis: {
      title: {
        text: "Number of Questions",
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%", // Adjust column width for better spacing
        distributed: false, // Ensure bars are grouped together for each subject
      },
    },
    title: {
      text: "Subject Analysis (Positive, Negative, Not Answered)",
      align: "center" as "center",
      style: {
        fontSize: "16px",
        fontWeight: "bold",
      },
    },
    legend: {
      position: "bottom" as "bottom",
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  };

  if (loading || series.length === 0 || categories.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        width: "40%",
        minWidth: "400px",
      }}
    >
      <Chart options={options} series={series} type="bar" height={400} />
    </div>
  );
});

export default memo(BarChart);
