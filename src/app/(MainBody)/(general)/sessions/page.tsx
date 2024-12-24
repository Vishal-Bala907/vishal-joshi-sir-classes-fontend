"use client";
import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
// import "@fullcalendar/react/dist/vdom";
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";
import { format, isSameDay } from "date-fns";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs";
import StartSession from "@/Components/Session/StartSession";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles
import SessionInput from "./SessionInput";
import TodaysSessions from "./TodaysSessions";
import { selectSocket } from "@/Redux/Reducers/SocketSlice";
import { toast } from "react-toastify";
import VideoCall from "./VideoCall";

interface Event {
  title: string;
  start: string; // ISO date string
}

const Sessions = () => {
  const user = useSelector((state: RootState) => state.user);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDateEvents, setSelectedDateEvents] = useState<Event[]>([]);
  const [addSession, setAddSession] = useState(false);
  const [startSession, setStartSession] = useState(false);
  const socket = useSelector(selectSocket);
  // const [isLive, setIsLive] = useState<boolean>(false);
  const isLive = useSelector((state: RootState) => state.isLive.isLive);

  if (socket) {
    socket.on("liveStarting", ({ message }) => {
      // alert(message);
      toast.success(message, {
        position: "top-center",
      });
    });
  }

  const handleDateClick = (info: { dateStr: string }) => {
    // alert(info.dateStr);
    const eventsForDate = events.filter((event) =>
      isSameDay(new Date(event.start), new Date(info.dateStr))
    );
    setSelectedDateEvents(eventsForDate);
  };

  const handleAddSession = () => {
    setAddSession(true);
  };
  const handleStartSession = () => {
    setStartSession(true);
  };

  return (
    <>
      <Breadcrumbs mainTitle={"Sessions"} />
      {/* {user.role == "admin" && <StartSession />} */}
      {/* <RecentSession />
    <SessionList /> */}
      {/* <UpcomingFeature /> */}

      {isLive ? (
        <VideoCall />
      ) : (
        <div className="w-100 p-3 position-relative">
          <div className="my-3">
            {user.role === "admin" && (
              <button
                className="btn btn-outline-success me-2"
                onClick={handleAddSession}
              >
                Add Session
              </button>
            )}
            {user.role === "admin" && (
              <button
                className="btn btn-outline-danger"
                onClick={handleStartSession}
              >
                Go Live
              </button>
            )}
          </div>
          {addSession && <SessionInput setAddSession={setAddSession} />}
          {startSession && <TodaysSessions setStartSession={setStartSession} />}

          <FullCalendar
            // height={300}
            // contentHeight={100}
            aspectRatio={2.1}
            headerToolbar={{
              start: "dayGridMonth,timeGridWeek,timeGridDay",
              center: "title",
              end: "prevYear,prev,next,nextYear",
            }}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            dateClick={handleDateClick}
          />

          <div>
            <h3>Events on Selected Date:</h3>
            {selectedDateEvents.length > 0 ? (
              <ul>
                {selectedDateEvents.map((event, index) => (
                  <li key={index}>
                    <strong>{event.title}</strong>
                    <br />
                    Start Time:{" "}
                    {format(new Date(event.start), "yyyy-MM-dd HH:mm")}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No events for this date.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Sessions;
