"use client";
import React, { useEffect, useState } from "react";
// import DummyMentors from "../../../../../helpers/DummyMentors";
import style from "./styles/Mentor.module.css";
import MentorsDummy from "../../../../../helpers/MentorsDummy";
import { Divide } from "react-feather";
import dummyChats from "../../../../../helpers/dummyChats";
// import Chats from "./Chats";
import ChatsMentor from "./ChatsMentor";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllMentors,
  setChats,
  setSelectedUser,
} from "@/Redux/Reducers/ChatSlice";
import { getAllMentors } from "@/server/users";
import { RootState } from "@/Redux/Store";
import { getChats } from "@/server/chats";

interface Mentor {
  id: number;
  name: string;
  age: number;
  email: string;
  specialization: string;
  experience: number; // years of experience
}

// interface MentorProps {
//   MentorsDummy: Mentor[];
// }

const Mentors = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSelectedUser(null));
    // fetch all the mentors
    const fetchMentors = async () => {
      try {
        dispatch(setSelectedUser(null)); // Reset selected user
        const data = await getAllMentors(); // Fetch mentors
        dispatch(setAllMentors(data)); // Update Redux with mentors
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };

    fetchMentors();

    return () => {
      dispatch(setAllMentors(null));
      dispatch(setSelectedUser(null));
    };
  }, []);

  const mentors = useSelector((state: RootState) => state.chat.mentors);
  const selectedUser = useSelector(
    (state: RootState) => state.chat.selectedUser
  );
  const loggedInUser = useSelector((state: any) => state.user);

  return (
    <div className="container bg-dark-subtle pt-3 d-flex justify-content-center align-items-center flex-column gap-4 w-100">
      {selectedUser === null ? (
        mentors &&
        mentors.map((mentor, i) => {
          return (
            <div
              onClick={() => {
                dispatch(setSelectedUser(mentor));
              }}
              key={i}
              className={`bg-body-secondary w-100 p-2 rounded-2 ${style.mentorHover}`}
            >
              <p className="p-0 m-0 fw-semibold">{mentor.name}</p>
              <p className="p-0 m-0">{mentor.email}</p>
            </div>
          );
        })
      ) : (
        <ChatsMentor />
      )}
    </div>
  );
};

export default Mentors;
