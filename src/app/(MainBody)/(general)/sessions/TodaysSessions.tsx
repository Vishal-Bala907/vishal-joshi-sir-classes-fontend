import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import style from "./SessionInput.module.css";
import { getAllTodaysSession } from "@/server/sessions";

interface Session {
  _id: string;
  date: string;
  time: string;
  title: string;
  status: string;
}

interface TodaysSessionsProps {
  setStartSession: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodaysSessions: React.FC<TodaysSessionsProps> = ({ setStartSession }) => {
  const formRef = useRef<HTMLDivElement>(null);
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    // GSAP animation
    gsap.from(formRef.current, { opacity: 0, y: 100, duration: 1 });

    // Fetch today's sessions
    getAllTodaysSession()
      .then((data) => {
        setSessions(data);
      })
      .catch((err) => {
        console.error("Error fetching sessions:", err);
      });
  }, []);

  return (
    <div
      ref={formRef}
      className={`container w-75 mt-5 ${style.bg}`}
      style={{
        height: "38em",
        overflow: "scroll",
      }}
    >
      <h2 className="text-center mb-4">Today's Sessions</h2>
      <button
        className="btn btn-warning my-4"
        onClick={() => {
          setStartSession(false);
        }}
      >
        Cancle
      </button>
      <section>
        {sessions.length > 0 ? (
          <ul className="list-group">
            {sessions.map((session) => (
              <li
                key={session._id}
                className={`list-group-item my-2 ${style.hover}`}
              >
                <div className="d-flex justify-content-content align-items-center flex-wrap flex-row gap-4">
                  <h5 className="m-0 p-0">{session.title}</h5>
                  <p className="m-0 p-0">
                    <strong>Date:</strong>{" "}
                    {new Date(session.date).toLocaleDateString()}
                  </p>
                  <p className="m-0 p-0">
                    <strong>Time:</strong> {session.time}
                  </p>
                  <p className="m-0 p-0">
                    <strong>Status:</strong> {session.status}
                  </p>
                  <div className="d-flex justify-content-between gap-4">
                    <button
                      className="btn btn-success"
                      onClick={() => setStartSession(true)}
                    >
                      Start
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        setSessions((prevSessions) =>
                          prevSessions.filter((s) => s._id !== session._id)
                        )
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">No sessions for today.</p>
        )}
      </section>
    </div>
  );
};

export default TodaysSessions;
