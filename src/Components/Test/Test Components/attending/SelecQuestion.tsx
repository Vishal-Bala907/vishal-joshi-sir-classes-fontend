import { addQuestion, submitTestCompleted } from "@/Redux/Reducers/UserAnswers";
import { RootState } from "@/Redux/Store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles

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
    _id: string;
  };
  index: number;
  testId: string;
  negativeMarking: number;
  positiveMarking: number;
  settestCounter: React.Dispatch<React.SetStateAction<number>>;
}

const SelecQuestion: React.FC<IntegerQuestionProps> = ({
  selectQuestion,
  index,
  testId,
  negativeMarking,
  positiveMarking,
  settestCounter,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const start = Date.now();
  const handleCheckboxChange = (option: string) => {
    setSelectedOptions(
      (prev) =>
        prev.includes(option)
          ? prev.filter((item) => item !== option) // Remove if already selected
          : [...prev, option] // Add if not already selected
    );
  };

  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  function saveTheAnswer(color: string, action: string) {
    let ansStatus = false;

    const arr1 = selectQuestion.correctAnswer;
    const arr2 = selectedOptions;

    const countOccurrences = (arr: any) => {
      return arr.reduce((acc: any, char: string) => {
        acc[char] = (acc[char] || 0) + 1;
        return acc;
      }, {});
    };

    const map1 = countOccurrences(arr1);
    const map2 = countOccurrences(arr2);

    // Compare the keys and their counts
    for (let char in map1) {
      if (map1[char] !== map2[char]) {
        ansStatus = false;
      } else {
        ansStatus = true;
      }
    }

    if (arr1.length !== arr2.length) {
      ansStatus = false; // Different lengths mean arrays can't match.
    }

    const respone = {
      color: color,
      questionIndex: index,
      questionId: selectQuestion._id,
      testId: testId,
      userId: user._id,
      rightAnswer: selectQuestion.correctAnswer,
      userAnswer:
        action === "SAVE" || action === "SAVE"
          ? selectedOptions
          : action === "CLEAR"
          ? ""
          : action === "REVIEW"
          ? ""
          : "",
      questionStatus: ansStatus ? "CORRECT" : "INCORRECT",
      marks: ansStatus ? positiveMarking : negativeMarking,
      type: selectQuestion.type,
      subject: selectQuestion.subject,
      timeTaken: Date.now() - start,
    };

    dispatch(addQuestion(respone));
    console.log(respone);
    if (test.Questions.length - 1 > index) {
      settestCounter((prev) => prev + 1);
    } else {
      toast.success("No next question...", {
        position: "top-center",
      });
    }
  }

  const test = useSelector((state: RootState) => state.attend);

  return (
    <div className="container mt-4 w-100 rounded-4 p-3 my-4">
      <section
        className="d-flex justify-content-start align-items-center flex-row gap-4 flex-wrap"
        // style={{
        //   borderBottom: "2px solid",
        //   width: "fit-content",
        // }}
      >
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
        <div className="mb-3 text-center">
          <label className="form-label">Selection Mode</label>
          <p className="form-control-plaintext">
            {selectQuestion.correctAnswer.length > 1
              ? "Multi Select"
              : "Single Select"}
          </p>
        </div>
      </section>

      <div
        className="bg-white p-3 rounded-4"
        style={{
          border: "1px solid #00000029",
        }}
      >
        <div
          className="mt-3 border-bottom"
          style={{
            borderBottom: "2px dashed",
          }}
        >
          <h4 className="">Description</h4>
          <p
            className="fw-bold"
            dangerouslySetInnerHTML={{
              __html: selectQuestion.description,
            }}
          ></p>
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
          <div className="d-flex justify-content-evenly flex-row gap-4 flex-wrap">
            <div
              className="col-6 mb-3"
              style={{
                width: "fit-content",
              }}
            >
              <h6>A.</h6>
              <div className={`w-auto`} style={{ cursor: "pointer" }}>
                <p
                  dangerouslySetInnerHTML={{
                    __html: selectQuestion.textOptionsA,
                  }}
                >
                  {/* {} */}
                </p>
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
              <div className=" mt-2">
                <label htmlFor="optionA" className="form-check-label me-2">
                  Select A
                </label>
                <input
                  type="checkbox"
                  id="optionA"
                  className="form-check-input"
                  checked={selectedOptions.includes("A")}
                  onChange={() => handleCheckboxChange("A")}
                />
              </div>
            </div>

            {/* Option B */}
            <div
              className="col-6 mb-3"
              style={{
                width: "fit-content",
              }}
            >
              <h6>B.</h6>
              <div className={``} style={{ cursor: "pointer" }}>
                <p
                  dangerouslySetInnerHTML={{
                    __html: selectQuestion.textOptionsB,
                  }}
                ></p>
                {selectQuestion.imageOptionsB && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}${selectQuestion.imageOptionsB}`}
                    alt="Option B"
                    className="img-fluid "
                    style={{ maxWidth: "200px" }}
                  />
                )}
              </div>
              <div className=" mt-2">
                <label htmlFor="optionB" className="form-check-label me-2">
                  Select B
                </label>
                <input
                  type="checkbox"
                  id="optionB"
                  className="form-check-input"
                  checked={selectedOptions.includes("B")}
                  onChange={() => handleCheckboxChange("B")}
                />
              </div>
            </div>
            {/* </div> */}

            {/* Option C */}
            {/* <div className="d-flex justify-content-center align-items-center flex-row gap-4 flex-wrap"> */}
            <div
              className="col-6 mb-3"
              style={{
                width: "fit-content",
              }}
            >
              <h6>C.</h6>
              <div className={``} style={{ cursor: "pointer" }}>
                <p
                  dangerouslySetInnerHTML={{
                    __html: selectQuestion.textOptionsC,
                  }}
                ></p>
                {selectQuestion.imageOptionsC && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}${selectQuestion.imageOptionsC}`}
                    alt="Option C"
                    className="img-fluid"
                    style={{ maxWidth: "200px" }}
                  />
                )}
              </div>
              <div className=" mt-2">
                <label htmlFor="optionC" className="form-check-label me-2">
                  Select C
                </label>
                <input
                  type="checkbox"
                  id="optionC"
                  className="form-check-input"
                  checked={selectedOptions.includes("C")}
                  onChange={() => handleCheckboxChange("C")}
                />
              </div>
            </div>

            {/* Option D */}
            <div
              className="col-6 mb-3"
              style={{
                width: "fit-content",
              }}
            >
              <h6>D.</h6>
              <div className={``} style={{ cursor: "pointer" }}>
                <p
                  dangerouslySetInnerHTML={{
                    __html: selectQuestion.textOptionsD,
                  }}
                ></p>
                {selectQuestion.imageOptionsD && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}${selectQuestion.imageOptionsD}`}
                    alt="Option D"
                    className="img-fluid"
                    style={{ maxWidth: "200px" }}
                  />
                )}
              </div>
              <div className="mt-2">
                <label htmlFor="optionD" className="form-check-label me-2">
                  Select D
                </label>
                <input
                  type="checkbox"
                  id="optionD"
                  className="form-check-input"
                  checked={selectedOptions.includes("D")}
                  onChange={() => handleCheckboxChange("D")}
                />
              </div>
            </div>
          </div>
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
  );
};

export default SelecQuestion;
