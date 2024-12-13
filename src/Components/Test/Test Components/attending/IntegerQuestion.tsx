import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles

interface IntegerQuestionProps {
  integerQuestion: {
    subject: string; // Allow any string, not just ""
    topic: string;
    subtopic: string;
    level: string;
    type: string; // Keep "integer" as a specific value
    description: string;
    correctAnswer: string;
  };
}

const IntegerQuestion: React.FC<IntegerQuestionProps> = ({
  integerQuestion,
}) => {
  console.log(integerQuestion);
  // const [question, setQuestion] = useState({
  //   subject: "Math",
  //   topic: "Algebra",
  //   subtopic: "Linear Equations",
  //   level: "easy",
  //   type: "multipleChoice",
  //   description: "Solve for x in the equation 2x + 5 = 15.",
  //   correctAnswer: "",
  // });

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setQuestion((prevState) => ({
  //     ...prevState,
  //     correctAnswer: e.target.value,
  //   }));
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("Form submitted with question:", question);
    // Handle form submission logic here, like sending data to a server
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
            type="text"
            id="correctAnswer"
            name="correctAnswer"
            className="form-control"
            // value={integerQuestion.correctAnswer}
            // onChange={handleInputChange}
          />
        </div>
      </form>
    </div>
  );
};

export default IntegerQuestion;
