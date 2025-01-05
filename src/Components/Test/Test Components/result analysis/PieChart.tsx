import React, { memo } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface PieChartProps {
  totalPositiveMarks: number;
  totalNegativeMarks: number;
  totalUnanswered: number;
}

const PieChart: React.FC<PieChartProps> = memo(
  ({ totalPositiveMarks, totalNegativeMarks, totalUnanswered }) => {
    // const totalNotAnswered =
    //   totalUnanswered - (totalPositiveMarks + totalNegativeMarks);

    const flatSeries = [
      totalPositiveMarks,
      totalNegativeMarks,
      totalUnanswered,
    ];

    // console.log(flatSeries);

    const options = {
      chart: { type: "donut" as "donut" },
      labels: ["Positive Marks", "Negative Marks", "Not Answered"],
      title: {
        text: "Overall Analysis",
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

    return (
      <div
        style={{
          width: "40%",
          maxWidth: "400px",
          margin: "auto",
        }}
      >
        <Chart
          options={options}
          series={flatSeries}
          type="donut"
          height={400}
        />
      </div>
    );
  }
);

export default PieChart;
