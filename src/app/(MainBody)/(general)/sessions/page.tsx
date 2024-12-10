"use client"
import Breadcrumbs from "@/CommonComponent/Breadcrumbs";
import UpcomingFeature from "@/CommonComponent/UpcomingFeature";
import RecentSession from "@/Components/Session/RecentSession";
import SessionList from "@/Components/Session/SessionList";
import StartSession from "@/Components/Session/StartSession";
import { useSelector } from "react-redux";

const Sessions = () => {
  const user = useSelector((state: any) => state.user)
  return <>
    <Breadcrumbs mainTitle={'Sessions'} />
    {
      user.role == "admin" &&
      <StartSession />
    }
    {/* <RecentSession />
    <SessionList /> */}
    <UpcomingFeature />
  </>;
};

export default Sessions;
