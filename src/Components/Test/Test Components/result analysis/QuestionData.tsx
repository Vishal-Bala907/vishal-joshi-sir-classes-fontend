import { RootState } from "@/Redux/Store";
import { getQuestion } from "@/server/tests";
import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";

interface QUESTIONS {
  marks: number;
  questionId: string;
  questionStatus: string;
  rightAnswer: string | any[];
  userAnswer: string | any[];
  subject: string;

  description: string;
  level: string;

  // SELECT TYPE
  // Optional properties
  descriptionImage?: string;
  imageOptionsA?: string;
  imageOptionsB?: string;
  imageOptionsC?: string;
  imageOptionsD?: string;

  textOptionsA?: string;
  textOptionsB?: string;
  textOptionsC?: string;
  textOptionsD?: string;

  leftOptionsA?: string;
  leftOptionsB?: string;
  leftOptionsC?: string;
  leftOptionsD?: string;

  rightOptionsA?: string;
  rightOptionsB?: string;
  rightOptionsC?: string;
  rightOptionsD?: string;

  rightImagesA?: string;
  rightImagesB?: string;
  rightImagesC?: string;
  rightImagesD?: string;

  leftImagesA?: string;
  leftImagesB?: string;
  leftImagesC?: string;
  leftImagesD?: string;
}

interface SubjectData {
  totalQuestions: number;
  positiveMarksCount: number; // Count of positive marks instead of sum
}

const QuestionData = () => {
  const chart = useSelector((state: RootState) => state.chart);
  const [question, setquestion] = useState<QUESTIONS[]>([]);

  useEffect(() => {
    // setLoading(true);
    chart.forEach((c, ind) => {
      const qId = c.questionId;
      const qType = c.type;
      console.log(c);
      console.log(c.type);

      getQuestion(qId, qType)
        .then((data) => {
          // console.log(data);
          if (c.type === "integer") {
            const DATA = {
              marks: c.marks,
              questionId: c.questionId,
              questionStatus: c.questionStatus,
              rightAnswer: c.rightAnswer,
              userAnswer: c.userAnswer,
              subject: c.subject,

              description: data.description,
              level: data.level,
            };
            setquestion((prevState) => [...prevState, DATA]);
          } else if (c.type === "select") {
            const DATA = {
              marks: c.marks,
              questionId: c.questionId,
              questionStatus: c.questionStatus,
              rightAnswer: c.rightAnswer,
              userAnswer: c.userAnswer,
              subject: c.subject,

              description: data.description,
              level: data.level,

              descriptionImage:
                data.descriptionImage === "" ? "" : data.descriptionImage,

              imageOptionsA:
                data.imageOptionsA === "" ? "" : data.imageOptionsA,
              imageOptionsB:
                data.imageOptionsB === "" ? "" : data.imageOptionsB,
              imageOptionsC:
                data.imageOptionsC === "" ? "" : data.imageOptionsC,
              imageOptionsD:
                data.imageOptionsD === "" ? "" : data.imageOptionsD,

              textOptionsA: data.textOptionsA,
              textOptionsB: data.textOptionsB,
              textOptionsC: data.textOptionsC,
              textOptionsD: data.textOptionsD,
            };
            setquestion((prevState) => [...prevState, DATA]);
          } else {
            const DATA = {
              marks: c.marks,
              questionId: c.questionId,
              questionStatus: c.questionStatus,
              rightAnswer: c.rightAnswer,
              userAnswer: c.userAnswer,
              subject: c.subject,

              description: data.description,
              level: data.level,

              leftOptionsA: data.leftOptionsA,
              leftOptionsB: data.leftOptionsB,
              leftOptionsC: data.leftOptionsC,
              leftOptionsD: data.leftOptionsD,

              rightOptionsA: data.rightOptionsA,
              rightOptionsB: data.rightOptionsB,
              rightOptionsC: data.rightOptionsC,
              rightOptionsD: data.rightOptionsD,

              leftImagesA:
                data.leftImagesA === "" || data.leftImagessA
                  ? ""
                  : data.leftImagesA,
              leftImagesB:
                data.leftImagesB === "" || data.leftImagessB
                  ? ""
                  : data.leftImagesB,
              leftImagesC:
                data.leftImagesC === "" || data.leftImagessC
                  ? ""
                  : data.leftImagesC,
              leftImagesD:
                data.leftImagesD === "" || data.leftImagessD
                  ? ""
                  : data.leftImagesD,

              rightImagesA:
                data.rightImagesA === "" || data.rightImagessA
                  ? ""
                  : data.rightImagesA,
              rightImagesB:
                data.rightImagesB === "" || data.rightImagessB
                  ? ""
                  : data.rightImagesB,
              rightImagesC:
                data.rightImagesC === "" || data.rightImagessC
                  ? ""
                  : data.rightImagesC,
              rightImagesD:
                data.rightImagesD === "" || data.rightImagessD
                  ? ""
                  : data.rightImagesD,
            };
            // console.log(DATA);
            setquestion((prevState) => [...prevState, DATA]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
    // setLoading(false);
    return () => {
      // setLoading(false);
      setquestion([]);
      // location.reload();
    };
  }, [chart]);

  return (
    <div className="w-100 d-flex flex-column align-items-center gap-4">
      {/* <h3>Questions Data</h3> */}
      <div className="question-list w-100">
        {question.length > 0 ? (
          question.map((q, index) => (
            <div
              key={q.questionId}
              className="question-card p-3 mb-3 border rounded"
            >
              <div className="d-flex justify-content-center alogn-items-center flex-row flex-wrap gap-5">
                <p>
                  <strong>Subject:</strong> {q.subject}
                </p>
                <p>
                  <strong>Level:</strong> {q.level}
                </p>
                <p>
                  <strong>Status:</strong> {q.questionStatus}
                </p>
                <p>
                  <strong>Marks:</strong> {q.marks}
                </p>
              </div>
              <h6
                dangerouslySetInnerHTML={{
                  __html: q.description,
                }}
              >
                {/* {index + 1}. {q.description} */}
              </h6>
              {/*       <p className="d-flex flex-column">
                <strong>Right Answer:</strong>
                {Array.isArray(q.rightAnswer)
                  ? q.rightAnswer.map((answer, idx) => {
                      if (typeof answer === "object") {
                        // Handle array of objects
                        return (
                          <span key={idx}>
                            Left Option {idx + 1} <FaArrowRight /> Right Option{" "}
                            {answer.rightOption}
                            {idx !== q.rightAnswer.length - 1 ? ", " : ""}
                          </span>
                        );
                      } else {
                        // Handle array of strings
                        return (
                          <span key={idx}>
                            {answer}
                            {idx !== q.rightAnswer.length - 1 ? ", " : ""}
                          </span>
                        );
                      }
                    })
                  : // Handle simple string
                    q.rightAnswer}
              </p>
              <p className="d-flex flex-column">
                <strong>User Answer:</strong>
                {Array.isArray(q.userAnswer)
                  ? q.userAnswer.map((answer, idx) => {
                      if (typeof answer === "object") {
                        // Handle array of objects
                        return (
                          <span key={idx}>
                            Left Option {idx + 1} <FaArrowRight /> Right Option{" "}
                            {answer.right === "A"
                              ? 1
                              : answer.right === "B"
                              ? 2
                              : answer.right === "C"
                              ? 3
                              : 4}
                            {idx !== q.rightAnswer.length - 1 ? ", " : ""}
                          </span>
                        );
                      } else {
                        // Handle array of strings
                        return (
                          <span key={idx}>
                            {answer}
                            {idx !== q.rightAnswer.length - 1 ? ", " : ""}
                          </span>
                        );
                      }
                    })
                  : 
                    q.userAnswer}
              </p>
              */}
            </div>
          ))
        ) : (
          <p>No questions available.</p>
        )}
      </div>
    </div>
  );
  // </div>;
};

export default QuestionData;
