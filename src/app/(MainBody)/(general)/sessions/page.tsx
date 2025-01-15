"use client";
import React, { useEffect, useRef, useState } from "react";
// import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { format, isSameDay } from "date-fns";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles
// import SessionInput from "./SessionInput";
// import TodaysSessions from "./TodaysSessions";
import { selectSocket } from "@/Redux/Reducers/SocketSlice";
import { toast } from "react-toastify";
// import VideoCall from "./VideoCall";
import { getAllSessionsOfThisMonths, goLIve } from "@/server/sessions";
import "./session.css";
import { MdOutlineCancel } from "react-icons/md";
import { setIsLive } from "@/Redux/Reducers/isLiveSlice";
import { setVideoCallState } from "@/Redux/Reducers/VideoCall";
import dynamic from "next/dynamic";

const LiveStream = dynamic(() => import("./LiveStream"), { ssr: false });

// Dynamically import components
const FullCalendar = dynamic(() => import("@fullcalendar/react"), {
  ssr: false,
});
const SessionInput = dynamic(() => import("./SessionInput"), { ssr: false });
const TodaysSessions = dynamic(() => import("./TodaysSessions"), {
  ssr: false,
});
const VideoCall = dynamic(() => import("./VideoCall"), { ssr: false });

interface Event {
  title: string;
  status: string; // ISO date string
  start: Date;
  end: Date;
  _id: string;
}

interface SessionList {
  date: string;
  status: string;
  time: string;
  title: string;
  __v: 0;
  _id: string;
}

const Sessions = () => {
  const user = useSelector((state: any) => state.user);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDateEvents, setSelectedDateEvents] = useState<Event[]>([]);
  const [addSession, setAddSession] = useState(false);
  const [startSession, setStartSession] = useState(false);
  const socket = useSelector(selectSocket);
  // const [isLive, setIsLive] = useState<boolean>(false);
  const isLive = useSelector((state: RootState) => state.isLive.isLive);
  const [sessionList, setSessionList] = useState<SessionList[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const sessionRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const [liveSessionId, setLiveSessionId] = useState<string>("");
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  if (socket) {
    socket.on("liveStarting", ({ message }) => {
      // alert(message);
      toast.success(message, {
        position: "top-center",
      });
    });
  }

  // console.log(liveSessionId);

  //^ fetch all  the session related data of this month
  useEffect(() => {
    setLoading(true);
    // console.log(date);
    getAllSessionsOfThisMonths(date)
      .then((data) => {
        // Update session list state
        setSessionList(data);
        if (data && data.length > 0) {
          // Map session data to events
          const newEvents = data.map((session: SessionList) => ({
            title: session.title,
            status: session.status,
            start: new Date(session.date), // Ensure valid Date format
            end: new Date(session.date), // Ensure valid Date format
            _id: session._id,
          }));

          // Update events state in one go
          setEvents(newEvents);
        }
      })
      .catch((err) => {
        console.error("Error fetching sessions:", err);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      //? set the session state to TAKEN
      setIsLive(false);
    };
  }, [date]);

  const fetchSessionsForDateRange = (start: Date, end: Date) => {
    const DATE = new Date(start);
    const isoDate = DATE.toISOString().split("T")[0];
    // setDate(isoDate.toString());
  };

  const handleDateClick = (info: { dateStr: string }) => {
    // alert(info.dateStr);
    if (sessionRef.current) sessionRef.current.style.display = "block";
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

  function goLiveButton(sessionId: string) {
    goLIve(sessionId, user.role, user._id)
      .then((data) => {
        console.log(data);
        dispatch(setIsLive(true));
        dispatch(setVideoCallState(data.data));
        // setLiveSessionId(sessionId);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  if (loading) {
    return <div>Your data is being loading</div>;
  }
  // console.log(events);
  // console.log(sessionList);

  return (
    <>
      <Breadcrumbs mainTitle={"Sessions"} />
      {isLive ? (
        // <VideoCall liveSessionId={liveSessionId} />
        <LiveStream liveSessionId={liveSessionId} />
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
          {startSession && (
            <TodaysSessions
              setLiveSessionId={setLiveSessionId}
              setStartSession={setStartSession}
            />
          )}
          <div className="d-flex justify-content-center align-items-center rounded-3">
            <input
              type="month"
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
          </div>

          <FullCalendar
            initialDate={date}
            aspectRatio={2.1}
            headerToolbar={{
              start: "dayGridMonth,timeGridWeek,timeGridDay",
              center: "title",
            }}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            dateClick={handleDateClick}
            // datesSet={(dateInfo) => {
            //   fetchSessionsForDateRange(dateInfo.start, dateInfo.end);
            // }}
            eventContent={(eventInfo) => {
              console.log(eventInfo);
              return (
                <div
                  style={{
                    backgroundColor:
                      eventInfo.event.extendedProps.status === "TAKEN"
                        ? "#A7D477"
                        : "#FADA7A",
                    color: "black",
                    padding: "5px",
                    borderRadius: "5px",
                    width: "100%",
                  }}
                >
                  {eventInfo.event.title}
                </div>
              );
            }}
          />

          <div ref={sessionRef} className="sessions">
            <MdOutlineCancel
              style={{
                fontSize: "xxx-large",
              }}
              onClick={() => {
                if (sessionRef.current)
                  sessionRef.current.style.display = "none";
              }}
            />
            <h3>Events on Selected Date:</h3>
            {selectedDateEvents.length > 0 ? (
              <ul>
                {selectedDateEvents.map((event, index) => (
                  <li key={index}>
                    <strong>{event.title}</strong>
                    <br />
                    {/* Start Time:{" "} */}
                    {event.status === "TAKEN"
                      ? "Class taken at : "
                      : "The class wasn't taken yet "}
                    {format(new Date(event.start), "yyyy-MM-dd HH:mm")}
                    {event.status === "ACTIVE" && user.role !== "admin" && (
                      <button
                        onClick={() => {
                          goLiveButton(event._id);
                        }}
                        className="btn btn-success"
                      >
                        Join
                      </button>
                    )}
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
