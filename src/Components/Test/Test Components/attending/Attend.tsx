import { RootState } from "@/Redux/Store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import img from "/myImages/logo3.png";
import img from "./logo3.png";
import CountdownTimer from "./CountdownTimer";
import { toast } from "react-toastify";
import IntegerQuestion from "./IntegerQuestion";
import { getQuestion } from "@/server/tests";
import SelecQuestion from "./SelecQuestion";
import MatchTheColumn from "./MatchTheColumn";

const Attend = () => {
  const subjects = ["Maths", "Physics", "Chemistry", "Biology"];
  const options = ["Easy", "Medium", "Hard"];

  // State to hold the selected difficulty for each subject
  const [selections, setSelections] = useState<{ [key: string]: string }>({
    Maths: "Easy",
    Physics: "Easy",
    Chemistry: "Easy",
    Biology: "Easy",
  });

  // Handler for updating the selection
  const handleSelectionChange = (subject: string, value: string) => {
    setSelections((prevSelections) => ({
      ...prevSelections,
      [subject]: value,
    }));
  };

  // question states
  //* Integer question
  const [integerQuestion, setintegerQuestion] = useState({
    subject: "",
    topic: "",
    subtopic: "",
    level: "",
    type: "integer",
    description: "",
    correctAnswer: "",
  });
  //* Integer question
  const [multiSelectQuestion, setmultiSelectQuestion] = useState({
    subject: "",
    topic: "",
    subtopic: "",
    level: "easy",
    type: "select",
    description: "",
    descriptionImage: "",
    optionType: "text",
    textOptionsA: "",
    textOptionsB: "",
    textOptionsC: "",
    textOptionsD: "",
    imageOptionsA: "",
    imageOptionsB: "",
    imageOptionsC: "",
    imageOptionsD: "",
    correctAnswer: [],
  });
  //* match the column
  const [matchTheColumn, setmatchTheColumn] = useState({
    subject: "",
    topic: "",
    subtopic: "",
    level: "",
    type: "",

    leftOptionsA: "",
    leftOptionsB: "",
    leftOptionsC: "",
    leftOptionsD: "",

    rightOptionsA: "",
    rightOptionsB: "",
    rightOptionsC: "",
    rightOptionsD: "",

    leftImagesA: "",
    leftImagesB: "",
    leftImagesC: "",
    leftImagesD: "",

    rightImagesA: "",
    rightImagesB: "",
    rightImagesC: "",
    rightImagesD: "",

    correctMatchings: [],
    optionType: "",
    description: "",

    // New field for description image
    descriptionImage: "",
  });

  const [testCounter, settestCounter] = useState(0);
  const test = useSelector((state: RootState) => state.attend);
  const user = useSelector((state: RootState) => state.user);
  console.log(test.Questions);
  console.log(testCounter);
  function updateIndex(action: string) {
    if (action === "INCREMENT") {
      if (testCounter < test.Questions.length - 1) {
        settestCounter((prev) => prev + 1);
      } else {
        toast.error("Already at the end", {
          position: "top-center",
        });
      }
    } else {
      if (testCounter > 0) {
        settestCounter((prev) => prev - 1);
      } else {
        toast.error("No previous questions are available", {
          position: "top-center",
        });
      }
    }
  }

  const [loading, setLoadding] = useState(true);

  useEffect(() => {
    setLoadding(true);
    const questionId = test.Questions[testCounter].questionId;
    const type = test.Questions[testCounter].questionType;
    // fetch the question with question id and question type
    console.log(questionId);
    console.log(type);
    getQuestion(questionId, type)
      .then((data) => {
        // console.log(data);
        if (type === "integer") {
          setintegerQuestion(data);
        } else if (type === "select") {
          setmultiSelectQuestion(data);
        } else {
          setmatchTheColumn(data);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoadding(false);
      });
  }, [testCounter]);
  if (loading) {
    return <div>Loadding</div>;
  }

  return (
    <div className="w-100 bg-primary-subtle">
      <header className="w-100">
        <section className="d-flex justify-content-between align-items-center flex-row w-100 p-2">
          <div className="left d-flex justify-content-center align-items-center flex-row">
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/logo3.png`}
              alt="image"
            />
            <h3>{test.testName}</h3>
          </div>
          <div className="right  align-items-center flex-row">
            <div>
              Candidate name <b>{user.name}</b>
            </div>
            <CountdownTimer minutes={Number(test.timeDuration)} />
          </div>
        </section>
      </header>
      <div className="p-3 bg-warning">
        <b> {test.category}</b>
      </div>
      <main className="bg-light text-dark d-flex justify-content-between align-items-center flex-row  w-100 p-2 gap-3">
        <div className="w-75">
          {test.Questions[testCounter].questionType === "integer" ? (
            <IntegerQuestion integerQuestion={integerQuestion} />
          ) : test.Questions[testCounter].questionType === "select" ? (
            <SelecQuestion selectQuestion={multiSelectQuestion} />
          ) : (
            <MatchTheColumn matchTheColumnQuestions={matchTheColumn} />
          )}

          <div>
            <button
              className="btn btn-info mx-3"
              onClick={() => {
                updateIndex("DECREMENT");
              }}
            >
              Previous
            </button>
            <button
              className="btn btn-info mx-3"
              onClick={() => {
                updateIndex("INCREMENT");
              }}
            >
              Next
            </button>
            <button className="btn btn-danger mx-3">Submit Test</button>
          </div>
        </div>
        <aside
          style={{
            borderLeft: "2px solid black",
          }}
          className="w-25 ps-2"
        >
          <h6>Select Difficulty Levels</h6>
          {subjects.map((subject) => (
            <div className="col-md-6" key={subject}>
              <label htmlFor={subject} className="form-label">
                {subject}:
              </label>
              <select
                id={subject}
                className="form-select"
                value={selections[subject]}
                onChange={(e) => handleSelectionChange(subject, e.target.value)}
              >
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </aside>
      </main>
    </div>
  );
};

export default Attend;
