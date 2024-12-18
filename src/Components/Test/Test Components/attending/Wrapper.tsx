import React from "react";
import Header from "./Header";
import Attend from "./Attend";

interface LiveTestFormProps {
  setTest: React.Dispatch<React.SetStateAction<any>>;
}

const Wrapper: React.FC<LiveTestFormProps> = ({ setTest }) => {
  return (
    <>
      <Header />
      <Attend setTest={setTest} />
    </>
  );
};

export default Wrapper;
