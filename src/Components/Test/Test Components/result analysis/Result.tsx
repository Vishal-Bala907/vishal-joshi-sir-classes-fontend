import { RootState } from "@/Redux/Store";
import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PieChart from "./PieChart";
import SubjectAnalysis from "./SubjectAnalysis";
import { FaArrowLeft } from "react-icons/fa";
// import "./matchTheColumn.css";
import QuestionData from "./QuestionData";
import BarChart from "./BarChart";
import TimeTakenBarChart from "./TimeTakenBarChart";
import DataCard from "./DataCard"; // Import the DataCard component
import AOS from "aos";
import "aos/dist/aos.css";
import LeaderBoadrd from "./LeaderBoadrd";
// import RulerSlider from "@/Components/slider/RulerSlider";
// import SliderWithTicks from "@/Components/slider/SliderWithTicks";

interface LiveTestFormProps {
  setTest: React.Dispatch<React.SetStateAction<any>>;
}

interface SubjectData {
  totalQuestions: number;
  positiveMarksCount: number;
  totalTime: number; // Time in milliseconds
  totalMarksCount: number; // Ensure this is included if needed
}

interface ChartData {
  subject: string;
  marks: number;
  timeTaken: number; // Add timeTaken here for processing
  questionStatus: "INIT" | "CORRECT" | "INCORRECT"; // Status of the question
}

const Result: React.FC<LiveTestFormProps> = memo(({ setTest }) => {
  const chart = useSelector((state: RootState) => state.chart);

  const [subjectsData, setSubjectsData] = useState<{
    [key: string]: SubjectData;
  }>({});
  const [totalMarks, setTotalMarks] = useState<number>(0);
  const [obtained, setObtained] = useState<number>(0);
  const [totalAnswered, setTotalAnswered] = useState<number>(0);
  const [totalUnanswered, setTotalUnanswered] = useState<number>(0);
  const [totalPositiveMarks, setTotalPositiveMarks] = useState<number>(0);
  const [totalNegativeMarks, setTotalNegativeMarks] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);

  const safeChart = chart as unknown as ChartData[];

  const calculateData = () => {
    let answered = 0;
    let unanswered = 0;
    let positiveMarks = 0;
    let negativeMarks = 0;
    let totalTimeTaken = 0;
    const aggregatedSubjectsData: { [key: string]: SubjectData } = {};

    safeChart.forEach((data) => {
      totalTimeTaken += Number(data.timeTaken);

      if (data.questionStatus === "CORRECT") {
        positiveMarks += 1;
        answered += 1;
      } else if (data.questionStatus === "INCORRECT") {
        negativeMarks += 1;
        answered += 1;
      } else if (data.questionStatus === "INIT") {
        unanswered += 1;
      }

      const subject = data.subject;

      if (subject) {
        if (!aggregatedSubjectsData[subject]) {
          aggregatedSubjectsData[subject] = {
            totalQuestions: 0,
            positiveMarksCount: 0,
            totalTime: 0,
            totalMarksCount: 0, // Ensure this is included if needed
          };
        }

        aggregatedSubjectsData[subject].totalQuestions += 1;

        if (data.questionStatus === "CORRECT") {
          aggregatedSubjectsData[subject].positiveMarksCount += 1;
        }

        aggregatedSubjectsData[subject].totalTime += Number(data.timeTaken);
      }
    });

    setTotalMarks(safeChart.length * 4);
    setTotalAnswered(answered);
    setTotalUnanswered(unanswered);
    setTotalPositiveMarks(positiveMarks);
    setTotalNegativeMarks(negativeMarks);
    setSubjectsData(aggregatedSubjectsData);
    setTotalTime(totalTimeTaken);
  };

  useEffect(() => {
    calculateData();
    AOS.init();
  }, [chart]);

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
      {/* <RulerSlider /> <br /> */}
      {/* <SliderWithTicks /> */}
      {/* <div>{Math.floor(Math.random() * 100000) + 1}</div> */}
      <div
        className="w-100 d-flex justify-content-center flex-row flex-wrap align-items-center gap-3 mt-4"
        data-aos="fade-up"
      >
        <DataCard
          totalQuestions={safeChart.length || 0}
          totalMarks={totalMarks}
          totalAnswered={totalAnswered}
          totalUnanswered={totalUnanswered}
          totalPositiveMarks={totalPositiveMarks}
          totalNegativeMarks={totalNegativeMarks}
          subjectsData={subjectsData}
          totalTime={totalTime}
        />
      </div>
      <div className="w-100">
        <LeaderBoadrd />
      </div>
      <div
        className="w-100 d-flex justify-content-center align-content-center"
        data-aos="fade-left"
      >
        <PieChart
          totalPositiveMarks={totalPositiveMarks}
          totalNegativeMarks={totalNegativeMarks}
          totalUnanswered={totalUnanswered}
        />
      </div>
      <div className="w-100 d-flex justify-content-center align-content-center flex-row flex-wrap gap-3">
        <BarChart
          totalPositiveMarks={totalPositiveMarks}
          totalNegativeMarks={totalNegativeMarks}
          totalUnanswered={totalUnanswered}
        />
        <TimeTakenBarChart subjectsData={subjectsData} />
      </div>
      <hr
        style={{
          width: "70%",
          height: "2px",
          backgroundColor: "red",
        }}
      />
      <div className="w-100 d-flex justify-content-center align-items-center flex-row flex-wrap gap-4 overflow-hidden">
        {Object.keys(subjectsData).map((subject) => {
          const { totalQuestions, positiveMarksCount } = subjectsData[subject];
          return (
            <div key={subject} data-aos="fade-left">
              <SubjectAnalysis
                subject={subject}
                totalQuestions={totalQuestions}
                positiveMarksCount={positiveMarksCount}
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
