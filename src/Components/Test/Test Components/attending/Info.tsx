import React from "react";
import { Badge } from "react-bootstrap";

const Info = () => {
  return (
    <div className="d-flex align-items-start flex-wrap gap-3">
      <Badge className="" bg="light" text="dark">
        Not Visited
      </Badge>
      <Badge bg="danger">Not Answered</Badge>
      <Badge bg="success">Answered</Badge>
      <Badge bg="secondary">Marked for Review</Badge>
      <Badge bg="primary">
        Answered & Marked for Review <br /> (will be considered for evaluation)
      </Badge>
    </div>
  );
};

export default Info;
