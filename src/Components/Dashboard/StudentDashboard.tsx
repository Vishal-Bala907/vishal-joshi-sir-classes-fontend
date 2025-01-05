"use client";
import React, { Fragment } from "react";
import Chart from "react-apexcharts";
import ConfigDB from "@/Config/ThemeConfig";
import ProfileCard from "./ProfileCard";
import MentorsList from "./Mentors";
import TopTests from "./TopTest";
import TestBarGraph from "./TestBarGraph";
import StudySessionsGraph from "./StudySessionsGraph";

const primary = ConfigDB.color.primary_color || "var(--theme-default)";
const secondary = ConfigDB.color.secondary_color || "var(--theme-secondary)";

const StudentDashboard = () => {
  return (
    <main className="">
      <section className="d-flex flex-row flex-wrap gap-4 justify-content-center align-items-center">
        <ProfileCard />
        <TopTests />
      </section>
      <MentorsList />
      <section className="my-4">
        <TestBarGraph />
      </section>
      <section className="my-4">
        <StudySessionsGraph />
      </section>
    </main>
  );
};

export default StudentDashboard;
