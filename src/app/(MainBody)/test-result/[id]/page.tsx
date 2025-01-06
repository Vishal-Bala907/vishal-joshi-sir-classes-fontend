"use client";
import LiveTestResults from "@/Components/Test/Test Components/result analysis/card/LiveTestResult";
import Leaderboard2 from "@/Components/Test/Test Components/result analysis/LeaderBoard2";
import { getTestLeaderBoard } from "@/server/tests";
import { getOtherUserProfile } from "@/server/user";
import React, { useEffect, useState } from "react";

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
  mark: 0,
  obtainedMarks: 0,
};

const Page: React.FC<{ params: { id: string } }> = ({ params }) => {
  const { id } = params;
  const [leaderboardData, setLeaderBoardData] = useState<TestStats[]>([]);
  const [topScorers, setTopScorers] = useState<TestStats[]>([]); // Store top 3 scorers
  const [userNames, setUserNames] = useState<Record<string, string>>({}); // Store user names

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTestLeaderBoard(id);
        setLeaderBoardData(data.leaderboard);

        // Sort the leaderboard data by obtainedMarks in descending order
        const sortedLeaderboard = [...data.leaderboard].sort(
          (a, b) => b.obtainedMarks - a.obtainedMarks
        );

        // Get the top 3 scorers, or less if not enough data
        const topThree = sortedLeaderboard.slice(0, 3);
        setTopScorers(topThree);

        // Fetch user names for the top scorers
        const namePromises = topThree.map((scorer) =>
          getOtherUserProfile(scorer.userId).then((profile) => ({
            userId: scorer.userId,
            name: profile.name || "N/A",
          }))
        );

        // Wait for all names to be fetched and update state
        const names = await Promise.all(namePromises);
        const namesMap = names.reduce((acc, { userId, name }) => {
          acc[userId] = name;
          return acc;
        }, {} as Record<string, string>);

        setUserNames(namesMap); // Set the names in state
      } catch (err) {
        console.error("Error fetching leaderboard data:", err);
      }
    };

    fetchData();
  }, [id]); // Dependency array ensures the effect runs only when `id` changes

  return (
    <div className="h-6">
      <h1>Test Result: {id}</h1>

      {/* Display the top 3 scorers */}
      <div className="w-100 d-flex justify-content-center align-items-center flex-row flex-wrap">
        {topScorers.map((data) => {
          const name = userNames[data.userId] || "Loading..."; // Retrieve name from state
          return <LiveTestResults key={data.userId} name={name} data={data} />;
        })}
      </div>
      <div>
        <Leaderboard2 leaderboardData={leaderboardData} />
      </div>
    </div>
  );
};

export default Page;
