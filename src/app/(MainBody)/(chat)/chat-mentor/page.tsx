"use client";

import UpcomingFeature from "@/CommonComponent/UpcomingFeature";
import GroupChatContainer from "@/Components/Chat/GroupChat/GroupChatContainer";
import Mentors from "../chat-comps/Mentors";
import { useDispatch, useSelector } from "react-redux";
import Students from "../chat-comps/Students";
import { useEffect } from "react";
import { getAllStudents } from "@/server/users";
import { setAllStudents, setSelectedUser } from "@/Redux/Reducers/ChatSlice";

const Dashboard = () => {
  // return <GroupChatContainer />;
  const user = useSelector((state: any) => state.user);
  const ROLE = user.role;
  const dispatch = useDispatch();

  useEffect(() => {
    if (ROLE === "admin" || ROLE === "mentor") {
      // fetch all the students and mentors
      getAllStudents("admin")
        .then((data) => {
          dispatch(setAllStudents(data));
          dispatch(setSelectedUser(null));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user]);

  return <>{ROLE === "mentor" ? <Students /> : <Mentors />}</>;
};

export default Dashboard;
