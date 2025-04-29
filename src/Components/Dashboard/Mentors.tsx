import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./MentorsList.css";

interface Mentor {
  id: number;
  name: string;
  image: string;
}

const mentors: Mentor[] = [
  { id: 1, name: "Sarah Connor", image: "/assets/images/avtar/3.jpg" },
  { id: 2, name: "John Smith", image: "/assets/images/avtar/3.jpg" },
  { id: 3, name: "Jane Doe", image: "/assets/images/avtar/3.jpg" },
  { id: 4, name: "Michael Stark", image: "/assets/images/avtar/3.jpg" },
];

const MentorsList: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = containerRef.current?.children;
    if (items) {
      gsap.fromTo(
        items,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2, // Animates each item with a delay
        }
      );
    }
  }, []);

  return (
    <div className="d-flex flex-column mentor-wrapper align-self-start">
      <h3 className="m-auto py-3">Our Top Mentors</h3>
      <div className="mentors-list" ref={containerRef}>
        {mentors.map((mentor) => (
          <div className="mentor-card" key={mentor.id}>
            <img
              className="mentor-image"
              src={mentor.image}
              alt={`${mentor.name}'s profile`}
            />
            <h3 className="mentor-name">{mentor.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorsList;
