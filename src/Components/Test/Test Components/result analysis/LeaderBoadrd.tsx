"use client";
import { RootState } from "@/Redux/Store";
import { getTestLeaderBoard } from "@/server/tests";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LiveTestResults from "./card/LiveTestResult";
import "./LeaderBoadrd.css"; // Add CSS in a separate file for modular styling

export interface TestStats {
  userId: string;
  testId: string;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  accuracy: number;
  totalTimeTaken: number;
  averageTimePerQuestion: number;
  createdAt?: Date;
  mark: number;
  obtainedMarks: number;
}

const defaultTestStats: TestStats = {
  userId: "N/A",
  testId: "N/A",
  correctCount: 0,
  incorrectCount: 0,
  unansweredCount: 0,
  accuracy: 0,
  totalTimeTaken: 0,
  averageTimePerQuestion: 0,
  createdAt: new Date(),
  mark: 0, // Change mark to literal 0
  obtainedMarks: 0,
};
const LeaderBoadrd = () => {
  const chart = useSelector((state: RootState) => state.chart);
  const user = useSelector((state: any) => state.user);
  const [leaderboardData, setLeaderBoardData] = useState<TestStats[]>([]);
  const [maxCorrectCountData, setMaxCorrectCountData] =
    useState<TestStats>(defaultTestStats);
  const [userData, setUserData] = useState<TestStats>(defaultTestStats);
  const [averageStats, setAverageStats] = useState<TestStats>(defaultTestStats);
  const [userIndex, setUserIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [animatedRank, setAnimatedRank] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (!chart.length) {
      console.error("No test data available in chart state.");
      return;
    }

    getTestLeaderBoard(chart[0].testId)
      .then((data) => {
        console.log(data);
        const fetchedData = data.leaderboard as TestStats[];

        // Sort by correctCount in descending order
        const sortedData = [...fetchedData].sort(
          (a, b) => b.correctCount - a.correctCount
        );

        // Find max correct count data
        const maxCorrectData = sortedData[0] || defaultTestStats;

        // Find current user's data
        const userTestData =
          sortedData.find((item) => item.userId === user._id) ||
          defaultTestStats;

        // Calculate average stats
        const totalEntries = sortedData.length;
        if (totalEntries > 0) {
          const totalStats = sortedData.reduce(
            (acc, item) => {
              acc.correctCount += item.correctCount;
              acc.incorrectCount += item.incorrectCount;
              acc.unansweredCount += item.unansweredCount;
              acc.accuracy += item.accuracy;
              acc.totalTimeTaken += item.totalTimeTaken;
              acc.averageTimePerQuestion += item.averageTimePerQuestion;
              return acc;
            },
            {
              correctCount: 0,
              incorrectCount: 0,
              unansweredCount: 0,
              accuracy: 0,
              totalTimeTaken: 0,
              averageTimePerQuestion: 0,
            }
          );

          setAverageStats({
            userId: "average",
            testId: chart[0].testId,
            correctCount: totalStats.correctCount / totalEntries,
            incorrectCount: totalStats.incorrectCount / totalEntries,
            unansweredCount: totalStats.unansweredCount / totalEntries,
            accuracy: totalStats.accuracy / totalEntries,
            totalTimeTaken: totalStats.totalTimeTaken / totalEntries,
            averageTimePerQuestion:
              totalStats.averageTimePerQuestion / totalEntries,
            mark: 0, // Average doesn't apply to these fields
            obtainedMarks: 0,
          });
        }

        // Find user index in sorted data
        const userIdx = sortedData.findIndex(
          (item) => item.userId === user._id
        );

        setLeaderBoardData(sortedData);
        setMaxCorrectCountData(maxCorrectData);
        setUserData(userTestData);
        setUserIndex(userIdx);
      })
      .catch((err) => {
        console.error("Error fetching leaderboard data:", err);
      })
      .finally(() => {
        setLoading(false);
      });
    setAnimatedRank(true);
    const timeout = setTimeout(() => setAnimatedRank(false), 1000);
    return () => clearTimeout(timeout);
  }, [chart, user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="d-flex justify-content-center align-items-center gap-4 overflow-hidden">
        <h3 className="modern-text">Rank:</h3>
        <span
          className={`rank-number fs-3 fw-bold ${animatedRank ? "pop-in" : ""}`}
        >
          #{userIndex + 1}
        </span>
      </div>
      <div>
        <h1 className="text-center">Comparative analysis</h1>
        <div className="w-100 d-flex justify-content-center align-items-center flex-row flex-wrap">
          <LiveTestResults name={user.name || "You"} data={userData} />
          <LiveTestResults name="Topper" data={maxCorrectCountData} />
          <LiveTestResults name="Average" data={averageStats} />
        </div>
      </div>
    </>
  );
};

export default LeaderBoadrd;
