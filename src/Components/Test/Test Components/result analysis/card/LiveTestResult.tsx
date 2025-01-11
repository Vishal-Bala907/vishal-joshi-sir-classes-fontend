"use client";
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
} from "react-bootstrap";
import Chart from "react-apexcharts";
import styled from "styled-components";

// Styled Card with modern look
const StyledCard = styled(Card)`
  background-color: #ffffff; // White background for modern look
  border: none;
  border-radius: 15px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px); // Hover effect for lifting card
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2); // Lifting effect on hover
  }
`;

export interface TestStats {
  userId: string;
  testId: string;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  accuracy: number;
  totalTimeTaken: number;
  averageTimePerQuestion: number;
  createdAt?: Date;
  mark: number;
  obtainedMarks: number;
}

interface ResultProps {
  name: string;
  data: TestStats;
}

const LiveTestResults: React.FC<ResultProps> = ({ name, data }) => {
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(300);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [skippedQuestions, setSkippedQuestions] = useState(75);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch data from your backend or API here
    setLoading(true);
    setScore(data.obtainedMarks);
    setTotalQuestions(
      data.correctCount + data.incorrectCount + data.unansweredCount
    );
    setCorrectAnswers(data.correctCount);
    setIncorrectAnswers(data.incorrectCount);
    setSkippedQuestions(data.unansweredCount);
    setLoading(false);
  }, [data]);

  const chartOptions = {
    labels: ["Correct", "Incorrect", "Skipped"],
    colors: ["#28a745", "#dc3545", "#6c757d"], // Bootstrap colors
    chart: {
      type: "donut" as "donut", // Explicitly casting to "donut" type
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const chartSeries = [correctAnswers, incorrectAnswers, skippedQuestions];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container
      fluid
      className="p-4"
      style={{
        width: "fit-content",
      }}
    >
      <Row className="justify-content-center">
        <Col md={8}>
          <StyledCard>
            <CardBody>
              <CardTitle className="text-center mb-4">
                <span className="fw-bold" style={{ fontSize: "1.5rem" }}>
                  {name}
                </span>
              </CardTitle>
              <div className="text-center chart-container mb-4">
                <Chart
                  options={chartOptions}
                  series={chartSeries}
                  type="donut"
                  width={300}
                />
                <h5 className="mt-3">Score: {score}</h5>
                <p>
                  Out of{" "}
                  {data.mark *
                    (data.correctCount +
                      data.incorrectCount +
                      data.unansweredCount)}
                </p>
              </div>

              <div className="summary-container">
                <h6 className="mb-3">Test Summary</h6>
                <ul className="list-unstyled">
                  <li>
                    <span className="fw-bold">Correct:</span> {correctAnswers}/
                    {totalQuestions}
                  </li>
                  <li>
                    <span className="fw-bold">Incorrect:</span>{" "}
                    {incorrectAnswers}/{totalQuestions}
                  </li>
                  <li>
                    <span className="fw-bold">Skipped:</span> {skippedQuestions}
                    /{totalQuestions}
                  </li>
                  <li>
                    <span className="fw-bold">Accuracy:</span> {data.accuracy}%
                  </li>
                </ul>
              </div>
            </CardBody>
          </StyledCard>
        </Col>
      </Row>
    </Container>
  );
};

export default LiveTestResults;
