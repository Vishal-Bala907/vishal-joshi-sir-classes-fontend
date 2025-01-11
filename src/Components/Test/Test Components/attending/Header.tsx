import React, { useMemo } from "react";
import CountdownTimer from "./CountdownTimer";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";

const Header = () => {
  const test = useSelector((state: RootState) => state.attend);
  const user = useSelector((state: any) => state.user);
  // const userAnswers = useSelector((state: RootState) => state.answer.questions);

  // Memoized Time Difference
  const timeDifference = useMemo(() => {
    const currentTime = new Date();
    const currentMinutes =
      currentTime.getHours() * 60 + currentTime.getMinutes();
    const [startHour, startMinute] = test.time.split(":").map(Number);
    const testStartMinutes = startHour * 60 + startMinute;
    const testEndMinutes = testStartMinutes + parseInt(test.timeDuration, 10);
    return testEndMinutes - currentMinutes;
  }, [test.time, test.timeDuration]);

  return (
    <header className="w-100">
      <section className="d-flex justify-content-between align-items-center flex-row w-100 p-2">
        <div className="left d-flex justify-content-center align-items-center flex-row">
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/logo3.png`}
            alt="image"
          />
          <h3>{test.testName}</h3>
        </div>
        <div className="right  align-items-center flex-row">
          <div>
            Candidate name <b>{user.name}</b>
          </div>
          <CountdownTimer minutes={Number(timeDifference)} />
          {/* <CountdownTimer minutes={Number(test.timeDuration)} /> */}
        </div>
      </section>
    </header>
  );
};

export default Header;
