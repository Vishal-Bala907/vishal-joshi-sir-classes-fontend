import React from "react";
import { IoMdArrowBack, IoMdSend } from "react-icons/io";
import ChatBody from "./ChatBody";
import { useDispatch, useSelector } from "react-redux";
import { selectSocket } from "@/Redux/Reducers/SocketSlice";
import { RootState } from "@/Redux/Store";
import { setChats, setMoveToBottom } from "@/Redux/Reducers/ChatSlice";
import appendMessageToTheBottomOnSend from "./AppenMessageHelper";
// import dummyChats from "../../../../../helpers/dummyChats";

/*
 This component will display the list of all the mentors to the admin
 if admin selects a mentor then he can chat with him even can view old chats

 * nessesary steps
 * 1st make an api call to fetch all the mentors
 * Store them in the state variable (redux state)
 * connect user to the backend througn the socket.io
 * - if admin clicks on any user then fetch all the chats
 * - now display all the chats
 * Same goes for students
*/
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

const ChatsMentor = () => {
  // interface chats

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
    // sending message
    socket?.emit("receiveMessage", { roomId, MESSAGE });
    // data = [...data, MESSAGE];
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
        <section
          className="w-100 d-flex justify-content-center align-items-center flex-column gap-3 position-relative"
          style={{
            height: "85vh",
          }}
        >
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

export default ChatsMentor;
