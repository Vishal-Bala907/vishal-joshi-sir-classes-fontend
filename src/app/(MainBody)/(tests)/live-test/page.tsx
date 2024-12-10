"use client";

import Breadcrumbs from "@/CommonComponent/Breadcrumbs";
import CreateTest from "@/Components/Test/CreateTest";
import TestList from "@/Components/Test/TestList";
import { useSelector } from "react-redux";
import { useState } from "react";
import LiveTestForm from "@/Components/Test/Test Components/LiveTestForm";

const Sessions = () => {
  const [reload, setReload] = useState(0);
  const user = useSelector((state: any) => state.user);
  return (
    <>
      {/* <Breadcrumbs mainTitle={"Live Test"} /> */}
      {user.role == "admin" && (
        <CreateTest type="Live" setReload={setReload} />
        // <LiveTestForm />
      )}
      <div className="mt-1">
        <TestList type="Live" reload={reload} />
      </div>
    </>
  );
};

export default Sessions;
