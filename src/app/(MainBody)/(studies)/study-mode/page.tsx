"use client";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { startStudySession, stopStudySession } from "@/server/user";
import { useAppDispatch } from "@/Redux/Hooks";
import { setUser } from "@/Redux/Reducers/userSlice";

// Dynamic imports for components
import dynamic from "next/dynamic";

// Dynamically importing components to prevent SSR issues
const StopwatchTimer = dynamic(
  () => import("@/Components/StudyMode/StopwatchTimer"),
  { ssr: false }
);
const SubjectTimeChart = dynamic(
  () => import("@/Components/StudyMode/SubjectTimeChart"),
  { ssr: false }
);
const SubjectPieChart = dynamic(
  () => import("@/Components/StudyMode/SubjectPieChart"),
  { ssr: false }
);
const StudySessionsCard = dynamic(
  () => import("@/Components/StudyMode/StudySessionsCard"),
  { ssr: false }
);

const StudyMode = () => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: any) => state.user);
  const [studyMode, setStudyMode] = useState(true);
  const [clicked, setClicked] = useState(false);

  const switchStudyMode = async () => {
    if (studyMode) {
      const res = await startStudySession(user._id, "physics");
      dispatch(
        setUser({
          ...user,
          studySessions: [user.studySessions, res.session.__id],
        })
      );
    } else {
      if (user.studySessions[user?.studySessions?.length - 1]) {
        stopStudySession(user.studySessions[user.studySessions.length - 1]);
      }
    }
  };

  useEffect(() => {
    if (clicked) {
      switchStudyMode();
    }
  }, [studyMode, clicked]);

  useEffect(() => {
    if (user.studySessions) {
    } else {
      setStudyMode(false);
    }
  }, [user]);

  return (
    <>
      <Breadcrumbs mainTitle={"Study Mode"} />
      <div>
        <StopwatchTimer />
      </div>
      <div className="d-flex flex-row justify-content-center align-items-center gap-4">
        <SubjectTimeChart />
        <SubjectPieChart />
      </div>
      <StudySessionsCard />
    </>
  );
};

export default StudyMode;
