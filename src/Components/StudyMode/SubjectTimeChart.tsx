"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ApexCharts from "react-apexcharts";
import { fetchStudySessions } from "@/server/user"; // Mock function to fetch data

const SubjectTimeChart: React.FC = () => {
  const [sessionsData, setSessionsData] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any>({
    series: [],
    options: {
      chart: {
        type: "bar",
      },
      xaxis: {
        categories: [],
      },
      title: {
        text: "Total Time Spent per Subject",
        align: "center",
      },
      plotOptions: {
        bar: {
          borderRadius: 5,
          horizontal: false,
          columnWidth: "50%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      yaxis: {
        title: {
          text: "Time (Minutes)",
        },
      },
    },
  });

  const user = useSelector((state: any) => state.user);

  // Fetch study sessions data
  useEffect(() => {
    if (user && user._id) {
      fetchStudySessions(user._id)
        .then((sessions: any) => {
          console.log(sessions);
          setSessionsData(sessions);
          aggregateSubjectTime(sessions);
        })
        .catch((error) => {
          console.error("Error fetching study sessions:", error);
        });
    }
  }, [user]);

  const aggregateSubjectTime = (sessions: any[]) => {
    if (!sessions || sessions.length === 0) {
      console.error("No study sessions available.");
      return;
    }

    // Aggregate the total time for each subject
    const subjectTimeMap: { [key: string]: number } = {};

    sessions.forEach((session) => {
      const subject = session.subject;
      const totalTime = session.totalTime; // Assuming totalTime is already in minutes

      if (subjectTimeMap[subject]) {
        subjectTimeMap[subject] += totalTime;
      } else {
        subjectTimeMap[subject] = totalTime;
      }
    });

    const categories = Object.keys(subjectTimeMap);
    const seriesData = Object.values(subjectTimeMap);

    if (categories.length === 0 || seriesData.length === 0) {
      console.error("Aggregated data is empty.");
      return; // Exit early if there's no aggregated data
    }

    // Prepare the data for ApexCharts
    setChartData((prevChartData: any) => ({
      ...prevChartData,
      series: [
        {
          name: "Total Time (Minutes)",
          data: seriesData,
        },
      ],
      options: {
        ...prevChartData.options,
        xaxis: {
          categories: categories,
        },
      },
    }));
  };

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <ApexCharts
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={400}
      />
    </div>
  );
};

export default SubjectTimeChart;
