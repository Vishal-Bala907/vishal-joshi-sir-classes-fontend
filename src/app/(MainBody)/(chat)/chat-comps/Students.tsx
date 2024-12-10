import React, { useEffect, useState } from "react";
import StudentsDummy from "../../../../../helpers/StudentsDummy";
import style from "./styles/Mentor.module.css";
import ChatWithStudents from "./ChatWithStudents";
import dummyChats from "../../../../../helpers/dummyChats";
import { useDispatch, useSelector } from "react-redux";
import {
  AllMemberType,
  ChatSliceType,
  ChatsTypes,
  Students as students,
} from "@/Types/ChatType";
import { RootState } from "@/Redux/Store";
import { getChats } from "@/server/chats";
import { setChats, setSelectedUser } from "@/Redux/Reducers/ChatSlice";

interface Student {
  id: number;
  name: string;
  age: number;
  grade: string;
  email: string;
  major: string;
}

const Students = () => {
  // alert("student componet");
  // const [selectedStudent, setSelectedStudent] = useState<students | null>(null);
  // if role === admin ? then fetch all the students and all the mentors
  // if role === mentor ? then fetch all the students
  const loggedInUser = useSelector((state: any) => state.user);
  const students = useSelector((state: RootState) => state.chat.students);
  // console.log(students);
  const dispatch = useDispatch();
  const selectedUser = useSelector((state: any) => state.chat.selectedUser);

  useEffect(() => {
    if (loggedInUser.role === "admin") {
      //fetch all the students and all the mentors
    } else if (loggedInUser.role === "mentor") {
      //fetch all the students
    }

    return () => {
      dispatch(setSelectedUser(null));
    };
  }, [loggedInUser]);

  return (
    <div className="container bg-dark-subtle pt-3 d-flex justify-content-center align-items-center flex-column pb-3 gap-4 w-100">
      {selectedUser === null ? (
        students.map((student, i) => {
          return (
            <div
              key={i}
              className={`bg-body-secondary w-100 p-2 rounded-2 ${style.mentorHover}`}
              onClick={() => {
                dispatch(setSelectedUser(student));
              }}
            >
              <p className="p-0 m-0 fw-semibold">{student.name}</p>
              <p className="p-0 m-0">{student.email}</p>
            </div>
          );
        })
      ) : (
        <ChatWithStudents />
      )}
    </div>
  );
};

export default Students;
