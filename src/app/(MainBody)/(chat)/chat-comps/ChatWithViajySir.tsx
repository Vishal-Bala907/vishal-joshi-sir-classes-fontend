import React, { useEffect } from "react";
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";
import { selectSocket } from "@/Redux/Reducers/SocketSlice";
import ChatBody from "./ChatBody";
import { getChats } from "@/server/chats";
import {
  setChats,
  setMoveToBottom,
  setSelectedUser,
} from "@/Redux/Reducers/ChatSlice";
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

const ChatWithViajySir = () => {
  const socket = useSelector(selectSocket);
  const dispatch = useDispatch();
  // console.log(socket);
  const [message, setMessage] = React.useState("");
  const user = useSelector((state: any) => state.user);

  // all the messages
  // alert("mera component");

  // fetch all the chats with vijay sir
  useEffect(() => {
    dispatch(setSelectedUser("admin"));
    const fetchData = async () => {
      try {
        const data = await getChats(user._id, "admin");
        dispatch(setChats(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the async function
  }, [user]); // Dependency array

  // console.log(user.id);
  let data = useSelector<RootState, Chat[]>((state) => state.chat.chats);
  function sendMessage(e: React.MouseEvent<SVGElement, MouseEvent>) {
    let MESSAGE = {
      sender: user._id,
      senderName: user.name,
      recipient: "admin",
      recipientName: "admin",
      message,
      timestamp: new Date(),
    };

    const roomId = "admin";
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
          <div
            style={{
              // padding: "20px",
              // height: "65px",
              position: "relative",
              zIndex: 10,
              // bottom: "0px",
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
        </section>
      </div>
    </>
  );
};

export default ChatWithViajySir;
