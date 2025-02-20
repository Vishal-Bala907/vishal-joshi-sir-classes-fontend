"use client";
import Footer from "@/Layout/Footer";
import Header from "@/Layout/Header";
import Sidebar from "@/Layout/Sidebar";
import TapTop from "@/Layout/TapTop";
import ThemeCustomizer from "@/Layout/ThemeCustomizer/ThemeCustomizerContainer";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import {
  addSidebarTypes,
  setSideBarToggle,
} from "@/Redux/Reducers/ThemeCustomizerReducer";
import Store, { RootState } from "@/Redux/Store";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { setUser } from "@/Redux/Reducers/userSlice";
import { useEffect, useMemo, useRef } from "react";
import { getMyProfile } from "@/server/user";
import { setSocket } from "../../Redux/Reducers/SocketSlice";

import { io, Socket } from "socket.io-client";
import { setMoveToBottom } from "@/Redux/Reducers/ChatSlice";
import { toast } from "react-toastify";
import style from "./layout.module.css";
// import the depen
import AgoraRTC, { AgoraRTCProvider } from "agora-rtc-react";
import { updateSeen } from "@/server/chats";

// In video call, set mode to "rtc"
const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = useSelector((state: any) => state.user);
  // Define socketRef with the correct type: either a Socket or null
  const socketRef = useRef<Socket | null>(null);
  const dispatchSocket = useDispatch();
  const socketInitialized = useRef(false);

  const selectedUser = useSelector((state: any) => state.chat.selectedUser);
  let chats = useSelector<RootState, Chat[]>((state) => state.chat.chats);
  useEffect(() => {
    // Initialize the socket connection on mount
    if (socketInitialized.current) return; // Prevent reinitialization
    socketRef.current = io(process.env.NEXT_PUBLIC_BASE_URL);
    // Ensure socket is ready and user is defined
    if (socketRef.current && user) {
      socketRef.current.on("connect", () => {
        // Determine roomId based on the user's role
        const roomId = user.role === "admin" ? "admin" : user._id;
        dispatchSocket(setSocket(socketRef.current));
        // Emit joinRoom event
        if (socketRef.current) {
          socketRef.current.emit("joinRoom", { roomId, user });
        }

        // handle all received messages
        if (socketRef.current) {
          socketRef.current.on("sendMessage", (MESSAGE) => {
            const recipient = MESSAGE.sender;
            // console.log(MESSAGE.sender, selectedUser);
            // console.log(MESSAGE);
            let USER =
              selectedUser === "admin"
                ? "admin"
                : selectedUser === null
                ? null
                : selectedUser._id;
            // console.log(selectedUser);
            // console.log(USER);
            // console.log(selectedUser);
            if (recipient === USER) {
              // let data = [...chats, MESSAGE];
              onChatReceiveAppendElement(MESSAGE);
              dispatch(setMoveToBottom());
              // dispatch(setChats(data));
            } else {
              toast.success(`You got a new message from ${MESSAGE.senderName}`);
              const chatId = `s-u-${MESSAGE.sender}`;
              const chat = document.getElementById(chatId);
              // console.log(chat);

              const USER = user.role === "admin" ? "admin" : user._id;
              updateSeen(USER, recipient)
                .then((data) => {
                  console.log("HOGYA");
                })
                .catch((err) => {
                  console.error(err);
                });

              let chatBubbles = document.getElementsByClassName("chat-bubble");
              const senderBubble = document.getElementById(MESSAGE.sender);

              if (chat && senderBubble) {
                // Make the sender's chat visible and bring it to the top
                chat.style.visibility = "visible";
                senderBubble.style.order = "0";

                // Push other chat bubbles to the background
                Array.from(chatBubbles).forEach((bubble) => {
                  const chatBubble = bubble as HTMLElement;
                  if (bubble !== senderBubble) {
                    chatBubble.style.order = "10";
                  }
                });

                // Scroll sender's chat bubble into view
                senderBubble.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }
            }
          });
        }
      });
    }

    // Clean up the socket connection when the component unmounts
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        console.log("Socket disconnected");
      }
    };
  }, [user, selectedUser]);

  const { sidebar_types, sideBarToggle } = useAppSelector(
    (state) => state.themeCustomizer
  );
  const dispatch = useAppDispatch();

  const updateSidebarBasedOnWidth = () => {
    const windowWidth = window.innerWidth;
    if (sidebar_types === "compact-wrapper") {
      if (windowWidth <= 1200) {
        dispatch(setSideBarToggle(true));
      } else {
        dispatch(setSideBarToggle(false));
      }
    } else if (sidebar_types === "horizontal-wrapper") {
      if (windowWidth <= 992) {
        dispatch(setSideBarToggle(true));
        dispatch(addSidebarTypes("compact-wrapper"));
      } else {
        dispatch(setSideBarToggle(false));
        dispatch(addSidebarTypes("horizontal-wrapper"));
      }
    }
  };
  useEffect(() => {
    updateSidebarBasedOnWidth();
    window.addEventListener("resize", () => {
      updateSidebarBasedOnWidth();
    });
  }, [sidebar_types]);

  const { data } = useSession();

  const getUserProfile = async () => {
    if (data?.user?.email) {
      const response = await getMyProfile(data?.user?.email);
      dispatch(setUser(response));
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const ATTENDING = useSelector((state: RootState) => state.attending.status);

  return (
    <Provider store={Store}>
      <AgoraRTCProvider client={client}>
        <div
          className={`page-wrapper ${
            sideBarToggle ? "compact-wrapper" : sidebar_types
          } ${sideBarToggle ? "sidebar-open" : ""}`}
          id="pageWrapper"
        >
          {/* <Header /> */}
          {!ATTENDING && <Header />}

          <div
            className={`page-body-wrapper`}
            style={
              ATTENDING
                ? {
                    marginLeft: 0,
                  }
                : {
                    // marginLeft: "253px",
                  }
            }
          >
            {!ATTENDING && <Sidebar />}
            {/* <Sidebar /> */}
            <div className="page-body">{children}</div>
            <Footer />
          </div>
        </div>
        <TapTop />
        <ThemeCustomizer />
      </AgoraRTCProvider>
    </Provider>
  );
}

function onChatReceiveAppendElement(MESSAGE: Chat) {
  const msgDiv = document.createElement("div");
  msgDiv.className = `msg left-msg`;

  // console.log(MESSAGE);

  if (MESSAGE.senderName) {
    const imgDiv = document.createElement("div");
    imgDiv.className = "msg-img";
    msgDiv.appendChild(imgDiv);
  }

  const bubbleDiv = document.createElement("div");
  bubbleDiv.className = "msg-bubble mx-2";

  const infoDiv = document.createElement("div");
  infoDiv.className = "msg-info";

  const nameDiv = document.createElement("div");
  nameDiv.className = "msg-info-name";
  nameDiv.textContent = MESSAGE.recipientName
    ? MESSAGE.senderName || ""
    : "admin";

  const timeDiv = document.createElement("div");
  timeDiv.className = "msg-info-time";
  timeDiv.textContent = "now";

  infoDiv.appendChild(nameDiv);
  infoDiv.appendChild(timeDiv);

  const textDiv = document.createElement("div");
  textDiv.className = "msg-text";
  textDiv.textContent = MESSAGE.message;

  bubbleDiv.appendChild(infoDiv);
  bubbleDiv.appendChild(textDiv);

  msgDiv.appendChild(bubbleDiv);
  // msgContainer.current.appendChild(msgDiv);
  document.getElementById("chat-container")?.appendChild(msgDiv);
  // document.getElementById("chat-container")?.scrollTop =
  // document.getElementById("chat-container")?.scrollHeight;
}
