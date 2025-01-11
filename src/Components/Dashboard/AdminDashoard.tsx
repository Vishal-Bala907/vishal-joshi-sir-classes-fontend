"use client";
import React, { Fragment, useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
import ConfigDB from "@/Config/ThemeConfig";
import { Card, CardBody, Col } from "reactstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getAllUsers } from "@/server/users";

const primary = ConfigDB.color.primary_color || "var(--theme-default)";
const secondary = ConfigDB.color.secondary_color || "var(--theme-secondary)";

export const DashboardCard = ({
  color,
  amount,
  text,
  children,
  arrow,
}: {
  arrow: string;
  color: string;
  amount: number;
  text: string;
  children: any;
}) => {
  return (
    <Card>
      <CardBody className="revenue-category">
        <div className="widget-content">
          <div className={`widget-round ${color}`}>
            <div className="bg-round">{children}</div>
          </div>
          <div>
            <span className="f-light">{text}</span>
          </div>
        </div>
        <div className={`font-${color} f-w-500`}>
          <i className={`icon-arrow-${arrow} icon-rotate me-1`} />
          <span>{amount}</span>
        </div>
      </CardBody>
    </Card>
  );
};

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
    type: "line", // Ensure this is a specific type, e.g., 'line'
    height: 350,
  },
  xaxis: {
    categories: ["Math", "Science", "English", "History"],
  },
  title: {
    text: "Monthly Performance",
    align: "center",
  },
};

const series = [
  {
    name: "Scores",
    data: [80, 70, 90, 85],
  },
];

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [students, setStudents] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [admin, setAdmin] = useState([]);

  const getAllUserFunc = async () => {
    try {
      const data = await getAllUsers();
      const studentList = data.filter((u: any) => u?.role == "student");
      const mentorList = data.filter((u: any) => u?.role == "mentor");
      const adminList = data.filter((u: any) => u?.role == "admin");
      setStudents(studentList);
      setMentors(mentorList);
      setAdmin(adminList);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getAllUserFunc();
  }, []);

  return (
    <Fragment>
      <Col
        xxl="3"
        xl="3"
        lg="3"
        md="4"
        sm="6"
        className="order-xxl-0 order-xl-2 box-col-6"
      >
        <DashboardCard
          color={"success"}
          arrow="up-"
          amount={students?.length ?? 0}
          text={"Students"}
        >
          <Icon icon="ph:student-bold" width="24" height="24" />
        </DashboardCard>
      </Col>
      <Col
        xxl="3"
        xl="3"
        lg="3"
        md="4"
        sm="6"
        className="order-xxl-0 order-xl-2 box-col-6"
      >
        <DashboardCard
          color={"primary"}
          arrow="up-"
          amount={mentors?.length ?? 0}
          text={"Mentors"}
        >
          <Icon icon="fa-solid:chalkboard-teacher" width="24" height="24" />
        </DashboardCard>
      </Col>
      <Col
        xxl="3"
        xl="3"
        lg="3"
        md="4"
        sm="6"
        className="order-xxl-0 order-xl-2 box-col-6"
      >
        <DashboardCard
          color={"secondary"}
          arrow="down-"
          amount={admin?.length ?? 0}
          text={"Admins"}
        >
          <Icon icon="ri:admin-fill" width="24" height="24" />
        </DashboardCard>
      </Col>
      <Col
        xxl="3"
        xl="3"
        lg="3"
        md="4"
        sm="6"
        className="order-xxl-0 order-xl-2 box-col-6"
      >
        <DashboardCard color={"success"} arrow="up" amount={3} text={"tests"}>
          <Icon icon="carbon:result" width="24" height="24" />
        </DashboardCard>
      </Col>
    </Fragment>
  );
};

export default AdminDashboard;
