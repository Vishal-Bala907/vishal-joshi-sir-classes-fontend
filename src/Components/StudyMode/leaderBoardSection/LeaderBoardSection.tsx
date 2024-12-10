import React from 'react';
import styles from './LeaderBoardSection.module.css';

const dummyData = [
    { rank: 1, name: 'Alice Johnson', score: 1500 },
    { rank: 2, name: 'Bob Smith', score: 1400 },
    { rank: 3, name: 'Charlie Brown', score: 1300 },
    { rank: 4, name: 'Diana Prince', score: 1200 },
    { rank: 5, name: 'Edward Elric', score: 1100 },
];

const LeaderBoardSection = () => {
    return (
        <div className={styles.leaderboardContainer}>
            <h2 className={styles.title}>Leaderboard</h2>
            <table className={styles.leaderboardTable}>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {dummyData.map(user => (
                        <tr key={user.rank}>
                            <td>{user.rank}</td>
                            <td>{user.name}</td>
                            <td>{user.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeaderBoardSection;
