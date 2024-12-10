"use client";

import Breadcrumbs from "@/CommonComponent/Breadcrumbs";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
import { getMyProgress } from "@/server/progress";
import { useSelector } from "react-redux";
import { Card, Col, Progress, Row } from "reactstrap";
import { DashboardCard } from "@/Components/Dashboard/AdminDashoard";
import { Icon } from "@iconify/react";
import TestProgress from "@/Components/Progress/TestProgress";
import PreviousTests from "@/Components/Progress/PreviousTests";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ProgressPage: React.FC = () => {
  const user = useSelector((state: any) => state.user);
  const [progress, setProgress] = useState<any>({});
  const [insights, setInsights] = useState<any>({});
  const [charts, setCharts] = useState<{
    monthlyChart: {
      series: { name: string; data: number[] }[];
      options: ApexOptions;
    };
    testsOverviewChart: {
      series: { name: string; data: number[] }[];
      options: ApexOptions;
    };
    courseCompletionChart: {
      series: number[];
      options: ApexOptions;
    };
  }>({
    monthlyChart: {
      series: [
        {
          name: "Sample Data",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
        },
      ],
      options: {
        chart: { type: "line", height: 350 },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
          ],
        },
        stroke: { curve: "smooth" },
        title: { text: "Monthly Progress", align: "left" },
        markers: { size: 4 },
      },
    },
    testsOverviewChart: {
      series: [],
      options: {
        chart: { type: "bar", height: 350 },
        xaxis: { categories: [] },
        colors: ["#546E7A", "#26A69A"],
        title: { text: "Tests by Type", align: "center" },
      },
    },
    courseCompletionChart: {
      series: [],
      options: {
        chart: { type: "pie" },
        labels: ["Completed", "Remaining"],
        colors: ["#00E396", "#FF4560"],
        title: { text: "Course Completion" },
      },
    },
  });

  useEffect(() => {
    if (user?.progressId) {
      fetchProgressData();
    }
  }, [user?.progressId]);

  const fetchProgressData = async () => {
    try {
      const res = await getMyProgress(user.progressId);
      const { progress, insights } = res;

      // Extracting data for charts
      const testTypes = Object.keys(insights?.testsByType?.total || {});
      const totalTests = testTypes.map(
        (type) => insights?.testsByType?.total?.[type] || 0
      );
      const completedTests = testTypes.map(
        (type) => insights?.testsByType?.completed?.[type] || 0
      );

      const totalCourses = 5; // Define total courses dynamically if available
      const completedCourses = progress?.coursesCompleted?.length || 0;
      const remainingCourses = totalCourses - completedCourses;

      // Update state
      setProgress(progress);
      setInsights(insights)

      setCharts((prev) => ({
        ...prev,
        testsOverviewChart: {
          series: [
            { name: "Total Tests", data: totalTests },
            { name: "Completed Tests", data: completedTests },
          ],
          options: {
            ...prev.testsOverviewChart.options,
            xaxis: { categories: testTypes },
          },
        },
        courseCompletionChart: {
          series: [completedCourses, remainingCourses],
          options: prev.courseCompletionChart.options,
        },
      }));
    } catch (err) {
      console.error("Error fetching progress:", err);
    }
  };

  return (
    <>
      <Breadcrumbs mainTitle="Progress" />
      <div className="chart-container">
        <Row>
          <Col md="12" sm="12">
            <TestProgress insights={insights} progress={progress} />
          </Col>
          <Col xxl="3" xl="3" lg="3" md="4" sm="6">
            <DashboardCard
              color="success"
              arrow="upd"
              amount={progress?.overallScore?.toFixed(2) || "0.00"}
              text="Overall Score"
            >
              <Icon icon="carbon:result-new" width="24" height="24" />
            </DashboardCard>
          </Col>
          <Col xxl="3" xl="3" lg="3" md="4" sm="6">
            <DashboardCard
              color="success"
              arrow="upd"
              amount={insights?.totalTestsGiven || "0"}
              text="Test Attempts"
            >
              <Icon icon="ic:outline-newspaper" width="24" height="24" />
            </DashboardCard>
          </Col>
          <Col xxl="6" xl="6" lg="6" md="12">
            <Card>
              <Chart
                options={charts.testsOverviewChart.options}
                series={charts.testsOverviewChart.series}
                type="bar"
                height={350}
              />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xxl="6" xl="6" lg="6" md="12">
            <PreviousTests tests={progress?.testResults || []} />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProgressPage;
