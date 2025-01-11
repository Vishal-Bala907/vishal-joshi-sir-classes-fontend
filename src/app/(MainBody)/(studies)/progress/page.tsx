"use client";

import dynamic from "next/dynamic"; // Import dynamic from next/dynamic
import React from "react";
import { useSelector } from "react-redux";

// Dynamically import ProgressAreaWrapper
const ProgressAreaWrapper = dynamic(
  () => import("@/Components/Progress/ProgressAreaWrapper"),
  { ssr: false }
);

const ProgressPage: React.FC = () => {
  const user = useSelector((state: any) => state.user);

  return (
    <>
      <ProgressAreaWrapper />
    </>
  );
};

export default ProgressPage;
