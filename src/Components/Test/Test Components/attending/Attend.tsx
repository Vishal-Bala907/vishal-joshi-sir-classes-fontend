import { RootState } from "@/Redux/Store";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import IntegerQuestion from "./IntegerQuestion";
import { attendTestNow, getQuestion } from "@/server/tests";
import SelecQuestion from "./SelecQuestion";
import MatchTheColumn from "./MatchTheColumn";
import {
  addQuestion,
  resetQuestions,
  submitTestCompleted,
} from "@/Redux/Reducers/UserAnswers";
import Info from "./Info";
import SubjectButtons from "./SubjectButtons";
import { resetAttending } from "@/Redux/Reducers/AttendStatus";
import { resetAttendFormData } from "@/Redux/Reducers/AttendSlice";
import CameraView from "@/Components/slider/CameraView";
import { SlMenu } from "react-icons/sl";
import { IoMdClose } from "react-icons/io";

interface LiveTestFormProps {
  setTest: React.Dispatch<React.SetStateAction<any>>;
}

const Attend: React.FC<LiveTestFormProps> = ({ setTest }) => {
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
    _id: "",
  });
  //* select type question
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
    _id: "",
  });
  //* match the column
  const [matchTheColumn, setmatchTheColumn] = useState({
    subject: "",
    topic: "",
    subtopic: "",
    level: "",
    type: "match",

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
    _id: "",
  });

  const [testCounter, settestCounter] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const test = useSelector((state: RootState) => state.attend);
  const user = useSelector((state: any) => state.user);

  // Check if the screen size is mobile
  // useEffect(() => {
  //   const checkIfMobile = () => {
  //     setIsMobile(window.innerWidth < 992); // Bootstrap lg breakpoint
  //   };

  //   // Initial check
  //   checkIfMobile();

  //   // Add event listener
  //   window.addEventListener("resize", checkIfMobile);

  //   // Clean up
  //   return () => window.removeEventListener("resize", checkIfMobile);
  // }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    test.Questions.forEach((SingleTest, index) => {
      console.log(SingleTest);
      const respone = {
        color: "white",
        questionIndex: index,
        questionId: SingleTest.questionId,
        testId: test._id,
        userId: user._id,
        rightAnswer: SingleTest.correctAnswer,
        userAnswer: "null",
        questionStatus: "INIT",
        type: SingleTest.questionType,
        subject: SingleTest.subject,
        marks: 0,
        timeTaken: 0,
      };
      dispatch(addQuestion(respone));
    });

    return () => {
      dispatch(resetAttending());
      dispatch(addQuestion([]));
      dispatch(resetAttendFormData());
      dispatch(resetQuestions());
    };
  }, []);

  const updateIndex = useCallback(
    (action: string) => {
      if (action === "INCREMENT") {
        if (testCounter < test.Questions.length - 1) {
          settestCounter((prev) => prev + 1);
        } else {
          toast.error("You have reached the last question.", {
            position: "top-center",
          });
        }
      } else if (action === "DECREMENT") {
        if (testCounter > 0) {
          settestCounter((prev) => prev - 1);
        } else {
          toast.error("You are already at the first question.", {
            position: "top-center",
          });
        }
      }
    },
    [testCounter, test.Questions.length, settestCounter]
  );

  const [loading, setLoadding] = useState(true);

  useEffect(() => {
    setLoadding(true);
    const questionId = test.Questions[testCounter].questionId;
    const type = test.Questions[testCounter].questionType;

    getQuestion(questionId, type)
      .then((data) => {
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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  function submitTest() {
    attendTestNow(test._id, user._id);
    dispatch(submitTestCompleted());
    dispatch(resetAttending());
  }

  if (loading) {
    return <div className="text-center p-5">Loading...</div>;
  }

  return (
    <div className="w-100 bg-primary">
      <div
        className="p-3"
        style={{
          background: "#F0DF87",
          height: "50px !important",
          width: "50px !important",
        }}
      >
        <b>{test.category}</b>
        <div>
          <CameraView />
        </div>
      </div>

      {/* Desktop and Mobile Layout */}
      <div className="bg-white text-dark w-100">
        {/* Desktop Layout */}
        {/* {!isMobile ? ( */}
        <div className="d-flex d-none d-md-flex justify-content-between align-items-start flex-row w-100 p-2 gap-3">
          <div className="question-container" style={{ width: "70%" }}>
            {test.Questions[testCounter].questionType === "integer" ? (
              <IntegerQuestion
                integerQuestion={integerQuestion}
                index={testCounter}
                testId={test._id}
                negativeMarking={Number(test.negativeMarking)}
                positiveMarking={Number(test.positiveMarking)}
                settestCounter={settestCounter}
              />
            ) : test.Questions[testCounter].questionType === "select" ? (
              <SelecQuestion
                selectQuestion={multiSelectQuestion}
                index={testCounter}
                testId={test._id}
                negativeMarking={Number(test.negativeMarking)}
                positiveMarking={Number(test.positiveMarking)}
                settestCounter={settestCounter}
              />
            ) : (
              <MatchTheColumn
                matchTheColumnQuestions={matchTheColumn}
                index={testCounter}
                testId={test._id}
                negativeMarking={Number(test.negativeMarking)}
                positiveMarking={Number(test.positiveMarking)}
                settestCounter={settestCounter}
              />
            )}

            <div className="mt-4">
              <button
                className="btn btn-info mx-2 timesUp"
                onClick={() => {
                  updateIndex("DECREMENT");
                }}
              >
                Previous
              </button>
              <button
                className="btn btn-info mx-2 timesUp"
                onClick={() => {
                  updateIndex("INCREMENT");
                }}
              >
                Next
              </button>

              <button
                onClick={() => {
                  submitTest();
                  setTest("TEST-LIST");
                }}
                className="btn btn-danger mx-2"
              >
                Submit Test
              </button>
            </div>
          </div>

          {/* Desktop Sidebar - Fixed on page */}
          <aside
            style={{
              borderLeft: "2px solid black",
              width: "30%",
            }}
            className="ps-3 h-100"
          >
            <Info />
            <SubjectButtons settestCounter={settestCounter} />
          </aside>
        </div>
        {/* ) : ( */}
        {/* Mobile Layout */}
        <span className="d-block d-md-none">
          <main className="d-flex flex-column w-100 p-2">
            <div className="d-flex justify-content-end mb-2">
              <button
                className="btn btn-sm btn-outline-dark"
                onClick={toggleSidebar}
                aria-label="Toggle sidebar"
              >
                <SlMenu size={18} />
              </button>
            </div>

            <div className="question-container">
              {test.Questions[testCounter].questionType === "integer" ? (
                <IntegerQuestion
                  integerQuestion={integerQuestion}
                  index={testCounter}
                  testId={test._id}
                  negativeMarking={Number(test.negativeMarking)}
                  positiveMarking={Number(test.positiveMarking)}
                  settestCounter={settestCounter}
                />
              ) : test.Questions[testCounter].questionType === "select" ? (
                <SelecQuestion
                  selectQuestion={multiSelectQuestion}
                  index={testCounter}
                  testId={test._id}
                  negativeMarking={Number(test.negativeMarking)}
                  positiveMarking={Number(test.positiveMarking)}
                  settestCounter={settestCounter}
                />
              ) : (
                <MatchTheColumn
                  matchTheColumnQuestions={matchTheColumn}
                  index={testCounter}
                  testId={test._id}
                  negativeMarking={Number(test.negativeMarking)}
                  positiveMarking={Number(test.positiveMarking)}
                  settestCounter={settestCounter}
                />
              )}

              <div className="mt-4">
                <button
                  className="btn btn-info mx-2 timesUp"
                  onClick={() => {
                    updateIndex("DECREMENT");
                  }}
                >
                  Previous
                </button>
                <button
                  className="btn btn-info mx-2 timesUp"
                  onClick={() => {
                    updateIndex("INCREMENT");
                  }}
                >
                  Next
                </button>

                <button
                  onClick={() => {
                    submitTest();
                    setTest("TEST-LIST");
                  }}
                  className="btn btn-danger mx-2"
                >
                  Submit Test
                </button>
              </div>
            </div>

            {/* Mobile Sidebar - Slides in from right */}
            <aside
              className={`sidebar position-fixed top-0 end-0 h-100 bg-white shadow p-3 transition-all ${
                sidebarOpen ? "show" : "hide"
              }`}
              style={{
                width: "300px",
                transform: sidebarOpen ? "translateX(0)" : "translateX(100%)",
                transition: "transform 0.3s ease-in-out",
                zIndex: 1000,
                borderLeft: "1px solid #dee2e6",
                overflowY: "auto",
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="m-0">Test Information</h5>
                <button
                  className="btn btn-sm btn-outline-dark"
                  onClick={toggleSidebar}
                  aria-label="Close sidebar"
                >
                  <IoMdClose size={18} />
                </button>
              </div>
              <Info />
              <SubjectButtons settestCounter={settestCounter} />
            </aside>

            {/* Backdrop for mobile */}
            {sidebarOpen && (
              <div
                className="position-fixed top-0 start-0 w-100 h-100"
                style={{
                  backgroundColor: "rgba(0,0,0,0.5)",
                  zIndex: 999,
                }}
                onClick={toggleSidebar}
              ></div>
            )}
          </main>
        </span>
        {/* )} */}
      </div>
    </div>
  );
};

export default Attend;
