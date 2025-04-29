import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";
import {
  attendTestNow,
  getAllAttendedTests,
  getTestById,
  getTestDataFromBackend,
  getTestLeaderBoard,
  getTests,
} from "@/server/tests";
import { setAttendTestDetails } from "@/Redux/Reducers/AttendSlice";
// import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { setChartData } from "@/Redux/Reducers/ChartData";
import { toast } from "react-toastify";
import { setAttending } from "@/Redux/Reducers/AttendStatus";
import NotAttended from "./NotAttended";
import RescheduleTest from "./RescheduleTest";

interface LiveTestFormData {
  _id: string;
  testName: string;
  description: string;
  timeDuration: string;
  time: string;
  date: string;
  category: string;
  instructions: string;
  positiveMarking: string;
  negativeMarking: string;
  timestamp: string;
  Questions: any[];
}

interface AttendedTest {
  liveTestId: string;
  studentId: string;
  startTime: string;
  endTime: string;
  _id: string;
  __v?: number;
}

interface ATTENDED {
  category: string;
  description: string;
  date: string;
  testName: string;
  time: string;
  timeDuration: string;
  _id: string;
}

interface LiveTestFormProps {
  setTest: React.Dispatch<React.SetStateAction<any>>;
}

const TestLists: React.FC<LiveTestFormProps> = ({ setTest }) => {
  const USER = useSelector((state: any) => state.user);
  const [tests, setTests] = useState<LiveTestFormData[]>([]);
  const [attendedTest, setAttendedTest] = useState<AttendedTest[]>([]);
  const [selectedType, setSelectedType] = useState<string>("AVAILABLE");
  const [attendedTestDetails, setattendedTestDetails] = useState<ATTENDED[]>(
    []
  );
  // const [leaderboardData, setLeaderBoardData] = useState<TestStats[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch available tests based on user role
    getTests(USER.role)
      .then((data) => {
        setTests(data || []);
      })
      .catch((err) => console.error("Error fetching tests:", err));

    if (USER.role === "student") {
      // Fetch attended tests for students
      getAllAttendedTests(USER._id)
        .then((data) => {
          console.log(data);
          setAttendedTest(data?.data || []);
          if (data?.data && data?.data.length > 0) {
            data?.data.map((t: any, ind: number) => {
              getTestById(t.liveTestId)
                .then((data) => {
                  // console.log(data.data);
                  const obj = {
                    category: data.data.category,
                    description: data.data.description,
                    date: data.data.date,
                    testName: data.data.testName,
                    time: data.data.time,
                    timeDuration: data.data.timeDuration,
                    _id: data.data._id,
                  };
                  setattendedTestDetails((prev) => [...prev, obj]);
                })
                .catch((err) => {
                  console.error(err);
                });
            });
          }
        })
        .catch((err) => console.error("Error fetching attended tests:", err));
    }

    return () => {
      // dispatch(setAttendTestDetails([]));
      // dispatch(setAttending());
      // setTest("TEST-LIST");
    };
  }, [USER._id, USER.role]);

  const attendTest = (test: LiveTestFormData) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Today's 12:00 AM timestamp
    const TODAYTIMESTAMP = today.getTime();

    // Get the current time (in minutes since midnight)
    const currentTime = new Date();
    const currentMinutes =
      currentTime.getHours() * 60 + currentTime.getMinutes();

    // Test start time in minutes since midnight
    const testStartTime = test.time.split(":");
    const testStartMinutes =
      parseInt(testStartTime[0], 10) * 60 + parseInt(testStartTime[1], 10);

    // Calculate test end time in minutes since midnight
    const testEndMinutes = testStartMinutes + parseInt(test.timeDuration, 10);

    // Calculate the time difference between current time and test end time
    const timeDifference = testEndMinutes - currentMinutes;

    // Convert the time difference to hours and minutes
    const diffHours = Math.floor(timeDifference / 60);
    const diffMinutes = timeDifference % 60;

    // Check if the test is for today
    if (TODAYTIMESTAMP !== +test.timestamp) {
      toast.error("Can't Attend right now", {
        position: "top-left",
      });
      return;
    }

    // Check if the current time is before the test start time
    if (currentMinutes < testStartMinutes) {
      toast.error("Can't Attend right now", {
        position: "top-left",
      });
      return;
    }

    // Check if the current time is after the test end time
    if (currentMinutes > testEndMinutes) {
      toast.error("Can't Attend right now", {
        position: "top-left",
      });
      return;
    }

    dispatch(setAttendTestDetails(test));
    dispatch(setAttending());
    setTest("ATTENDING");
  };

  const getTestData = (_id: string) => {
    const userId = USER._id;

    getTestDataFromBackend(_id, userId)
      .then((data) => {
        dispatch(setChartData(data?.data));
        setTest("RESULT");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  // console.log(attendedTestDetails);
  return (
    <div className="w-100 d-flex justify-content-center align-items-center flex-row flex-wrap">
      {/* Dropdown for selecting Available/Attended Tests */}

      {USER.role === "admin" ? null : (
        <div className="btn-group">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {selectedType === "AVAILABLE"
              ? "Available Tests"
              : "Attended Tests"}
          </button>
          <ul className="dropdown-menu">
            <li
              onClick={() => {
                setSelectedType("AVAILABLE");
              }}
            >
              <a className="dropdown-item" href="#">
                Available
              </a>
            </li>
            <li
              onClick={() => {
                setSelectedType("ATTENDED");
              }}
            >
              <a className="dropdown-item" href="#">
                Attended
              </a>
            </li>
          </ul>
        </div>
      )}

      {/* Render Available Tests or Attended Tests based on selection */}
      {selectedType === "AVAILABLE" ? (
        <div className="accordion w-100 " id="accordionExample">
          {tests.length === 0 ? (
            <NotAttended message="Ops no tests available yet 🥲🥲" />
          ) : (
            tests.map((test, index) => {
              const collapseId = `collapse${index}`;
              const headerId = `heading${index}`;
              return (
                <div
                  key={test._id || index}
                  className="accordion-item my-3 bg-info-subtle"
                >
                  <h2 className="accordion-header " id={headerId}>
                    <button
                      className="accordion-button collapsed d-flex justify-content-center align-items-center flex-row flex-wrap"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#${collapseId}`}
                      aria-expanded="false"
                      aria-controls={collapseId}
                    >
                      <div>
                        <b>Test:</b> {test.testName} &nbsp; | &nbsp;
                      </div>
                      <div>
                        <b>Time:</b> {test.time} &nbsp; | &nbsp;
                      </div>
                      <div>
                        <b>Duration:</b> {test.timeDuration} mins &nbsp; |
                        &nbsp;
                      </div>
                      <div>
                        <b>Date:</b>{" "}
                        {test.date ? test.date.split("T")[0] : "N/A"}
                      </div>
                    </button>
                  </h2>
                  <div
                    id={collapseId}
                    className="accordion-collapse collapse"
                    aria-labelledby={headerId}
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      {USER.role === "admin" ? (
                        <RescheduleTest testId={test._id} index={index} />
                      ) : (
                        <button
                          className="btn btn-primary"
                          onClick={() => attendTest(test)}
                        >
                          Attend Test
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      ) : (
        <div className="accordion w-100" id="accordionExample">
          {attendedTestDetails.length === 0 ? (
            <NotAttended message="Ops no tests attended yet 🥲🥲" />
          ) : (
            attendedTestDetails.map((test, index) => {
              const collapseId = `collapse${index}`;
              const headerId = `heading${index}`;
              return (
                <div
                  key={test._id || index}
                  className="accordion-item my-3 bg-info-subtle"
                >
                  <h2 className="accordion-header" id={headerId}>
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#${collapseId}`}
                      aria-expanded="false"
                      aria-controls={collapseId}
                    >
                      {test?.testName}
                    </button>
                  </h2>
                  <div
                    id={collapseId}
                    className="accordion-collapse collapse"
                    aria-labelledby={headerId}
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <button
                        className="btn btn-danger"
                        onClick={() => getTestData(test._id)}
                      >
                        View Result
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default TestLists;
