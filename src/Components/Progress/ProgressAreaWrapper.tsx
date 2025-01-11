"use client";
import React from "react";
import "./Progress.css";
import ProgressAreaRight from "./ProgressAreaRight";
import ProgressAreaLeft from "./ProgressAreaLeft";

const ProgressAreaWrapper = () => {
  return (
    <div className="progress-area-wrapper-bg p-4 d-flex justify-content-center align-items-center flex-row flex-wrap">
      <ProgressAreaLeft />
      <ProgressAreaRight />
    </div>
  );
};

export default ProgressAreaWrapper;
