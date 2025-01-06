import { RootState } from "@/Redux/Store";
import { getQuestion } from "@/server/tests";
import React, { useEffect, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import gsap from "gsap";
import "./result.css";
interface QUESTIONS {
  marks: number;
  questionId: string;
  questionStatus: string;
  rightAnswer: string | any[];
  userAnswer: string | any[];
  subject: string;

  description: string;
  level: string;
  timeTaken: number;

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
      // console.log(c);
      // console.log(c.type);

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
              timeTaken: c.timeTaken,
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
              timeTaken: c.timeTaken,
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
              timeTaken: c.timeTaken,
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

  const questionRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.fromTo(
      questionRefs.current,
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.1,
        duration: 1,
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <div className="question-list-container">
      <h3 className="title">Questions Data</h3>
      <div className="row question-list gx-4 gy-5">
        {question.length > 0 ? (
          question.map((q, index) => (
            <div
              key={q.questionId}
              className="col-12 col-md-6 d-flex justify-content-center"
              ref={(el) => (questionRefs.current[index] = el!)}
            >
              <div className="question-card">
                <div className="question-details">
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
                  <p>
                    <strong>Time Taken:</strong> {q.timeTaken / 1000} sec
                  </p>
                </div>
                <h6
                  className="question-description"
                  dangerouslySetInnerHTML={{
                    __html: q.description,
                  }}
                ></h6>
              </div>
            </div>
          ))
        ) : (
          <p className="no-questions">No questions available.</p>
        )}
      </div>
    </div>
  );
  // </div>;
};

export default QuestionData;
