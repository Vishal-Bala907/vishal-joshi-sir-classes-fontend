"use client";
import React, { useEffect, useState } from "react";
import gsap from "gsap";
import "./leaderboard2.css";
import { getOtherUserProfile } from "@/server/user";

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

const Leaderboard2: React.FC<{ leaderboardData: TestStats[] }> = ({
  leaderboardData,
}) => {
  const [sortedData, setSortedData] = useState<TestStats[]>([]);
  const [userNames, setUserNames] = useState<{ [key: string]: string }>({});

  // Sorting the leaderboard data in descending order
  useEffect(() => {
    const sorted = [...leaderboardData].sort(
      (a, b) => b.obtainedMarks - a.obtainedMarks
    );
    setSortedData(sorted);

    // Fetch the user names for all userIds in the leaderboard
    const fetchUserNames = async () => {
      const names: { [key: string]: string } = {};
      for (let data of sorted) {
        if (!names[data.userId]) {
          try {
            // Use getOtherUserProfile to fetch the user name
            const userProfile = await getOtherUserProfile(data.userId);
            names[data.userId] = userProfile.name || "Unknown"; // Handle missing name
          } catch (err) {
            names[data.userId] = "Unknown"; // Fallback if API fails
          }
        }
      }
      setUserNames(names);
    };

    fetchUserNames();

    // GSAP animation for the leaderboard cards
    gsap.fromTo(
      ".leaderboard-card",
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }
    );
  }, [leaderboardData]);

  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-header">Leaderboard</h2>

      <div className="leaderboard-cards">
        {sortedData.map((data, index) => (
          <div key={data.userId} className="leaderboard-card">
            <div className="rank">#{index + 1}</div>
            <div className="user-details">
              <h3>{userNames[data.userId] || "Loading..."}</h3>
              <p>
                Marks: {data.obtainedMarks} / {data.mark}
              </p>
              <p>Accuracy: {data.accuracy}%</p>
              <p>Correct Answers: {data.correctCount}</p>
              <p>Unanswered: {data.unansweredCount}</p>
            </div>
            <div className="card-footer text-dark">
              <p>Time Taken: {Math.floor(data.totalTimeTaken / 1000)} sec</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard2;
