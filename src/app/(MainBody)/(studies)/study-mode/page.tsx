"use client"
import Breadcrumbs from "@/CommonComponent/Breadcrumbs";
import { useEffect, useState } from "react";
import { FormGroup, Label, Input } from 'reactstrap';
import { useSelector } from "react-redux";
import { startStudySession, stopStudySession } from "@/server/user";
import { useAppDispatch } from "@/Redux/Hooks";
import { setUser } from "@/Redux/Reducers/userSlice";
import LeaderBoardSection from "@/Components/StudyMode/leaderBoardSection/LeaderBoardSection";
import UpcomingFeature from "@/CommonComponent/UpcomingFeature";

const StudyMode = () => {
  const dispatch = useAppDispatch()
  const user = useSelector((state: any) => state.user)
  const [studyMode, setStudyMode] = useState(true);
  const [clicked, setClicked] = useState(false);

  const switchStudyMode = async () => {
    if (studyMode) {
      const res = await startStudySession(user._id, "physics")
      dispatch(setUser({ ...user, studySessions: [user.studySessions, res.session.__id] }))
    }
    else {
      if (user.studySessions[user?.studySessions?.length - 1]) {
        stopStudySession(user.studySessions[user.studySessions.length - 1])
      }
    }
  }

  useEffect(() => {
    if (clicked) {
      switchStudyMode()
    }
  }, [studyMode, clicked])

  useEffect(() => {
    if (user.studySessions) { }
    else {
      setStudyMode(false)
    }
  }, [user])

  return <>
    <Breadcrumbs mainTitle={'Study Mode'} />
    {/* <div>
      <div>
        <FormGroup switch>
          <Label check>Study Mode</Label>
          <Input type="switch" role="switch" checked={studyMode} onChange={(e) => { setStudyMode(e.target.checked); setClicked(true) }} />
        </FormGroup>
      </div>
      <LeaderBoardSection />
    </div> */}
    <UpcomingFeature />
  </>;
};

export default StudyMode;
