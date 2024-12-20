"use client";
// import Chat from "../chat-comps/ChatArea";
import ChatWithStudents from "../chat-comps/ChatWithStudents";
import Students from "../chat-comps/Students";
import { useDispatch, useSelector } from "react-redux";
import ChatWithViajySir from "../chat-comps/ChatWithViajySir";
import dummyChats from "../../../../../helpers/dummyChats";
import { getAllStudents } from "@/server/users";
import { useEffect } from "react";
// import {setAllS}
import { setAllStudents } from "@/Redux/Reducers/ChatSlice";

const ChatAdmin = () => {
  const user = useSelector((state: any) => state.user);
  const ROLE = user.role;
  const dispatch = useDispatch();

  useEffect(() => {
    if (ROLE === "admin") {
      // fetch all the students and mentors
      getAllStudents("admin")
        .then((data) => {
          dispatch(setAllStudents(data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  return (
    <>
      {/* <Breadcrumbs mainTitle={"Chat Admin"} /> */}
      {ROLE === "student" || ROLE === "mentor" ? (
        <ChatWithViajySir />
      ) : (
        <Students />
      )}
    </>
  );
};

export default ChatAdmin;
