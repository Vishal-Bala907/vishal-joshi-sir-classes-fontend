import { RootState } from "@/Redux/Store";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import img from "/myImages/logo3.png";
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
  const test = useSelector((state: RootState) => state.attend);
  const user = useSelector((state: any) => state.user);

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
      // alert("heyyy");

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

  function submitTest() {
    attendTestNow(test._id, user._id);
    dispatch(submitTestCompleted());
    dispatch(resetAttending());
  }

  return (
    <div className="w-100 bg-primary-subtle">
      <div className="p-3 bg-warning">
        <b> {test.category}</b>
        <div style={{ height: "50px !important", width: "50px !important" }}>
          <CameraView />
        </div>
      </div>
      <main className="bg-light text-dark d-flex justify-content-between align-items-center flex-row  w-100 p-2 gap-3">
        <div
          className=""
          style={{
            width: "70%",
          }}
        >
          {test.Questions[testCounter].questionType === "integer" ? (
            // index , questionId , testId, userId, rightAnswer
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

          <div>
            <button
              className="btn btn-info mx-3 timesUp"
              onClick={() => {
                updateIndex("DECREMENT");
              }}
            >
              Previous
            </button>
            <button
              className="btn btn-info mx-3 timesUp"
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
              className="btn btn-danger mx-3"
            >
              Submit Test
            </button>
          </div>
        </div>
        <aside
          style={{
            borderLeft: "2px solid black",
            width: "30%",
          }}
          className="ps-2 h-100"
        >
          <Info />
          <SubjectButtons settestCounter={settestCounter} />
        </aside>
      </main>
    </div>
  );
};

export default Attend;
