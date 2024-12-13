import React, { useState } from "react";

interface MatchColumnFormData {
  matchTheColumnQuestions: {
    subject: string;
    topic: string;
    subtopic: string;
    level: string;
    type: string;

    leftOptionsA: string;
    leftOptionsB: string;
    leftOptionsC: string;
    leftOptionsD: string;

    rightOptionsA: string;
    rightOptionsB: string;
    rightOptionsC: string;
    rightOptionsD: string;

    leftImagesA: string;
    leftImagesB: string;
    leftImagesC: string;
    leftImagesD: string;

    rightImagesA: string;
    rightImagesB: string;
    rightImagesC: string;
    rightImagesD: string;

    correctMatchings: { leftOption: number; rightOption: number }[];
    optionType: string;
    description: string;

    descriptionImage: string;
  };
}

const MatchTheColumn: React.FC<MatchColumnFormData> = ({
  matchTheColumnQuestions,
}) => {
  const [matches, setMatches] = useState<{ left: string; right: string }[]>([]);

  const handleMatchChange = (leftOption: string, rightOption: string) => {
    setMatches((prev) => {
      const existingMatchIndex = prev.findIndex(
        (match) => match.left === leftOption
      );

      if (existingMatchIndex !== -1) {
        // Update the existing match
        const updatedMatches = [...prev];
        updatedMatches[existingMatchIndex] = {
          left: leftOption,
          right: rightOption,
        };
        return updatedMatches;
      } else {
        // Add a new match
        return [...prev, { left: leftOption, right: rightOption }];
      }
    });
  };
  console.log(matches);

  const handleSubmit = () => {
    console.log("Submitted Matches:", matches);
  };

  return (
    <div className="container mt-4 w-75 bg-light rounded-4 p-3 text-dark">
      {/* Question Metadata */}
      <section className="d-flex justify-content-center align-items-center flex-row gap-4 flex-wrap">
        <div className="mb-3 text-center">
          <label className="form-label">Subject</label>
          <p className="form-control-plaintext">
            {matchTheColumnQuestions.subject}
          </p>
        </div>
        <div className="mb-3 text-center">
          <label className="form-label">Topic</label>
          <p className="form-control-plaintext">
            {matchTheColumnQuestions.topic}
          </p>
        </div>
        <div className="mb-3 text-center">
          <label className="form-label">Subtopic</label>
          <p className="form-control-plaintext">
            {matchTheColumnQuestions.subtopic}
          </p>
        </div>
        <div className="mb-3 text-center">
          <label className="form-label">Level</label>
          <p className="form-control-plaintext">
            {matchTheColumnQuestions.level}
          </p>
        </div>
      </section>

      {/* Description */}
      <div className="mt-3">
        <p className="fw-bold">{matchTheColumnQuestions.description}</p>
        {matchTheColumnQuestions.descriptionImage && (
          <div className="text-center mb-3">
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_URL}${matchTheColumnQuestions.descriptionImage}`}
              alt="Description"
              className="img-fluid"
              style={{ maxWidth: "400px" }}
            />
          </div>
        )}
      </div>

      {/* Columns for Matching */}
      <div className="row mt-4">
        {/* Left Column */}
        <div className="col-md-6">
          <h5 className="text-center">Left Column</h5>
          {[
            {
              option: "A",
              text: matchTheColumnQuestions.leftOptionsA,
              image: matchTheColumnQuestions.leftImagesA,
            },
            {
              option: "B",
              text: matchTheColumnQuestions.leftOptionsB,
              image: matchTheColumnQuestions.leftImagesB,
            },
            {
              option: "C",
              text: matchTheColumnQuestions.leftOptionsC,
              image: matchTheColumnQuestions.leftImagesC,
            },
            {
              option: "D",
              text: matchTheColumnQuestions.leftOptionsD,
              image: matchTheColumnQuestions.leftImagesD,
            },
          ].map((item) => (
            <div key={item.option} className="mb-3">
              <p>
                {item.option}. {item.text}
              </p>
              {item.image && (
                <img
                  src={process.env.NEXT_PUBLIC_BASE_URL + item.image}
                  alt={`Left Option ${item.option}`}
                  className="img-fluid"
                  style={{ maxWidth: "150px" }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="col-md-6">
          <h5 className="text-center">Right Column</h5>
          {[
            {
              option: "A",
              text: matchTheColumnQuestions.rightOptionsA,
              image: matchTheColumnQuestions.rightImagesA,
            },
            {
              option: "B",
              text: matchTheColumnQuestions.rightOptionsB,
              image: matchTheColumnQuestions.rightImagesB,
            },
            {
              option: "C",
              text: matchTheColumnQuestions.rightOptionsC,
              image: matchTheColumnQuestions.rightImagesC,
            },
            {
              option: "D",
              text: matchTheColumnQuestions.rightOptionsD,
              image: matchTheColumnQuestions.rightImagesD,
            },
          ].map((item) => (
            <div key={item.option} className="mb-3">
              <p>
                {item.option}. {item.text}
              </p>
              {item.image && (
                <img
                  src={process.env.NEXT_PUBLIC_BASE_URL + item.image}
                  alt={`Right Option ${item.option}`}
                  className="img-fluid"
                  style={{ maxWidth: "150px" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Matching Form */}
      <div className="mt-4">
        <h5 className="text-center">Match the Options</h5>
        {["A", "B", "C", "D"].map((leftOption) => (
          <div key={leftOption} className="row align-items-center mb-3">
            <div className="col-md-6">
              <label className="form-label">Match for {leftOption}</label>
            </div>
            <div className="col-md-6">
              <select
                className="form-select"
                onChange={(e) => handleMatchChange(leftOption, e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>
                  Select Right Option
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
          </div>
        ))}
        {/* <button className="btn btn-primary mt-3" onClick={handleSubmit}>
          Submit
        </button> */}
      </div>
    </div>
  );
};

export default MatchTheColumn;
