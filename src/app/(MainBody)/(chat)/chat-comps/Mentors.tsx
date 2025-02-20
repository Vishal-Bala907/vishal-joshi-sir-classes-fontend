"use client";
import React, { useEffect, useState } from "react";
// import DummyMentors from "../../../../../helpers/DummyMentors";
import style from "./styles/Mentor.module.css";
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
import { WiMoonAltNew } from "react-icons/wi";
import { removeSeen } from "@/server/chats";

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
  const [unseen, setUnseen] = useState<string[] | null>([""]);
  const mentors = useSelector((state: RootState) => state.chat.mentors);
  const selectedUser = useSelector(
    (state: RootState) => state.chat.selectedUser
  );
  const loggedInUser = useSelector((state: any) => state.user);

  useEffect(() => {
    setUnseen(loggedInUser.seenBy);
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

  return (
    <div
      className="rounded-4 w-100 h-100  pt-3 d-flex justify-content-center align-items-center flex-column gap-4 w-100 p-4"
      style={{
        backgroundColor: "rgb(233 233 233 / 57%)",
        backdropFilter: "blur(31px)",
      }}
    >
      {selectedUser === null ? (
        mentors &&
        mentors.map((mentor, i) => {
          return (
            <div
              id={`${mentor._id}`}
              onClick={() => {
                const chat = document.getElementById(`s-u-${mentor._id}`);
                if (chat) {
                  chat.style.visibility = "visible";
                }
                const USER =
                  loggedInUser.role === "admin" ? "admin" : loggedInUser._id;

                document.getElementById(`s-u-${mentor._id}`).style.visibility =
                  "hidden";
                removeSeen(USER, mentor._id)
                  .then((data) => {
                    console.log(data);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                dispatch(setSelectedUser(mentor));
              }}
              key={i}
              className={`chat-bubble w-100 p-2 rounded-2 position-relative ${style.mentorHover}`}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #00000029",
              }}
            >
              <p className="p-0 m-0 fw-semibold">{mentor.name}</p>
              <p className="p-0 m-0">{mentor.email}</p>
              {unseen.includes(mentor._id) ? (
                <WiMoonAltNew
                  id={`s-u-${mentor._id}`}
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
                  id={`s-u-${mentor._id}`}
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
        <ChatsMentor />
      )}
    </div>
  );
};

export default Mentors;
