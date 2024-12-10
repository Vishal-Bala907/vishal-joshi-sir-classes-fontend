import { ImagePath } from "@/Constant";
import Image from "next/image";
import ReactApexChart from "react-apexcharts";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import ConfigDB from "@/Config/ThemeConfig";
import { ApexOptions } from "apexcharts";

const primary =  ConfigDB.color.primary_color || "var(--theme-default)";
const secondary = ConfigDB.color.secondary_color || "var(--theme-secondary)";

export const BitcoinChart: ApexOptions = {
    series: [
      {
        data: [
          [1351202400000, 37.3],
          [1351338000000, 36.6],
          [1351424400000, 39.5],
          [1351710800000, 32.55],
          [1351870000000, 32.55],
          [1352056400000, 35.6],
          [1352342800000, 33.45],
          [1352629200000, 39.6],
          [1352815600000, 37.5],
          [1352924000000, 38.3],
          [1353061200000, 36.2],
          [1353134000000, 37.25],
          [1353220400000, 37.22],
          [1353479600000, 33.3],
          [1353566000000, 34.23],
          [1353632400000, 32.3],
          [1353757200000, 34.23],
          [1353857200000, 36.3],
          [1353957200000, 38.28],
          [1354021500000, 37.1],
          [1354175600000, 39.28],
          [1354362000000, 36.22],
          [1354548400000, 36.22],
          [1354634800000, 38.55],
          [1354794000000, 36.22],
          [1354980400000, 40.5],
          [1355166800000, 40.8],
          [1355253200000, 39.5],
          [1355439600000, 37.45],
          [1355698800000, 37.51],
          [1355885200000, 33.4],
          [1355985200000, 36.4],
          [1356085200000, 39.4],
        ],
      },
    ],
    annotations: {
      points: [
        {
          x: new Date("03 Dec 2012").getTime(),
          y: 36.22,
          marker: {
            size: 8,
            fillColor: primary,
            strokeColor: "#fff",
            strokeWidth: 5,
          },
        },
      ],
    },
    chart: {
      type: "area",
      height: 170,
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      curve: "smooth",
      lineCap: "square",
      colors: undefined,
      width: 3,
    },
    tooltip: {
      enabled: false,
    },
    xaxis: {
      type: "datetime",
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    grid: {
      show: false,
      padding: {
        top: -40,
        right: 0,
        bottom: -40,
        left: 0,
      },
    },
    legend: {
      show: false,
    },
    colors: [primary],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100],
      },
    },
  };
  
  export const RippleChart: ApexOptions = {
    series: [
      {
        data: [
          [1351202400000, 37.3],
          [1351338000000, 38.6],
          [1351424400000, 39.5],
          [1351710800000, 37.55],
          [1351870000000, 39.55],
          [1352056400000, 37.6],
          [1352342800000, 39.45],
          [1352629200000, 39.6],
          [1352815600000, 37.5],
          [1352924000000, 38.3],
          [1353061200000, 36.2],
          [1353134000000, 37.25],
          [1353220400000, 37.22],
          [1353479600000, 36.3],
          [1353566000000, 35.23],
          [1353632400000, 35.3],
          [1353757200000, 38.23],
          [1353857200000, 36.3],
          [1353957200000, 38.28],
          [1354021500000, 37.1],
          [1354175600000, 39.28],
          [1354362000000, 36.22],
          [1354548400000, 36.22],
          [1354634800000, 38.55],
          [1354794000000, 36.22],
          [1354980400000, 40.5],
          [1355166800000, 40.8],
          [1355253200000, 39.5],
          [1355439600000, 37.45],
          [1355698800000, 37.51],
          [1355885200000, 33.4],
          [1355985200000, 36.4],
          [1356085200000, 39.4],
        ],
      },
    ],
    chart: {
      type: "area",
      height: 170,
      toolbar: {
        show: false,
      },
    },
    annotations: {
      points: [
        {
          x: new Date("22 Nov 2012").getTime(),
          y: 35.23,
          marker: {
            size: 8,
            fillColor: secondary,
            strokeColor: "#fff",
            strokeWidth: 5,
          },
        },
      ],
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: "datetime",
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    tooltip: {
      enabled: false,
    },
    grid: {
      show: false,
      padding: {
        top: -40,
        right: 0,
        bottom: -40,
        left: 0,
      },
    },
    legend: {
      show: false,
    },
    colors: [secondary],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100],
      },
    },
  };
  
  export const EthereumChart: ApexOptions = {
    series: [
      {
        data: [
          [1351202400000, 37.3],
          [1351338000000, 36.6],
          [1351424400000, 39.5],
          [1351710800000, 32.55],
          [1351870000000, 32.55],
          [1352056400000, 35.6],
          [1352342800000, 30.45],
          [1352629200000, 39.6],
          [1352815600000, 37.5],
          [1352924000000, 38.3],
          [1353061200000, 36.2],
          [1353134000000, 37.25],
          [1353220400000, 37.22],
          [1353479600000, 33.3],
          [1353566000000, 34.23],
          [1353632400000, 32.3],
          [1353757200000, 34.23],
          [1353857200000, 36.3],
          [1353957200000, 38.28],
          [1354021500000, 37.1],
          [1354175600000, 39.28],
          [1354362000000, 36.22],
          [1354548400000, 36.22],
          [1354634800000, 38.55],
          [1354794000000, 36.22],
          [1354980400000, 40.5],
          [1355166800000, 40.8],
          [1355253200000, 39.5],
          [1355439600000, 37.45],
          [1355698800000, 37.51],
          [1355885200000, 33.4],
          [1355985200000, 36.4],
          [1356085200000, 39.4],
        ],
      },
    ],
    annotations: {
      points: [
        {
          x: new Date("29 Nov 2012").getTime(),
          y: 39.28,
          marker: {
            size: 8,
            fillColor: "#E6B54D",
            strokeColor: "#fff",
            strokeWidth: 5,
          },
        },
      ],
    },
    chart: {
      type: "area",
      height: 170,
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: "datetime",
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    grid: {
      show: false,
      padding: {
        top: -40,
        right: 0,
        bottom: -40,
        left: 0,
      },
    },
    legend: {
      show: false,
    },
    colors: ["#E6B54D"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100],
      },
    },
  };

export const SubjectsData = [
    { image: "dashboard-3/user/20.png", title: "Physics", text: "Alice Goodwin", lessons: "10 Lessons", hours: "8 Hours", students: "16 Students", value: "3.6", chart: BitcoinChart, class: "bitcoin-chart" },
    { image: "dashboard-3/user/21.png", title: "Chemistry", text: "Alice Goodwin", lessons: "112 Lessons", hours: "6 Hours", students: "20 Students", value: "5.8", chart: RippleChart, class: "ripple-chart" },
    { image: "dashboard-3/user/22.png", title: "Bio", text: "Alice Goodwin", lessons: "18 Lessons", hours: "9 Hours", students: "10 Students", value: "9.5", chart: EthereumChart, class: "ethereum-chart" },
];

const SubjectCards = () => {
    return (
        <>
            {SubjectsData.map((data, index) => (
                <Col xxl="4" xl="4" md="4" key={index}>
                    <Card className="graphic-design overflow-hidden">
                        <CardHeader className="card-no-border pb-0">
                            <div className="header-top">
                                <div className="d-flex align-items-center gap-2">
                                    <div className="flex-shrink-0">
                                        <div className="icon">
                                            <Image width={53} height={53} className="img-fluid" src={`${ImagePath}/${data.image}`} alt="chair" />
                                        </div>
                                    </div>
                                    <div className="flex-grow-1">
                                        <h5>{data.title}</h5>
                                        <p className="mb-0">{data.text}</p>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody className="p-0">
                            <ul>
                                <li><i className="iconly-Document fa fa-file-text-o me-1" /><h5>{data.lessons}</h5></li>
                                <li><i className="iconly-Time-Square fa fa-clock-o me-1" /><h5>{data.hours}</h5></li>
                                <li><i className="iconly-User3 fa fa-users me-1" /><h5>{data.students}</h5></li>
                                <li><i className="iconly-Star fa fa-star-o me-1" /><h5>{data.value}</h5></li>
                            </ul>
                            <div className="crypto-dashborad-chart"><ReactApexChart options={data.chart} series={data.chart.series} height={170} type="area" className={data.class} /></div>
                        </CardBody>
                    </Card>
                </Col>
            ))}
        </>
    );
};

export default SubjectCards;
