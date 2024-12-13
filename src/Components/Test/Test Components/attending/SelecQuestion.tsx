import React, { useState } from "react";

interface IntegerQuestionProps {
  selectQuestion: {
    subject: string;
    topic: string;
    subtopic: string;
    level: string;
    type: string;
    description: string;
    descriptionImage: string;
    optionType: string;
    textOptionsA: string;
    textOptionsB: string;
    textOptionsC: string;
    textOptionsD: string;
    imageOptionsA: string;
    imageOptionsB: string;
    imageOptionsC: string;
    imageOptionsD: string;
    correctAnswer: string[];
  };
}

const SelecQuestion: React.FC<IntegerQuestionProps> = ({ selectQuestion }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleCheckboxChange = (option: string) => {
    setSelectedOptions(
      (prev) =>
        prev.includes(option)
          ? prev.filter((item) => item !== option) // Remove if already selected
          : [...prev, option] // Add if not already selected
    );
  };
  return (
    <div className="container mt-4 w-75 bg-primary-subtle rounded-4 p-3 my-4">
      <section className="d-flex justify-content-center align-items-center flex-row gap-4 flex-wrap">
        <div className="mb-3 text-center">
          <label className="form-label">Subject</label>
          {selectQuestion.subject && (
            <p className="form-control-plaintext">{selectQuestion.subject}</p>
          )}
        </div>
        <div className="mb-3 text-center">
          <label className="form-label">Topic</label>
          <p className="form-control-plaintext">{selectQuestion.topic}</p>
        </div>
        <div className="mb-3 text-center">
          <label className="form-label">Subtopic</label>
          <p className="form-control-plaintext">{selectQuestion.subtopic}</p>
        </div>

        <div className="mb-3 text-center">
          <label className="form-label">Level</label>
          <p className="form-control-plaintext">{selectQuestion.level}</p>
        </div>
        <div className="mb-3 text-center">
          <label className="form-label">Type</label>
          <p className="form-control-plaintext">{selectQuestion.type}</p>
        </div>
      </section>

      <div className="mt-3">
        <p className="fw-bold">{selectQuestion.description}</p>
        {selectQuestion.descriptionImage && (
          <div className="text-center mb-3">
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_URL}${selectQuestion.descriptionImage}`}
              alt="Description"
              className="img-fluid"
              style={{ maxWidth: "400px" }}
            />
          </div>
        )}
      </div>

      <div className="">
        {/* Option A */}
        <div className="d-flex justify-content-center align-items-center flex-row gap-4 flex-wrap">
          <div
            className="col-6 mb-3"
            style={{
              width: "fit-content",
            }}
          >
            <h4>A.</h4>
            <div className={`card p-3 w-auto`} style={{ cursor: "pointer" }}>
              <p>{selectQuestion.textOptionsA}</p>
              {selectQuestion.imageOptionsA && (
                <img
                  // src={`${process.env.NEXT_PUBLIC_BASE_URL}/${selectQuestion.imageOptionsA}`}
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}${selectQuestion.imageOptionsA}`}
                  alt="Option A"
                  className="img-fluid"
                  style={{ maxWidth: "200px" }}
                />
              )}
            </div>
            <div className="form-check mt-2">
              <input
                type="checkbox"
                id="optionA"
                className="form-check-input"
                checked={selectedOptions.includes("A")}
                onChange={() => handleCheckboxChange("A")}
              />
              <label htmlFor="optionA" className="form-check-label">
                Select A
              </label>
            </div>
          </div>

          {/* Option B */}
          <div
            className="col-6 mb-3"
            style={{
              width: "fit-content",
            }}
          >
            <h4>B.</h4>
            <div className={`card p-3`} style={{ cursor: "pointer" }}>
              <p>{selectQuestion.textOptionsB}</p>
              {selectQuestion.imageOptionsB && (
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}${selectQuestion.imageOptionsB}`}
                  alt="Option B"
                  className="img-fluid "
                  style={{ maxWidth: "200px" }}
                />
              )}
            </div>
            <div className="form-check mt-2">
              <input
                type="checkbox"
                id="optionB"
                className="form-check-input"
                checked={selectedOptions.includes("B")}
                onChange={() => handleCheckboxChange("B")}
              />
              <label htmlFor="optionB" className="form-check-label">
                Select B
              </label>
            </div>
          </div>
        </div>

        {/* Option C */}
        <div className="d-flex justify-content-center align-items-center flex-row gap-4 flex-wrap">
          <div
            className="col-6 mb-3"
            style={{
              width: "fit-content",
            }}
          >
            <h4>C.</h4>
            <div className={`card p-3`} style={{ cursor: "pointer" }}>
              <p>{selectQuestion.textOptionsC}</p>
              {selectQuestion.imageOptionsC && (
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}${selectQuestion.imageOptionsC}`}
                  alt="Option C"
                  className="img-fluid"
                  style={{ maxWidth: "200px" }}
                />
              )}
            </div>
            <div className="form-check mt-2">
              <input
                type="checkbox"
                id="optionC"
                className="form-check-input"
                checked={selectedOptions.includes("C")}
                onChange={() => handleCheckboxChange("C")}
              />
              <label htmlFor="optionC" className="form-check-label">
                Select C
              </label>
            </div>
          </div>

          {/* Option D */}
          <div
            className="col-6 mb-3"
            style={{
              width: "fit-content",
            }}
          >
            <h4>D.</h4>
            <div className={`card p-3 `} style={{ cursor: "pointer" }}>
              <p>{selectQuestion.textOptionsD}</p>
              {selectQuestion.imageOptionsD && (
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}${selectQuestion.imageOptionsD}`}
                  alt="Option D"
                  className="img-fluid"
                  style={{ maxWidth: "200px" }}
                />
              )}
            </div>
            <div className="form-check mt-2">
              <input
                type="checkbox"
                id="optionD"
                className="form-check-input"
                checked={selectedOptions.includes("D")}
                onChange={() => handleCheckboxChange("D")}
              />
              <label htmlFor="optionD" className="form-check-label">
                Select D
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* <button
        className="btn btn-primary mt-3"
        onClick={() => console.log("Selected Option:")}
      >
        Submit Answer
      </button> */}
    </div>
  );
};

export default SelecQuestion;
