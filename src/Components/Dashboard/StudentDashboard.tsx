"use client";
import React, { Fragment } from 'react';
import Chart from 'react-apexcharts';
import ConfigDB from "@/Config/ThemeConfig";
import { ApexOptions } from 'apexcharts';
import { Card, CardBody, Col } from "reactstrap";
import ReactApexChart from "react-apexcharts";


const primary = ConfigDB.color.primary_color || "var(--theme-default)";
const secondary = ConfigDB.color.secondary_color || "var(--theme-secondary)";

const RevenueChartData: ApexOptions = {
    series: [80, 30, 22, 15],
    chart: {
        width: 380,
        type: "donut",
    },
    dataLabels: {
        enabled: false,
    },
    responsive: [
        {
            breakpoint: 1330,
            options: {
                chart: {
                    width: 210,
                },
            },
        },
    ],
    plotOptions: {
        pie: {
            expandOnClick: false,
            donut: {
                size: "83%",
                labels: {
                    show: true,
                    name: {
                        offsetY: 4,
                    },
                    total: {
                        show: true,
                        fontSize: "20px",
                        fontFamily: "Outfit', sans-serif",
                        fontWeight: 600,
                        label: "Scores",
                        formatter: () => "480",
                    },
                },
            },
        },
    },
    legend: {
        position: "bottom",
        offsetY: 0,
        height: 50,
    },
    colors: [primary, "#D77748", "#C95E9E", secondary],
};

const chartOptions: ApexOptions = {
    chart: {
        type: 'line', // Ensure this is a specific type, e.g., 'line'
        height: 350,
    },
    xaxis: {
        categories: ['Math', 'Science', 'English', 'History'],
    },
    title: {
        text: 'Monthly Performance',
        align: 'center',
    },
};

const series = [
    {
        name: 'Scores',
        data: [80, 70, 90, 85],
    },
];

const StudentDashboard = () => {

    return (
        <Fragment>
            <Col xxl="6" xl="6" lg="6" md="5" sm="12" className="order-xxl-0 order-xl-2 box-col-6">
                <Card>
                    <CardBody className="revenue-category">
                        <Chart options={chartOptions} series={series} type="line" height={350} />
                    </CardBody>
                </Card>
            </Col>
            <Col xxl="3" xl="5" lg="6" md="5" sm="6" className="order-xxl-0 order-xl-2 box-col-6">
                <Card className="pie-card">
                    <CardBody className="revenue-category">
                        <ReactApexChart id="chart" options={RevenueChartData} series={RevenueChartData.series} type="donut" height={350} />
                    </CardBody>
                </Card>
            </Col>
        </Fragment>
    );
};

export default StudentDashboard;
