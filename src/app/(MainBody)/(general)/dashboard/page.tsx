"use client";
import React from "react";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";

// Dynamically import dashboard components without SSR
const AdminDashboard = dynamic(
  () => import("@/Components/Dashboard/AdminDashoard"),
  { ssr: false }
);
const StudentDashboard = dynamic(
  () => import("@/Components/Dashboard/StudentDashboard"),
  { ssr: false }
);

const Dashboard = () => {
  const user = useSelector((state: any) => state.user);

  return (
    <section className="dashboard-3">
      <div>
        <Breadcrumbs mainTitle={"Dashboard"} />
        {user.role === "admin" && <AdminDashboard />}
        {user.role === "student" && <StudentDashboard />}
      </div>
    </section>
  );
};

export default Dashboard;
