import React from "react";
import { MdCheckBoxOutlineBlank } from "react-icons/md";

const Info = () => {
  return (
    <div className="d-flex align-items-start flex-wrap gap-3">
      <div className="d-flex align-items-center justify-content-center flex-wrap gap-3">
        <MdCheckBoxOutlineBlank
          style={{
            backgroundColor: "white",
            borderRadius: "4px",
            height: "20px",
            width: "20px",
          }}
        />
        <p className="p-0 m-0">Not Answerd</p>
      </div>
      <div className="d-flex align-items-center justify-content-center flex-wrap gap-3">
        <MdCheckBoxOutlineBlank
          style={{
            backgroundColor: "#0def0d",
            borderRadius: "4px",
            height: "20px",
            width: "20px",
            color: "#0def0d",
          }}
        />
        <p className="p-0 m-0">Save & Next</p>
      </div>
      <div className="d-flex align-items-center justify-content-center flex-wrap gap-3">
        <MdCheckBoxOutlineBlank
          style={{
            backgroundColor: "#0d6efd",
            borderRadius: "4px",
            height: "20px",
            width: "20px",
            color: "#0d6efd",
          }}
        />
        <p className="p-0 m-0">Save & Mark for review</p>
      </div>
      <div className="d-flex align-items-center justify-content-center flex-wrap gap-3">
        <MdCheckBoxOutlineBlank
          style={{
            backgroundColor: "black",
            borderRadius: "4px",
            height: "20px",
            width: "20px",
          }}
        />
        <p className="p-0 m-0">Clear Response</p>
      </div>
      <div className="d-flex align-items-center justify-content-center flex-wrap gap-3">
        <MdCheckBoxOutlineBlank
          style={{
            backgroundColor: "#ffc107",
            borderRadius: "4px",
            height: "20px",
            width: "20px",
            color: "#ffc107",
          }}
        />
        <p className="p-0 m-0">Mark for review and next</p>
      </div>

      {/* <Badge className="" bg="light" text="dark">
        Not Visited
      </Badge>
      <Badge bg="danger">Not Answered</Badge>
      <Badge bg="success">Answered</Badge>
      <Badge bg="secondary">Marked for Review</Badge>
      <Badge bg="primary">
        Answered & Marked for Review <br /> (will be considered for evaluation)
      </Badge> */}
    </div>
  );
};

export default Info;
