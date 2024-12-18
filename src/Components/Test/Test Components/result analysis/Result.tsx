import { RootState } from "@/Redux/Store";
import React from "react";
import { useSelector } from "react-redux";
import PieChart from "./PieChart";
import SubjectAnalysis from "./SubjectAnalysis";

interface LiveTestFormProps {
  setTest: React.Dispatch<React.SetStateAction<any>>;
}

interface SubjectData {
  totalQuestions: number;
  positiveMarksCount: number; // Count of positive marks instead of sum
}

const Result: React.FC<LiveTestFormProps> = ({ setTest }) => {
  const chart = useSelector((state: RootState) => state.chart);

  console.log(chart);

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

  return (
    <div className="w-100 h-auto d-flex justify-content-center align-items-center flex-row flex-wrap gap-4">
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
    </div>
  );
};

export default Result;
