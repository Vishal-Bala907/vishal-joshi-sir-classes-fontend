import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";
// import { timeStamp } from "console";
import { IoMdArrowBack } from "react-icons/io";
import { setChats, setSelectedUser } from "@/Redux/Reducers/ChatSlice";
import { getChats } from "@/server/chats";
import { Hourglass } from "react-loader-spinner";

interface Chat {
  _id: string;
  sender: string; // User ID of the sender
  senderName: string; // Name of the sender
  recipient: string; // User ID of the recipient
  recipientName: string; // Name of the recipient
  message: string; // Message content
  timestamp?: Date;
  __v: number; // Timestamp of the message, optional because of default
}

function getMyFormatedDate(date: string) {
  const DATE = date.split("T");
  const TIME = DATE[1].split(".");
  return `${DATE[0]} ${TIME[0]}`;
  // return date;
}

const ChatBody = () => {
  // all the chats
  const data = useSelector<RootState, Chat[]>((state) => state.chat.chats);
  const BOTTOM = useSelector<RootState, number>(
    (state) => state.chat.moveToBottom
  );
  const loggedInUser = useSelector((state: any) => state.user);
  const selectedUser = useSelector((state: any) => state.chat.selectedUser);
  let userId = loggedInUser.role === "admin" ? "admin" : loggedInUser._id;
  const dispatch = useDispatch();

  const msgContainer = useRef<HTMLDivElement | null>(null);
  const msgContainerParent = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        setLoading(true);
        const ROOM = loggedInUser.role === "admin" ? "admin" : loggedInUser._id;
        const SELECTED = selectedUser === "admin" ? "admin" : selectedUser._id;
        let data = null; // Await the promise from getChats
        // if (loggedInUser.role === "student") {
        data = await getChats(ROOM, SELECTED);
        // console.log(data);
        // } else {
        //   //
        //   let ROLE = selectedUser === "admin" ? "admin" : selectedUser.role;
        //   if (loggedInUser.role === "mentor" && ROLE === "student") {
        //     data = await getChats(ROOM, SELECTED);
        //   } else {
        //     data = await getChats(ROOM, SELECTED);
        //   }
        // }
        dispatch(setChats(data)); // Dispatch the data once it's resolved
      } catch (err) {
        console.error("Error fetching chats:", err); // Handle any errors
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [selectedUser]);

  useEffect(() => {
    // reach to the bottom
    const scrollContainer = msgContainer.current;
    const parentContainer = msgContainerParent.current;
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [data, BOTTOM]);

  if (loading) {
    return (
      <div className="h-100 w-100">
        <Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass="w-100"
          colors={["#306cce", "#72a1ed"]}
        />
      </div>
    );
  }

  return (
    <div
      className="vb right-sidebar-Chats w-100 h-100 position-relative rounded-3"
      style={{}}
    >
      <IoMdArrowBack
        onClick={() => {
          dispatch(setSelectedUser(null));
        }}
        style={{ fontSize: "30px", position: "absolute", top: "0px" }}
      />
      <div ref={msgContainerParent} className="msger rounded-3 h-100">
        <div
          ref={msgContainer}
          id="chat-container"
          className="msger-chat rounded-4"
          style={{
            height: "85vh",
          }}
        >
          {data.length > 0 ? (
            data.map((item: Chat, id: number) => {
              let formatedDate = getMyFormatedDate(`${item.timestamp}`);
              // const participators = allMembers.find(
              //   (x: AllMemberType) => x.id === item.sender
              // );
              return (
                <div
                  className={`msg ${
                    item.sender === userId ? "right" : "left"
                  }-msg`}
                  key={id}
                >
                  {item?.senderName ? (
                    <div className="msg-img" />
                  ) : (
                    // <img
                    //   src={`${ImagePath}/${participators?.image}`}
                    //   className="rounded-circle img-30 h-auto"
                    //   alt="user"
                    // />
                    <p></p>
                  )}
                  <div className="msg-bubble mx-2">
                    <div className="msg-info">
                      <div className="msg-info-name">
                        {!item.recipientName ? "admin" : item.senderName}
                      </div>
                      <div className="msg-info-time">{formatedDate}</div>
                    </div>
                    <div className="msg-text">{item.message}</div>
                  </div>
                </div>
              );
            })
          ) : (
            // <img
            //   className="img-fluid w-100"
            //   src={`${ImagePath}/start-conversion.jpg`}
            //   alt="start conversion"
            // />
            <p></p>
          )}
        </div>
        {/* <SendMessage /> */}
      </div>
    </div>
  );
};

export default ChatBody;
