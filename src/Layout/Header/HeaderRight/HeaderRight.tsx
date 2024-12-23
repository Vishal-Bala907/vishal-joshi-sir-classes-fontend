import { useRef, useState } from "react";
import DarkMode from "./DarkMode/DarkMode";
import Profile from "./Profile/Profile";
import { CiStreamOn } from "react-icons/ci";
import Notification from "./notifications/Notification";
import { useSelector } from "react-redux";
import { selectSocket } from "@/Redux/Reducers/SocketSlice";
import { toast } from "react-toastify";

const HeaderRight = () => {
  const [notification, setNotification] = useState<boolean>(false);
  const socket = useSelector(selectSocket);
  const ref = useRef<HTMLButtonElement>(null);

  socket?.on("adminNoti", (msg) => {
    toast.success(msg.message, {
      position: "top-left",
    });

    if (ref.current) {
      ref.current.style.border = "2px solid red";
      setTimeout(() => {
        if (ref.current) ref.current.style.border = "1px solid #f9f7f6";
      }, 10000);
    }
  });

  return (
    <div className="nav-right">
      <ul className="header-right">
        {/* <Languages/> */}
        <button
          ref={ref}
          id="noti"
          onClick={() => {
            setNotification(true);
          }}
          style={{
            borderRadius: "50%",
            outline: "none",
            border: "1px solid #f9f7f6",
            padding: "8px",
          }}
        >
          <CiStreamOn
            style={{
              color: "black",
              fill: "black",
            }}
          />
        </button>
        {/* <ResponsiveSearch /> */}
        <DarkMode />

        {notification && <Notification setNotification={setNotification} />}
        {/* <NotificationHeader /> */}

        {/* <CartHeader />
        <MaximizeScreen />
        <Bookmark />
        <CloudDesign /> */}
        <Profile />
      </ul>
    </div>
  );
};

export default HeaderRight;
