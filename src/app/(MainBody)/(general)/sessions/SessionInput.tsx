"use client";
import React, { useEffect, useRef, useState } from "react";
import style from "./SessionInput.module.css";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { createSessionAlert } from "@/server/sessions";
import { selectSocket } from "@/Redux/Reducers/SocketSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { GiConsoleController } from "react-icons/gi";

interface SessionProps {
  setAddSession: React.Dispatch<React.SetStateAction<boolean>>;
}

const SessionInput: React.FC<SessionProps> = ({ setAddSession }) => {
  gsap.registerPlugin(useGSAP);

  const socket = useSelector(selectSocket);
  const [sessionName, setSessionName] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const formRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sessionObj = {
      sessionName,
      time,
      date,
    };

    createSessionAlert(sessionObj)
      .then((data) => {
        // console.log(data);
        socket?.emit("adminNotification", { sessionObj });
        setAddSession(false);
      })
      .catch((err) => {
        console.error(err);
      });

    // useEffect(() => {
    // Listen for adminNoti events

    // Cleanup on unmount
    //   return () => {
    //     socket?.off("adminNoti");
    //   };
    // }, [socket]);

    // console.log("Session Details:", { sessionName, time, date });
    // save it to the db
    /*
      code
    */
    // save it to the todays session state
    /*
      code
    */
  };

  useGSAP(() => {
    gsap.from(formRef.current, { opacity: 0, y: 100, duration: 1 });
  });

  function cancelSession(): void {
    setAddSession(false);
  }

  return (
    <div ref={formRef} className={`container w-75 mt-5 ${style.form}`}>
      <h2 className="text-center mb-4">Session Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="sessionName" className="form-label">
            Session Name
          </label>
          <input
            type="text"
            className="form-control"
            id="sessionName"
            placeholder="Enter session name"
            value={sessionName}
            onChange={(e) => setSessionName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="time" className="form-label">
            Session Time
          </label>
          <input
            type="time"
            className="form-control"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Event Date
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mx-3">
          Submit
        </button>
        <button onClick={cancelSession} className="btn btn-danger">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default SessionInput;
