import { Students } from "@/Types/ChatType";
import React from "react";
import { IoMdArrowBack, IoMdSend } from "react-icons/io";
import ChatBody from "./ChatBody";
import { useDispatch, useSelector } from "react-redux";
import { selectSocket } from "@/Redux/Reducers/SocketSlice";
import { RootState } from "@/Redux/Store";
import { setChats, setMoveToBottom } from "@/Redux/Reducers/ChatSlice";
import appendMessageToTheBottomOnSend from "./AppenMessageHelper";

interface Chat {
  _id?: string;
  sender: string; // User ID of the sender
  senderName: string; // Name of the sender
  recipient: string; // User ID of the recipient
  recipientName: string; // Name of the recipient
  message: string; // Message content
  timestamp: Date;
  __v?: number; // Timestamp of the message, optional because of default
}

interface Student {
  id: number;
  name: string;
  age: number;
  grade: string;
  email: string;
  major: string;
}

const ChatWithStudents = () => {
  const socket = useSelector(selectSocket);
  const [message, setMessage] = React.useState("");
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  let data = useSelector<RootState, Chat[]>((state) => state.chat.chats);
  const selectedUser = useSelector((state: any) => state.chat.selectedUser);
  function sendMessage(e: React.MouseEvent<SVGElement, MouseEvent>) {
    // console.log(selectedStudent);
    let MESSAGE = {
      sender: user.role === "admin" ? "admin" : user._id,
      senderName: user.role === "admin" ? "admin" : user.name,
      recipient: selectedUser._id,
      recipientName: selectedUser.name,
      message,
      timestamp: new Date(),
    };
    const roomId = selectedUser._id;
    socket?.emit("receiveMessage", { roomId, MESSAGE });
    appendMessageToTheBottomOnSend(MESSAGE);
    dispatch(setMoveToBottom());
    setMessage("");
  }

  return (
    <>
      <div
        style={{
          // height: "70vh",
          width: "100%",
          // overflow: "scroll",
          // overflowX: "hidden",
        }}
      >
        <section className="w-100 d-flex justify-content-center align-items-center flex-column gap-3 position-relative">
          <ChatBody />
        </section>
        <div
          style={{
            position: "relative",
            zIndex: 10,
          }}
          className="w-100 bg-primary d-flex justify-content-center align-items-center gap-2 py-1"
        >
          <input
            value={message}
            style={{ outline: "none" }}
            className="w-75 rounded-3 border border-0 ps-3 fs-6 py-2"
            type="text"
            name="Enter text here "
            id=""
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <IoMdSend
            onClick={(e) => {
              sendMessage(e);
            }}
            style={{ fontSize: "30px" }}
          />
        </div>
      </div>
    </>
  );
};

export default ChatWithStudents;
