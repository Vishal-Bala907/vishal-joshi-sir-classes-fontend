import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";

interface IntegerQuestionProps {
  integerQuestion: {
    subject: string; // Allow any string, not just ""
    topic: string;
    subtopic: string;
    level: string;
    type: string; // Keep "integer" as a specific value
    description: string;
    correctAnswer: string;
    _id: string;
  };
  index: number;
  testId: string;
  negativeMarking: number;
  positiveMarking: number;
}

interface QuestionAnswer {
  questionIndex: number; // Index of the question
  questionId: string; // Unique identifier for the question
  testId: string; // Identifier for the test
  userId: string; // Identifier for the user
  userAnswer: string; // User's answer to the question
  rightAnswer: string; // Correct answer to the question

  questionStatus: string; // 'correct' or 'incorrect'
  marks: number; // Marks obtained for the question
}

// index  , testId

const IntegerQuestion: React.FC<IntegerQuestionProps> = ({
  integerQuestion,
  index,
  testId,
  negativeMarking,
  positiveMarking,
}) => {
  console.log(integerQuestion);
  const [answer, setAnswer] = useState<number>();
  const user = useSelector((state: RootState) => state.user);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userANS = answer?.toString;
    const status =
      Number(integerQuestion.correctAnswer) === Number(userANS)
        ? "CORRECT"
        : "INCORRECT";
    const respone = {
      questionIndex: index,
      questionId: integerQuestion._id,
      testId: testId,
      userId: user._id,
      rightAnswer: integerQuestion.correctAnswer,
      userAnswer: userANS,
      questionStatus: status,
      marks: status === "CORRECT" ? positiveMarking : negativeMarking,
    };
    console.log(respone);
  };

  return (
    <div className="container mt-5 bg-primary-subtle rounded-4 p-3 my-4">
      <form onSubmit={handleSubmit}>
        <section className="d-flex justify-content-center align-items-center flex-row gap-4 flex-wrap">
          <div className="mb-3 text-center">
            <label className="form-label">Subject</label>
            <p className="form-control-plaintext">{integerQuestion.subject}</p>
          </div>
          <div className="mb-3 text-center">
            <label className="form-label">Topic</label>
            <p className="form-control-plaintext">{integerQuestion.topic}</p>
          </div>
          <div className="mb-3 text-center">
            <label className="form-label">Subtopic</label>
            <p className="form-control-plaintext">{integerQuestion.subtopic}</p>
          </div>

          <div className="mb-3 text-center">
            <label className="form-label">Level</label>
            <p className="form-control-plaintext">{integerQuestion.level}</p>
          </div>
          <div className="mb-3 text-center">
            <label className="form-label">Type</label>
            <p className="form-control-plaintext">{integerQuestion.type}</p>
          </div>
        </section>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <p className="form-control-plaintext">
            {integerQuestion.description}
          </p>
        </div>
        <div className="mb-3">
          <label htmlFor="correctAnswer" className="form-label">
            Correct Answer
          </label>
          <input
            type="number"
            id="correctAnswer"
            name="correctAnswer"
            className="form-control"
            onChange={(e) => {
              setAnswer(e.target.value);
            }}
            // value={integerQuestion.correctAnswer}
            // onChange={handleInputChange}
          />
        </div>
        <button className="btn btn-success">Submit Answer</button>
      </form>
    </div>
  );
};

export default IntegerQuestion;
