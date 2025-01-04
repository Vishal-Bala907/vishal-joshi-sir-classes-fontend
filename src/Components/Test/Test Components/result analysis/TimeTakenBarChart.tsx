import React, { useState, useEffect, memo } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"));
import AOS from "aos";
import "aos/dist/aos.css";

interface TimeTakenBarChartProps {
  subjectsData: {
    [key: string]: {
      totalTime: number;
    };
  };
}

const TimeTakenBarChart: React.FC<TimeTakenBarChartProps> = ({
  subjectsData,
}) => {
  console.log(subjectsData);
  const [categories, setCategories] = useState<string[]>([]);
  const [series, setSeries] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const calculateTotalTime = () => {
    const subjects = Object.keys(subjectsData);
    const totalTimeInMs = subjects.map(
      (subject) => subjectsData[subject].totalTime
    );

    // Convert milliseconds to seconds (or minutes)
    const totalTimeInSecs = totalTimeInMs.map((time) => time / 1000); // Convert to seconds

    setCategories(subjects);
    setSeries([{ name: "Total Time (seconds)", data: totalTimeInSecs }]);
    setLoading(false);
  };

  useEffect(() => {
    calculateTotalTime();
    AOS.init();
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
        text: "Total Time (Seconds)",
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%", // Bar width
        distributed: true,
      },
    },
    title: {
      text: "Total Time Taken by Subject",
      align: "center" as "center",
      style: {
        fontSize: "16px",
        fontWeight: "bold",
      },
    },
    legend: {
      position: "bottom" as "bottom",
    },
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        width: "40%",
        minWidth: "400px",
      }}
      data-aos="fade-left"
    >
      <Chart
        options={options}
        series={series} // Series with total time taken for each subject
        type="bar"
        height={400}
      />
    </div>
  );
};

export default TimeTakenBarChart;
