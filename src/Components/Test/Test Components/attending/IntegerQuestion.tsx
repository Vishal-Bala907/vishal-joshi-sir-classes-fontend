import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";
import { addQuestion } from "@/Redux/Reducers/UserAnswers";
import { toast } from "react-toastify";

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
  settestCounter: React.Dispatch<React.SetStateAction<number>>;
}

const IntegerQuestion: React.FC<IntegerQuestionProps> = ({
  integerQuestion,
  index,
  testId,
  negativeMarking,
  positiveMarking,
  settestCounter,
}) => {
  const start = Date.now();
  const dispatch = useDispatch();
  const [answer, setAnswer] = useState<number>();
  const user = useSelector((state: any) => state.user);
  const test = useSelector((state: RootState) => state.attend);

  const saveTheAnswer = (color: string, action: string) => {
    const userANS = answer?.toString;
    const status =
      Number(integerQuestion.correctAnswer) === Number(answer)
        ? "CORRECT"
        : "INCORRECT";
    const respone = {
      color: color,
      questionIndex: index,
      questionId: integerQuestion._id,
      testId: testId,
      userId: user._id,
      rightAnswer: integerQuestion.correctAnswer,
      userAnswer:
        action === "SAVE" || action === "SAVE"
          ? answer
          : action === "CLEAR"
          ? ""
          : action === "REVIEW"
          ? ""
          : "",
      questionStatus: status,
      type: integerQuestion.type,
      subject: integerQuestion.subject,
      marks: status === "CORRECT" ? positiveMarking : negativeMarking,
      timeTaken: Date.now() - start,
    };

    dispatch(addQuestion(respone));
    if (test.Questions.length - 1 > index) {
      settestCounter((prev) => prev + 1);
    } else {
      toast.success("No next question...", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="container mt-5  rounded-4 p-3 my-4">
      <div>
        <section className="d-flex justify-content-start align-items-center flex-row gap-4 flex-wrap">
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
        <div
          className="bg-white p-3 rounded-4"
          style={{
            border: "1px solid #00000029",
          }}
        >
          <div className="mb-3 border-bottom pt-3">
            <h4 className="">Description</h4>
            {/* <label className="form-label">Description</label> */}
            <p
              className="form-control-plaintext"
              dangerouslySetInnerHTML={{ __html: integerQuestion.description }}
            >
              {/* {integerQuestion.description} */}
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
                setAnswer(Number(e.target.value));
              }}
              // value={integerQuestion.correctAnswer}
              // onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="d-flex justify-content-center align-items-center gap-3 flex-wrap">
          <button
            style={{
              fontSize: "10px",
            }}
            className="btn btn-success mt-3 timesUp"
            onClick={() => {
              saveTheAnswer("green", "SAVE");
            }}
          >
            Save & Next
          </button>
          <button
            style={{
              fontSize: "10px",
            }}
            className="btn btn-primary mt-3 timesUp"
            onClick={() => {
              saveTheAnswer("blue", "SAVE-MARK");
            }}
          >
            Save and mark for review
          </button>
          <button
            style={{
              fontSize: "10px",
            }}
            className="btn btn-dark mt-3 timesUp"
            onClick={() => {
              saveTheAnswer("white", "CLEAR");
            }}
          >
            Clear response
          </button>
          <button
            style={{
              fontSize: "10px",
            }}
            className="btn btn-warning mt-3 timesUp"
            onClick={() => {
              saveTheAnswer("yellow", "REVIEW");
            }}
          >
            Mark for review and next
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntegerQuestion;
