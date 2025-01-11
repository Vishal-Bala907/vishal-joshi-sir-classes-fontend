"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import style from "./SessionInput.module.css";
import { getAllTodaysSession, goLIve } from "@/server/sessions";
import { useDispatch, useSelector } from "react-redux";
import { selectSocket } from "@/Redux/Reducers/SocketSlice";
import { toast } from "react-toastify";
import { RootState } from "@/Redux/Store";
import { setVideoCallState } from "@/Redux/Reducers/VideoCall";
import { setIsLive } from "@/Redux/Reducers/isLiveSlice";

interface Session {
  _id: string;
  date: string;
  time: string;
  title: string;
  status: string;
}

interface TodaysSessionsProps {
  setStartSession: React.Dispatch<React.SetStateAction<boolean>>;
  setLiveSessionId: React.Dispatch<React.SetStateAction<string>>;
}

const TodaysSessions: React.FC<TodaysSessionsProps> = ({
  setStartSession,
  setLiveSessionId,
  // setIsLive,
}) => {
  const formRef = useRef<HTMLDivElement>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const socket = useSelector(selectSocket);
  const user = useSelector((state: any) => state.user);

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

  const dispatch = useDispatch();
  function goLiveNow(sessionId: string) {
    if (socket) {
      // send message to all
      socket.emit("startingLive", {
        message: "Admin has just started a live stream",
      });
    }
    // hit the backend API and make the status LIVE
    goLIve(sessionId, user.role, user._id)
      .then((data) => {
        // console.log(data);
        setStartSession(false);
        // setIsLive(true);
        setLiveSessionId(sessionId);
        dispatch(setIsLive(true));
        dispatch(setVideoCallState(data.data));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  //send message to all users to notify that session is being started
  // update the status from

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
                      onClick={() => {
                        goLiveNow(session._id);
                      }}
                    >
                      {session.status === "INACTIVE"
                        ? "START"
                        : session.status === "TAKEN"
                        ? "RE-START"
                        : ""}
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
