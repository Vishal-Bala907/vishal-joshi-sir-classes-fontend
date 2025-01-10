"use client";

import ProgressAreaWrapper from "@/Components/Progress/ProgressAreaWrapper";
import dynamic from "next/dynamic";
import React from "react";
import { useSelector } from "react-redux";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ProgressPage: React.FC = () => {
  const user = useSelector((state: any) => state.user);

  return (
    <>
      <ProgressAreaWrapper />
    </>
  );
};

export default ProgressPage;
