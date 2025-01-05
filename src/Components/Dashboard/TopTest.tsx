import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./TopTests.css";

interface Test {
  id: number;
  name: string;
  date: string;
  score: number;
}

const tests: Test[] = [
  { id: 1, name: "Math Genius Test", date: "2024-12-01", score: 98 },
  { id: 2, name: "Physics Mastery", date: "2024-11-25", score: 95 },
  { id: 3, name: "Code Proficiency", date: "2024-11-15", score: 92 },
];

const TopTests: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = containerRef.current?.children;
    if (items) {
      gsap.fromTo(
        items,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2,
        }
      );
    }
  }, []);

  return (
    <div className="top-tests" ref={containerRef}>
      {tests.map((test) => (
        <div className="test-card" key={test.id}>
          <h3 className="test-name">{test.name}</h3>
          <p className="test-date">Date: {test.date}</p>
          <p className="test-score">Score: {test.score}%</p>
        </div>
      ))}
    </div>
  );
};

export default TopTests;
