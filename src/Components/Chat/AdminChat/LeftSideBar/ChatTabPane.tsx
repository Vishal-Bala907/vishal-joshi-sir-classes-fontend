import { Href, RecentChats } from "@/Constant";
import ChatUserProfile from "./ChatUserProfile";

export const ChatTabPane = () => {
  return (
    <>
      <div className="common-space">
        <p>{RecentChats}</p>
        <div className="header-top">
          <a className="badge-light-primary f-w-500 btn" href={Href}>
            <i className="fa-solid fa-plus" />
          </a>
        </div>
      </div>
      <ChatUserProfile />
    </>
  );
};
