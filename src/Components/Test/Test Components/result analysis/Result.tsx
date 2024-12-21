import { RootState } from "@/Redux/Store";
import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PieChart from "./PieChart";
import SubjectAnalysis from "./SubjectAnalysis";
import { FaArrowLeft } from "react-icons/fa";
import "./matchTheColumn.css";
import QuestionData from "./QuestionData";

interface LiveTestFormProps {
  setTest: React.Dispatch<React.SetStateAction<any>>;
}

interface SubjectData {
  totalQuestions: number;
  positiveMarksCount: number; // Count of positive marks instead of sum
}

const Result: React.FC<LiveTestFormProps> = memo(({ setTest }) => {
  const chart = useSelector((state: RootState) => state.chart);

  // Total marks and obtained marks (sum of all positive marks)
  const totalMarks = chart.length * 4; // Assuming each question carries 4 marks
  let obtained = 0;

  // Grouped data by subject
  const subjectsData: { [key: string]: SubjectData } = {};

  // Loop through chart data to calculate total questions and count of positive marks grouped by subject
  chart.forEach((data: { subject: string; marks: number }) => {
    obtained += data.marks;

    const subject = data.subject;

    if (subject) {
      // Initialize the subject if not already present
      if (!subjectsData[subject]) {
        subjectsData[subject] = { totalQuestions: 0, positiveMarksCount: 0 };
      }

      // Increment total questions for the subject
      subjectsData[subject].totalQuestions += 1;

      // Count positive marks only (ignore negative marks)
      if (data.marks > 0) {
        subjectsData[subject].positiveMarksCount += 1;
      }
    }
  });

  // Calculate percentage
  const percentage = (obtained / totalMarks) * 100;

  // if (loading) {
  //   return <div>Data is loading</div>;
  // }

  return (
    <div className="w-100 h-auto d-flex justify-content-center align-items-center flex-row flex-wrap gap-4 position-relative">
      <FaArrowLeft
        style={{
          position: "absolute",
          top: "0px",
          left: "20px",
          zIndex: 10,
        }}
        onClick={() => {
          setTest("TEST-LIST");
        }}
      />
      <div className="w-100">
        <PieChart subjectsData={subjectsData} />
      </div>
      <hr
        style={{
          width: "70%",
          height: "2px",
          backgroundColor: "red",
        }}
      />
      <div className="w-100 d-flex justify-content-center align-items-center flex-row flex-wrap gap-4">
        {Object.keys(subjectsData).map((subject) => {
          const { totalQuestions, positiveMarksCount } = subjectsData[subject]; // Extract count of positive marks per subject
          return (
            <div key={subject}>
              <SubjectAnalysis
                subject={subject}
                totalQuestions={totalQuestions}
                positiveMarksCount={positiveMarksCount} // Pass the count of positive marks to SubjectAnalysis
              />
              <p className="text-center">{subject}</p>
            </div>
          );
        })}
      </div>

      <hr
        style={{
          width: "70%",
          height: "2px",
          backgroundColor: "blue",
        }}
      />
      <QuestionData />
    </div>
  );
});

export default Result;
