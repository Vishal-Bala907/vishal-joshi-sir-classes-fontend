"use client";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs";
import { useEffect, useState } from "react";
import { FormGroup, Label, Input } from "reactstrap";
import { useSelector } from "react-redux";
import { startStudySession, stopStudySession } from "@/server/user";
import { useAppDispatch } from "@/Redux/Hooks";
import { setUser } from "@/Redux/Reducers/userSlice";
import LeaderBoardSection from "@/Components/StudyMode/leaderBoardSection/LeaderBoardSection";
import UpcomingFeature from "@/CommonComponent/UpcomingFeature";
import StopwatchTimer from "@/Components/StudyMode/StopwatchTimer";
import SubjectTimeChart from "@/Components/StudyMode/SubjectTimeChart";
import SubjectPieChart from "@/Components/StudyMode/SubjectPieChart";
import StudySessionsCard from "@/Components/StudyMode/StudySessionsCard";

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
