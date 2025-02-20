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
import { getChats, removeSeen } from "@/server/chats";
import { setChats, setSelectedUser } from "@/Redux/Reducers/ChatSlice";
import { WiMoonAltNew } from "react-icons/wi";

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
  const [unseen, setUnseen] = useState<string[] | null>([""]);
  // console.log(students);
  const dispatch = useDispatch();
  const selectedUser = useSelector((state: any) => state.chat.selectedUser);

  useEffect(() => {
    setUnseen(loggedInUser.seenBy);
    console.log(unseen);

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
    <div
      className="py-3 rounded-4  d-flex justify-content-center align-items-center d-flex flex-column  gap-4 w-100 p-4"
      style={{
        backgroundColor: "rgb(233 233 233 / 57%)",
        backdropFilter: "blur(31px)",
      }}
    >
      {selectedUser === null ? (
        students.map((student, i) => {
          console.log(unseen.includes(student._id));

          return (
            <div
              key={i}
              id={`${student._id}`}
              className={`d-flex flex-column chat-bubble  w-100 p-2 rounded-2 position-relative ${style.mentorHover}`}
              onClick={() => {
                const chat = document.getElementById(`s-u-${student._id}`);
                if (chat) {
                  chat.style.visibility = "visible";
                }
                const USER =
                  loggedInUser.role === "admin" ? "admin" : loggedInUser._id;
                document.getElementById(`s-u-${student._id}`).style.visibility =
                  "hidden";
                removeSeen(USER, student._id)
                  .then((data) => {
                    console.log(data);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                dispatch(setSelectedUser(student));
              }}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #00000029",
              }}
            >
              <p className="p-0 m-0 fw-semibold">{student.name}</p>
              <p className="p-0 m-0">{student.email}</p>
              {unseen.includes(student._id) ? (
                <WiMoonAltNew
                  id={`s-u-${student._id}`}
                  style={{
                    position: "absolute",
                    top: "30%",
                    right: "3%",
                    fontSize: "x-large",
                    color: "#000bff",
                    border: "1px solid white",
                    borderRadius: "50%",
                    visibility: "visible",
                  }}
                />
              ) : (
                <WiMoonAltNew
                  id={`s-u-${student._id}`}
                  style={{
                    position: "absolute",
                    top: "30%",
                    right: "3%",
                    fontSize: "x-large",
                    color: "#000bff",
                    border: "1px solid white",
                    borderRadius: "50%",
                    visibility: "hidden",
                  }}
                />
              )}
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
