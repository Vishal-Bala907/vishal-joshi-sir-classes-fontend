"use client";

import { useSelector } from "react-redux";
import { useState } from "react";
import { Button } from "reactstrap";
import LiveTestForm from "@/Components/Test/Test Components/LiveTestForm";
import TestQuestionForm from "@/Components/Test/Test Components/TestQuestionForm";
import { RootState } from "@/Redux/Store";
import TestLists from "@/Components/Test/Test Components/TestLists";
import Attend from "@/Components/Test/Test Components/attending/Attend";
import Result from "@/Components/Test/Test Components/result analysis/Result";
import Wrapper from "@/Components/Test/Test Components/attending/Wrapper";

const Sessions = () => {
  const [reload, setReload] = useState(0);
  const user = useSelector((state: any) => state.user);
  const [test, setTest] = useState("TEST-LIST");
  const [createdTest, setcreatedTest] = useState(null);
  function handleCreateTest(): void {
    setTest("CREATE-TEST");
  }
  const testId = useSelector((state: RootState) => state.testCounter.testId);

  return (
    <div className="mt-1 d-flex flex-column w-100 h-100 align-items-center justify-content-center p-3">
      {user.role === "admin" && testId === null ? (
        <Button color="primary" onClick={handleCreateTest}>
          Create New
        </Button>
      ) : (
        <div></div>
      )}
      {test === "TEST-LIST" ? (
        <TestLists setTest={setTest} />
      ) : test === "CREATE-TEST" && createdTest === null ? ( // if created is not null then show the quesion form
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
