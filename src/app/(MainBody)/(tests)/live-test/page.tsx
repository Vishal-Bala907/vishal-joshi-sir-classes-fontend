"use client";

import dynamic from "next/dynamic"; // Import dynamic from next/dynamic
import { useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "@/Redux/Store";

// Dynamically import components
const TestLists = dynamic(
  () => import("@/Components/Test/Test Components/TestLists"),
  { ssr: false }
);
const LiveTestForm = dynamic(
  () => import("@/Components/Test/Test Components/LiveTestForm"),
  { ssr: false }
);
const TestQuestionForm = dynamic(
  () => import("@/Components/Test/Test Components/TestQuestionForm"),
  { ssr: false }
);
const Wrapper = dynamic(
  () => import("@/Components/Test/Test Components/attending/Wrapper"),
  { ssr: false }
);
const Result = dynamic(
  () => import("@/Components/Test/Test Components/result analysis/Result"),
  { ssr: false }
);

const Sessions = () => {
  const user = useSelector((state: any) => state.user);
  const [test, setTest] = useState("TEST-LIST");
  const [createdTest, setcreatedTest] = useState(null);
  function handleCreateTest(): void {
    setTest("CREATE-TEST");
  }
  const testId = useSelector((state: RootState) => state.testCounter.testId);

  return (
    <div className="mt-1 d-flex flex-column w-100 h-100 align-items-center justify-content-center p-3">
      {user.role === "admin" && testId === "" ? (
        <button color="primary" onClick={handleCreateTest}>
          Create New
        </button>
      ) : (
        <div></div>
      )}
      {test === "TEST-LIST" ? (
        <TestLists setTest={setTest} />
      ) : test === "CREATE-TEST" && createdTest === null ? (
        <LiveTestForm setTest={setTest} setcreatedTest={setcreatedTest} />
      ) : test === "CREATE-TEST" && createdTest !== null ? (
        <TestQuestionForm setTest={setTest} setcreatedTest={setcreatedTest} />
      ) : test === "ATTENDING" ? (
        <Wrapper setTest={setTest} />
      ) : test === "RESULT" ? (
        <Result setTest={setTest} />
      ) : null}
    </div>
  );
};

export default Sessions;
