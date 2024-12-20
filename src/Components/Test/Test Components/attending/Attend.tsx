import { RootState } from "@/Redux/Store";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import img from "/myImages/logo3.png";
import { toast } from "react-toastify";
import IntegerQuestion from "./IntegerQuestion";
import { getQuestion } from "@/server/tests";
import SelecQuestion from "./SelecQuestion";
import MatchTheColumn from "./MatchTheColumn";
import { addQuestion, submitTestCompleted } from "@/Redux/Reducers/UserAnswers";
import Info from "./Info";
import SubjectButtons from "./SubjectButtons";

interface LiveTestFormProps {
  setTest: React.Dispatch<React.SetStateAction<any>>;
}

const Attend: React.FC<LiveTestFormProps> = ({ setTest }) => {
  // const subjects = ["Maths", "Physics", "Chemistry", "Biology"];
  // const options = ["Easy", "Medium", "Hard"];

  // State to hold the selected difficulty for each subject
  const [selections, setSelections] = useState<{ [key: string]: string }>({
    Maths: "Easy",
    Physics: "Easy",
    Chemistry: "Easy",
    Biology: "Easy",
  });

  // Handler for updating the selection
  // const handleSelectionChange = (subject: string, value: string) => {
  //   setSelections((prevSelections) => ({
  //     ...prevSelections,
  //     [subject]: value,
  //   }));
  // };

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
    _id: "",
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
    _id: "",
  });

  const [testCounter, settestCounter] = useState(0);
  const test = useSelector((state: RootState) => state.attend);
  const user = useSelector((state: RootState) => state.user);
  // const userAnswers = useSelector((state: RootState) => state.answer.questions);

  // Memoized Time Difference
  const timeDifference = useMemo(() => {
    const currentTime = new Date();
    const currentMinutes =
      currentTime.getHours() * 60 + currentTime.getMinutes();
    const [startHour, startMinute] = test.time.split(":").map(Number);
    const testStartMinutes = startHour * 60 + startMinute;
    const testEndMinutes = testStartMinutes + parseInt(test.timeDuration, 10);
    return testEndMinutes - currentMinutes;
  }, [test.time, test.timeDuration]);

  const dispatch = useDispatch();
  // console.log(test);
  // console.log(testCounter);

  useEffect(() => {
    // setting all answer to incorrect
    console.log("hello");
    test.Questions.forEach((SingleTest, index) => {
      console.log(SingleTest);
      const status = "INIT";
      const respone = {
        color: "white",
        questionIndex: index,
        questionId: SingleTest.questionId,
        testId: test._id,
        userId: user._id,
        rightAnswer: SingleTest.correctAnswer,
        userAnswer: "null",
        questionStatus: "INIT",
        type: SingleTest.type,
        subject: SingleTest.subject,
        marks: status === "INIT" ? test.positiveMarking : test.negativeMarking,
      };

      dispatch(addQuestion(respone));
    });
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

  // function updateIndex (action: string) {
  //   if (action === "INCREMENT") {
  //     if (testCounter < test.Questions.length - 1) {
  //       settestCounter((prev) => prev + 1);
  //     } else {
  //       toast.error("Already at the end", {
  //         position: "top-center",
  //       });
  //     }
  //   } else {
  //     if (testCounter > 0) {
  //       settestCounter((prev) => prev - 1);
  //     } else {
  //       toast.error("No previous questions are available", {
  //         position: "top-center",
  //       });
  //     }
  //   }
  // }

  const [loading, setLoadding] = useState(true);

  useEffect(() => {
    setLoadding(true);
    const questionId = test.Questions[testCounter].questionId;
    const type = test.Questions[testCounter].questionType;
    // fetch the question with question id and question type
    // console.log(questionId);
    // console.log(type);
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
    dispatch(submitTestCompleted());
  }

  return (
    <div className="w-100 bg-primary-subtle">
      <div className="p-3 bg-warning">
        <b> {test.category}</b>
      </div>
      <main className="bg-light text-dark d-flex justify-content-between align-items-center flex-row  w-100 p-2 gap-3">
        <div
          className=""
          style={{
            width: "60%",
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
            width: "40%",
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
