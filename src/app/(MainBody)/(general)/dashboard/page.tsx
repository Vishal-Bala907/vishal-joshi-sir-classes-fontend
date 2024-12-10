"use client";

import React from 'react';
import Breadcrumbs from "@/CommonComponent/Breadcrumbs";
import UpcomingClassesCommon from '@/Components/Dashboard/UpcomingSession';
import { useSelector } from "react-redux";
import AdminDashboard from '@/Components/Dashboard/AdminDashoard';
import StudentDashboard from '@/Components/Dashboard/StudentDashboard';
import MentorDashboard from '@/Components/Dashboard/MentorDashboard';
import { Container, Row } from "reactstrap";
import UpcomingFeature from '@/CommonComponent/UpcomingFeature';

const Dashboard = () => {

  const user = useSelector((state: any) => state.user)

  return <>
    <Container fluid className="dashboard-3">
      <Row>
        <Breadcrumbs mainTitle={'Dashboard'} />
        {
          user.role == "admin" &&
          <AdminDashboard />
        }
        {/* {
          user.role == "mentor" &&
          <MentorDashboard />
        }
           
        {
          user.role == "student" &&
        }
          */}
        <UpcomingFeature />
        {/* <UpcomingClassesCommon /> */}
      </Row>
    </Container>
  </>;
};

export default Dashboard;
