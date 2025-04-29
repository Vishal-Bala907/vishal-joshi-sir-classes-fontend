import React from "react";
import { Card, Row, Col, ProgressBar, Container } from "react-bootstrap";

interface SubjectData {
  totalQuestions: number;
  positiveMarksCount: number;
  totalMarksCount: number; // total marks with negative count included
  totalTime: number; // Total time in milliseconds
}

interface DataCardProps {
  totalQuestions: number;
  totalMarks: number;
  totalAnswered: number;
  totalUnanswered: number;
  totalPositiveMarks: number;
  totalNegativeMarks: number;
  subjectsData: { [key: string]: SubjectData };
  totalTime: number; // Total time for all subjects
}

const DataCard: React.FC<DataCardProps> = ({
  totalQuestions,
  totalMarks,
  totalAnswered,
  totalUnanswered,
  totalPositiveMarks,
  totalNegativeMarks,
  subjectsData,
  totalTime,
}) => {
  // Calculate accuracy and inaccuracy percentages
  const accuracy = (totalPositiveMarks / totalQuestions) * 100;
  const inaccuracy = (totalNegativeMarks / totalQuestions) * 100;

  return (
    <Card
      className="shadow-lg rounded-3 overflow-hidden"
      style={{
        width: "100%",
        maxWidth: "700px",
        border: "none",
        backgroundColor: "#f8f9fa",
      }}
    >
      <Card.Body>
        <Card.Title className="text-center text-primary fs-3 fw-bold">
          Test Summary
        </Card.Title>
        <Row className="g-4 mt-4 text-center">
          <Col sm={6} md={4}>
            <Card.Text className="fs-5 text-muted">Total Marks</Card.Text>
            <Card.Title className="fs-3 fw-bold">{totalMarks}</Card.Title>
          </Col>
          <Col sm={6} md={4}>
            <Card.Text className="fs-5 text-muted">Total Answered</Card.Text>
            <Card.Title className="fs-3 fw-bold">
              {totalNegativeMarks + totalPositiveMarks}
            </Card.Title>
          </Col>
          <Col sm={6} md={4}>
            <Card.Text className="fs-5 text-muted">Total Unanswered</Card.Text>
            <Card.Title className="fs-3 fw-bold">
              {totalQuestions - (totalNegativeMarks + totalPositiveMarks)}
            </Card.Title>
          </Col>
        </Row>
        <Row className="g-4 mt-4 text-center">
          <Col sm={6} md={4}>
            <Card.Text className="fs-5 text-muted">Correct Answers</Card.Text>
            <Card.Title className="fs-3 fw-bold">
              {totalPositiveMarks}
            </Card.Title>
          </Col>
          <Col sm={6} md={4}>
            <Card.Text className="fs-5 text-muted">Incorrect Answers</Card.Text>
            <Card.Title className="fs-3 fw-bold">
              {totalNegativeMarks}
            </Card.Title>
          </Col>
          <Col sm={6} md={4}>
            <Card.Text className="fs-5 text-muted">Total Time Taken</Card.Text>
            <Card.Title className="fs-3 fw-bold">
              {Math.floor(totalTime / 60000)} min{" "}
              {Math.floor((totalTime % 60000) / 1000)} sec
            </Card.Title>
          </Col>
        </Row>

        <div className="mt-5">
          <Card.Title className="text-center text-secondary fs-4">
            Subject Breakdown
          </Card.Title>
          {Object.keys(subjectsData).map((subject) => {
            const { totalQuestions, positiveMarksCount, totalTime } =
              subjectsData[subject];

            const accuracyForSubject =
              (positiveMarksCount / totalQuestions) * 100;

            return (
              <Card className="mb-4 shadow-sm" key={subject}>
                <Card.Body>
                  <Card.Title className="text-primary">{subject}</Card.Title>
                  <Row className="g-3">
                    <Col sm={4}>
                      <Card.Text>Total Questions: {totalQuestions}</Card.Text>
                    </Col>
                    <Col sm={4}>
                      <Card.Text>
                        Correct Answers: {positiveMarksCount}
                      </Card.Text>
                    </Col>
                    <Col sm={4}>
                      <Card.Text>
                        Accuracy: {accuracyForSubject.toFixed(2)}%
                      </Card.Text>
                    </Col>
                  </Row>
                  <ProgressBar
                    now={accuracyForSubject}
                    label={`${accuracyForSubject.toFixed(2)}%`}
                    variant="success"
                    className="mt-2"
                  />
                  <Card.Text className="mt-3 text-muted">
                    Total Time Taken: {Math.floor(totalTime / 60000)} min{" "}
                    {Math.floor((totalTime % 60000) / 1000)} sec
                  </Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </div>

        <Row className="mt-5 text-center">
          <Col sm={12}>
            <Card.Text className="fs-5 fw-bold">
              Accuracy: {accuracy.toFixed(2)}%
            </Card.Text>
            <ProgressBar
              now={accuracy}
              label={`${accuracy.toFixed(2)}%`}
              variant="info"
            />
          </Col>
        </Row>
        <Row className="mt-3 text-center">
          <Col sm={12}>
            <Card.Text className="fs-5 fw-bold">
              Inaccuracy: {inaccuracy.toFixed(2)}%
            </Card.Text>
            <ProgressBar
              now={inaccuracy}
              label={`${inaccuracy.toFixed(2)}%`}
              variant="danger"
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default DataCard;
