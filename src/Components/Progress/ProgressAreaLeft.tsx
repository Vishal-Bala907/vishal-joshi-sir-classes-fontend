"use client";
import React from "react";
import { SlCalender } from "react-icons/sl";
import ProgressGraph from "./ProgressGraph";

const ProgressAreaLeft = () => {
  return (
    <div className="d-flex flex-column">
      <div className="progressAreaLeft">
        <p
          className="p-0 m-0 fw-bold text-center fs-1"
          style={{
            color: "#0097b2",
          }}
        >
          Your current (This Week) Progress Bar
        </p>
        <section>
          <div className="progress-container">
            <div className="progress-bar" style={{ width: "50%" }}></div>
          </div>
        </section>
        <p
          className="p-0 m-0 fw-bold d-flex justify-content-end fs-1"
          style={{
            color: "#0097b2",
          }}
        >
          50%
        </p>
      </div>
      <div>
        <div className="w-100 progress-area-second update-progress-text d-flex justify-content-start align-items-center flex-row">
          <p className="fs-1 fw-semibold">Update Your Progress</p>
          <img
            src="/assets/images/arrow.png"
            className="arrow-img"
            alt="arrow"
          />
        </div>
      </div>
      <div className="progress-area-card p-3">
        <div className="mb-2 d-flex justify-content-between align-items-center">
          <div>
            <p className="p-0 fs-3 fw-semibold m-0 text-white">
              Last Attempted on
            </p>
            <p className="p-0 m-0 fs-3" style={{ color: "yellow" }}>
              12-05-2025
            </p>
          </div>
          <SlCalender
            style={{
              fontSize: "xxx-large",
              color: "white",
              marginRight: "25px",
            }}
          />
        </div>
        <div className="mb-2 d-flex justify-content-between align-items-center">
          <div>
            <p className="p-0 m-0 fs-3 fw-semibold text-white">
              Next Attempt Available
            </p>
            <p className="p-0 m-0 fs-3" style={{ color: "yellow" }}>
              12-05-2025
            </p>
          </div>
          <button className="bg-white text-success px-3 py-2 rounded-4 fw-bold">
            Attemp Now
          </button>
        </div>
      </div>
      <ProgressGraph />
    </div>
  );
};

export default ProgressAreaLeft;
