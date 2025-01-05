import React, { useState, useEffect, memo } from "react";
import dynamic from "next/dynamic";
import AOS from "aos";
import "aos/dist/aos.css";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface BarChartProps {
  totalPositiveMarks: number;
  totalNegativeMarks: number;
  totalUnanswered: number;
}

const BarChart: React.FC<BarChartProps> = memo(
  ({ totalPositiveMarks, totalNegativeMarks, totalUnanswered }) => {
    const [categories, setCategories] = useState<string[]>([]);
    const [series, setSeries] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const calculateSeries = () => {
      // Set categories and series based on provided props
      setCategories(["Marks Distribution"]);
      setSeries([
        { name: "Positive Marks", data: [totalPositiveMarks] },
        { name: "Negative Marks", data: [totalNegativeMarks] },
        { name: "Unanswered", data: [totalUnanswered] },
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
    }, [totalPositiveMarks, totalNegativeMarks, totalUnanswered]);

    const options = {
      chart: {
        type: "bar" as "bar",
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
        },
      },
      xaxis: {
        categories,
        title: {
          text: "Categories",
          style: {
            fontSize: "14px",
            fontWeight: "bold",
          },
        },
      },
      yaxis: {
        title: {
          text: "Number of Marks",
          style: {
            fontSize: "14px",
            fontWeight: "bold",
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "50%",
        },
      },
      title: {
        text: "Marks Distribution",
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

    if (loading || series.length === 0) {
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
  }
);

export default memo(BarChart);
